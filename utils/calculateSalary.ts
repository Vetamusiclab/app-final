import { Tariffs } from "@/lib/tariffs";

type LessonOptions = {
  minutes: number;
  kids30?: boolean;
  group45?: boolean;
  pair?: boolean;
};

export function calculateLessonPrice(
  level: keyof typeof Tariffs,
  intensive: boolean,
  options: LessonOptions
): number {
  const group = intensive ? Tariffs[level].Intensive : Tariffs[level].Light;

  if (options.kids30 && "kids30" in group) return group.kids30;
  if (options.group45 && "group45" in group) return group.group45;
  if (options.pair && options.minutes === 60 && "pair60" in group) return group.pair60;

  return group[String(options.minutes) as "45" | "60"];
}
