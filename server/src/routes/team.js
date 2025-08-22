import { Router } from 'express';
import TeamMember from '../models/TeamMember.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  const list = await TeamMember.find().sort('name');
  res.json(list);
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const doc = await TeamMember.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;