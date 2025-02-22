
import isNotNumber from './utils';
import calculateExercises from './exerciseCalculator';


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

console.log(calculateExercises(target, dailyHours) );


