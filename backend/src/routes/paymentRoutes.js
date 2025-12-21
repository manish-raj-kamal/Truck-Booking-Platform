import { Router } from 'express';
import {
    calculateFee,
    createOrder,
    verifyPayment,
    getPaymentHistory,
    getPaymentById
} from '../controllers/paymentController.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Public route to calculate fee (for preview)
router.post('/calculate-fee', auth(false), calculateFee);

// Authenticated routes
router.post('/create-order', auth(true), createOrder);
router.post('/verify', auth(true), verifyPayment);
router.get('/history', auth(true), getPaymentHistory);
router.get('/:id', auth(true), getPaymentById);

export default router;
