import express from 'express';
import * as dotenv from 'dotenv';
import OpenAIApi from 'openai';
import { fal } from '@fal-ai/client';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('Hello from DALL-E!');
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    fal.config({ credentials: process.env.FAL_API_KEY });

    const result = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt: prompt,
        seed: 6252023,
        image_size: 'landscape_16_9',
        num_images: 1,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    const image = result.data.images[0].url;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
