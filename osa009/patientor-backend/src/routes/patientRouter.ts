import express from 'express';
import { Patient, getNonSensitiveEntries } from '../data/patients';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response<Patient[]>) => {
  res.json(getNonSensitiveEntries());
});


export default router;

