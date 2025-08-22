import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: { en: String, gu: String },
    body: { en: String, gu: String },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('News', NewsSchema);