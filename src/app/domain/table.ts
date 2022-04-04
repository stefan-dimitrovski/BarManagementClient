import {Waiter} from "./waiter";

export interface Table {
    id: number;
    isOpen: boolean;
    waiter: Waiter;
}
