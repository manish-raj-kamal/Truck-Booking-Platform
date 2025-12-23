import { Router } from 'express';
import { sendRegistrationOTP, verifyRegistrationOTP, resendOTP } from '../controllers/otpController.js';

const router = Router();

// Send OTP for registration
router.post('/send', sendRegistrationOTP);

// Verify OTP and complete registration
router.post('/verify', verifyRegistrationOTP);

// Resend OTP
router.post('/resend', resendOTP);

export default router;
