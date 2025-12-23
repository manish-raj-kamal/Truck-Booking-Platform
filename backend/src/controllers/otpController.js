import { Otp } from '../models/Otp.js';
import { User } from '../models/User.js';
import { sendOTPEmail } from '../services/emailService.js';
import { hashPassword } from '../utils/hash.js';
import jwt from 'jsonwebtoken';

// Rate limiting: Max 3 OTP requests per email per hour
const OTP_RATE_LIMIT = 3;
const OTP_RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const OTP_EXPIRY_MINUTES = 10;

// Send OTP for registration
export async function sendRegistrationOTP(req, res) {
    try {
        const { email, name, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered. Please login instead.' });
        }

        // Check rate limiting
        const recentOtps = await Otp.countDocuments({
            email: email.toLowerCase(),
            purpose: 'registration',
            createdAt: { $gte: new Date(Date.now() - OTP_RATE_LIMIT_WINDOW) }
        });

        if (recentOtps >= OTP_RATE_LIMIT) {
            return res.status(429).json({
                message: 'Too many OTP requests. Please try again later.',
                retryAfter: OTP_RATE_LIMIT_WINDOW / 1000 / 60 // minutes
            });
        }

        // Delete any existing OTPs for this email
        await Otp.deleteMany({ email: email.toLowerCase(), purpose: 'registration' });

        // Generate new OTP
        const otp = Otp.generateOTP(6);
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        // Store OTP with hashed password (so we can create user after verification)
        const hashedPassword = await hashPassword(password);

        await Otp.create({
            email: email.toLowerCase(),
            otp,
            purpose: 'registration',
            expiresAt,
            // Store registration data temporarily
            tempData: JSON.stringify({ name, passwordHash: hashedPassword })
        });

        // Send OTP email
        await sendOTPEmail(email, otp, 'registration');

        res.json({
            message: 'OTP sent successfully',
            email: email.toLowerCase(),
            expiresIn: OTP_EXPIRY_MINUTES * 60 // seconds
        });

    } catch (error) {
        console.error('Send OTP error:', error);
        res.status(500).json({ message: error.message || 'Failed to send OTP' });
    }
}

// Verify OTP and complete registration
export async function verifyRegistrationOTP(req, res) {
    try {
        const { email, otp, name, password } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find OTP record
        const otpRecord = await Otp.findOne({
            email: email.toLowerCase(),
            purpose: 'registration'
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
        }

        // Check if expired
        if (otpRecord.isExpired()) {
            await Otp.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Check max attempts
        if (otpRecord.isMaxAttemptsExceeded()) {
            await Otp.deleteOne({ _id: otpRecord._id });
            return res.status(400).json({ message: 'Too many failed attempts. Please request a new OTP.' });
        }

        // Verify OTP
        if (otpRecord.otp !== otp) {
            // Increment attempts
            otpRecord.attempts += 1;
            await otpRecord.save();

            const remainingAttempts = otpRecord.maxAttempts - otpRecord.attempts;
            return res.status(400).json({
                message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                remainingAttempts
            });
        }

        // OTP verified! Create user
        // Check if user already exists (edge case: concurrent registrations)
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            await Otp.deleteOne({ _id: otpRecord._id });
            return res.status(409).json({ message: 'Email already registered. Please login.' });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            email: email.toLowerCase(),
            passwordHash: hashedPassword,
            name: name || '',
            authProvider: 'local'
        });

        // Delete OTP record
        await Otp.deleteOne({ _id: otpRecord._id });

        // Generate JWT token for auto-login
        const token = jwt.sign(
            { id: user._id, role: user.role, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Registration successful!',
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: error.message || 'Failed to verify OTP' });
    }
}

// Resend OTP
export async function resendOTP(req, res) {
    try {
        const { email, password, name, purpose = 'registration' } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check rate limiting
        const recentOtps = await Otp.countDocuments({
            email: email.toLowerCase(),
            purpose,
            createdAt: { $gte: new Date(Date.now() - OTP_RATE_LIMIT_WINDOW) }
        });

        if (recentOtps >= OTP_RATE_LIMIT) {
            return res.status(429).json({
                message: 'Too many OTP requests. Please try again later.',
                retryAfter: OTP_RATE_LIMIT_WINDOW / 1000 / 60
            });
        }

        // For registration, also check if user exists
        if (purpose === 'registration') {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser) {
                return res.status(409).json({ message: 'Email already registered. Please login.' });
            }
        }

        // Delete existing OTPs
        await Otp.deleteMany({ email: email.toLowerCase(), purpose });

        // Generate and save new OTP
        const otp = Otp.generateOTP(6);
        const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        // For registration, we need password
        if (purpose === 'registration' && password) {
            const hashedPassword = await hashPassword(password);
            await Otp.create({
                email: email.toLowerCase(),
                otp,
                purpose,
                expiresAt
            });
        } else {
            await Otp.create({
                email: email.toLowerCase(),
                otp,
                purpose,
                expiresAt
            });
        }

        // Send OTP email
        await sendOTPEmail(email, otp, purpose);

        res.json({
            message: 'New OTP sent successfully',
            expiresIn: OTP_EXPIRY_MINUTES * 60
        });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: error.message || 'Failed to resend OTP' });
    }
}
