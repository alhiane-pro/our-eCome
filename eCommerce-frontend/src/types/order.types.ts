import type { IProduct } from "./product.types";

export interface IOrder {
  id: number;
  userId: number;
  subTotal: number;
  orderItems: IProduct[];
}
