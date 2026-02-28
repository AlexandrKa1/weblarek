import { IActions } from "../../types";
import { ensureElement, formatSynapses } from "../../utils/utils";
import { Component } from "../base/Component";

interface IBasket {
  basketList: HTMLElement[];
  basketPrice: number;
}

export class Basket extends Component<IBasket> {
  protected basketListElement: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected basketPriceElement: HTMLElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.basketListElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container,
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.basketPriceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container,
    );

    if (actions.onClick) {
      this.basketButton.addEventListener("click", actions.onClick);
    }
  }

  set basketList(items: HTMLElement[]) {
    this.basketListElement.replaceChildren(...items);
    this.basketButton.disabled = items.length === 0;
  }

  set basketPrice(value: number) {
    this.basketPriceElement.textContent = formatSynapses(value);
  }
}