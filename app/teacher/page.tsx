import StudentCard from "@/components/teacher/StudentCard";

export default function TeacherHome(){
  const students = [
    { id: "stu1", name: "Иван Петров", directions: ["Гитара","Вокал"] },
    { id: "stu2", name: "Анна Смирнова", directions: ["Фортепиано"] },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map(s => <StudentCard key={s.id} {...s} />)}
    </div>
  );
}
