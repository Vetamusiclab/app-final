import type { Subscription } from "@/types/subscription";

export const subscriptions: Subscription[] = [
  {
    id: "sub1",
    studentId: "stu1",
    month: "2025-08",
    tariffType: "Light",
    lessonsTotal: 4,
    lessonsUsed: 1,
    validFrom: "2025-08-01",
    validTo: "2025-08-31",
    history: [{ date: "2025-08-10", action: "Покупка абонемента"}]
  }
];
