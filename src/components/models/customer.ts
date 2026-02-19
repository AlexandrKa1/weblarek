import { ICustomer } from "../../types";

export class Customer {
  private payment: ICustomer["payment"] | "" = "";
  private address: string = "";
  private email: string = "";
  private phone: string = "";

  constructor() {}

  setPayment(payment: ICustomer["payment"]): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  getData(): ICustomer {
    return {
      payment: this.payment as ICustomer["payment"],
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = "";
    this.address = "";
    this.email = "";
    this.phone = "";
  }

  validation(): CustomerErrors {
    const errors: CustomerErrors = {};
    if (!this.payment) {
      errors.payment = 'Необходимо выбрать способ оплаты';
    }
    if (!this.email.trim()) {
      errors.email = 'Необходимо указать email';
    }
    if (!this.phone.trim()) {
      errors.phone = 'Необходимо указать телефон';
    }
    if (!this.address.trim()) {
      errors.address = 'Необходимо указать адрес';
    }
    return errors;
  }
}

type CustomerErrors = Partial<Record<keyof ICustomer, string>>;