import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import fileRoutes from './routes/fileRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));
// Routes
app.use('/api/files', fileRoutes);
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
