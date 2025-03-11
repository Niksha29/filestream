import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileUrl: { type: String, required: true },
  password: { type: String },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Auto delete after 7 days
});

export default mongoose.model('File', fileSchema);
