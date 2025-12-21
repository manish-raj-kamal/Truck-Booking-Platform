import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/User.js';

export function configurePassport() {
    // Serialize user for session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    // Google OAuth Strategy
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/auth/google/callback',
                    scope: ['profile', 'email']
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        // Check if user already exists with this Google ID
                        let user = await User.findOne({ googleId: profile.id });
                        let isNewUser = false;

                        if (user) {
                            // User exists, update profile info if needed
                            user.name = profile.displayName;
                            user.avatar = profile.photos?.[0]?.value;
                            await user.save();
                            user.isNewUser = false;
                            return done(null, user);
                        }

                        // Check if user exists with same email (local account)
                        const existingEmailUser = await User.findOne({
                            email: profile.emails?.[0]?.value
                        });

                        if (existingEmailUser) {
                            // Link Google account to existing local account
                            existingEmailUser.googleId = profile.id;
                            existingEmailUser.avatar = profile.photos?.[0]?.value;
                            existingEmailUser.authProvider = existingEmailUser.authProvider === 'local' ? 'local' : 'google';
                            await existingEmailUser.save();
                            existingEmailUser.isNewUser = false;
                            return done(null, existingEmailUser);
                        }

                        // Create new user
                        user = await User.create({
                            googleId: profile.id,
                            email: profile.emails?.[0]?.value,
                            name: profile.displayName,
                            avatar: profile.photos?.[0]?.value,
                            authProvider: 'google',
                            role: 'customer' // Default role for new Google users
                        });

                        // Mark as new user for redirect to complete profile
                        user.isNewUser = true;
                        return done(null, user);
                    } catch (error) {
                        console.error('Google OAuth error:', error);
                        return done(error, null);
                    }
                }
            )
        );
        console.log('✅ Google OAuth Strategy configured');
    } else {
        console.warn('⚠️ Google OAuth not configured: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
    }

    return passport;
}

export default passport;
