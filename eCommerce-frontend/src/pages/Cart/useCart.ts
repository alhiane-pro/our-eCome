import { resetPlacingOrderStatus } from "@/store/orders/orders.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect } from "react";
import {
  cartItemChangeQuantity,
  cartItemsFullInfoCleanUp,
  deleteCartItem,
  getCartItemsFullInfo,
} from "@/store/cart/cart.slice";

const useCart = () => {
  const dispatch = useAppDispatch();

  const placingOrderStattus = useAppSelector((state) => state.orders.loading);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { loading, error, cartItems, cartItemsFullInfo } = useAppSelector(
    (state) => state.cart
  );

  const products = cartItemsFullInfo.map((product) => ({
    ...product,
    quantity: cartItems[product.id!] || 0,
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const deleteCartItemHandler = useCallback(
    (id: number) => {
      dispatch(deleteCartItem(id));
    },
    [dispatch]
  );

  /**
   * to cancel your running thunk before it has finished,
   * we can use the abort method of the promise returned by dispatch.
   */
  useEffect(() => {
    const promise = dispatch(getCartItemsFullInfo());
    return () => {
      promise?.abort();
      dispatch(cartItemsFullInfoCleanUp());
      dispatch(resetPlacingOrderStatus());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    products,
    changeQuantityHandler,
    deleteCartItemHandler,
    accessToken,
    placingOrderStattus,
  };
};

export default useCart;
