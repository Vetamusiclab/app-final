import { Tariffs } from "@/lib/tariffs";
import { LessonMeta } from "@/types/user"; // импортируем только LessonMeta

export function calculateLessonPrice(
  level: keyof typeof Tariffs,
  intensive: boolean,
  meta: LessonMeta
): number {
  const group = intensive ? Tariffs[level].Intensive : Tariffs[level].Light;

  if (meta.kids30 && "kids30" in group) return group.kids30;
  if (meta.group45 && "group45" in group) return group.group45;
  if (meta.pair && meta.minutes === 60 && "pair60" in group) return group.pair60;

  return group[String(meta.minutes) as "45" | "60"];
}
