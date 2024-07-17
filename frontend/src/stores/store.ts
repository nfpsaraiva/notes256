import { MenuEnum } from '@/enums';
import { create } from 'zustand'

interface provifyStore {
  panel: string,
  proofId: string,
  setPanel: (panel: string) => void,
  setProofId: (proofId: string) => void,
}

const useStore = create<provifyStore>()(set => ({
  panel: MenuEnum.MY_PROOFS,
  proofId: '',
  setPanel: panel => set(() => ({ panel })),
  setProofId: proofId => set(() => ({ proofId }))

}));

export default useStore;