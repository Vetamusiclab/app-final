import ScheduleTable from "@/components/student/ScheduleTable";

export default function StudentSchedule(){
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Расписание</h2>
      <ScheduleTable studentId="stu1" />
    </div>
  );
}
