export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string
    title: string
    image: string
    price: number | null
    description: string
}

export interface ICustomer {
    payment: 'card' | 'cash' | ''
    address: string | null
    email: string | null
    phone: string | null
}

export type TGetProducts = {
    total: number;
    items: IProduct[];
}

export type TPostCustomer = {
    id?: string;
    total?: number;
    error?: string;
}

export type TCustomer = {
    email: string;
    address: string;
    phone: string;
    payment: string;
    items: string[];
    total: number;
}
