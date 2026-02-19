import { IProduct } from "../../types";

export class Cart {
  private products: IProduct[];

  constructor() {
    this.products = [];
  }

  getCartProducts(): IProduct[] {
    return this.products;
  }

  addToCart(product: IProduct) {
    this.products.push(product);
  }

  removeFromCart(product: IProduct) {
    this.products = this.products.filter((pro) => pro.id !== product.id);
  }

  clearCart() {
    this.products = [];
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