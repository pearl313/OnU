import api from '@/apis/config';
import { useStorage } from '@/apis/hooks';
import { AxiosResponse } from 'axios';
import { create } from 'zustand';

export const useUserStore = create<UserStore>((set) => ({
  id: Number.parseInt(useStorage('userId') as string),

  initialize: () => {
    const user: IUser = {
      id: Number.parseInt(localStorage.getItem('userId') as string),
      nickname: localStorage.getItem('userNickname') as string,
      gender: localStorage.getItem('userGender') as string,
      age: Number.parseInt(localStorage.getItem('userAge') as string),
    };
    set((x) => ({ ...x, user }));
  },

  setUser: (user: IUser) => set((x) => ({ ...x, user })),
  resetUser: () => {
    localStorage.clear();
    set((x) => ({ ...x, user: undefined }));
  },
}));

export default useUserStore;
