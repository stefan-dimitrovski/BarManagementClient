export interface Table {
    id: number;
    isOpen: boolean;
    waiter: {
        email: string
        id: number
        locale: string[]
        name: string
        password: string
        phoneNumber: string
        role: string
    }
}