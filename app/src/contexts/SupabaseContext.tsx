import { createContext, useContext, useMemo, ReactNode, FC, useState, useEffect } from 'react';
import { AuthResponse, createClient, OAuthResponse, PostgrestSingleResponse, User } from '@supabase/supabase-js';
import { Note, WebNote } from '@/types';
import { NoteType } from '@/enums';

interface SupabaseProviderProps {
  children: ReactNode;
}

interface Supabase {
  user: User | null,
  signup: (email: string, password: string) => Promise<AuthResponse>,
  signin: (email: string, password: string) => Promise<AuthResponse>,
  signout: () => Promise<void>,
  notes: WebNote[],
  isLoading: boolean,
  isConnecting: boolean,
  creatingNote: boolean,
  refetch: () => Promise<void>,
  createNote: (name: string, description: string) => Promise<PostgrestSingleResponse<null>>,
  updateNote: (note: Note) => Promise<PostgrestSingleResponse<null>>
  deleteNote: (note: Note) => Promise<PostgrestSingleResponse<null>>
}

const SupabaseContext = createContext<Supabase | null>(null);

export const SupabaseProvider: FC<SupabaseProviderProps> = ({
  children
}: SupabaseProviderProps) => {
  const supabase = useMemo(() => createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ), []);


  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<WebNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [creatingNote, setCreatingNote] = useState(false);

  const signup = async (email: string, password: string) => {
    setIsConnecting(true);

    const response = await supabase.auth.signUp({
      email,
      password,
    });

    await init();

    setIsConnecting(false);

    return response;
  }

  const signin = async (email: string, password: string) => {
    setIsConnecting(true);

    const response = await supabase.auth.signInWithPassword({
      email,
      password
    })

    await init();

    setIsConnecting(false);

    return response;
  }

  const signout = async () => {
    await supabase.auth.signOut();
    await init();
  }

  const init = async () => {
    setIsLoading(true);
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      setUser(null);
      setNotes([]);
      setIsLoading(false);
      return;
    }

    const { user } = data.session;
    setUser(user);

    const { data: notes } = await supabase
      .from('notes')
      .select('id, title, description, created_at')
      .eq('user_id', user.id);

    if (!notes) {
      setNotes([]);
      setIsLoading(false);
      return;
    }

    const webNotes = notes.map(note => ({
      id: note.id,
      name: note.title,
      description: note.description,
      date: note.created_at,
      type: NoteType.WEB
    }))

    setNotes(webNotes);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const createNote = async (title: string, description: string) => {
    setCreatingNote(true);

    const response = await supabase
      .from('notes')
      .insert({
        title,
        description,
        user_id: user?.id
      });

    await init();

    setCreatingNote(false);

    return response;
  }

  const updateNote = async (note: Note) => {
    setCreatingNote(true);

    const response = await supabase
      .from('notes')
      .update({
        title: note.name,
        description: note.description,
      })
      .eq('id', note.id);

    await init();

    setCreatingNote(false);

    return response;
  }

  const deleteNote = async (note: Note) => {
    setCreatingNote(true);

    const response = await supabase
      .from('notes')
      .delete()
      .eq('id', note.id);

    await init();

    setCreatingNote(false);

    return response;
  }

  return (
    <SupabaseContext.Provider value={{
      user,
      signup,
      signin,
      signout,
      notes,
      isLoading,
      isConnecting,
      creatingNote,
      refetch: init,
      createNote,
      updateNote,
      deleteNote
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): Supabase => {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error('useSupabase must be used within an SupabaseProvider');
  }
  return context;
};
