import { ICustomer } from "../../types";

export class Customer {
  private payment: ICustomer["payment"] = "";
  private address: string | null = null;
  private email: string | null = null;
  private phone: string | null = null;

  constructor() {}

  setPayment(payment: ICustomer["payment"]): void {
    this.payment = payment;
  }

  setAddress(address: string | null): void {
    this.address = address;
  }

  setEmail(email: string | null): void {
    this.email = email;
  }

  setPhone(phone: string | null): void {
    this.phone = phone;
  }

  getData(): ICustomer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = "";
    this.address = null;
    this.email = null;
    this.phone = null;
  }

  validation(): CustomerErrors {
    const customerErrors: CustomerErrors = {};
    if (this.payment === "") {
      customerErrors.payment = "Не выбран вид оплаты";
    }
    if (this.address === null || this.address.trim() === "") {
      customerErrors.address = "Введите адрес доставки";
    }
    if (this.email === null || this.email.trim() === "") {
      customerErrors.email = "Укажите email";
    }
    if (this.phone === null || this.phone.trim() === "") {
      customerErrors.phone = "Укажите телефон";
    }
    return customerErrors;
  }
}

type CustomerErrors = {
  payment?: string;
  address?: string;
  email?: string;
  phone?: string;
};