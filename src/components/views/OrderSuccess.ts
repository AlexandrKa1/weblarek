import { IActions } from "../../types";
import { ensureElement, formatSynapses } from "../../utils/utils";
import { Component } from "../base/Component";

interface IOrderSuccess {
  successDescription: string;
}

export class OrderSuccess extends Component<IOrderSuccess> {
  protected descriptionElement: HTMLElement;
  protected buttonClose: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IActions) {
    super(container);

    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.buttonClose = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    if (actions.onClick) {
      this.buttonClose.addEventListener("click", actions.onClick);
    }
  }

  set successDescription(value: number | string) {
  this.descriptionElement.textContent = `Списано ${formatSynapses(typeof value === 'number' ? value : 0)}`;
}
}