import express from 'express';
import { summarizeText } from './summarizer.js';

const router = express.Router();

router.post('/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text field is required' });

  const summary = await summarizeText(text);
  res.json(summary);
});

export default router;
