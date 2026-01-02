import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getWishlistItemsFullInfo,
  wishlistItemsFullInfoCleanUp,
} from "@/store/wishlish/wishlist.slice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { loading, error, wishlistItemsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );

  const wishlistItems = wishlistItemsFullInfo.map((record) => ({
    ...record,
    quantity: cartItems[record.id!] || 0,
    isLiked: true,
    isAuthenticated: true,
  }));

  /**
   * to cancel your running thunk before it has finished,
   * we can use the abort method of the promise returned by dispatch.
   */
  useEffect(() => {
    const promise = dispatch(getWishlistItemsFullInfo("productsFullInfo"));
    return () => {
      promise?.abort();
      dispatch(wishlistItemsFullInfoCleanUp());
    };
  }, [dispatch]);

  return { loading, error, wishlistItems };
};

export default useWishlist;
