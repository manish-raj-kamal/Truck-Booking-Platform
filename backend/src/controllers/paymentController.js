import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Payment } from '../models/Payment.js';
import { Load } from '../models/Load.js';

// Lazy initialize Razorpay instance to avoid crash when credentials are missing
let razorpay = null;

function getRazorpayInstance() {
    if (!razorpay) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay credentials not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file.');
        }
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }
    return razorpay;
}

/**
 * Calculate booking fee based on load parameters
 * Fee structure:
 * - Base fee: ₹99
 * - Weight fee: ₹10 per MT (up to ₹200)
 * - Material fee: ₹50-200 based on material type
 * - Truck type fee: ₹50-300 based on truck size
 * 
 * Maximum fee capped at ₹1000
 */
function calculateBookingFee(loadDetails) {
    let baseFee = 99;
    let weightFee = 0;
    let materialFee = 0;
    let truckTypeFee = 0;

    // Weight fee: ₹10 per MT, max ₹200
    if (loadDetails.weightMT && loadDetails.weightMT > 0) {
        weightFee = Math.min(loadDetails.weightMT * 10, 200);
    } else {
        weightFee = 50; // Default if weight unknown
    }

    // Material fee based on material type
    const materialFees = {
        'Packed Food': 100,
        'Electronics': 150,
        'Furniture': 80,
        'Machinery': 200,
        'Construction Material': 100,
        'Agricultural Products': 50,
        'Chemicals': 200, // Hazardous
        'Textiles': 60,
        'Auto Parts': 120,
        'FMCG': 80,
        'Others': 100
    };
    materialFee = materialFees[loadDetails.material] || 100;

    // Truck type fee based on truck size
    const truckTypeFees = {
        'Container Close Body 32FT MXL': 300,
        'Container Close Body 24FT SXL': 250,
        'Container Close Body 20FT': 200,
        'Flat Bed Trailers': 250,
        'Canters 19feet / 17feet': 150,
        'Truck 25MT / 14 Wheel': 300,
        'Truck 20MT / 12 Wheel': 250,
        'Truck 16MT / 10 Wheel': 200,
        'Truck 9MT / 6 Wheel': 150,
        'Pick Up / Chota Hathi': 50,
        'Any': 100
    };
    truckTypeFee = truckTypeFees[loadDetails.truckType] || 100;

    // Calculate total (capped at ₹1000)
    let totalFee = baseFee + weightFee + materialFee + truckTypeFee;

    // Apply number of trucks multiplier (max 2x)
    const trucksMultiplier = Math.min(loadDetails.trucksRequired || 1, 2);
    if (trucksMultiplier > 1) {
        totalFee = totalFee * (1 + (trucksMultiplier - 1) * 0.5); // 50% extra per additional truck
    }

    totalFee = Math.min(Math.round(totalFee), 1000);

    return {
        baseFee,
        weightFee: Math.round(weightFee),
        materialFee,
        truckTypeFee,
        totalFee
    };
}

/**
 * Calculate fee for a load (without creating order)
 * POST /api/payments/calculate-fee
 */
export async function calculateFee(req, res) {
    try {
        const loadDetails = req.body;

        if (!loadDetails.material || !loadDetails.truckType) {
            return res.status(400).json({
                message: 'Material and truck type are required to calculate fee'
            });
        }

        const feeBreakdown = calculateBookingFee(loadDetails);

        res.json({
            success: true,
            feeBreakdown,
            message: `Booking fee: ₹${feeBreakdown.totalFee}`
        });
    } catch (error) {
        console.error('Error calculating fee:', error);
        res.status(500).json({ message: 'Failed to calculate fee', error: error.message });
    }
}

/**
 * Create a Razorpay order for load booking
 * POST /api/payments/create-order
 */
