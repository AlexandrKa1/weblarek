//Base
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
//Models
import { Cart } from "./components/models/cart";
import { Catalog } from "./components/models/catalog";
import { Customer } from "./components/models/customer";
//Services
import { WebLarekApi } from "./components/services/weblarek-api";
//Views
import { CardBasket } from "./components/views/Cards/CardBasket";
import { CardCatalog } from "./components/views/Cards/CardCatalog";
import { CardDetail } from "./components/views/Cards/CardDetail";
import { Gallery } from "./components/views/Gallery";
import { Header } from "./components/views/Header";
import { Basket } from "./components/views/Basket";
import { FormContacts } from "./components/views/Forms/FormContacts";
import { FormOrder } from "./components/views/Forms/FormOrder";
import { ModalContainer } from "./components/views/Modals/ModalContainer";
import { OrderSuccess } from "./components/views/OrderSuccess";
//Styles
import "./scss/styles.scss";
//Types and Utils
import { IApi, IProduct, TPostCustomer } from "./types";
import { API_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { TCustomerApi } from "./types";

const API_ORIGIN: string = API_URL;
const apiClient: IApi = new Api(API_ORIGIN);
const webLarekApi = new WebLarekApi(apiClient);

const events = new EventEmitter();
const catalogModel = new Catalog(events);
const cartModel = new Cart(events);
const customerModel = new Customer(events);

const page = document.body;
const gallery = new Gallery(events, page);
const headerEl = document.querySelector(".header") as HTMLElement;

const header = new Header(headerEl, {
  onClick: () => events.emit("header-basket:click"),
});

const basket = new Basket(cloneTemplate("#basket"), {
  onClick: () => events.emit("basket-button:click"),
});

const cardDetail = new CardDetail(cloneTemplate("#card-preview"), {
  onClick: () => events.emit("card-detail:click"),
});

const modalEl = ensureElement<HTMLElement>(".modal", page);
const modal = new ModalContainer(modalEl, {
  onClick: () => events.emit("modal:close"),
});

const orderSuccess = new OrderSuccess(cloneTemplate("#success"), {
  onClick: () => events.emit("modal:close"),
});

const formOrder = new FormOrder(cloneTemplate("#order"), {
  onChooseCard: () => events.emit("payment:card"),
  onChooseCash: () => events.emit("payment:cash"),
  onAddressInput: (value: string) => {
    events.emit("customer-address:input", { address: value });
  },
  onClickFurther: () => events.emit("form-order-button:click"),
});

const formContacts = new FormContacts(cloneTemplate("#contacts"), {
  onEmailInput: (value: string) => {
    events.emit("contact:email", { email: value });
  },
  onPhoneInput: (value: string) => {
    events.emit("contact:phone", { phone: value });
  },
  onClickPay: () => events.emit("order:pay"),
});

events.on("order:pay", async () => {
  const data = customerModel.getData();
  const customerData: TCustomerApi = {
    email: data.email ?? "",
    address: data.address ?? "",
    phone: data.phone ?? "",
    payment: data.payment,
    total: cartModel.getTotalPrice(),
    items: cartModel.getCartProducts().map((item) => {
      return item.id;
    }),
  };
  try {
    const result: TPostCustomer = await webLarekApi.postCustomer(customerData);
    submitRender(result);
    contentClear();
    modal.content = orderSuccess.render();
  } catch (error) {
    console.log(error);
  }
});

events.on("customer:changed", () => {
  formOrderRender();
  formContactsRender();
});

events.on<{ email: string }>("contact:email", ({ email }) => {
  customerModel.setEmail(email);
});

events.on<{ phone: string }>("contact:phone", ({ phone }) => {
  customerModel.setPhone(phone);
});

events.on("form-order-button:click", () => {
  formContactsRender();
  modal.content = formContacts.render();
});

events.on<{ address: string }>("customer-address:input", ({ address }) => {
  customerModel.setAddress(address);
});

events.on("payment:card", () => {
  customerModel.setPayment("card");
});

events.on("payment:cash", () => {
  customerModel.setPayment("cash");
});

events.on("basket-button:click", () => {
  formOrderRender();
  modal.content = formOrder.render();
});

events.on("header-basket:click", () => {
  modal.content = basket.render();
  modal.open();
});

events.on("cart:changed", () => {
  cartViewRender();
  cardDetailViewRender();
  header.counter = cartModel.getTotalCount();
});

events.on("modal:close", () => {
  modal.close();
});

events.on("card-basket:click", (product: IProduct) => {
  cartModel.removeFromCart(product);
});

events.on("card-detail:click", () => {
  const selectedProduct = catalogModel.getSelectedProduct();
  if (selectedProduct) {
    const inCart = cartModel.hasProduct(selectedProduct.id);
    if (inCart) {
      cartModel.removeFromCart(selectedProduct);
      modal.close();
    } else {
      cartModel.addToCart(selectedProduct);
    }
    cardDetailViewRender();
    modal.content = cardDetail.render();
  }
});

events.on("card-catalog:click", (product: IProduct) => {
  catalogModel.setSelectedProduct(product);
  modal.content = cardDetail.render();
  modal.open();
});

events.on("card:selected", () => {
  cardDetailViewRender();
});

events.on("catalog:changed", () => {
  const itemCards = catalogModel.getProducts().map((product) => {
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {
      onClick: () => events.emit("card-catalog:click", product),
    });
    return card.render(product);
  });

  gallery.render({ catalog: itemCards });
});

try {
  const products = await webLarekApi.getProducts();
  catalogModel.setProducts(products.items);
} catch (error) {
  console.log(error);
}

//функция для рендера детальной карточки
function cardDetailViewRender() {
  const selectedProduct = catalogModel.getSelectedProduct();
  let inCart: boolean;
  if (selectedProduct) {
    inCart = cartModel.hasProduct(selectedProduct.id);
    cardDetail.buttonText = inCart
      ? "Удалить из корзины"
      : !(selectedProduct.price === null)
        ? "Купить"
        : "Недоступно";
    cardDetail.render(selectedProduct);
  }
}

//функция для рендера корзины
function cartViewRender() {
  const itemCards: CardBasket[] = [];
  const itemCardsElements = cartModel.getCartProducts().map((product) => {
    const card = new CardBasket(cloneTemplate("#card-basket"), {
      onClick: () => events.emit("card-basket:click", product),
    });
    itemCards.push(card);
    return card.render(product);
  });
  itemCards.forEach((item, index) => {
    item.itemIndex = index + 1;
  });
  basket.basketList = itemCardsElements;
  modal.content = basket.render();
  basket.basketPrice = cartModel.getTotalPrice();
}

function formOrderRender() {
  const errors = customerModel.validation();
  formOrder.payment = customerModel.getData().payment;
  formOrder.address = customerModel.getData().address;
  formOrder.isValid = !errors.payment && !errors.address;
  formOrder.textError = errors.payment ?? errors.address ?? "";
}

function formContactsRender() {
  const errors = customerModel.validation();
  formContacts.phone = customerModel.getData().phone;
  formContacts.email = customerModel.getData().email;
  formContacts.isValid = !errors.phone && !errors.email;
  formContacts.textError = errors.email ?? errors.phone ?? "";
}

function contentClear() {
  cartModel.clearCart();
  customerModel.clear();
}

function submitRender(result: TPostCustomer) {
  if (result.total) {
    orderSuccess.successDescription = result.total;
  }
}