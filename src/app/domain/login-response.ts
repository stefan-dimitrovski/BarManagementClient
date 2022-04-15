import {Locale} from "./locale";

export interface LoginResponse {
    token: string;
    role: string;
    name: string;
    id: number;
    email: string;
    locale: Locale | null;
}
