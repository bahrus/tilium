import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class IconButton extends LitElement {
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: none;
      background-color: transparent;
      cursor: pointer;
      outline: none;
      border-radius: 50%;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: rgba(0, 0, 0, 0.54);
    }

    .small { padding: 5px; font-size: 1.125rem; }
    .medium { padding: 8px; font-size: 1.5rem; }
    .large { padding: 12px; font-size: 1.75rem; }

    button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    button.primary { color: ${theme.palette.primary.main}; }
    button.secondary { color: ${theme.palette.secondary.main}; }
    button.error { color: ${theme.palette.error.main}; }
    button.warning { color: ${theme.palette.warning.main}; }
    button.info { color: ${theme.palette.info.main}; }
    button.success { color: ${theme.palette.success.main}; }

    button:disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }
  `;

  render() {
    return html`
      <button class="${this.color} ${this.size}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}
