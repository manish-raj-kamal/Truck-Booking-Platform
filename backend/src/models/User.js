import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String }, // Optional for Google OAuth users
  name: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'driver', 'superadmin'], default: 'customer', index: true },

  // Google OAuth fields
  googleId: { type: String, unique: true, sparse: true, index: true },
  avatar: { type: String }, // Profile picture URL from Google
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },

  createdAt: { type: Date, default: Date.now }
});

// Compound indexes
userSchema.index({ authProvider: 1, email: 1 });

export const User = mongoose.model('User', userSchema);
