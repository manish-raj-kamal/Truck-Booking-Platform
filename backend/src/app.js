import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { configurePassport } from './config/passport.js';
import authRoutes from './routes/authRoutes.js';
import googleAuthRoutes from './routes/googleAuthRoutes.js';
import userRoutes from './routes/userRoutes.js';
import truckRoutes from './routes/truckRoutes.js';
import loadRoutes from './routes/loadRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

const app = express();

// Configure CORS to allow requests from any origin (or specific ones)
app.use(cors({
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? 'https://somya-truck-booking.vercel.app' : 'http://localhost:5173'),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Session configuration (required for Passport OAuth)
app.use(session({
  secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || 'truck-booking-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize Passport
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/auth', googleAuthRoutes); // Google OAuth routes (not under /api)
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/loads', loadRoutes);
app.use('/api/social-media', socialMediaRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/otp', otpRoutes);

export default app;
