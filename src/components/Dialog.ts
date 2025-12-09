import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Dialog extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: Boolean }) fullScreen = false;

  static styles = unsafeCSS`
    :host {
      display: none;
    }

    :host([open]) {
      display: block;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1300;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dialog {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: ${theme.shadows[4]};
      margin: 32px;
      position: relative;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      max-height: calc(100% - 64px);
    }

    .dialog.xs { max-width: 444px; }
    .dialog.sm { max-width: 600px; }
    .dialog.md { max-width: 960px; }
    .dialog.lg { max-width: 1280px; }
    .dialog.xl { max-width: 1920px; }

    .dialog.fullWidth {
      width: calc(100% - 64px);
    }

    .dialog.fullScreen {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      margin: 0;
      border-radius: 0;
    }
  `;

  private handleBackdropClick(e: Event) {
    if (e.target === e.currentTarget) {
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }
  }

  render() {
    if (!this.open) return html``;

    const dialogClasses = [
      'dialog',
      this.maxWidth,
      this.fullWidth ? 'fullWidth' : '',
      this.fullScreen ? 'fullScreen' : ''
    ].join(' ');

    return html`
      <div class="backdrop" @click="${this.handleBackdropClick}">
        <div class="${dialogClasses}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export class DialogTitle extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: block;
      padding: 16px 24px;
      font-size: 1.25rem;
      font-weight: 500;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class DialogContent extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: block;
      padding: 8px 24px;
      flex: 1 1 auto;
      overflow-y: auto;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class DialogActions extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: flex;
      align-items: center;
      padding: 8px;
      justify-content: flex-end;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
