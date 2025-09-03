// types/session.ts
export type SessionStatus = 'free' | 'booked' | 'cancelled';

export type Session = {
  id: string;
  teacherId: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  status: SessionStatus;
  studentId?: string;
  createdAt?: string;
};
