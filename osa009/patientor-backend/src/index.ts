import express from 'express';
const cors = require('cors');//eslint-disable-line
const app = express();
import { Patient, getNonSensitiveEntries } from './data/patients';
import { Diagnosis, getNonLatinDiagnosesEntries } from './data/diagnoses';

app.use(express.json());
app.use(cors());//eslint-disable-line

const PORT = 3001;

app.get('/api/ping', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong');
});

app.get('/api/patients', (_req: express.Request, res: express.Response<Patient[]>) => {
  res.json(getNonSensitiveEntries());
});

app.get('/api/diagnoses', (_req: express.Request, res: express.Response<Diagnosis[]>) => {
  res.json(getNonLatinDiagnosesEntries());
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
