'use client';

import { useEffect, useState } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { Company } from '@/types/company';
import MonthlyEmissionsCard from './card/MonthlyEmissionsCard';
import YearlySourceCard from './card/YearlySourceCard';
import KPICard from './card/KPICard';
import DropdownMenu from './dropdown/DropdownMenu';
import {
  getLatestMonth,
  getCurrentMonthTotal,
  getMonthlyChange,
  getYearlyTotal,
  getTopSource,
} from '@/lib/emissionsCalc';

export default function Dashboard() {
  const { companies, loading, error, fetchCompanies } = useCompanyStore();

  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    if (companies.length > 0 && !selectedCompany)
      setSelectedCompany(companies[0]);
  }, [companies, selectedCompany]);

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
      <div className="flex space-x-6 items-center mb-4">
        <label className="text-lg font-medium text-gray-dark/50">회사 선택</label>
        <DropdownMenu
          companies={companies}
          selectedCompany={selectedCompany}
          onSelect={setSelectedCompany}
        />
      </div>

      {selectedCompany && (
        <div key={selectedCompany.id} className="space-y-4">
          <hr className="border-t border-gray-medium mb-4" />
          <h3 className="text-3xl font-semibold text-blue">
            {selectedCompany.name}
          </h3>
          <div className="mb-2 text-gray-500/80 text-sm pl-1">
            {getLatestMonth(selectedCompany)} 기준
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <KPICard
              title="이번 달 총 배출량"
              value={`${getCurrentMonthTotal(selectedCompany)}톤`}
              color="blue"
            />
            <KPICard
              title="전월 대비 변화"
              value={`${getMonthlyChange(selectedCompany)}%`}
              change={getMonthlyChange(selectedCompany)}
              color={
                getMonthlyChange(selectedCompany) > 0
                  ? 'red'
                  : getMonthlyChange(selectedCompany) < 0
                    ? 'green'
                    : 'blue'
              }
            />
            <KPICard
              title="연간 누적량"
              value={`${getYearlyTotal(selectedCompany)}톤`}
              color="purple"
            />
            <KPICard
              title="주요 배출원"
              value={getTopSource(selectedCompany)}
              color="orange"
            />
          </div>

          <MonthlyEmissionsCard company={selectedCompany} />
          <YearlySourceCard company={selectedCompany} />
        </div>
      )}
    </div>
  );
}
