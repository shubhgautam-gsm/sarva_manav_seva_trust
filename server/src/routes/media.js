import { Router } from 'express';
import Media from '../models/Media.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../utils/upload.js';

const router = Router();

router.get('/', async (req, res) => {
  const list = await Media.find().sort('-createdAt');
  res.json(list);
});

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    const { captionEn, captionGu, type } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    const doc = await Media.create({
      filename: req.file.filename,
      url,
      type: type || 'image',
      caption: { en: captionEn || '', gu: captionGu || '' }
    });
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;