// lib/users.ts
import type { User } from "@/types/user";

export const demoUsers: User[] = [
  { id: "stu1", role: "student", name: "Иван Петров", email: "ivan@example.com", directions: ["Гитара", "Вокал"] },
  { id: "stu2", role: "student", name: "Анна Смирнова", email: "anna@example.com", directions: ["Фортепиано"] },
  { id: "t1", role: "teacher", name: "Вета Гулливер", email: "veta@example.com" },
  { id: "t2", role: "teacher", name: "Мария Иванова", email: "maria@example.com" },
  { id: "admin", role: "admin", name: "Администратор", email: "admin@example.com" },
];
