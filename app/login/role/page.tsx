import RoleCard from "@/components/auth/RoleCard";

export default function RolePage(){
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <RoleCard icon="🎓" title="Ученик" href="/login/student" />
      <RoleCard icon="🎹" title="Преподаватель" href="/login/teacher" />
      <RoleCard icon="🛠️" title="Админ" href="/login/admin" />
    </div>
  );
}
