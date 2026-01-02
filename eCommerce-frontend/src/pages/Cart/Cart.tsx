import { CartItemsList, CartSubTotalPrice } from "@/components/eCommerce";
import { LottieHandler } from "@/components/feedback";
import { Loading } from "@/components/feedback";
import { Heading } from "@/components/common";

import useCart from "./useCart";

// Container Component => Logic
const Cart = () => {
  const {
    loading,
    error,
    products,
    changeQuantityHandler,
    deleteCartItemHandler,
    accessToken,
    placingOrderStattus,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading status={loading} error={error} type="cart">
        {products.length > 0 ? (
          <>
            <CartItemsList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              deleteCartItemHandler={deleteCartItemHandler}
            />
            <CartSubTotalPrice products={products} accessToken={accessToken} />
          </>
        ) : placingOrderStattus === "succeeded" ? (
          <LottieHandler
            type="ordered"
            title="Order has been placed successfully."
            message="Your order has been placed successfully.."
            className="text-success"
          />
        ) : (
          <LottieHandler
            type="empty"
            title="Sorry, Your shopping cart is empty!"
            message="You have no items in your shopping cart."
            className="text-info"
          />
        )}
      </Loading>
    </>
  );
};

export default Cart;
