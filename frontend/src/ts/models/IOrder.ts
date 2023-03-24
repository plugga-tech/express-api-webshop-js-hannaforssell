import { IOrderProduct } from "./IOrderProduct";

export interface IOrder {
    user: string,
	products: IOrderProduct[]
}