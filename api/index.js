import app from '../backend/src/app.js';
import { connectDB } from '../backend/src/config/db.js';

export default async function handler(req, res) {
  // Check for environment variables
  if (!process.env.MONGODB_URI) {
    console.error('CRITICAL ERROR: MONGODB_URI is missing in Vercel Environment Variables');
    return res.status(500).json({ 
      message: 'Server Configuration Error: Database connection string is missing.',
      hint: 'Please add MONGODB_URI to Vercel Environment Variables.'
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error('CRITICAL ERROR: JWT_SECRET is missing in Vercel Environment Variables');
    // We don't stop execution for this, but auth will fail later
  }

  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ message: 'Database connection failed' });
  }
  
  return app(req, res);
}
