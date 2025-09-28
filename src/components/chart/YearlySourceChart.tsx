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
  yearlyData: Array<{
    year: string;
    sources: Array<{ name: string; value: number }>;
  }>;
  sourceColorMap: Record<string, string>;
}

export default function YearlySourceChart({
  yearlyData,
}: YearlySourceChartProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-around items-center h-full">
      {yearlyData.map((yearItem) => (
        <div key={yearItem.year} className="w-full sm:w-1/2 h-full">
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
                    fill={
                      entry.name === 'gasoline'
                        ? '#3b82f6'
                        : entry.name === 'diesel'
                          ? '#10b981'
                          : entry.name === 'lpg'
                            ? '#f59e0b'
                            : '#6b7280'
                    }
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
  );
}
