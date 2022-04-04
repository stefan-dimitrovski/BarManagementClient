import {Waiter} from "./waiter";

export interface Locale {
    id: number;
    address: string;
    name: string;
    lat: number;
    lng: number;
    waiters: Waiter[];
}
