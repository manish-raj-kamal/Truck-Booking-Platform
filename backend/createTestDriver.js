import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: String,
    name: String,
    role: { type: String, enum: ['customer', 'driver', 'admin', 'superadmin'], default: 'customer' },
    authProvider: { type: String, default: 'local' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function createTestDriver() {
    try {
        // Connect to MongoDB
        const mongoURI = process.env.DB_MODE === 'atlas'
            ? process.env.MONGODB_ATLAS
            : process.env.MONGODB_LOCAL || 'mongodb://localhost:27017/truck_booking';

        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('Connected!');

        const email = 'driver1@test.com';
        const password = 'Driver@123';
        const name = 'Test Driver';

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            console.log('❌ User already exists:', email);
            console.log('   Role:', existing.role);
            await mongoose.disconnect();
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            email,
            passwordHash,
            name,
            role: 'driver',
            authProvider: 'local'
        });

        console.log('✅ Test driver created successfully!');
        console.log('   Email:', user.email);
        console.log('   Password:', password);
        console.log('   Role:', user.role);
        console.log('   Name:', user.name);

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

createTestDriver();
