import { Note } from '@/types';
import { createContext, useContext, ReactNode, FC, useState, useEffect } from 'react';
import userbase, { Item, UserResult } from 'userbase-js';

interface UserbaseProviderProps {
  children: ReactNode;
}

interface Userbase {
  user: UserResult | null,
  signin: (username: string, password: string) => Promise<UserResult>
  signout: () => Promise<void>,
  signup: (username: string, password: string) => Promise<UserResult>,
  notes: Note[] | null,
  createNote: (note: Note) => Promise<void>,
  updateNote: (note: Note) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>,
  isLoadingActiveNotes: boolean
}

const UserbaseContext = createContext<Userbase | null>(null);

const databaseName = import.meta.env.VITE_USERBASE_DATABASE_NAME;

export const UserbaseProvider: FC<UserbaseProviderProps> = ({
  children
}: UserbaseProviderProps) => {
  const [user, setUser] = useState<UserResult | null>(null);
  const [notes, setNotes] = useState<Note[] | null>(null);

  const [isLoadingActiveNotes, setIsLoadingActiveNotes] = useState(true);

  const changeHandler = (items: Item[]) => {
    const newNotes = items.map(i => {
      const newNote: Note = i.item;
      newNote.id = i.itemId
      return newNote;
    })

    setNotes(newNotes);
    setIsLoadingActiveNotes(false);
  }


  const signup = async (username: string, password: string) => {
    const user = await userbase.signUp({ username, password })
    setUser(user);
    return user;
  }

  const signin = async (username: string, password: string) => {
    const user = await userbase.signIn({ username, password })
    setUser(user);
    return user;
  }

  const signout = async () => {
    await userbase.signOut();
    setUser(null);
  }

  const createNote = async (item: Note) => {
    return await userbase.insertItem({ databaseName, item });
  }

  const updateNote = async (item: Note) => {
    return await userbase.updateItem({ databaseName, itemId: item.id, item });
  }

  const deleteNote = async (item: Note) => {
    return await userbase.deleteItem({ databaseName, itemId: item.id });
  }

  useEffect(() => {
    userbase.init({ appId: import.meta.env.VITE_USERBASE_APP_ID }).then(session => {
      if (session.user) {
        setUser(session.user);
        userbase.openDatabase({ databaseName, changeHandler });
      } else {
        setIsLoadingActiveNotes(false);
      }
    });
  }, []);

  return (
    <UserbaseContext.Provider value={{
      user,
      signin,
      signout,
      signup,
      notes,
      createNote,
      updateNote,
      deleteNote,
      isLoadingActiveNotes,
    }}>
      {children}
    </UserbaseContext.Provider>
  );
};

export const useUserbase = (): Userbase => {
  const context = useContext(UserbaseContext);
  if (context === null) {
    throw new Error('useUserbase must be used within an UserbaseProvider');
  }
  return context;
};
