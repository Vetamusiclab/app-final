export interface StudentProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  directions: { title: string; teacherId: string }[];
}
