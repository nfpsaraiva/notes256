import { create } from 'zustand'

interface provifyStore {
  panel: string,
  setPanel: (panel: string) => void
}

const useStore = create<provifyStore>()(set => ({
  panel: 'home',
  setPanel: panel => set(() => ({ panel })),
}));

export default useStore;