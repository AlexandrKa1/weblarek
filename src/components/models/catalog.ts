import { IProduct } from "../../types/index.ts";

export class Catalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null = null;

  constructor() {
    this.products = [];
  }

  setProducts(products: IProduct[]) {
    this.products = products;
  }

  getProducts(): IProduct[] {
    return this.products;
  }

  getProductById(productId: string): IProduct | undefined {
    return this.products.find((product) => product.id === productId);
  }

  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}