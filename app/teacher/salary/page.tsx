// app/teacher/salary/page.tsx
import SalaryCalculator from '@/components/teacher/SalaryCalculator';

export default function TeacherSalaryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Калькулятор зарплаты</h1>
      <div>
        <SalaryCalculator />
      </div>
    </div>
  );
}
