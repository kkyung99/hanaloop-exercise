'use client';

import { useEffect, useState } from 'react';
import { useCompanyStore } from '@/store/companyStore';
import { Company } from '@/types/company';
import MonthlyEmissionsCard from './card/MonthlyEmissionsCard';
import YearlySourceCard from './card/YearlySourceCard';
import DropdownMenu from './dropdown/DropdownMenu';

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
        <h2 className="text-2xl font-bold text-center align-center">
          대시보드
        </h2>
        <DropdownMenu
          companies={companies}
          selectedCompany={selectedCompany}
          onSelect={setSelectedCompany}
        />
      </div>

      {selectedCompany && (
        <div key={selectedCompany.id} className="space-y-4">
          <hr className="border-t border-gray-medium mb-4" />
          <h3 className="text-xl font-semibold text-blue">
            {selectedCompany.name}
          </h3>
          <MonthlyEmissionsCard company={selectedCompany} />
          <YearlySourceCard company={selectedCompany} />
        </div>
      )}
    </div>
  );
}
