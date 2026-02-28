import { IActions } from "../../../types";
import { CardWithImage } from "./CardWithImage";

interface ICardCatalog {
  title: string;
  price: number | null;
  image: string;
  category: string; 
}

export class CardCatalog extends CardWithImage<ICardCatalog> {
  constructor(container: HTMLElement, actions?: IActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }
}