import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import type { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (size: string) => void;
}

// Persist middlware guarda el estado automaticamente en localstorage y lo recupera al mismo tiempo para usarlo

export const useCartStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + item.quantity, 0);
        },
        addProductToCart: (product: CartProduct) => {
          const { cart } = get();

          // 1. Verificar si el producto ya esta en el carrito con la talla seleccionada
          const productInCart = cart.some(
            (item) => item.id === product.id && item.size === product.size
          );

          if (!productInCart) {
            set({ cart: [...cart, product] });
            return;
          }

          // 2. Si el producto ya existe por talla, solamente incrementos la cantidad de dicho producto
          const updateCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: item.quantity + product.quantity };
            }

            return item;
          });

          set({ cart: updateCartProducts });
        },
        updateProductQuantity: (product, quantity) => {
          const { cart } = get();

          const updatedCartProducts = cart.map((item) => {
            if (item.id === product.id && item.size === product.size) {
              return { ...item, quantity: quantity };
            }

            return item;
          });

          set({ cart: updatedCartProducts });
        },
        removeProduct: (size) => {
          const { cart } = get();

          const updatedCartProducts = cart.filter((item) => {
            if (item.size !== size) return item;
          });

          set({ cart: updatedCartProducts });
        },
      }),
      {
        name: "shopping-cart",
      }
    )
  )
);
