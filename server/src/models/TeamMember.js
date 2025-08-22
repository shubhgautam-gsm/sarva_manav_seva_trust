import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema(
  {
    name: String,
    role: { en: String, gu: String },
    phone: String,
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', TeamMemberSchema);