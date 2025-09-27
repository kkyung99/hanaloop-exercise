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

// KPI Card에서 사용하는 데이터
export function getLatestMonth(company: Company) {
  const months = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth)),
  ).sort((a, b) => b.localeCompare(a));

  return months[0];
}

export function getPreviousMonth(company: Company) {
  const months = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth)),
  ).sort((a, b) => b.localeCompare(a));

  const result = months.length > 1 ? months[1] : undefined;
  return result;
}

export function getCurrentMonthTotal(company: Company) {
  const latestMonth = getLatestMonth(company);
  const result = company.emissions
    .filter((e) => e.yearMonth === latestMonth)
    .reduce((sum, e) => sum + e.emissions, 0);

  return result;
}

export function getMonthlyChange(company: Company) {
  const current = getCurrentMonthTotal(company);
  const previousMonth = getPreviousMonth(company);

  const previous = company.emissions
    .filter((e) => e.yearMonth === previousMonth)
    .reduce((sum, e) => sum + e.emissions, 0);

  const change = ((current - previous) / previous) * 100;

  return parseFloat(change.toFixed(2));
}

export function getYearlyTotal(company: Company) {
  const years = Array.from(
    new Set(company.emissions.map((e) => e.yearMonth.split('-')[0])),
  ).sort((a, b) => parseInt(b) - parseInt(a));

  const latestYear = years[0];
  const result = company.emissions
    .filter((e) => e.yearMonth.startsWith(latestYear))
    .reduce((sum, e) => sum + e.emissions, 0);

  return result;
}

export function getTopSource(company: Company) {
  const latestMonth = getLatestMonth(company);
  const monthlyEmissions = company.emissions.filter(
    (e) => e.yearMonth === latestMonth,
  );

  const topSource = monthlyEmissions.reduce(
    (max, curr) => (curr.emissions > max.emissions ? curr : max),
    monthlyEmissions[0],
  );

  return topSource.source;
}
