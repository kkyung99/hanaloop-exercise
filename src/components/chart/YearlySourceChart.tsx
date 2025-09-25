import { Company } from '@/types/company';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from 'recharts';

interface YearlySourceChartProps {
  company: Company;
}

export default function YearlySourceChart({ company }: YearlySourceChartProps) {
  const allYears = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth.split('-')[0])),
  )
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, 2)
    .reverse();

  const allSource = Array.from(new Set(company.emissions.map((e) => e.source)));

  const yearlyData = allYears.map((year) => ({
    year,
    sources: allSource.map((source) => {
      const sum = company.emissions
        .filter((e) => e.yearMonth.startsWith(year) && e.source === source)
        .reduce((acc, e) => acc + e.emissions, 0);
      return { name: source, value: sum };
    }),
  }));

  const sourceColorMap: Record<string, string> = {
    diesel: '#82ca9d',
    gasoline: '#57a6ff',
    lpg: '#f6c23e',
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-md font-semibold mb-3">
        {allYears[0]} ~ {allYears[allYears.length - 1]}년 연료별 배출량 비교
      </h3>
      <div className="flex justify-around items-center h-full">
        {yearlyData.map((yearItem) => (
          <div key={yearItem.year} className="w-1/2 h-full">
            <h4 className="text-sm font-semibold mb-2 text-center">
              {yearItem.year}년
            </h4>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={yearItem.sources}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={70}
                  label={({ name, percent }: PieLabelRenderProps) =>
                    `${name} ${((percent as number) * 100).toFixed(0)}%`
                  }
                >
                  {yearItem.sources.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={sourceColorMap[entry.name] ?? 'var(--color-gray)'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value}톤`,
                    name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}
