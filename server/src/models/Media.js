import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    caption: { en: String, gu: String },
    type: { type: String, enum: ['image', 'video'], default: 'image' }
  },
  { timestamps: true }
);

export default mongoose.model('Media', MediaSchema);