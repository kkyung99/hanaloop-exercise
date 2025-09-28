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

interface MonthlyEmissionsChartProps {
  monthlyData: Array<{ month: string; [key: string]: number | string }>;
  recentYears: string[];
}

export default function MonthlyEmissionsChart({
  monthlyData,
  recentYears,
}: MonthlyEmissionsChartProps) {

  return (
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
            fill={i === 0 ? '#3b82f6' : '#10b981'}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
