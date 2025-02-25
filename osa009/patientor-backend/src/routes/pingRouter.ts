import express from 'express';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong');
});

export default router;
