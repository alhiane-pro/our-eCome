import { Form, Button } from "react-bootstrap";
import type { IProduct } from "@/types";
import { memo } from "react";

import ProductInfo from "../ProductInfo/ProductInfo";
import styles from "./styles.module.css";
import useCartItem from "./useCartItem";

const { cartItem } = styles;

type CartItemProps = IProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  deleteCartItemHandler: (id: number) => void;
};

// View Component => presentation
const CartItem = memo(
  ({
    id,
    img,
    title,
    price,
    max,
    quantity,
    changeQuantityHandler,
    deleteCartItemHandler,
  }: CartItemProps) => {
    const { changeQuantity, deleteCartItem } = useCartItem(
      changeQuantityHandler,
      deleteCartItemHandler
    );

    return (
      <div className={cartItem}>
        <ProductInfo img={img} title={title} price={price}>
          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            className="mt-auto"
            onClick={() => deleteCartItem(id!)}
          >
            Remove
          </Button>
        </ProductInfo>

        <div>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            defaultValue={quantity}
            onChange={(event) => changeQuantity(id!, event)}
          >
            {Array(max)
              .fill(0) // [0, 0, 0, 0]
              .map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
