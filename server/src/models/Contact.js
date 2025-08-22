import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: String,
    phone: String,
    message: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Contact', ContactSchema);