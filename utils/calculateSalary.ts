import { Tariffs } from '@/lib/tariffs';

type Options = {
  minutes: 45 | 60;
  pair?: boolean;
  kids?: boolean;
  group?: boolean;
};

export function calculateLessonPrice(
  level: keyof typeof Tariffs,
  options: Options
): number {
  const group = Tariffs[level];

  // Парное занятие
  if (options.pair && options.minutes === 60 && 'pair60' in group) return group.pair60;
  if (options.pair && options.minutes === 45 && 'pair45' in group) return group.pair45;

  // Малыши до 6 лет
  if (options.kids && options.minutes === 30 && 'kids30' in group) return group.kids30;

  // Групповое занятие
  if (options.group && options.minutes === 45 && 'group45' in group) return group.group45;

  // Обычное занятие
  if (options.minutes === 45 && '45' in group) return group['45'];
  if (options.minutes === 60 && '60' in group) return group['60'];

  throw new Error('Невозможно рассчитать цену для указанных опций');
}


};

export default SalaryCalculator;
