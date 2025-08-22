import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import volunteerRoutes from './routes/volunteers.js';
import contactRoutes from './routes/contact.js';
import newsRoutes from './routes/news.js';
import mediaRoutes from './routes/media.js';
import teamRoutes from './routes/team.js';
import paymentRoutes from './routes/payments.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
await connectDB();

// Production-ready configuration
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
} else {
  // Use development CORS settings
  app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
}

app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

// API routes
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/payments', paymentRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve the client's build files
  app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
  // Serve uploaded files
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  // Redirect all other requests to the React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
  });
} else {
  // Serve uploaded files in development
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 API on http://localhost:${port}`));