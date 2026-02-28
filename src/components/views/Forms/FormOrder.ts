import { IOrderActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

interface IFormOrder {
  textError: string;
  payment: string | null;
  address: string | null;
  isValid: boolean;
}

export class FormOrder extends Form<IFormOrder> {
  protected addressInput: HTMLInputElement;
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions: IOrderActions) {
    super(container);

    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container,
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container,
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container,
    );

    if (actions.onChooseCard) {
      this.cardButton.addEventListener("click", actions.onChooseCard);
    }

    if (actions.onChooseCash) {
      this.cashButton.addEventListener("click", actions.onChooseCash);
    }

    if (actions.onAddressInput) {
      this.addressInput.addEventListener("input", (e) => {
        const value = (e.target as HTMLInputElement).value;
        actions.onAddressInput?.(value);
      });
    }
    const form = this.container as HTMLFormElement;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      actions.onClickFurther?.();
    });
  }

  set payment(value: string | null) {
    this.cardButton.classList.toggle('button_alt-active', value === 'card');
    this.cashButton.classList.toggle('button_alt-active', value === 'cash')
  }

  set address(value: string | null) {
    this.addressInput.value = value ?? "";
  }
}