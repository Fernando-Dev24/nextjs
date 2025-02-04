import { Title } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";
import { OrderState } from "@/components";
import { PaypalButton } from "@/components";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SingleOrderPage({ params }: Props) {
  const id = (await params).id;
  const resp = await getOrderById(id);

  if (!resp.ok) redirect("/");

  const order = resp.order;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* CARRITO */}
          <div className="flex flex-col mt-5">
            <OrderState isPaid={order?.isPaid ?? false} />

            {/* ITEMS */}
            {order?.products.map((product) => (
              <div key={product.id} className="flex mb-5">
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
                  <p>
                    {product.title} - {product.size}
                  </p>
                  <p>
                    ${product.price} x {product.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(product.price * product.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}
              </p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.address2}</p>
              <p>
                {order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}
              </p>
              <p>CP {order?.OrderAddress?.postalCode}</p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>

            {/* DIVIDER */}
            <div className="block mx-auto w-3/4 h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl font-bold mb-2">Orden de compra</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder} artículos
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order?.subTotal ?? 0)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">
                {currencyFormat(order?.tax ?? 0)}
              </span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order?.total ?? 0)}
              </span>
            </div>

            {/* IS PAIS STATE */}
            <div className="mt-5 mb-2 w-full">
              <OrderState isPaid={order?.isPaid ?? false} />
              <PaypalButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
