import { Tariffs } from "@/lib/tariffs";

export type LessonOptions = {
  minutes: 45 | 60;
  pair?: boolean;
  kids?: boolean;
  group?: boolean;
};

// Функция получения цены урока по тарифу и опциям
export function calculateLessonPrice(level: keyof typeof Tariffs, options: LessonOptions) {
  const group = Tariffs[level];

  if (options.pair && options.minutes === 60 && "pair60" in group) {
    return group.pair60;
  }

  if (options.kids && options.minutes === 30 && "kids30" in group) {
    return group.kids30;
  }

  if (options.group && options.minutes === 45 && "group45" in group) {
    return group.group45;
  }

  // Приведение к строковому литералу, чтобы TS понял тип ключа
  const key = options.minutes === 45 ? "45" : "60";
  return group[key as "45" | "60"];
}

// Пример использования:
// const price = calculateLessonPrice("BasicLight", { minutes: 45 });
// const pricePair = calculateLessonPrice("ProgressiveIntensive", { minutes: 60, pair: true });
