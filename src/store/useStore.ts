import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';
import type { User, DataEntry, Country } from '../types';

interface Store {
  user: User | null;
  data: DataEntry[];
  countries: Country[];
  setUser: (user: User | null) => void;
  setCountry: (country: string) => void;
  addData: (data: Omit<DataEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateData: (id: string, data: Partial<DataEntry>) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  fetchData: () => Promise<void>;
}

const mockCountries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      data: [],
      countries: mockCountries,
      setUser: (user) => set({ user }),
      setCountry: async (country) => {
        const { user } = get();
        if (user) {
          await api.updateUserCountry(user.id, country);
          set({ user: { ...user, country } });
          const { fetchData } = get();
          await fetchData();
        }
      },
      addData: async (newData) => {
        const { user } = get();
        if (!user) return;
        
        const response = await api.createData({
          ...newData,
          country: user.country,
        });
        
        set((state) => ({
          data: [...state.data, response],
        }));
      },
      updateData: async (id, newData) => {
        const response = await api.updateData(id, newData);
        set((state) => ({
          data: state.data.map((item) =>
            item.id === id ? { ...item, ...response } : item
          ),
        }));
      },
      deleteData: async (id) => {
        await api.deleteData(id);
        set((state) => ({
          data: state.data.filter((item) => item.id !== id),
        }));
      },
      fetchData: async () => {
        const { user } = get();
        if (!user) return;
        
        const data = await api.getData(user.country);
        set({ data });
      },
    }),
    {
      name: 'multi-country-store',
    }
  )
);