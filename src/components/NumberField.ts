import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class NumberField extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Number }) value?: number;
  @property({ type: String }) placeholder = '';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Number }) step: number = 1;
  @property({ type: Boolean }) hideSteppers = false;
  @property({ type: String }) inputMode: 'numeric' | 'decimal' = 'decimal';
  @state() private focused = false;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    .number-field {
      position: relative;
      width: 100%;
    }

    label {
      position: absolute;
      left: 14px;
      transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1);
      pointer-events: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 1rem;
      background-color: white;
      padding: 0 4px;
      top: 50%;
      transform: translateY(-50%);
    }

    label.floating,
    label.has-value {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.75rem;
    }

    label.focused {
      color: ${theme.palette.primary.main};
    }

    label.error {
      color: ${theme.palette.error.main};
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    input {
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.87);
      flex: 1;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: textfield;
    }

    /* Outlined variant */
    .outlined .input-wrapper {
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 16.5px 14px;
      transition: border-color 200ms cubic-bezier(0.0, 0, 0.2, 1);
    }

    .outlined.small .input-wrapper {
      padding: 8.5px 14px;
    }

    .outlined .input-wrapper:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }

    .outlined .input-wrapper.focused {
      border-color: ${theme.palette.primary.main};
      border-width: 2px;
      padding: 15.5px 13px;
    }

    .outlined.small .input-wrapper.focused {
      padding: 7.5px 13px;
    }

    .outlined .input-wrapper.error {
      border-color: ${theme.palette.error.main};
    }

    /* Filled variant */
    .filled .input-wrapper {
      background-color: rgba(0, 0, 0, 0.06);
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      border-radius: 4px 4px 0 0;
      padding: 25px 12px 8px;
      transition: background-color 200ms cubic-bezier(0.0, 0, 0.2, 1);
    }

    .filled .input-wrapper:hover {
      background-color: rgba(0, 0, 0, 0.09);
    }

    .filled .input-wrapper.focused {
      background-color: rgba(0, 0, 0, 0.09);
      border-bottom: 2px solid ${theme.palette.primary.main};
      padding-bottom: 7px;
    }

    .filled .input-wrapper.error {
      border-bottom-color: ${theme.palette.error.main};
    }

    /* Standard variant */
    .standard .input-wrapper {
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      padding: 4px 0 5px;
    }

    .standard .input-wrapper.focused {
      border-bottom: 2px solid ${theme.palette.primary.main};
      padding-bottom: 4px;
    }

    .standard .input-wrapper.error {
      border-bottom-color: ${theme.palette.error.main};
    }

    /* Steppers */
    .steppers {
      display: flex;
      flex-direction: column;
      margin-left: 8px;
    }

    .stepper-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px 4px;
      color: rgba(0, 0, 0, 0.54);
      font-size: 12px;
      line-height: 1;
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }

    .stepper-button:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    .stepper-button:disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: not-allowed;
    }

    .stepper-up {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .helper-text {
      font-size: 0.75rem;
      margin: 3px 14px 0;
      color: rgba(0, 0, 0, 0.6);
    }

    .helper-text.error {
      color: ${theme.palette.error.main};
    }

    .input-wrapper.disabled {
      border-color: rgba(0, 0, 0, 0.26);
      pointer-events: none;
      opacity: 0.5;
    }

    input:disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: not-allowed;
    }
  `;

  private get numericValue(): number | undefined {
    return this.value;
  }

  private set numericValue(val: number | undefined) {
    this.value = val;
  }

  private get displayValue(): string {
    return this.value !== undefined ? String(this.value) : '';
  }

  private get canIncrement(): boolean {
    if (this.disabled) return false;
    if (this.max === undefined) return true;
    return (this.value || 0) < this.max;
  }

  private get canDecrement(): boolean {
    if (this.disabled) return false;
    if (this.min === undefined) return true;
    return (this.value || 0) > this.min;
  }

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const stringValue = input.value;
    
    if (stringValue === '') {
      this.numericValue = undefined;
    } else {
      const numValue = parseFloat(stringValue);
      if (!isNaN(numValue)) {
        this.numericValue = this.clampValue(numValue);
      }
    }
    
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.numericValue },
      bubbles: true,
      composed: true
    }));
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const stringValue = input.value;
    
    if (stringValue === '') {
      this.numericValue = undefined;
    } else {
      const numValue = parseFloat(stringValue);
      if (!isNaN(numValue)) {
        this.numericValue = this.clampValue(numValue);
        // Update input value to show clamped value
        input.value = String(this.numericValue);
      }
    }
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.numericValue },
      bubbles: true,
      composed: true
    }));
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.increment();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.decrement();
    }
  }

  private clampValue(value: number): number {
    let clampedValue = value;
    
    if (this.min !== undefined && clampedValue < this.min) {
      clampedValue = this.min;
    }
    
    if (this.max !== undefined && clampedValue > this.max) {
      clampedValue = this.max;
    }
    
    return clampedValue;
  }

  private increment() {
    if (!this.canIncrement) return;
    
    const currentValue = this.value || 0;
    const newValue = currentValue + this.step;
    this.numericValue = this.clampValue(newValue);
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.numericValue },
      bubbles: true,
      composed: true
    }));
  }

  private decrement() {
    if (!this.canDecrement) return;
    
    const currentValue = this.value || 0;
    const newValue = currentValue - this.step;
    this.numericValue = this.clampValue(newValue);
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.numericValue },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const hasValue = this.value !== undefined && this.value !== null;
    const labelClasses = [
      this.focused ? 'floating focused' : '',
      hasValue ? 'has-value' : '',
      this.error ? 'error' : ''
    ].join(' ');

    const wrapperClasses = [
      'input-wrapper',
      this.focused ? 'focused' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="number-field ${this.variant} ${this.size}">
        ${this.label ? html`<label class="${labelClasses}">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        
        <div class="${wrapperClasses}">
          <div class="input-container">
            <input
              type="number"
              inputmode="${this.inputMode}"
              .value="${this.displayValue}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              ?required="${this.required}"
              min="${this.min ?? ''}"
              max="${this.max ?? ''}"
              step="${this.step}"
              @input="${this.handleInput}"
              @change="${this.handleChange}"
              @keydown="${this.handleKeyDown}"
              @focus="${() => this.focused = true}"
              @blur="${() => this.focused = false}"
            />
            
            ${!this.hideSteppers ? html`
              <div class="steppers">
                <button
                  class="stepper-button stepper-up"
                  type="button"
                  ?disabled="${!this.canIncrement}"
                  @click="${this.increment}"
                  tabindex="-1"
                >
                  ▲
                </button>
                <button
                  class="stepper-button stepper-down"
                  type="button"
                  ?disabled="${!this.canDecrement}"
                  @click="${this.decrement}"
                  tabindex="-1"
                >
                  ▼
                </button>
              </div>
            ` : ''}
          </div>
        </div>
        
        ${this.helperText ? html`<div class="helper-text ${this.error ? 'error' : ''}">${this.helperText}</div>` : ''}
      </div>
    `;
  }
}