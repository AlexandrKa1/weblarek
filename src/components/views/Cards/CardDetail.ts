import { IActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { CardWithImage } from "./CardWithImage";

interface ICardDetail{
  title: string;
  price: number | null;
  image: string;
  category: string;
  description: string;
  buttonText: string;
}

export class CardDetail extends CardWithImage<ICardDetail> {
  protected descriptionElement: HTMLElement;
  protected addButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: IActions) {
    super(container);
    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.addButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.addButton.addEventListener("click", actions.onClick);
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.addButton.textContent = value;
    value === "Недоступно"
      ? (this.addButton.disabled = true)
      : (this.addButton.disabled = false);
  }
}