import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Fab extends LitElement {
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'large';
  @property({ type: String }) variant: 'circular' | 'extended' = 'circular';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) href?: string;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
      position: relative;
    }

    .fab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      background-color: transparent;
      outline: 0;
      border: 0;
      margin: 0;
      border-radius: 50%;
      padding: 0;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
      text-decoration: none;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      min-height: 36px;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      box-shadow: ${theme.shadows[3]};
    }

    .fab:hover {
      box-shadow: ${theme.shadows[4]};
    }

    .fab:active {
      box-shadow: ${theme.shadows[3]};
    }

    .fab:disabled {
      color: rgba(0, 0, 0, 0.26);
      box-shadow: ${theme.shadows[0]};
      background-color: rgba(0, 0, 0, 0.12);
      cursor: default;
      pointer-events: none;
    }

    /* Size variants */
    .fab.small {
      width: 40px;
      height: 40px;
      min-height: 40px;
    }

    .fab.medium {
      width: 48px;
      height: 48px;
      min-height: 48px;
    }

    .fab.large {
      width: 56px;
      height: 56px;
      min-height: 56px;
    }

    /* Extended variant */
    .fab.extended {
      border-radius: 24px;
      padding: 0 16px;
      min-width: 48px;
      height: 48px;
      min-height: 48px;
    }

    .fab.extended.small {
      height: 32px;
      min-height: 32px;
      border-radius: 16px;
      padding: 0 12px;
    }

    .fab.extended.large {
      height: 56px;
      min-height: 56px;
      border-radius: 28px;
      padding: 0 20px;
    }

    /* Color variants */
    .fab.default {
      color: rgba(0, 0, 0, 0.87);
      background-color: #e0e0e0;
    }

    .fab.default:hover {
      background-color: #d5d5d5;
    }

    .fab.primary {
      color: ${theme.palette.primary.contrastText};
      background-color: ${theme.palette.primary.main};
    }

    .fab.primary:hover {
      background-color: ${theme.palette.primary.dark};
    }

    .fab.secondary {
      color: ${theme.palette.secondary.contrastText};
      background-color: ${theme.palette.secondary.main};
    }

    .fab.secondary:hover {
      background-color: ${theme.palette.secondary.dark};
    }

    .fab.error {
      color: ${theme.palette.error.contrastText};
      background-color: ${theme.palette.error.main};
    }

    .fab.error:hover {
      background-color: ${theme.palette.error.dark};
    }

    .fab.warning {
      color: ${theme.palette.warning.contrastText};
      background-color: ${theme.palette.warning.main};
    }

    .fab.warning:hover {
      background-color: ${theme.palette.warning.dark};
    }

    .fab.info {
      color: ${theme.palette.info.contrastText};
      background-color: ${theme.palette.info.main};
    }

    .fab.info:hover {
      background-color: ${theme.palette.info.dark};
    }

    .fab.success {
      color: ${theme.palette.success.contrastText};
      background-color: ${theme.palette.success.main};
    }

    .fab.success:hover {
      background-color: ${theme.palette.success.dark};
    }

    /* Content layout */
    .fab-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .fab.circular .fab-content {
      gap: 0;
    }

    /* Icon sizing */
    .fab-content ::slotted(svg) {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .fab.small .fab-content ::slotted(svg) {
      width: 20px;
      height: 20px;
    }

    .fab.large .fab-content ::slotted(svg) {
      width: 28px;
      height: 28px;
    }

    /* Text content for extended FABs */
    .fab-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .fab.circular .fab-text {
      display: none;
    }
  `;

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    
    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classes = [
      'fab',
      this.color,
      this.size,
      this.variant
    ].join(' ');

    const content = html`
      <span class="fab-content">
        <slot name="icon"></slot>
        <span class="fab-text">
          <slot></slot>
        </span>
      </span>
    `;

    if (this.href && !this.disabled) {
      return html`
        <a 
          href="${this.href}" 
          class="${classes}"
          @click="${this.handleClick}"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button 
        class="${classes}" 
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
      >
        ${content}
      </button>
    `;
  }
}