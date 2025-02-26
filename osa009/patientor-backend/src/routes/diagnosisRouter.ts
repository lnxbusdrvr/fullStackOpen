import express from 'express';
import { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<Diagnosis[]>) => {
  res.json(diagnosisService.getNonLatinDiagnosesEntries());
});

export default router;

