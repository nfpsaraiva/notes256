import { useSupabase } from "@/contexts";
import { NoteType, Path } from "@/enums";
import { Note, TransferedNote, WebNote } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useWebUser from "./useWebUser";
import NewNote from "@/types/NewNote";
import { ConvertModal, DeleteModal } from "@/modals";

const useWebNotes = () => {
  const supabase = useSupabase();
  const { user } = useWebUser();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: notes, isLoading, refetch } = useQuery({
    queryKey: ["web-notes", user],
    queryFn: async () => {
      if (user === undefined || user === null) return [];

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
        type: NoteType.WEB,
        owner: user.id.toString()
      }))
    }
  })

  const {
    mutateAsync: createNote,
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
    mutate: deleteNoteMutation,
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

  const deleteNote = (note: Note) => {
    DeleteModal(() => deleteNoteMutation(note))
  }
  const transferNote = async (transferNote: TransferedNote) => { }

  const convertToLocal = async (
    note: Note,
    createLocalNote: (newNote: NewNote) => void
  ) => {
    ConvertModal(note, async () => {
      await createLocalNote({ name: note.name, description: note.description });
      await deleteNoteMutation(note);
      navigate(Path.LOCAL_NOTES);
    });
  }

  const convertToBlock = async (
    note: Note,
    createBlockNote: (note: NewNote) => void
  ) => {
    ConvertModal(note, async () => {
      await createBlockNote({ name: note.name, description: note.description });
      await deleteNoteMutation(note);
      navigate(Path.BLOCK_NOTES);
    })
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
    transferingNote: false,
    convertToBlock,
    convertToLocal
  }
}

export default useWebNotes;