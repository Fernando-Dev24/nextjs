import { Product } from "@/interfaces";
import { ProductGridItem } from "./product-grid-item";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((item) => (
        <ProductGridItem key={item.slug} product={item} />
      ))}
    </div>
  );
};
