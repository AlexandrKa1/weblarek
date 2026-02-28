import { IActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(container: HTMLElement, action?: IActions) {
    super(container);

    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container,
    );

    if (action?.onClick) {
      this.basketButton.addEventListener("click", action?.onClick);
    }
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}