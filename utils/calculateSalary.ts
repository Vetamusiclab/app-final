// utils/calculateSalary.ts

export const calculateLessonPrice = (
  level: 'Basic' | 'Progressive' | 'Prive',
  intensive: boolean,
  options: { minutes: number }
): number => {
  let price = 0;

  switch (level) {
    case 'Basic':
      price = intensive
        ? options.minutes === 45 ? 2400 : 2700
        : options.minutes === 45 ? 2200 : 2500;
      break;

    case 'Progressive':
      price = intensive
        ? options.minutes === 45 ? 3000 : 3600
        : options.minutes === 45 ? 2800 : 3400;
      break;

    case 'Prive':
      price = intensive ? 3900 : 3600;
      break;

    default:
      price = 0;
  }

  return price;
};
