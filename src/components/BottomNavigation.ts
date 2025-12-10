import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class BottomNavigation extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: Boolean }) showLabels = false;

  @state() private actions: BottomNavigationAction[] = [];

  static styles = css`
    :host {
      display: flex;
      width: 100%;
      background-color: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      box-shadow: 0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12);
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      position: relative;
      z-index: 1100;
    }

    .navigation {
      display: flex;
      width: 100%;
      height: 56px;
      align-items: center;
    }

    /* Show labels variant */
    :host([showLabels]) .navigation {
      height: 64px;
    }

    ::slotted(mui-bottom-navigation-action) {
      flex: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('action-click', this.handleActionClick as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('action-click', this.handleActionClick as EventListener);
  }

  private handleActionClick(e: CustomEvent) {
    const newValue = e.detail.value;
    if (newValue !== this.value) {
      const oldValue = this.value;
      this.value = newValue;
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="navigation">
        <slot></slot>
      </div>
    `;
  }
}

export class BottomNavigationAction extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, reflect: true }) selected = false;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 80px;
      max-width: 168px;
      padding: 6px 12px 8px;
      cursor: pointer;
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding-top 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: rgba(0, 0, 0, 0.6);
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
      user-select: none;
      box-sizing: border-box;
    }

    :host([selected]) {
      color: #1976d2;
      padding-top: 6px;
    }

    :host([disabled]) {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    :host(:not([disabled]):hover) {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([selected]:not([disabled]):hover) {
      color: #1976d2;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      margin-bottom: 2px;
      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([selected]) .icon {
      transform: scale(1.2);
    }

    .label {
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
      opacity: 1;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, font-size 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    /* Hide labels by default unless parent has showLabels */
    :host(:not([selected])) .label {
      opacity: 0;
      font-size: 0.625rem;
    }

    /* Show labels when parent has showLabels attribute */
    :host-context([showLabels]) .label,
    :host-context(mui-bottom-navigation[showLabels]) .label {
      opacity: 1 !important;
      font-size: 0.75rem !important;
    }

    :host-context([showLabels]) .icon,
    :host-context(mui-bottom-navigation[showLabels]) .icon {
      margin-bottom: 4px;
    }

    /* Ripple effect */
    .action {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 0;
      overflow: hidden;
    }

    .action::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: currentColor;
      opacity: 0;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }

    :host(:not([disabled]):active) .action::before {
      opacity: 0.12;
    }

    /* Badge support */
    .icon-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::slotted([slot="badge"]) {
      position: absolute;
      top: -8px;
      right: -8px;
    }
  `;

  private handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('action-click', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="action" @click="${this.handleClick}">
        <div class="icon-container">
          <div class="icon">
            <slot name="icon"></slot>
          </div>
          <slot name="badge"></slot>
        </div>
        ${this.label ? html`<div class="label">${this.label}</div>` : ''}
        <slot name="label"></slot>
      </div>
    `;
  }
}