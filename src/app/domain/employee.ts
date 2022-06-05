import {Locale} from "./locale";

export interface Employee {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    id: number;
    dateEmployed: string;
    worksInLocale: Locale;
}
