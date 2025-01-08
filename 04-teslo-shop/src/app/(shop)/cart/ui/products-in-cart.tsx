"use client";

import Image from "next/image";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false);
  const {
    cart: productsInCart,
    updateProductQuantity,
    removeProduct,
  } = useCartStore((state) => state);

  useEffect(() => setLoaded(true), []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.length >= 1 &&
        productsInCart.map((product) => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
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
              <Link
                href={`/product/${product.slug}`}
                className="hover:underline"
              >
                {product.size} - {product.title}
              </Link>
              <p>${product.price}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />

              <button
                onClick={() => removeProduct(product.size)}
                className="underline mt-3"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
