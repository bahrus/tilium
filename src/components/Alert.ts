import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Alert extends LitElement {
  @property({ type: String }) severity: 'error' | 'warning' | 'info' | 'success' = 'info';
  @property({ type: String }) variant: 'standard' | 'filled' | 'outlined' = 'standard';
  @property({ type: Boolean }) closable = false;

  static styles = unsafeCSS `
    :host {
      display: block;
    }

    .alert {
      display: flex;
      padding: 6px 16px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 0.875rem;
      border-radius: 4px;
      align-items: center;
    }

    .standard.error { background-color: rgb(253, 237, 237); color: rgb(95, 33, 32); }
    .standard.warning { background-color: rgb(255, 244, 229); color: rgb(102, 60, 0); }
    .standard.info { background-color: rgb(229, 246, 253); color: rgb(1, 67, 97); }
    .standard.success { background-color: rgb(237, 247, 237); color: rgb(30, 70, 32); }

    .filled.error { background-color: ${theme.palette.error.main}; color: #fff; }
    .filled.warning { background-color: ${theme.palette.warning.main}; color: #fff; }
    .filled.info { background-color: ${theme.palette.info.main}; color: #fff; }
    .filled.success { background-color: ${theme.palette.success.main}; color: #fff; }

    .outlined {
      border: 1px solid;
      background-color: transparent;
    }

    .outlined.error { border-color: ${theme.palette.error.main}; color: ${theme.palette.error.main}; }
    .outlined.warning { border-color: ${theme.palette.warning.main}; color: ${theme.palette.warning.main}; }
    .outlined.info { border-color: ${theme.palette.info.main}; color: ${theme.palette.info.main}; }
    .outlined.success { border-color: ${theme.palette.success.main}; color: ${theme.palette.success.main}; }

    .content {
      flex: 1;
      padding: 8px 0;
    }

    .close-button {
      margin-left: auto;
      padding: 4px;
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.7;
      font-size: 20px;
      color: inherit;
    }

    .close-button:hover {
      opacity: 1;
    }
  `;

  private handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="alert ${this.variant} ${this.severity}">
        <div class="content">
          <slot></slot>
        </div>
        ${this.closable ? html`<button class="close-button" @click="${this.handleClose}">×</button>` : ''}
      </div>
    `;
  }
}
