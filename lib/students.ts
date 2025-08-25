import type { StudentProfile } from "@/types/student";

export const students: StudentProfile[] = [
  {
    id: "stu1",
    name: "Иван Петров",
    directions: [
      { title: "Гитара", teacherId: "t1" },
      { title: "Вокал", teacherId: "t2" },
    ],
  },
  {
    id: "stu2",
    name: "Анна Смирнова",
    directions: [
      { title: "Фортепиано", teacherId: "t1" },
    ],
  },
];
