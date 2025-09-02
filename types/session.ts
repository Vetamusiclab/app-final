// types/session.ts
export type SessionStatus = 'free' | 'booked' | 'cancelled';

export type Session = {
  id: string;
  teacherId: string;
  studentId?: string | null;
  title: string;
  start: string; // ISO datetime
  end: string;   // ISO datetime
  status: SessionStatus;
  createdAt?: string;
};
