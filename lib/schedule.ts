import type { Lesson } from "@/types/schedule";

export const lessons: Lesson[] = [
  {
    id: "l1",
    studentId: "stu1",
    teacherId: "t1",
    direction: "Гитара",
    start: "2025-08-25T16:00:00+03:00",
    end: "2025-08-25T16:45:00+03:00",
    comment: "Арпеджио и переборы",
  },
  {
    id: "l2",
    studentId: "stu1",
    teacherId: "t2",
    direction: "Вокал",
    start: "2025-08-27T18:00:00+03:00",
    end: "2025-08-27T19:00:00+03:00",
  },
  {
    id: "l3",
    studentId: "stu2",
    teacherId: "t1",
    direction: "Фортепиано",
    start: "2025-08-26T17:00:00+03:00",
    end: "2025-08-26T17:45:00+03:00",
    comment: "Гаммы до 2 знаков",
  },
];
