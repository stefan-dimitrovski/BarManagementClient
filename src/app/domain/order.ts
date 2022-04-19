import {Drink} from "./drink";

export interface Order {
    id: number,
    openedAt: Date,
    closedAt: Date,
    tableId: number,
    waiterId: number,
    drinks: Drink[]
}
