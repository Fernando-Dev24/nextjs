import { notFound } from "next/navigation";
import {
  SizeSelector,
  QuantitySelector,
  ProductSlideshow,
  ProductMobileSlideshow,
} from "@/components";
import { initialData } from "@/seed";
import { titleFont } from "@/config/fonts";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;
  const product = initialData.products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slide show */}
      <div className="col-span-1 md:col-span-2">
        {/* MOBILE SLIDSHOW */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* DESKTOP SLIDESHOW */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* SELECTOR DE TALLAS */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* DESCRIPCION */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
