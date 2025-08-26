export const dynamic = "force-dynamic";

import SalaryCalculator from "@/components/teacher/SalaryCalculator";

export default function TeacherSalaryPage() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Зарплата</h2>
      <SalaryCalculator />
    </div>
  );
}
