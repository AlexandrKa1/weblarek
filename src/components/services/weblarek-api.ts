import { IApi, TCustomerApi, TGetProducts, TPostCustomer } from "../../types";

export class WebLarekApi {
  private api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  getProducts(): Promise<TGetProducts> {
    return this.api.get("/product/");
  }

  postCustomer(data: TCustomerApi): Promise<TPostCustomer> {
    return this.api.post("/order/", data);
  }
}