'use client';
import React, { useState } from 'react';
import Select from '@/components/ui/Select';

const SubscriptionPage = () => {
  const directions = ['Гитара', 'Вокал', 'Фортепиано', 'Барабаны'];
  const [selected, setSelected] = useState(directions[0]);

  const subscriptions = {
    Гитара: 'Light — 1 занятие в неделю',
    Вокал: 'Intensive — 2 занятия в неделю',
    Фортепиано: 'Light — 1 занятие в неделю',
    Барабаны: 'Intensive — 2 занятия в неделю',
  };

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
