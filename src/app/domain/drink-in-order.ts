import {Order} from "./order";
import {Drink} from "./drink";

export interface DrinkInOrder {
    id: number,
    order: Order,
    drink: Drink,
    quantity: number
}
