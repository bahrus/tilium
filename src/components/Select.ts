import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Select extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) fullWidth = false;
  @state() private focused = false;

  static styles = css`
    :host {
      display: inline-block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    .select-field {
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

    select {
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 16.5px 14px;
      outline: none;
      background: white;
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      appearance: none;
    }

    select:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }

    select:focus {
      border-color: ${theme.palette.primary.main};
      border-width: 2px;
      padding: 15.5px 13px;
    }

    select:disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: not-allowed;
      border-color: rgba(0, 0, 0, 0.26);
    }
  `;

  private handleChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const hasValue = this.value.length > 0;
    const labelClasses = [
      this.focused ? 'floating focused' : '',
      hasValue ? 'has-value' : ''
    ].join(' ');

    return html`
      <div class="select-field ${this.variant}">
        ${this.label ? html`<label class="${labelClasses}">${this.label}</label>` : ''}
        <select
          .value="${this.value}"
          ?disabled="${this.disabled}"
          @change="${this.handleChange}"
          @focus="${() => this.focused = true}"
          @blur="${() => this.focused = false}"
        >
          <slot></slot>
        </select>
      </div>
    `;
  }
}
