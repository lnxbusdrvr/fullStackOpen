import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req: express.Request, res: express.Response) => {
  res.json(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req: express.Request, res: express.Response) => {
  const patientById = patientService
    .getPatientEntriesById(req.params.id);

  if (patientById) {
    res.json(patientById);
  } else {
    res.status(404).json({ error: "Patient not found by given id" });
  }
});


router.post('/', (req: express.Request, res: express.Response) => {
  try {
    // Validate data
    const newValitadedPatientEntry = toNewPatientEntry(req.body); 
    const addPatientEntry = patientService.addPatient(newValitadedPatientEntry);
    res.json(addPatientEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong on creating new entrt';
    if (error instanceof Error) {
      errorMessage = 'Error: ' + error.message;
    };
    res.status(400).end(errorMessage);
  };
});


export default router;

