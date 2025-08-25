import Link from "next/link";

export default function StudentCard({ id, name, directions }:{ id: string; name: string; directions: string[] }){
  return (
    <div className="card">
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-black/60">{directions.join(", ")}</div>
      <div className="mt-3">
        <Link href={`/teacher/students/${id}`} className="btn btn-primary">Открыть</Link>
      </div>
    </div>
  );
}
