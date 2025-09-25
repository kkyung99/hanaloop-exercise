'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Company } from '@/types/company';

interface MonthlyEmissionsChartProps {
  company: Company;
}

export default function MonthlyEmissionsChart({
  company,
}: MonthlyEmissionsChartProps) {
  const allYears = Array.from(
    new Set(
      company.emissions.map((emission) => emission.yearMonth.split('-')[0]),
    ),
  );
  const recentYears = allYears
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, 2)
    .reverse();

  const allMonths = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth.split('-')[1])),
  );
  const months = allMonths.sort((a, b) => parseInt(a) - parseInt(b));

  const monthlyData = months.map((month) => {
    const data: { month: string; [key: string]: number | string } = {
      month,
    };

    recentYears.forEach((year) => {
      const yearMonth = `${year}-${month}`;
      const monthlyEmissions = company.emissions
        .filter((e) => e.yearMonth === yearMonth)
        .reduce((sum, e) => sum + e.emissions, 0);

      data[year] = monthlyEmissions;
    });

    return data;
  });

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-md font-semibold mb-3">
        {recentYears[0]}년 ~ {recentYears[recentYears.length - 1]}년 월별 총
        배출량 비교
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={monthlyData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(v) => `${parseInt(v)}월`} />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}톤`, name]}
            labelFormatter={(label) => `${parseInt(label)}월`}
            contentStyle={{
              backgroundColor: '#ffffff',
              fontWeight: 'bold',
            }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
          />
          <Legend />
          {recentYears.map((year, i) => (
            <Bar
              key={year}
              dataKey={year}
              name={`${year}년`}
              fill={i === 0 ? '#f6c23e' : '#57a6ff'}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
