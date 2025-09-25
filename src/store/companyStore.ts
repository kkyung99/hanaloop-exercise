import { create } from 'zustand';
import { Company } from '@/types/company';
import { fetchCompanies } from '@/lib/api';

interface CompanyStore {
  companies: Company[];
  loading: boolean;
  error: string | null;
  setCompanies: (companies: Company[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchCompanies: () => Promise<void>;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  loading: true,
  error: null,

  setCompanies: (companies: Company[]) => set({ companies }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  fetchCompanies: async () => {
    set({ loading: true, error: null });
    try {
      const companies = await fetchCompanies();
      set({ companies, loading: false });
    } catch (error) {
      set({
        error: '데이터를 불러오는데 실패했습니다.',
        loading: false,
      });
      console.error('Error fetching companies:', error);
    }
  },
}));
