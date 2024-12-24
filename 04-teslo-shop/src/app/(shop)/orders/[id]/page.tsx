import { Title } from "@/components";
import { initialData } from "@/seed";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default async function SingleOrderPage({ params }: Props) {
  const id = (await params).id;

  // TODO: Verificar ID
  // redirect a /something

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
              {/* <span className="mx-2">Orden pagada</span> */}
            </div>

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Pendiente de pago</span>
                {/* <span className="mx-2">Orden pagada</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
