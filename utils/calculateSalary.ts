// utils/calculateSalary.ts
import { Tariffs } from "@/lib/tariffs";
import { TutorLevel } from "@/types/user";

export type LessonMeta = {
  minutes: number;
  pair?: boolean;
  kids30?: boolean;
  group45?: boolean;
};

export function calculateLessonPrice(
  level: TutorLevel,
  intensive: boolean,
  meta: LessonMeta
): number {
  const group = intensive ? Tariffs[level].Intensive : Tariffs[level].Light;

  if (meta.kids30 && "kids30" in group) return group.kids30;
  if (meta.group45 && "group45" in group) return group.group45;
  if (meta.pair && meta.minutes === 60 && "pair60" in group) return group.pair60;

  return group[String(meta.minutes) as "45" | "60"];
}
