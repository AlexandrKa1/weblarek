import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Cart {
  private products: IProduct[];

  constructor(private events: IEvents) {
    this.products = [];
  }

  getCartProducts(): IProduct[] {
    return this.products;
  }

  addToCart(product: IProduct) {
    this.products.push(product);
    this.events.emit(`cart:changed`);
  }

  removeFromCart(product: IProduct) {
    this.products = this.products.filter((pro) => pro.id !== product.id);
    this.events.emit(`cart:changed`);
  }

  clearCart() {
    this.products = [];
    this.events.emit(`cart:changed`);
  }

  getTotalPrice(): number {
    return this.products.reduce((sum, product) => {
      const price = product.price === null ? 0 : Number(product.price);
      return sum + (Number.isFinite(price) ? price : 0);
    }, 0);
  }

  getTotalCount(): number {
    return this.products.length;
  }

  hasProduct(productId: string): boolean {
    return this.products.some((product) => product.id === productId);
  }
}