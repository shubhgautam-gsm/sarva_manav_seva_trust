import { Router } from 'express';
import Contact from '../models/Contact.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', requireAuth, async (req, res) => {
  const list = await Contact.find().sort('-createdAt');
  res.json(list);
});

export default router;