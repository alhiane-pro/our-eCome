import { getProducts, productsCleanUp } from "@/store/products/products.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useProducts = () => {
  const { loading, error, records } = useAppSelector((state) => state.products);
  const { prefix } = useParams();

  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const dispatch = useAppDispatch();

  const productsFullInfo = records.map((record) => ({
    ...record,
    quantity: cartItems[record.id!] || 0,
    isLiked: wishlistItems.includes(record.id!),
    isAuthenticated: accessToken ? true : false,
  }));

  /**
   * to cancel your running thunk before it has finished,
   * we can use the abort method of the promise returned by dispatch.
   */
  useEffect(() => {
    const promise = dispatch(getProducts(prefix!));
    return () => {
      promise?.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  return { prefix, loading, error, productsFullInfo };
};

export default useProducts;
