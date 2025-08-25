export type TariffType = 'Light' | 'Intensive' | 'OneTime' | 'Trial';
export interface Subscription {
  id: string;
  studentId: string;
  month: string; // YYYY-MM
  tariffType: TariffType;
  lessonsTotal: number;
  lessonsUsed: number;
  validFrom: string;
  validTo: string;
  history: { date: string; action: string; note?: string }[];
}
