import { create } from 'zustand';

interface ModuleData {
  handler: any;
  setHandler: (e: any) => void;
}

type ModuleDataStore = ModuleData & {};

export const usePostStore = create<ModuleDataStore>((set) => ({
  handler: {},
  setHandler: (handler) => set(() => ({ handler: handler })),
}));
