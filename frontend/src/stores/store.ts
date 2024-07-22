import { create } from 'zustand';

interface provifyStore {
  proofId: string,
  setProofId: (proofId: string) => void,
}

const useStore = create<provifyStore>()(set => ({
  proofId: '',
  setProofId: proofId => set(() => ({ proofId }))

}));

export default useStore;