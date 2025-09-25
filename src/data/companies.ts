import { Company } from '@/types/company';

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', source: 'diesel', emissions: 50 },
      { yearMonth: '2024-01', source: 'gasoline', emissions: 40 },
      { yearMonth: '2024-01', source: 'lpg', emissions: 30 },

      { yearMonth: '2024-02', source: 'diesel', emissions: 40 },
      { yearMonth: '2024-02', source: 'gasoline', emissions: 40 },
      { yearMonth: '2024-02', source: 'lpg', emissions: 30 },

      { yearMonth: '2024-03', source: 'diesel', emissions: 30 },
      { yearMonth: '2024-03', source: 'gasoline', emissions: 35 },
      { yearMonth: '2024-03', source: 'lpg', emissions: 30 },

      { yearMonth: '2025-01', source: 'diesel', emissions: 50 },
      { yearMonth: '2025-01', source: 'gasoline', emissions: 40 },
      { yearMonth: '2025-01', source: 'lpg', emissions: 25 },

      { yearMonth: '2025-02', source: 'diesel', emissions: 45 },
      { yearMonth: '2025-02', source: 'gasoline', emissions: 35 },
      { yearMonth: '2025-02', source: 'lpg', emissions: 25 },

      { yearMonth: '2025-03', source: 'diesel', emissions: 40 },
      { yearMonth: '2025-03', source: 'gasoline', emissions: 35 },
      { yearMonth: '2025-03', source: 'lpg', emissions: 25 },
    ],
  },
  {
    id: 'c2',
    name: 'Globex',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', source: 'diesel', emissions: 30 },
      { yearMonth: '2024-01', source: 'gasoline', emissions: 30 },
      { yearMonth: '2024-01', source: 'lpg', emissions: 20 },

      { yearMonth: '2024-02', source: 'diesel', emissions: 40 },
      { yearMonth: '2024-02', source: 'gasoline', emissions: 35 },
      { yearMonth: '2024-02', source: 'lpg', emissions: 30 },

      { yearMonth: '2024-03', source: 'diesel', emissions: 45 },
      { yearMonth: '2024-03', source: 'gasoline', emissions: 40 },
      { yearMonth: '2024-03', source: 'lpg', emissions: 35 },

      { yearMonth: '2025-01', source: 'diesel', emissions: 35 },
      { yearMonth: '2025-01', source: 'gasoline', emissions: 30 },
      { yearMonth: '2025-01', source: 'lpg', emissions: 25 },

      { yearMonth: '2025-02', source: 'diesel', emissions: 40 },
      { yearMonth: '2025-02', source: 'gasoline', emissions: 35 },
      { yearMonth: '2025-02', source: 'lpg', emissions: 25 },

      { yearMonth: '2025-03', source: 'diesel', emissions: 45 },
      { yearMonth: '2025-03', source: 'gasoline', emissions: 40 },
      { yearMonth: '2025-03', source: 'lpg', emissions: 25 },
    ],
  },
];
