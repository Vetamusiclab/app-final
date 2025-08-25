import { Tariffs, TutorLevel } from "@/lib/tariffs";

type LessonMeta = { minutes: 45 | 60, pair?: boolean, kids30?: boolean, group45?: boolean };

export function calculateLessonPrice(level: TutorLevel, intensive: boolean, meta: LessonMeta): number {
  const group = intensive ? Tariffs[level].Intensive : Tariffs[level].Light;
  if (meta.kids30) return group.kids30;
  if (meta.group45) return group.group45;
  if (meta.pair && meta.minutes === 60) return group.pair60;
  return group[String(meta.minutes) as "45" | "60"];
}
