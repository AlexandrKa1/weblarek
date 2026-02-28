import { ensureElement, formatSynapses } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
  title: string;
  price: number | null;
}

export abstract class Card<T extends ICard> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container,
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container,
    );
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    this.priceElement.textContent = formatSynapses(value);
  }
}