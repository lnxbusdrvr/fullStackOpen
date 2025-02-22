import express from 'express';
import bmiCalculator from './bmi';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' }).end();
    return;
  }

  const bmi = bmiCalculator(height, weight);

  res.json({
    weight,
    height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({error: "parameters missing"}).end();
    return;
  }

 if (isNaN(Number(target))
   || !Array.isArray(daily_exercises)
   || daily_exercises.some(day => isNaN(Number(day)))) {
    res.status(400).json({error: 'malformatted parameters'}).end();
    return;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.json(calculateExercises(target, daily_exercises));

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

