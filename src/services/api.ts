import type { DataEntry } from '../types';
import { mockData } from './mockData';

// In-memory storage for mock data
let data = [...mockData];

export const api = {
  // GET /api/data - Fetch data filtered by user's country
  async getData(country: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return data.filter(entry => entry.country === country);
  },

  // POST /api/data - Create new data entry
  async createData(newData: Omit<DataEntry, 'id' | 'createdAt' | 'updatedAt'>) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const entry: DataEntry = {
      ...newData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.push(entry);
    return entry;
  },

  // PUT /api/data/:id - Update existing data entry
  async updateData(id: string, updates: Partial<DataEntry>) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = data.findIndex(entry => entry.id === id);
    if (index === -1) throw new Error('Entry not found');
    
    const updatedEntry = {
      ...data[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    data[index] = updatedEntry;
    return updatedEntry;
  },

  // DELETE /api/data/:id - Delete data entry
  async deleteData(id: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = data.findIndex(entry => entry.id === id);
    if (index === -1) throw new Error('Entry not found');
    
    data = data.filter(entry => entry.id !== id);
    return { success: true };
  },

  // POST /api/user/country - Save user's country selection
  async updateUserCountry(userId: string, country: string) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { userId, country };
  },
};