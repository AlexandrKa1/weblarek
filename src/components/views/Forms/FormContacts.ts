import { IOrderActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

interface IFormContacts{
  textError: string;
  email: string;
  phone: string;
  isValid: boolean;
}

export class FormContacts extends Form<IFormContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, actions: IOrderActions) {
    super(container);

    this.emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container,
    );
    this.phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container,
    );

    if (actions.onEmailInput) {
      this.emailInput.addEventListener("input", (e) => {
        const value = (e.target as HTMLInputElement).value;
        actions.onEmailInput?.(value);
      });
    }

    if (actions.onPhoneInput) {
      this.phoneInput.addEventListener("input", (e) => {
        const value = (e.target as HTMLInputElement).value;
        actions.onPhoneInput?.(value);
      });
    }

    const form = this.container as HTMLFormElement;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      actions.onClickPay?.();
    });
  }

  set email(value: string | null) {
    this.emailInput.value = value ?? "";
  }

  set phone(value: string | null) {
    this.phoneInput.value = value ?? "";
  }
}