import 'dotenv/config';
import { connectDB } from './config/db.js';
import app from './app.js';

const PORT = process.env.PORT || 4000;

function getMongoURI() {
  const mode = process.env.DB_MODE || 'local';
  
  if (mode === 'atlas') {
    console.log('📡 Using MongoDB Atlas (Cloud)');
    return process.env.MONGODB_ATLAS;
  } else {
    console.log('💻 Using MongoDB Local (Compass)');
    return process.env.MONGODB_LOCAL || 'mongodb://localhost:27017/truck_booking';
  }
}

async function start() {
  const mongoURI = getMongoURI();
  await connectDB(mongoURI);
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

start();
