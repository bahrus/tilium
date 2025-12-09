import { LitElement, html, css, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Radio extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: String }) value = '';

  static styles = css`
    :host {
      display: inline-block;
    }

    .radio-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      user-select: none;
    }

    .radio-wrapper.disabled {
      cursor: default;
      pointer-events: none;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .radio {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .medium .radio { width: 42px; height: 42px; }
    .small .radio { width: 38px; height: 38px; }

    .radio:hover {
      background-color: rgba(25, 118, 210, 0.04);
    }

    svg { width: 24px; height: 24px; }
    .small svg { width: 20px; height: 20px; }

    .icon-unchecked { fill: rgba(0, 0, 0, 0.54); }
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
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <label class="radio-wrapper ${this.size} ${this.disabled ? 'disabled' : ''}">
        <input
          type="radio"
          .checked="${this.checked}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          @change="${this.handleChange}"
        />
        <span class="radio">
          ${this.checked ? svg`
            <svg class="icon-checked ${this.color}" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
          ` : svg`
            <svg class="icon-unchecked" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
          `}
        </span>
      </label>
    `;
  }
}
