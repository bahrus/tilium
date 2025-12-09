import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Button extends LitElement {
  @property({ type: String }) variant: 'text' | 'contained' | 'outlined' = 'text';
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) href?: string;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    button, a {
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      border: none;
      cursor: pointer;
      outline: none;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
      width: 100%;
    }

    button:disabled, a:disabled {
      cursor: default;
      pointer-events: none;
    }

    /* Size variants */
    .small { padding: 4px 10px; font-size: 0.8125rem; }
    .medium { padding: 6px 16px; font-size: 0.875rem; }
    .large { padding: 8px 22px; font-size: 0.9375rem; }

    /* Text variant */
    .text { background-color: transparent; }
    .text.primary { color: ${theme.palette.primary.main}; }
    .text.secondary { color: ${theme.palette.secondary.main}; }
    .text.error { color: ${theme.palette.error.main}; }
    .text.warning { color: ${theme.palette.warning.main}; }
    .text.info { color: ${theme.palette.info.main}; }
    .text.success { color: ${theme.palette.success.main}; }
    .text:hover { background-color: rgba(25, 118, 210, 0.04); }
    .text:disabled { color: rgba(0, 0, 0, 0.26); }

    /* Contained variant */
    .contained { box-shadow: ${theme.shadows[2]}; }
    .contained.primary { background-color: ${theme.palette.primary.main}; color: ${theme.palette.primary.contrastText}; }
    .contained.secondary { background-color: ${theme.palette.secondary.main}; color: ${theme.palette.secondary.contrastText}; }
    .contained.error { background-color: ${theme.palette.error.main}; color: ${theme.palette.error.contrastText}; }
    .contained.warning { background-color: ${theme.palette.warning.main}; color: ${theme.palette.warning.contrastText}; }
    .contained.info { background-color: ${theme.palette.info.main}; color: ${theme.palette.info.contrastText}; }
    .contained.success { background-color: ${theme.palette.success.main}; color: ${theme.palette.success.contrastText}; }
    .contained:hover { box-shadow: ${theme.shadows[4]}; }
    .contained.primary:hover { background-color: ${theme.palette.primary.dark}; }
    .contained.secondary:hover { background-color: ${theme.palette.secondary.dark}; }
    .contained:disabled { background-color: rgba(0, 0, 0, 0.12); color: rgba(0, 0, 0, 0.26); box-shadow: none; }

    /* Outlined variant */
    .outlined { background-color: transparent; border: 1px solid; }
    .outlined.primary { color: ${theme.palette.primary.main}; border-color: rgba(25, 118, 210, 0.5); }
    .outlined.secondary { color: ${theme.palette.secondary.main}; border-color: rgba(156, 39, 176, 0.5); }
    .outlined.error { color: ${theme.palette.error.main}; border-color: rgba(211, 47, 47, 0.5); }
    .outlined.warning { color: ${theme.palette.warning.main}; border-color: rgba(237, 108, 2, 0.5); }
    .outlined.info { color: ${theme.palette.info.main}; border-color: rgba(2, 136, 209, 0.5); }
    .outlined.success { color: ${theme.palette.success.main}; border-color: rgba(46, 125, 50, 0.5); }
    .outlined:hover { background-color: rgba(25, 118, 210, 0.04); }
    .outlined:disabled { color: rgba(0, 0, 0, 0.26); border-color: rgba(0, 0, 0, 0.12); }
  `;

  render() {
    const classes = `${this.variant} ${this.color} ${this.size}`;
    
    if (this.href) {
      return html`
        <a href="${this.href}" class="${classes}" ?disabled="${this.disabled}">
          <slot></slot>
        </a>
      `;
    }

    return html`
      <button class="${classes}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}
