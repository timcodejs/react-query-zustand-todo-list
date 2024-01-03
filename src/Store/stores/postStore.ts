import { create } from 'zustand';

interface ModuleData {
  handler: any;
  actions: {
    setHandler: (e: any) => void;
  };
}

const usePostStore = create<ModuleData>((set, get) => ({
  handler: {},
  actions: {
    setHandler: (handler) => set(() => ({ handler: handler })),
  },
}));

export const usePostActions = () => usePostStore((store) => store.actions);
export const usePostHandler = () => usePostStore((store) => store.handler);
export const getPostState = () => usePostStore.getState();
