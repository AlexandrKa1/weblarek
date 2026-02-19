import { Api } from "./components/base/Api";
import { Cart } from "./components/models/cart";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
import { WebLarekApi } from "./components/services/weblarek-api";
import "./scss/styles.scss";
import { IApi } from "./types";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";

const catalogTest = new Catalog();
catalogTest.setProducts(apiProducts.items);
console.log("Массив товаров из каталога: ", catalogTest.getProducts());
const product = catalogTest.getProductById("854cef69-976d-4c2a-a18c-2aa45046c390");
if (product) {
  catalogTest.setSelectedProduct(product);
} else {
  console.log("Товар не найден");
}
console.log("Сохраненный продукт по ID ", catalogTest.getSelectedProduct());

const cartTest = new Cart();
console.log(
  "Пустая корзина, продукты: ",
  cartTest.getCartProducts(),
  " количество продуктов: ",
  cartTest.getTotalCount(),
  " полная стоимость: ",
  cartTest.getTotalPrice(),
);

catalogTest.getProducts().forEach((product, index) => {
  cartTest.addToCart(product);
  console.log(
    "корзина после добавления продукта ",
    index + 1,
    " состав корзины: ",
    cartTest.getCartProducts(),
    " стоимость корзины: ",
    cartTest.getTotalCount(),
  );
});
if (product) {
  cartTest.removeFromCart(product);
  console.log("корзина после удаления продукта: ", cartTest.getCartProducts());
} else {
  console.log("Товар не найден");
}

cartTest.clearCart();
console.log("корзина после очистки", cartTest.getCartProducts());

const customer = new Customer();
console.log(
  "Клиент с незаполненными параметрами: способ облаты: ",
  customer.getData().payment,
  " адрес: ",
  customer.getData().address,
  " email: ",
  customer.getData().email,
  " телефон: ",
  customer.getData().phone,
);
console.log("Валидация: ", customer.validation());
customer.setPayment("cash");
console.log(
  "Клиент после добавления способа оплаты: способ облаты: ",
  customer.getData().payment,
  " адрес: ",
  customer.getData().address,
  " email: ",
  customer.getData().email,
  " телефон: ",
  customer.getData().phone,
);
console.log("Валидация: ", customer.validation());
customer.setAddress("myAddress");
console.log(
  "Клиент после добавления адреса: способ облаты: ",
  customer.getData().payment,
  " адрес: ",
  customer.getData().address,
  " email: ",
  customer.getData().email,
  " телефон: ",
  customer.getData().phone,
);
console.log("Валидация: ", customer.validation());
customer.setEmail("myemail@mail.com");
console.log(
  "Клиент после добавления email: способ облаты: ",
  customer.getData().payment,
  " адрес: ",
  customer.getData().address,
  " email: ",
  customer.getData().email,
  " телефон: ",
  customer.getData().phone,
);
console.log("Валидация: ", customer.validation());
customer.setPhone("+333-33-33-33");
console.log(
  "Клиент после добавления телефона: способ облаты: ",
  customer.getData().payment,
  " адрес: ",
  customer.getData().address,
  " email: ",
  customer.getData().email,
  " телефон: ",
  customer.getData().phone,
);
console.log("Валидация: ", customer.validation());

const API_ORIGIN: string = API_URL;
const api: IApi = new Api(API_ORIGIN);
const webLarekApi = new WebLarekApi(api);

try {
  const products = await webLarekApi.getProducts();
  const catalog = new Catalog();
  catalog.setProducts(products.items);
  console.log("каталог продуктов принятых по API: ", catalog.getProducts());
} catch (error) {
  console.log(error);
}