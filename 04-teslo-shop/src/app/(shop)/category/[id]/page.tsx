import { notFound } from "next/navigation";
import { initialData } from "@/seed";
import { Title } from "@/components";
import type { Category } from "@/interfaces";
import { ProductsGrid } from "../../../../components/products/grids/products-grid";

interface Props {
  params: Promise<{
    id: Category;
  }>;
}

// Record<keys, values> => Esto es propio de ts
const labels: Record<Category, string> = {
  men: "para Hombres",
  women: "para Mujeres",
  kid: "para Niños",
  unisex: "para Todos",
};

export default async function CategoryPage({ params }: Props) {
  const id = (await params).id;

  if (!labels[id]) {
    return notFound(); // return never;
  }

  const products = initialData.products.filter((item) => item.gender === id);

  return (
    <>
      <Title
        title={`Articulos para ${labels[id]}`}
        subTitle={`Ropa ${labels[id]}`}
      />
      <ProductsGrid products={products} />
    </>
  );
}
