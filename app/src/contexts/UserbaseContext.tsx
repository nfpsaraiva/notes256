import { WebNote } from '@/types';
import { createContext, useContext, ReactNode, FC, useState, useEffect } from 'react';
import userbase, { Item, UserResult } from 'userbase-js';

interface UserbaseProviderProps {
  children: ReactNode;
}

interface Userbase {
  user: UserResult | null,
  signin: (username: string, password: string) => Promise<UserResult | null>
  signout: () => Promise<void>,
  signup: (username: string, password: string) => Promise<UserResult | null>,
  isConnecting: boolean,
  refetch: () => void,
  notes: WebNote[] | null,
  createNote: (note: WebNote) => Promise<void>,
  updateNote: (note: WebNote) => Promise<void>,
  deleteNote: (note: WebNote) => Promise<void>,
  isLoading: boolean
}

const UserbaseContext = createContext<Userbase | null>(null);

const databaseName = import.meta.env.VITE_USERBASE_DATABASE_NAME;

export const UserbaseProvider: FC<UserbaseProviderProps> = ({
  children
}: UserbaseProviderProps) => {
  const [user, setUser] = useState<UserResult | null>(null);
  const [notes, setNotes] = useState<WebNote[] | null>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const changeHandler = (items: Item[]) => {
    const newNotes = items.map(i => {
      const newNote: WebNote = i.item;
      newNote.id = i.itemId
      return newNote;
    })

    setNotes(newNotes);
    setIsLoading(false);
  }


  const signup = async (username: string, password: string) => {
    setIsConnecting(true);
    try {
      const user = await userbase.signUp({ username, password })
      setUser(user);
      userbase.openDatabase({ databaseName, changeHandler });
    } finally {
      setIsConnecting(false);
    }

    return user;
  }

  const signin = async (username: string, password: string) => {
    setIsConnecting(true);
    try {
      const user = await userbase.signIn({ username, password })
      setUser(user);
      userbase.openDatabase({ databaseName, changeHandler });
    } finally {
      setIsConnecting(false);
    }

    return user;
  }

  const signout = async () => {
    await userbase.signOut();
    setUser(null);
    changeHandler([]);
  }

  const createNote = async (item: WebNote) => {
    return await userbase.insertItem({ databaseName, item });
  }

  const updateNote = async (item: WebNote) => {
    return await userbase.updateItem({ databaseName, itemId: item.id, item });
  }

  const deleteNote = async (item: WebNote) => {
    return await userbase.deleteItem({ databaseName, itemId: item.id });
  }

  const refetch = () => {
    setIsLoading(true);
    userbase.init({ appId: import.meta.env.VITE_USERBASE_APP_ID }).then(session => {
      if (session.user) {
        setUser(session.user);
        userbase.openDatabase({ databaseName, changeHandler });
      } else {
        changeHandler([])
      }
    });
  }

  useEffect(() => refetch(), []);

  return (
    <UserbaseContext.Provider value={{
      user,
      signin,
      signout,
      signup,
      isConnecting,
      refetch,
      notes,
      createNote,
      updateNote,
      deleteNote,
      isLoading,
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
