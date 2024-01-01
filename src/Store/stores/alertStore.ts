import { create } from 'zustand';

interface ModuleData {
  alertText: string;
  actions: {
    setAlertText: (e: string) => void;
  };
}

const useAlertStore = create<ModuleData>((set, get) => ({
  alertText: '',
  actions: {
    setAlertText: (alertText) => set(() => ({ alertText: alertText })),
  },
}));

export const useAlertActions = () => useAlertStore((store) => store.actions);
export const useAlertText = () => useAlertStore((store) => store.alertText);
export const getAlerttState = () => useAlertStore.getState();
