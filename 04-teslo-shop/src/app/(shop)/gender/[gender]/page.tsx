import { notFound, redirect } from "next/navigation";
import { Gender } from "@prisma/client";
import { Title, Pagination, ProductsGrid } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  params: Promise<{
    gender: Gender;
  }>;
  searchParams: Promise<{
    page?: number;
  }>;
}

// Record<keys, values> => Esto es propio de ts
const labels: Record<Gender, string> = {
  men: "para Hombres",
  women: "para Mujeres",
  kid: "para Niños",
  unisex: "para Todos",
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const gender = (await params).gender;
  let page = (await searchParams).page;
  page = page ? parseInt(page.toString()) : 1;

  if (!labels[gender]) {
    return notFound(); // return never;
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}/?page=${totalPages}`);
  }

  return (
    <>
      <Title
        title={`Articulos ${labels[gender]}`}
        subTitle={`Ropa ${labels[gender]}`}
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
