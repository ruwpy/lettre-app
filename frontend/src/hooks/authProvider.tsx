import { useState, useEffect, ReactNode } from "react";
import { supabase } from "../../supabase";
import { useUserStore } from "../stores/userStore";

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session.data.session?.user);
      setLoading(false);
    };
    getSession();

    supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user);
      setLoading(false);
    });
  }, []);

  return <>{!loading && children}</>;
};
