import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class List extends LitElement {
  @property({ type: Boolean }) dense = false;
  @property({ type: Boolean }) disablePadding = false;
  @property({ type: String }) subheader = '';

  static styles = unsafeCSS`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .list {
      margin: 0;
      padding: 8px 0;
      position: relative;
      list-style: none;
    }

    .list.dense {
      padding: 4px 0;
    }

    .list.disablePadding {
      padding: 0;
    }

    .subheader {
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 48px;
      padding: 0 16px;
      position: sticky;
      top: 0;
      background-color: inherit;
      z-index: 1;
    }

    .subheader.dense {
      line-height: 40px;
    }
  `;

  render() {
    const listClasses = [
      'list',
      this.dense ? 'dense' : '',
      this.disablePadding ? 'disablePadding' : ''
    ].filter(Boolean).join(' ');

    return html`
      ${this.subheader ? html`
        <div class="subheader ${this.dense ? 'dense' : ''}">${this.subheader}</div>
      ` : ''}
      <ul class="${listClasses}">
        <slot></slot>
      </ul>
    `;
  }
}

export class ListItem extends LitElement {
  @property({ type: Boolean }) dense = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) divider = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) alignItems: 'flex-start' | 'center' = 'center';

  static styles = unsafeCSS`
    :host {
      display: block;
    }

    .list-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      text-decoration: none;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      padding: 8px 16px;
      min-height: 48px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .list-item.dense {
      min-height: 32px;
      padding: 4px 16px;
    }

    .list-item.alignItems-flex-start {
      align-items: flex-start;
    }

    .list-item.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .list-item.divider {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .list-item.selected {
      background-color: rgba(25, 118, 210, 0.08);
    }
  `;

  render() {
    const classes = [
      'list-item',
      this.dense ? 'dense' : '',
      this.disabled ? 'disabled' : '',
      this.divider ? 'divider' : '',
      this.selected ? 'selected' : '',
      `alignItems-${this.alignItems}`
    ].filter(Boolean).join(' ');

    return html`
      <li class="${classes}">
        <slot></slot>
      </li>
    `;
  }
}

export class ListItemButton extends LitElement {
  @property({ type: Boolean }) dense = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) divider = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: String }) alignItems: 'flex-start' | 'center' = 'center';

  static styles = unsafeCSS`
    :host {
      display: block;
    }

    .list-item-button {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      text-decoration: none;
      width: 100%;
      box-sizing: border-box;
      text-align: left;
      padding: 8px 16px;
      min-height: 48px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      cursor: pointer;
      background: none;
      border: none;
      outline: none;
      color: inherit;
      font: inherit;
    }

    .list-item-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .list-item-button:focus {
      background-color: rgba(0, 0, 0, 0.12);
    }

    .list-item-button.dense {
      min-height: 32px;
      padding: 4px 16px;
    }

    .list-item-button.alignItems-flex-start {
      align-items: flex-start;
    }

    .list-item-button.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .list-item-button.divider {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .list-item-button.selected {
      background-color: rgba(25, 118, 210, 0.08);
    }

    .list-item-button.selected:hover {
      background-color: rgba(25, 118, 210, 0.12);
    }
  `;

  private handleClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    
    this.dispatchEvent(new CustomEvent('click', {
      detail: { selected: this.selected },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classes = [
      'list-item-button',
      this.dense ? 'dense' : '',
      this.disabled ? 'disabled' : '',
      this.divider ? 'divider' : '',
      this.selected ? 'selected' : '',
      `alignItems-${this.alignItems}`
    ].filter(Boolean).join(' ');

    return html`
      <button class="${classes}" @click="${this.handleClick}" ?disabled="${this.disabled}">
        <slot></slot>
      </button>
    `;
  }
}

export class ListItemText extends LitElement {
  @property({ type: String }) primary = '';
  @property({ type: String }) secondary = '';
  @property({ type: Boolean }) inset = false;

  static styles = unsafeCSS`
    :host {
      display: block;
      flex: 1 1 auto;
      min-width: 0;
      margin: 4px 0;
    }

    .list-item-text {
      margin: 0;
    }

    .list-item-text.inset {
      padding-left: 56px;
    }

    .primary {
      color: rgba(0, 0, 0, 0.87);
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      margin: 0;
    }

    .secondary {
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      margin: 0;
      margin-top: 4px;
    }

    .primary-only {
      margin: 8px 0;
    }
  `;

  render() {
    const hasSecondary = this.secondary || this.querySelector('[slot="secondary"]');
    
    return html`
      <div class="list-item-text ${this.inset ? 'inset' : ''}">
        <div class="primary ${!hasSecondary ? 'primary-only' : ''}">
          ${this.primary || html`<slot name="primary"></slot>`}
        </div>
        ${hasSecondary ? html`
          <div class="secondary">
            ${this.secondary || html`<slot name="secondary"></slot>`}
          </div>
        ` : ''}
      </div>
    `;
  }
}

export class ListItemIcon extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: inline-flex;
      min-width: 56px;
      color: rgba(0, 0, 0, 0.54);
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-start;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class ListItemAvatar extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: inline-flex;
      min-width: 56px;
      flex-shrink: 0;
      align-items: center;
      justify-content: flex-start;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class ListItemSecondaryAction extends LitElement {
  static styles = unsafeCSS`
    :host {
      display: flex;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}