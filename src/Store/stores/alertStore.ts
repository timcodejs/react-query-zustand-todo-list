import { create } from 'zustand';

interface ModuleData {
  alertText: string;
  setAlertText: (e: string) => void;
}

export const useAlertStore = create<ModuleData>((set, get) => ({
  alertText: '',
  setAlertText: (alertText) => set(() => ({ alertText: alertText })),
}));
