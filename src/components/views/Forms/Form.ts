import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface IForm {
  textError: string;
  isValid: boolean;
}

export abstract class Form<T extends IForm> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.submitButton = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container,
    );
    this.errorsElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
  }

  set textError(value: string) {
    this.errorsElement.textContent = value;
    value === '' ? this.submitButton.disabled = false : this.submitButton.disabled = true; 
  };

  set isValid(value: boolean) {
    this.submitButton.disabled = !value;
  }
}