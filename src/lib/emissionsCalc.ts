import { Company } from '@/types/company';

export function getRecentYears(company: Company) {
  const recentYears = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth.split('-')[0])),
  )
    .sort((a, b) => parseInt(b) - parseInt(a))
    .slice(0, 2)
    .reverse();

  return recentYears;
}

export function calcMonthlyData(company: Company) {
  const months = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth.split('-')[1])),
  ).sort((a, b) => parseInt(a) - parseInt(b));

  const recentYears = getRecentYears(company);

  const monthlyData = months.map((month) => {
    const data: { month: string; [key: string]: number | string } = { month };
    recentYears.forEach((year) => {
      const yearMonth = `${year}-${month}`;
      const monthlyEmissions = company.emissions
        .filter((e) => e.yearMonth === yearMonth)
        .reduce((sum, e) => sum + e.emissions, 0);
      data[year] = monthlyEmissions;
    });
    return data;
  });

  return monthlyData;
}

export function calcYearlySourceData(company: Company) {
  const recentYears = getRecentYears(company);

  const allSource = Array.from(new Set(company.emissions.map((e) => e.source)));

  const yearlyData = recentYears.map((year) => ({
    year,
    sources: allSource.map((source) => {
      const sum = company.emissions
        .filter((e) => e.yearMonth.startsWith(year) && e.source === source)
        .reduce((acc, e) => acc + e.emissions, 0);
      return { name: source, value: sum };
    }),
  }));
  return yearlyData;
}
