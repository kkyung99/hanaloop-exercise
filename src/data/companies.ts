import { Company } from '@/types/company';
export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', emissions: 120 },
      { yearMonth: '2024-02', emissions: 110 },
      { yearMonth: '2024-03', emissions: 95 },
    ],
  },
  {
    id: 'c2',
    name: 'Globex',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', emissions: 80 },
      { yearMonth: '2024-02', emissions: 105 },
      { yearMonth: '2024-03', emissions: 120 },
    ],
  },
];
