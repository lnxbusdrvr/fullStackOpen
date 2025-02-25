import express from 'express';
import { Diagnosis, getNonLatinDiagnosesEntries } from '../data/diagnoses';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<Diagnosis[]>) => {
  res.json(getNonLatinDiagnosesEntries());
});

export default router;

