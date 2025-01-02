export const revalidate = 60; // 60 segundos

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Title, ProductsGrid, Pagination } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: number;
  }>;
}

export default async function Home({ searchParams }: Props) {
  let page = (await searchParams).page;
  page = page ? parseInt(page.toString()) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect(`/?page=1`);
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
