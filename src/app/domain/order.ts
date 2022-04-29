import {Table} from "./table";
import {Waiter} from "./waiter";

export interface Order {
    id: number,
    openedAt: Date,
    closedAt: Date,
    table: Table,
    waiter: Waiter,
}