export async function createOrder(req, res) {
    try {
        // Check for Razorpay credentials first
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error('Razorpay credentials not configured');
            return res.status(500).json({
                message: 'Payment gateway not configured. Please contact support.',
                error: 'RAZORPAY_NOT_CONFIGURED'
            });
        }

        const loadDetails = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Validate required fields
        if (!loadDetails.type || !loadDetails.sourceCity || !loadDetails.destinationCity ||
            !loadDetails.material || !loadDetails.scheduledDate) {
            return res.status(400).json({
                message: 'Missing required load details'
            });
        }

        // Calculate fee
        const feeBreakdown = calculateBookingFee(loadDetails);
        const amountInPaise = feeBreakdown.totalFee * 100; // Razorpay expects amount in paise

        // Create Razorpay order
        let razorpayOrder;
        try {
            razorpayOrder = await getRazorpayInstance().orders.create({
                amount: amountInPaise,
                currency: 'INR',
                receipt: `load_${Date.now()}_${userId.slice(-6)}`,
                notes: {
                    userId: userId,
                    source: loadDetails.sourceCity,
                    destination: loadDetails.destinationCity,
                    material: loadDetails.material
                }
            });
        } catch (razorpayError) {
            console.error('Razorpay API error:', razorpayError);
            return res.status(500).json({
                message: 'Failed to create payment order with Razorpay',
                error: razorpayError.message
            });
        }

        // Save payment record in database
        const payment = await Payment.create({
            razorpayOrderId: razorpayOrder.id,
            amount: amountInPaise,
            currency: 'INR',
            status: 'created',
            feeBreakdown,
            loadDetails: {
                type: loadDetails.type,
                sourceCity: loadDetails.sourceCity,
                destinationCity: loadDetails.destinationCity,
                material: loadDetails.material,
                weightMT: loadDetails.weightMT || 0,
                truckType: loadDetails.truckType || 'Any',
                trucksRequired: loadDetails.trucksRequired || 1,
                scheduledDate: loadDetails.scheduledDate
            },
            userId
        });

        res.status(201).json({
            success: true,
            order: {
                id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency
            },
            feeBreakdown,
            paymentId: payment._id,
            key: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            message: 'Failed to create payment order',
            error: error.message
        });
    }
}

/**
 * Verify Razorpay payment and create load
 * POST /api/payments/verify
 */
export async function verifyPayment(req, res) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: 'Missing payment verification details' });
        }

        // Find the payment record
        const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });

        if (!payment) {
            return res.status(404).json({ message: 'Payment record not found' });
        }

        if (payment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access to payment' });
        }

        // Verify signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            // Update payment as failed
            payment.status = 'failed';
            payment.failedAt = new Date();
            payment.failureReason = 'Signature verification failed';
            await payment.save();

            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }

        // Payment verified - update payment record
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.status = 'captured';
        payment.paidAt = new Date();

        // Create the load
        const load = await Load.create({
            type: payment.loadDetails.type,
            sourceCity: payment.loadDetails.sourceCity,
            destinationCity: payment.loadDetails.destinationCity,
            material: payment.loadDetails.material,
            weightMT: payment.loadDetails.weightMT,
            truckType: payment.loadDetails.truckType,
            trucksRequired: payment.loadDetails.trucksRequired,
            scheduledDate: payment.loadDetails.scheduledDate,
            postedBy: userId,
            paymentId: payment._id,
            bookingFee: payment.amount / 100, // Store fee in rupees
            status: 'open'
        });

        // Link load to payment
        payment.loadId = load._id;
        await payment.save();

        res.json({
            success: true,
            message: 'Payment verified and load posted successfully',
            load,
            payment: {
                id: payment._id,
                amount: payment.amount / 100, // Convert back to rupees
                status: payment.status
            }
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            message: 'Payment verification failed',
            error: error.message
        });
    }
}

/**
 * Get payment history for a user
 * GET /api/payments/history
 */
export async function getPaymentHistory(req, res) {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const payments = await Payment.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate('loadId', 'sourceCity destinationCity status');

        res.json({
            success: true,
            payments: payments.map(p => ({
                id: p._id,
                orderId: p.razorpayOrderId,
                amount: p.amount / 100,
                status: p.status,
                loadDetails: p.loadDetails,
                load: p.loadId,
                createdAt: p.createdAt,
                paidAt: p.paidAt
            }))
        });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Failed to fetch payment history' });
    }
}

/**
 * Get payment details by ID
 * GET /api/payments/:id
 */
export async function getPaymentById(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const payment = await Payment.findById(id).populate('loadId');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        if (payment.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.json({
            success: true,
            payment: {
                id: payment._id,
                orderId: payment.razorpayOrderId,
                paymentId: payment.razorpayPaymentId,
                amount: payment.amount / 100,
                status: payment.status,
                feeBreakdown: payment.feeBreakdown,
                loadDetails: payment.loadDetails,
                load: payment.loadId,
                createdAt: payment.createdAt,
                paidAt: payment.paidAt
            }
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json({ message: 'Failed to fetch payment details' });
    }
}
