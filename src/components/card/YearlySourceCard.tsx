import { Company } from '@/types/company';
import YearlySourceChart from '../chart/YearlySourceChart';
import { calcYearlySourceData, getRecentYears } from '@/lib/emissionsCalc';

interface YearlySourceCardProps {
  company: Company;
}

export default function YearlySourceCard({ company }: YearlySourceCardProps) {
    const yearlyData = calcYearlySourceData(company);
    const recentYears = getRecentYears(company);

  const sourceColorMap: Record<string, string> = {
    diesel: '#82ca9d',
    gasoline: '#57a6ff',
    lpg: '#f6c23e',
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-md font-semibold mb-3">
        {recentYears[0]} ~ {recentYears[recentYears.length - 1]}년 연료별 배출량 비교
      </h3>
      <YearlySourceChart
        yearlyData={yearlyData}
        sourceColorMap={sourceColorMap}
      />
    </div>
  );
}
