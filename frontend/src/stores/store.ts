import { MenuEnum } from '@/enums';
import { create } from 'zustand'

interface provifyStore {
  panel: string,
  setPanel: (panel: string) => void
}

const useStore = create<provifyStore>()(set => ({
  panel: MenuEnum.MY_PROOFS,
  setPanel: panel => set(() => ({ panel })),
}));

export default useStore;