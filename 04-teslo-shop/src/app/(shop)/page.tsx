import { Title, ProductsGrid } from "@/components";
import { initialData } from "@/seed";

export default function Home() {
  const products = initialData.products;

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductsGrid products={products} />
    </>
  );
}
