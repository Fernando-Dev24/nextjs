"use client";

import type { Session } from "next-auth";
import { createContext, useContext, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

interface SessionContext {
  session: Session | null;
}

const SessionContext = createContext({} as SessionContext);
export const useSessionProvider = () => useContext(SessionContext);

export const SessionProvider = ({ session, children }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [session]);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
