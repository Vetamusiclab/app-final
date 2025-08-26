'use client';
import React, { useState } from 'react';
import Select from '@/components/ui/Select';

const directions = ['Гитара', 'Вокал', 'Фортепиано', 'Барабаны'] as const;
type Direction = (typeof directions)[number];

const subscriptions: Record<Direction, string> = {
  Гитара: 'Light — 1 занятие в неделю',
  Вокал: 'Intensive — 2 занятия в неделю',
  Фортепиано: 'Light — 1 занятие в неделю',
  Барабаны: 'Intensive — 2 занятия в неделю',
};

const SubscriptionPage = () => {
  const [selected, setSelected] = useState<Direction>(directions[0]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Абонемент</h1>
      {directions.length > 1 && (
        <Select options={directions} value={selected} onChange={setSelected} />
      )}
      <div className="mt-4">
        <p>Ваш абонемент: {subscriptions[selected]}</p>
      </div>
    </div>
  );
};

export default SubscriptionPage;

  );
};

export default SubscriptionPage;
