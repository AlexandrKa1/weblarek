import { IActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

interface ICardBasket {
  title: string;
  price: number | null;
  itemIndex: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected itemIndexElement: HTMLElement;
  protected itemDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, action?: IActions) {
    super(container);

    this.itemIndexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.itemDeleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    if (action?.onClick) {
      this.itemDeleteButton.addEventListener("click", action.onClick);
    }
  }

  set itemIndex(value: number) {
    this.itemIndexElement.textContent = String(value);
  }
}