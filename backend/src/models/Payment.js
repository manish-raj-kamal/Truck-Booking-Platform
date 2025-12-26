import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  // Razorpay order details
  razorpayOrderId: { type: String, required: true, unique: true, index: true },
  razorpayPaymentId: { type: String, sparse: true, index: true },
  razorpaySignature: { type: String },

  // Payment details
  amount: { type: Number, required: true }, // Amount in RUPEES
  currency: { type: String, default: 'INR' },
  paymentType: {
    type: String,
    enum: ['booking_fee', 'final_payment'],
    default: 'booking_fee'
  },
  status: {
    type: String,
    enum: ['created', 'authorized', 'captured', 'failed', 'refunded'],
    default: 'created',
    index: true
  },

  // Fee breakdown for transparency
  feeBreakdown: {
    baseFee: { type: Number }, // Base booking fee
    weightFee: { type: Number }, // Additional fee based on weight
    materialFee: { type: Number }, // Fee based on material type (hazardous, fragile, etc.)
    truckTypeFee: { type: Number }, // Fee based on truck size
    totalFee: { type: Number } // Total calculated fee
  },

  // Load details (stored before load is created)
  loadDetails: {
    type: { type: String },
    sourceCity: { type: String },
    destinationCity: { type: String },
    material: { type: String },
    weightMT: { type: Number },
    truckType: { type: String },
    trucksRequired: { type: Number },
    scheduledDate: { type: Date }
  },

  // References
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  loadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Load', sparse: true }, // Linked after load creation

  // Metadata
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
  failedAt: { type: Date },
  failureReason: { type: String }
});

// Compound indexes for efficient queries
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });

export const Payment = mongoose.model('Payment', paymentSchema);
