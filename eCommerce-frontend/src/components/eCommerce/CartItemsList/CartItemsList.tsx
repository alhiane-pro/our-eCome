import type { IProduct } from "@/types";

import CartItem from "../CartItem/CartItem";

interface CartItemsListProps {
  products: IProduct[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  deleteCartItemHandler: (id: number) => void;
}

const CartItemsList = ({
  products,
  changeQuantityHandler,
  deleteCartItemHandler,
}: CartItemsListProps) => {
  return (
    <>
      {products.map((product) => (
        <CartItem
          key={product.id}
          {...product}
          changeQuantityHandler={changeQuantityHandler}
          deleteCartItemHandler={deleteCartItemHandler}
        />
      ))}
    </>
  );
};

export default CartItemsList;
