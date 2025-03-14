import express from 'express';
import cors from 'cors';
import pingRouter from './routes/pingRouter';
import patientRouter from './routes/patientRouter';
import diagnosisRouter from './routes/diagnosisRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/ping', pingRouter);
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
