import { getWishlistItemsFullInfo } from "@/store/wishlish/wishlist.slice";
import { getCartTotalQuantitySelector } from "@/store/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const useHeader = () => {
  const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const wishlistTotalQuantity = useAppSelector(
    (state) => state.wishlist?.wishlistItems?.length
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(getWishlistItemsFullInfo("productsIds"));
    }
  }, [accessToken, dispatch]);

  return { cartTotalQuantity, wishlistTotalQuantity };
};

export default useHeader;
