import { Tariffs } from "@/lib/tariffs";
import { UserLevel } from "@/types/user"; // TutorLevel заменён на UserLevel, чтобы совпадало с типами

export type LessonMeta = {
  minutes: number;
  pair?: boolean;
  kids30?: boolean;
  group45?: boolean;
};

/**
 * Рассчитывает стоимость урока
 * @param level — уровень наставника
 * @param intensive — интенсивность (true = Intensive, false = Light)
 * @param meta — метаданные урока
 * @returns стоимость урока в рублях
 */
export function calculateLessonPrice(
  level: UserLevel,
  intensive: boolean,
  meta: LessonMeta
): number {
  const group = intensive
    ? Tariffs[level].Intensive
    : Tariffs[level].Light;

  if (meta.kids30 && "kids30" in group) return group.kids30;
  if (meta.group45 && "group45" in group) return group.group45;
  if (meta.pair && meta.minutes === 60 && "pair60" in group) return group.pair60;

  const minutesKey = String(meta.minutes) as "45" | "60";
  if (minutesKey in group) return group[minutesKey];

  throw new Error("Неверные данные для расчета тарифа");
}
