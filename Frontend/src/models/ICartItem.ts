import { IProductDetails } from "./IProductDetails";

export interface ICartItem extends IProductDetails {
  quantity: number;
}
