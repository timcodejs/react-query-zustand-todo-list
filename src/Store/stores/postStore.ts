import { create } from 'zustand';

interface ModuleData {
  handler: any;
  setHandler: (e: any) => void;
}

export const usePostStore = create<ModuleData>((set, get) => ({
  handler: {},
  setHandler: (handler) => set(() => ({ handler: handler })),
}));
