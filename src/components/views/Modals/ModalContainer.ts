import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export interface IModalContainer {
  content: HTMLElement;
}

export interface ICloseAction {
  onClick?: () => void;
}

export class ModalContainer extends Component<IModalContainer> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICloseAction) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    if (actions?.onClick) {
      this.closeButton.addEventListener("click", () => this.close());

      this.container.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          actions.onClick?.();
        }
      });
    }
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }
}