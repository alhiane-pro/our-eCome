import { GridList, Heading } from "@/components/common";
import { Product } from "@/components/eCommerce";
import { Loading } from "@/components/feedback";
import type { IProduct } from "@/types";

import useWishlist from "./useWishlist";

const Wishlist = () => {
  const { loading, error, wishlistItems } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading status={loading} error={error} type="product">
        {/* Render Props Pattern */}
        <GridList<IProduct>
          records={wishlistItems}
          renderItem={(record) => <Product {...record} />}
          title="Sorry, Your wishlist is empty!"
          message="You have no items in your wishlist."
        />
      </Loading>
    </>
  );
};

export default Wishlist;
