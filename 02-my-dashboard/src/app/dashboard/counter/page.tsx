import type { Metadata } from "next";
import { CartCounter } from '../../shoppingCart/components/CartCounter';

export const metadata: Metadata = {
   title: 'Shopping Cart',
   description: 'Un simple contador',
}

export default function CounterPage() {

   return (
      <div className="flex flex-col items-center justify-center w-full h-full">
         <span>Productos en el carrito</span>
         <CartCounter value={20} />
      </div>
   );
}