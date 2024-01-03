import { create } from 'zustand';

interface ModuleData {
  kakaoToken: boolean;
  naverToken: boolean;
  accessToken: string;
  setKakaoToken: (e: boolean) => void;
  setNaverToken: (e: boolean) => void;
  setAccessToken: (e: string) => void;
}

export const useAuthStore = create<ModuleData>((set, get) => ({
  kakaoToken: false,
  naverToken: false,
  accessToken: '',
  setKakaoToken: (kakaoToken) => set(() => ({ kakaoToken: kakaoToken })),
  setNaverToken: (naverToken) => set(() => ({ naverToken: naverToken })),
  setAccessToken: (accessToken) => set(() => ({ accessToken: accessToken })),
}));
