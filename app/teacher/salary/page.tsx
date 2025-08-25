import SalaryCalculator from "@/components/teacher/SalaryCalculator";

export default function SalaryPage(){
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Зарплата</h2>
      <SalaryCalculator />
    </div>
  );
}
