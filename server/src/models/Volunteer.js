import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    occupation: String,
    qualification: String,
    address: String,
    source: { type: String, default: 'website' }
  },
  { timestamps: true }
);

export default mongoose.model('Volunteer', VolunteerSchema);