"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { createContext, useContext } from "react";
import type { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

interface SessionContext {
  session: Session | null;
}

const SessionContext = createContext({} as SessionContext);
export const useSessionProviders = () => useContext(SessionContext);

export const SessionProviders = ({ session, children }: Props) => {
  return (
    <SessionContext.Provider value={{ session }}>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
          intent: "capture",
          currency: "USD",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </SessionContext.Provider>
  );
};
