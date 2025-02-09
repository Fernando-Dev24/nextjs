import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/products-in-cart";
import { PlaceOrder } from "./ui/place-order";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar carrito
            </Link>

            {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* CHECKOUT */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
