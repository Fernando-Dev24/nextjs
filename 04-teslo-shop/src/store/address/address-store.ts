import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
  };

  // methods
  // State[key_state] es como llamar una llame del mismo state donde estoy
  setAddress: (address: State["address"]) => void;
}

export const useAdressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
        rememberAddress: false,
      },

      // Methods
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
