export type TutorLevel = 'Basic' | 'Progressive' | 'Prive';

export const Tariffs = {
  Basic: {
    Light: { '45': 2200, '60': 2500, pair60: 3200, kids30: 1400, group45: 900 },
    Intensive: { '45': 2400, '60': 2700, pair60: 3600, kids30: 1700, group45: 1200 },
    OneTime: { '45': 3800, '60': 4400 },
    Trial: { any: 900 },
  },
  Progressive: {
    Light: { '45': 2800, '60': 3400, pair60: 4100, kids30: 2000, group45: 900 },
    Intensive: { '45': 3000, '60': 3600, pair60: 4500, kids30: 2300, group45: 1200 },
    OneTime: { '45': 4700, '60': 5300 },
    Trial: { any: 1500 },
  },
  Prive: {
    Light: { '60': 3600, pair60: 5100 },
    Intensive: { '60': 3900, pair60: 5500 },
    OneTime: { '60': 6000 },
    Trial: { any: 1800 },
  },
} as const;
