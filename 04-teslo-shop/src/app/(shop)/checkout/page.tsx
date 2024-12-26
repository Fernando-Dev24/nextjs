import Link from "next/link";
import { Title } from "../../../components/ui/title/title";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Ortiz</p>
              <p>Col. Montserrat</p>
              <p>Pasaje 13, Casa #216</p>
              <p>San Salvador, El Salvador</p>
              <p>CP 12345</p>
              <p>+503 76928927</p>
            </div>

            {/* DIVIDER */}
            <div className="block mx-auto w-3/4 h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl font-bold mb-2">Orden de compra</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">9 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* DISCLAIMER */}
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &apos;Colocar orden&apos;, aceptas nuestros{" "}
                  <a href="#" className="underline">
                    términos y condiciones
                  </a>{" "}
                </span>
              </p>

              <Link
                href={"/orders/123"}
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
