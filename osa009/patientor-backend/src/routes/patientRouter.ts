import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response) => {
  res.json(patientService.getNonSensitivePatientEntries());
});

router.post('/', (req: express.Request, res: express.Response) => {
  try {
    const addEntry = patientService.addPatient(req.body);
    res.json(addEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong on creating new entrt';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    }
    res.status(400).end(errorMessage);
  }
});


export default router;

