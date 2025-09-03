// types/schedule.ts
export type Slot = {
  id: string;
  timeISO: string;   // 'YYYY-MM-DDTHH:mm' или полноценный ISO
  booked: boolean;
};

export type SlotsResponse = {
  teacherId: string;
  slots: Slot[];
  ok: true;
};
