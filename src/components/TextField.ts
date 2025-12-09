import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class TextField extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) type: 'text' | 'password' | 'email' | 'number' = 'text';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
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

    .text-field {
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
    }

    .outlined label {
      background-color: white;
      padding: 0 4px;
      top: 50%;
      transform: translateY(-50%);
    }

    .outlined label.floating,
    .outlined label.has-value {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.75rem;
    }

    .filled label {
      top: 20px;
    }

    .filled label.floating,
    .filled label.has-value {
      top: 8px;
      font-size: 0.75rem;
    }

    .standard label {
      top: 0;
    }

    .standard label.floating,
    .standard label.has-value {
      top: -20px;
      font-size: 0.75rem;
    }

    label.focused {
      color: ${theme.palette.primary.main};
    }

    label.error {
      color: ${theme.palette.error.main};
    }

    input {
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.87);
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
      opacity: 1;
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

    .helper-text {
      font-size: 0.75rem;
      margin: 3px 14px 0;
      color: rgba(0, 0, 0, 0.6);
    }

    .helper-text.error {
      color: ${theme.palette.error.main};
    }

    input:disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: not-allowed;
    }

    .input-wrapper.disabled {
      border-color: rgba(0, 0, 0, 0.26);
      pointer-events: none;
    }
  `;

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  private handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
  }

  render() {
    const hasValue = this.value.length > 0;
    const labelClasses = [
      this.focused ? 'floating focused' : '',
      hasValue ? 'has-value' : '',
      this.error ? 'error' : ''
    ].join(' ');

    const wrapperClasses = [
      this.focused ? 'focused' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="text-field ${this.variant} ${this.size}">
        ${this.label ? html`<label class="${labelClasses}">${this.label}${this.required ? ' *' : ''}</label>` : ''}
        <div class="input-wrapper ${wrapperClasses}">
          <input
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            @input="${this.handleInput}"
            @change="${this.handleChange}"
            @focus="${() => this.focused = true}"
            @blur="${() => this.focused = false}"
          />
        </div>
        ${this.helperText ? html`<div class="helper-text ${this.error ? 'error' : ''}">${this.helperText}</div>` : ''}
      </div>
    `;
  }
}
