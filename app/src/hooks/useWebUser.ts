import { useSupabase } from "@/contexts";
import { NewUser } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useWebUser = () => {
  const supabase = useSupabase();
  const [isConnecting, setIsConnecting] = useState(false);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) return null;

      const { user } = data.session;

      return user;
    }
  });

  const { mutate: signup } = useMutation({
    mutationFn: async ({ email, password }: NewUser) => {
      return await supabase.auth.signUp({
        email,
        password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  })

  const { mutate: signin } = useMutation({
    mutationFn: async ({ email, password }: NewUser) => {
      return await supabase.auth.signInWithPassword({
        email,
        password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  })

  const { mutate: signout } = useMutation({
    mutationFn: async () => {
      return await supabase.auth.signOut();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  })
  return {
    user,
    signup,
    signin,
    signout,
    isConnecting,
    isConnected: user !== null
  }
}

export default useWebUser;