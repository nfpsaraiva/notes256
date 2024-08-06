import { useSupabase } from "@/contexts";
import { NoteType, Path } from "@/enums";
import { Note, WebNote } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWebUser from "./useWebUser";
import NewNote from "@/types/NewNote";

const useWebNotes = () => {
  const supabase = useSupabase();
  const { user } = useWebUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: notes, isLoading, refetch } = useQuery({
    queryKey: ["web-notes", user],
    queryFn: async () => {
      if (user === null) return [];

      const { data: notes } = await supabase
        .from('notes')
        .select('id, title, description, created_at')
        .eq('user_id', user?.id);

      if (notes === null) return [];

      return notes.map(note => ({
        id: note.id,
        name: note.title,
        description: note.description,
        date: note.created_at,
        type: NoteType.WEB
      }))
    }
  })

  const {
    mutate: createNote,
    isPending: creatingNote
  } = useMutation({
    mutationFn: async ({ name, description }: NewNote) => {
      const { data: { user } } = await supabase.auth.getUser();

      await supabase
        .from('notes')
        .insert({
          title: name,
          description,
          user_id: user?.id
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["web-notes"] });
      navigate(Path.WEB_NOTES);
    }
  })

  const {
    mutate: updateNote,
    isPending: updatingNote
  } = useMutation({
    mutationFn: async (note: WebNote) => {
      await supabase
        .from('notes')
        .update({
          title: note.name,
          description: note.description,
        })
        .eq('id', note.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["web-notes"] });
      navigate(Path.WEB_NOTES)
    }
  })

  const {
    mutate: deleteNote,
    isPending: deletingNote
  } = useMutation({
    mutationFn: async (note: WebNote) => {
      return await supabase
        .from('notes')
        .delete()
        .eq('id', note.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["web-notes"] })
    }
  });

  const transferNote = async (note: Note, to: string) => { }

  const convertToLocal = async (
    note: Note,
    createLocalNote: (newNote: NewNote) => void
  ) => {
    await createLocalNote({ name: note.name, description: note.description });
    await deleteNote(note);
    navigate(Path.LOCAL_NOTES);
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (note: NewNote) => void
  ) => {
    await createBlockNote({ name: note.name, description: note.description });
    await deleteNote(note);
    navigate(Path.BLOCK_NOTES);
  }

  return {
    notes,
    isLoading: isLoading || creatingNote || deletingNote,
    refetch,
    createNote,
    creatingNote,
    updateNote,
    deleteNote,
    transferNote,
    convertToBlock,
    convertToLocal
  }
}

export default useWebNotes;