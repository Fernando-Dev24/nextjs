import Link from "next/link";
// import { redirect } from "next/navigation";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/products-in-cart";
import { OrderSummary } from "./ui/order-summary";

export default function CartPage() {
  // redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href={"/"} className="underline mb-5">
              Continúa comprando
            </Link>

            {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Orden de compra</h2>

            <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link
                href={"/checkout/address"}
                className="flex btn-primary justify-center"
              >
                Go to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
