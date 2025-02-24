impo_:rt express from 'express';
//const express = require('express');
const cors = require('cors');//eslint-disable-line
const app = express();
app.use(express.json());
app.use(cors());//eslint-disable-line

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: 'male' | 'female' | 'other';
    occupation: string;
}

const patients: Patient[] = [
    {
        id: "d2773c3e-f4f6-11e9-8f0b-362b9e155667",
        name: "John Doe",
        dateOfBirth: "1990-01-01",
        ssn: "123-45-6789",
        gender: "male",
        occupation: "Software Engineer"
    },
    {
        id: "f2773c3e-a5b6-22c8-7d9e-183b9e155678",
        name: "Jane Smith",
        dateOfBirth: "1985-07-12",
        ssn: "987-65-4321",
        gender: "female",
        occupation: "Doctor",
    }
];

const PORT = 3001;

app.get('/api/ping', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong');
});

app.get('/api/patients', (_req: express.Request, res: express.Response) => {
  const foundPatients = patients.map(p => (
    {
      id: p.id,
      name: p.name,
      gener: p.gender,
      occupation: p.occupation,
    }
  ));
  res.json(foundPatients);
});

app.post('/api/patients', (_req: express.Request, res: express.Response) => {
  const body: Patients[] = req.body;

  const patient = new <Patients>({
    body...
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
