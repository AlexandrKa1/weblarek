import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card } from "./Card";

interface ICardWhithImage {
  title: string;
  price: number | null;
  image: string;
  category: string;
}

export abstract class CardWithImage<T extends
  ICardWhithImage> extends Card<T> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
  }

  set category(value: string) {
    this.categoryElement.textContent = value;
    const categoryStyle = categoryMap[value as keyof typeof categoryMap];
    this.categoryElement.classList.add(categoryStyle);
  }

  set image(value: string) {
  this.setImage(
    this.imageElement, 
    value, 
    this.titleElement.textContent ?? undefined
  );
  }
}