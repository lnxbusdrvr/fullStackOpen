
import isNotNumber from './utils'


interface ExercisesAvg {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, dailyHours: number[]): ExercisesAvg => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'Excellent! Party on Wayne';
  } else if (average >= target * 0.6) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Not bad but try to do a lot more';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

// Validate args
const args: string[] = process.argv.slice(2); // removes node and filename
if (args.length < 10) throw new Error('Not enough arguments');
if (args.length > 10) throw new Error('Too many arguments');

// Check all cliArg-types. some() gives all args by default
if (args.some(isNotNumber)) {
  throw new Error('All arguments should be numbers');
}

const dailyHours = args.slice(1, args.length).map(Number); //All except last one
const target = Number(args[0]); 

console.log(calculateExercises(target, dailyHours) )


