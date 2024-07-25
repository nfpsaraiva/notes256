import { create } from 'zustand';

interface provifyStore {
  noteId: string,
  setNoteId: (noteId: string) => void,
}

const useStore = create<provifyStore>()(set => ({
  noteId: '',
  setNoteId: noteId => set(() => ({ noteId }))

}));

export default useStore;