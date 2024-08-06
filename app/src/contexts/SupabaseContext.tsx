import { createContext, useContext, useMemo, ReactNode, FC } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

interface SupabaseProviderProps {
  children: ReactNode;
}

const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider: FC<SupabaseProviderProps> = ({
  children
}: SupabaseProviderProps) => {
  const supabase = useMemo(() => createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  ), []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseClient => {
  const context = useContext(SupabaseContext);
  if (context === null) {
    throw new Error('useSupabase must be used within an SupabaseProvider');
  }
  return context;
};
