import { LitElement, html, unsafeCSS, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Checkbox extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';

  static styles = unsafeCSS`
    :host {
      display: inline-block;
    }

    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
    }

    .checkbox-wrapper.disabled {
      cursor: default;
      pointer-events: none;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .medium .checkbox {
      width: 42px;
      height: 42px;
    }

    .small .checkbox {
      width: 38px;
      height: 38px;
    }

    .checkbox:hover {
      background-color: rgba(25, 118, 210, 0.04);
    }

    svg {
      width: 24px;
      height: 24px;
    }

    .small svg {
      width: 20px;
      height: 20px;
    }

    .icon-unchecked {
      fill: rgba(0, 0, 0, 0.54);
    }

    .icon-checked.primary { fill: ${theme.palette.primary.main}; }
    .icon-checked.secondary { fill: ${theme.palette.secondary.main}; }
    .icon-checked.error { fill: ${theme.palette.error.main}; }
    .icon-checked.warning { fill: ${theme.palette.warning.main}; }
    .icon-checked.info { fill: ${theme.palette.info.main}; }
    .icon-checked.success { fill: ${theme.palette.success.main}; }

    .disabled .icon-unchecked,
    .disabled .icon-checked {
      fill: rgba(0, 0, 0, 0.26);
    }
  `;

  private handleChange(e: Event) {
    if (this.disabled) return;
    
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  private renderIcon() {
    if (this.indeterminate) {
      return svg`
        <svg class="icon-checked ${this.color}" focusable="false" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path>
        </svg>
      `;
    }

    if (this.checked) {
      return svg`
        <svg class="icon-checked ${this.color}" focusable="false" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      `;
    }

    return svg`
      <svg class="icon-unchecked" focusable="false" viewBox="0 0 24 24">
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
      </svg>
    `;
  }

  render() {
    return html`
      <label class="checkbox-wrapper ${this.size} ${this.disabled ? 'disabled' : ''}">
        <input
          type="checkbox"
          .checked="${this.checked}"
          .indeterminate="${this.indeterminate}"
          ?disabled="${this.disabled}"
          @change="${this.handleChange}"
        />
        <span class="checkbox">
          ${this.renderIcon()}
        </span>
      </label>
    `;
  }
}
