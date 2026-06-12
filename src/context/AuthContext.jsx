import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user && mounted) {
          setUser(session.user);
          // Fetch profile directly here
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (data && mounted) {
            setProfile(data);
          }
        }
      } catch (err) {
        console.error("Init error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 5000);

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (data && mounted) setProfile(data);
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
        setProfile(null);
      }

      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = profile?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
