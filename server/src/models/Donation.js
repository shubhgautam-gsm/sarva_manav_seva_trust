import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema(
  {
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    donorName: String,
    donorEmail: String,
    donorPhone: String,
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Donation', DonationSchema);