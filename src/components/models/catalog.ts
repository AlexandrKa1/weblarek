import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export class Catalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null = null;

  constructor(private events: IEvents) {
    this.products = [];
  }

  setProducts(products: IProduct[]) {
    this.products = products;
    this.events.emit('catalog:changed');
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(productId: string): IProduct | undefined {
    return this.products.find((product) => product.id === productId);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
    this.events.emit('card:selected', product);
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}