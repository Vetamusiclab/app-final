// utils/calculateSalary.ts
import { Tariffs } from "@/lib/tariffs";

export type CalcOptions = {
  minutes: 30 | 45 | 60;
  pair?: boolean;   // парное занятие (pair60 / pair45 если есть)
  kids?: boolean;   // малыши 30 мин (kids30 если есть)
  group?: boolean;  // групповое 45 мин (group45 если есть)
};

export function calculateLessonPrice(
  level: keyof typeof Tariffs,
  intensive: boolean,
  options: CalcOptions
): number {
  const band = intensive ? Tariffs[level].Intensive : Tariffs[level].Light;

  // Малыши 30 минут
  if (options.kids && options.minutes === 30 && "kids30" in band && typeof (band as any).kids30 === "number") {
    return (band as any).kids30;
  }

  // Групповое 45 минут
  if (options.group && options.minutes === 45 && "group45" in band && typeof (band as any).group45 === "number") {
    return (band as any).group45;
  }

  // Парное 60 минут (или 45, если у вас есть pair45)
  if (options.pair && options.minutes === 60 && "pair60" in band && typeof (band as any).pair60 === "number") {
    return (band as any).pair60;
  }
  if (options.pair && options.minutes === 45 && "pair45" in band && typeof (band as any).pair45 === "number") {
    return (band as any).pair45;
  }

  // Обычная цена 45 / 60
  if (options.minutes === 45 && "45" in band && typeof (band as any)["45"] === "number") {
    return (band as any)["45"];
  }
  if (options.minutes === 60 && "60" in band && typeof (band as any)["60"] === "number") {
    return (band as any)["60"];
  }

  // fallback: найти любое числовое значение в band
  for (const k of Object.keys(band)) {
    const v = (band as any)[k];
    if (typeof v === "number") return v;
  }

  throw new Error(`Cannot calculate price for ${String(level)} (intensive=${String(intensive)}, minutes=${options.minutes})`);
}
