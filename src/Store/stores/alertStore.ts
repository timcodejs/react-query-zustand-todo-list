import { create } from 'zustand';

interface ModuleData {
  alertText: string;
  setAlertText: (e: string) => void;
}

type ModuleDataStore = ModuleData & {};

export const useAlertStore = create<ModuleDataStore>((set) => ({
  alertText: '',
  setAlertText: (alertText) => set(() => ({ alertText: alertText })),
}));
