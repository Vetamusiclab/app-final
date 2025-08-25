import { subscriptions } from "@/lib/subscriptions";

export default function StudentSubscription(){
  const sub = subscriptions[0];
  const left = sub.lessonsTotal - sub.lessonsUsed;
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Абонемент</h2>
      <div className="card">
        <div className="text-sm text-black/60">{sub.month}</div>
        <div className="text-xl font-semibold">{sub.tariffType}</div>
        <div className="mt-2">Занятий осталось: <b>{left}</b> из {sub.lessonsTotal}</div>
        <div className="text-sm text-black/60 mt-1">Действует: {sub.validFrom} — {sub.validTo}</div>
      </div>
    </div>
  );
}
