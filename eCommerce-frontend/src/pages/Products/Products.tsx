import { GridList, Heading } from "@/components/common";
import { Product } from "@/components/eCommerce";
import { Loading } from "@/components/feedback";
import type { IProduct } from "@/types";

import useProducts from "./useProducts";

const Products = () => {
  const { prefix, loading, error, productsFullInfo } = useProducts();
  return (
    <>
      <Heading title={`${prefix} Products`} />
      <Loading status={loading} error={error} type="product">
        {/* Render Props Pattern */}
        <GridList<IProduct>
          records={productsFullInfo}
          renderItem={(record) => <Product {...record} />}
          title="Sorry, You have no products to show!"
          message="There is no products in this category."
        />
      </Loading>
    </>
  );
};

export default Products;
