import { Router } from 'express';
import News from '../models/News.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const list = await News.find({ published: true }).sort('-date');
  res.json(list);
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const doc = await News.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;