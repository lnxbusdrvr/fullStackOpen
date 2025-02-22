import bmiCalculator from './bmi';

const args: string[] = process.argv;

if (args.length < 4) {
  throw new Error('Not enough arguments');
}
if (args.length > 4) {
  throw new Error('Too many arguments');
}

const height = Number(process.argv[2]);
const mass = Number(process.argv[3]);

if (isNaN(height) || isNaN(mass)) {
  throw new Error('Arguments should be numbers');
}

console.log(bmiCalculator(height, mass));

