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

export type TCustomerApi = {
    email: string;
    address: string;
    phone: string;
    payment: string;
    items: string[];
    total: number;
}

export interface IActions {
  onClick?: () => void;
}

export interface IOrderActions {
  onChooseCard?: () => void;
  onChooseCash?: () => void;
  onAddressInput?: (value: string) => void;
  onClickFurther?: () => void;
  onEmailInput?: (value: string) => void;
  onPhoneInput?: (value: string) => void;
  onClickPay?: () => void;
}