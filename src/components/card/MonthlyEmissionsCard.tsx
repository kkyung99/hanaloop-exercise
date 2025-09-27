import { Company } from '@/types/company';
import MonthlyEmissionsChart from '../chart/MonthlyEmissionsChart';
import { calcMonthlyData, getRecentYears } from '@/lib/emissionsCalc';

interface MonthlyEmissionCardProps {
  company: Company;
}

export default function MonthlyEmissionCard({
  company,
}: MonthlyEmissionCardProps) {
  const monthlyData = calcMonthlyData(company);
  const recentYears = getRecentYears(company);

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4" style={{ boxShadow: '0 3px 7px rgba(0,0,0,0.25)' }}>
      <h3 className="text-md font-semibold mb-3">
        {recentYears[0]}년 ~ {recentYears[recentYears.length - 1]}년 월별 총
        배출량 비교
      </h3>
      <MonthlyEmissionsChart
        monthlyData={monthlyData}
        recentYears={recentYears}
      />
    </div>
  );
}
