const bmiCalculator = (args: number[]): string => {
  if (args.length !== 2) {
    throw new Error('Please provide exactly two arguments: height (cm) and weight (kg)');
  }

  const height = args[0] / 100; // cm → m
  const mass = args[1];

  if (isNaN(height) || isNaN(mass)) {
    throw new Error('Provided values were not numbers!');
  }

  const bmi = mass / (height * height);

  switch (true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)';
    case bmi >= 16.0 && bmi <= 16.9:
      return 'Underweight (Moderate thinness)';
    case bmi >= 17.0 && bmi <= 18.4:
      return 'Underweight (Mild thinness)';
    case bmi >= 18.5 && bmi <= 24.9:
      return 'Normal range';
    case bmi >= 25.0 && bmi <= 29.9:
      return 'Overweight (Pre-obese)';
    case bmi >= 30.0 && bmi <= 34.9:
      return 'Obese (Class I)';
    case bmi >= 35.0 && bmi <= 39.9:
      return 'Obese (Class II)';
    default:
      return 'Obese (Class III)';
  }
};

// Lisää tämä, jotta koodi toimii komentorivillä
console.log(bmiCalculator([Number(process.argv[2]), Number(process.argv[3])]));

export default bmiCalculator;

