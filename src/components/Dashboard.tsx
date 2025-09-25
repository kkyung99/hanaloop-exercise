'use client';

import { useEffect } from 'react';
import MonthlyEmissionsChart from './chart/MonthlyEmissionsChart';
import { useCompanyStore } from '@/store/companyStore';
import YearlySourceChart from './chart/YearlySourceChart';

export default function Dashboard() {
  const { companies, loading, error, fetchCompanies } = useCompanyStore();

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (loading) {
    return (
      <div className="p-4 h-full flex items-center justify-center bg-gray-100/50">
        <div className="text-lg font-medium">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 h-full flex items-center justify-center bg-gray-100/50">
        <div className="text-lg text-red-500 font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-light space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">대시보드</h2>

      {companies.map((company) => (
        <div key={company.id} className="space-y-4">
        <hr className="border-t border-gray-medium mb-4" />
          <h3 className="text-xl font-semibold text-blue">{company.name}</h3>
          <MonthlyEmissionsChart company={company} />
          <YearlySourceChart company={company} />
        </div>
      ))}
    </div>
  );
}
