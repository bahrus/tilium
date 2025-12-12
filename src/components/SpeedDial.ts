import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export interface SpeedDialActionData {
  id: string;
  icon: string;
  tooltipTitle?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export class SpeedDial extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) direction: 'up' | 'down' | 'left' | 'right' = 'up';
  @property({ type: Boolean }) hidden = false;
  @property({ type: String }) icon = 'add';
  @property({ type: String }) openIcon = '';
  @property({ type: Array }) actions: SpeedDialActionData[] = [];
  @property({ type: String }) ariaLabel = 'SpeedDial';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' = 'default';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) tooltipTitle = '';
  @property({ type: String }) TransitionComponent = 'zoom';
  @property({ type: Number }) transitionDuration = 250;

  @state() private _focusedActionIndex = -1;

  static styles = css`
    :host {
      position: fixed;
      z-index: 1050;
      display: flex;
      align-items: center;
      pointer-events: none;
    }

    :host([hidden]) {
      display: none;
    }

    .speed-dial {
      position: relative;
      display: flex;
      align-items: center;
      pointer-events: auto;
    }

    .speed-dial.direction-up {
      flex-direction: column-reverse;
    }

    .speed-dial.direction-down {
      flex-direction: column;
    }

    .speed-dial.direction-left {
      flex-direction: row-reverse;
    }

    .speed-dial.direction-right {
      flex-direction: row;
    }

    .speed-dial-fab {
      position: relative;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
                  0px 6px 10px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 18px 0px rgba(0, 0, 0, 0.12);
      outline: none;
      z-index: 1;
    }

    .speed-dial-fab:hover {
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .speed-dial-fab:active {
      box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
                  0px 12px 17px 2px rgba(0, 0, 0, 0.14),
                  0px 5px 22px 4px rgba(0, 0, 0, 0.12);
    }

    .speed-dial-fab.color-default {
      background-color: #e0e0e0;
      color: rgba(0, 0, 0, 0.87);
    }

    .speed-dial-fab.color-primary {
      background-color: #1976d2;
      color: #fff;
    }

    .speed-dial-fab.color-secondary {
      background-color: #dc004e;
      color: #fff;
    }

    .speed-dial-fab.disabled {
      background-color: rgba(0, 0, 0, 0.12);
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    }

    .speed-dial-fab.open {
      transform: rotate(45deg);
    }

    .speed-dial-icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .speed-dial-icon.open {
      transform: rotate(180deg);
    }

    .speed-dial-actions {
      display: flex;
      position: absolute;
      pointer-events: none;
    }

    .speed-dial.direction-up .speed-dial-actions {
      flex-direction: column-reverse;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
    }

    .speed-dial.direction-down .speed-dial-actions {
      flex-direction: column;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
    }

    .speed-dial.direction-left .speed-dial-actions {
      flex-direction: row-reverse;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }

    .speed-dial.direction-right .speed-dial-actions {
      flex-direction: row;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 8px;
    }

    .speed-dial-actions.open {
      pointer-events: auto;
    }

    /* Backdrop */
    .speed-dial-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-color: transparent;
      pointer-events: none;
    }

    .speed-dial-backdrop.open {
      pointer-events: auto;
    }

    /* Focus ring */
    .speed-dial-fab:focus-visible {
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
                  0px 6px 10px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 18px 0px rgba(0, 0, 0, 0.12),
                  0 0 0 2px rgba(25, 118, 210, 0.2);
    }
  `;

  private _renderIcon(iconName: string) {
    // Simple icon mapping - in a real implementation, you might use a proper icon library
    const icons: Record<string, string> = {
      add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
      edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
      share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
      print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
      copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
      save: 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
    };

    const path = icons[iconName] || icons.add;

    return html`
      <svg class="speed-dial-icon ${this.open ? 'open' : ''}" viewBox="0 0 24 24">
        <path d="${path}"/>
      </svg>
    `;
  }

  private _handleFabClick() {
    if (this.disabled) return;

    this.open = !this.open;
    this._focusedActionIndex = -1;

    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: { open: this.open }
    }));
  }

  private _handleBackdropClick() {
    if (this.open) {
      this.open = false;
      this._focusedActionIndex = -1;
      
      this.dispatchEvent(new CustomEvent('close', {
        bubbles: true,
        composed: true,
        detail: { reason: 'backdropClick' }
      }));
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.key) {
      case 'Escape':
        if (this.open) {
          event.preventDefault();
          this.open = false;
          this._focusedActionIndex = -1;
          this.dispatchEvent(new CustomEvent('close', {
            bubbles: true,
            composed: true,
            detail: { reason: 'escapeKeyDown' }
          }));
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this._handleFabClick();
        break;
      case 'ArrowUp':
        if (this.open && this.direction === 'up') {
          event.preventDefault();
          this._focusNextAction();
        }
        break;
      case 'ArrowDown':
        if (this.open && this.direction === 'down') {
          event.preventDefault();
          this._focusNextAction();
        }
        break;
      case 'ArrowLeft':
        if (this.open && this.direction === 'left') {
          event.preventDefault();
          this._focusNextAction();
        }
        break;
      case 'ArrowRight':
        if (this.open && this.direction === 'right') {
          event.preventDefault();
          this._focusNextAction();
        }
        break;
    }
  }

  private _focusNextAction() {
    const enabledActions = this.actions.filter(action => !action.disabled);
    if (enabledActions.length === 0) return;

    this._focusedActionIndex = (this._focusedActionIndex + 1) % enabledActions.length;
    this.requestUpdate();

    // Focus the action element
    setTimeout(() => {
      const actionElements = this.shadowRoot?.querySelectorAll('mui-speed-dial-action');
      const targetAction = actionElements?.[this._focusedActionIndex] as HTMLElement;
      targetAction?.focus();
    }, 0);
  }

  private _handleActionClick(action: SpeedDialActionData, index: number) {
    if (action.disabled) return;

    this.dispatchEvent(new CustomEvent('action-click', {
      bubbles: true,
      composed: true,
      detail: { action, index }
    }));

    // Execute action callback if provided
    if (action.onClick) {
      action.onClick();
    }

    // Close speed dial after action
    this.open = false;
    this._focusedActionIndex = -1;
  }

  render() {
    const fabClasses = [
      'speed-dial-fab',
      `color-${this.color}`,
      this.open ? 'open' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    const speedDialClasses = [
      'speed-dial',
      `direction-${this.direction}`
    ].filter(Boolean).join(' ');

    const actionsClasses = [
      'speed-dial-actions',
      this.open ? 'open' : ''
    ].filter(Boolean).join(' ');

    const backdropClasses = [
      'speed-dial-backdrop',
      this.open ? 'open' : ''
    ].filter(Boolean).join(' ');

    const currentIcon = this.open && this.openIcon ? this.openIcon : this.icon;

    return html`
      <div class="${backdropClasses}" @click="${this._handleBackdropClick}"></div>
      <div class="${speedDialClasses}">
        <button
          class="${fabClasses}"
          aria-label="${this.ariaLabel}"
          aria-expanded="${this.open}"
          aria-haspopup="true"
          ?disabled="${this.disabled}"
          @click="${this._handleFabClick}"
          @keydown="${this._handleKeyDown}"
        >
          ${this._renderIcon(currentIcon)}
        </button>
        
        <div class="${actionsClasses}">
          ${this.actions.map((action, index) => html`
            <mui-speed-dial-action
              .icon="${action.icon}"
              .tooltipTitle="${action.tooltipTitle || ''}"
              ?disabled="${action.disabled || false}"
              ?open="${this.open}"
              .delay="${index * 50}"
              @click="${() => this._handleActionClick(action, index)}"
            ></mui-speed-dial-action>
          `)}
        </div>
      </div>
    `;
  }
}

export class SpeedDialAction extends LitElement {
  @property({ type: String }) icon = '';
  @property({ type: String }) tooltipTitle = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) open = false;
  @property({ type: Number }) delay = 0;

  static styles = css`
    :host {
      display: block;
      margin: 4px;
    }

    .speed-dial-action {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12);
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
      transform: scale(0);
      opacity: 0;
      outline: none;
    }

    .speed-dial-action.open {
      transform: scale(1);
      opacity: 1;
    }

    .speed-dial-action:hover {
      background-color: #f5f5f5;
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
                  0px 6px 10px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 18px 0px rgba(0, 0, 0, 0.12);
    }

    .speed-dial-action:active {
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .speed-dial-action.disabled {
      background-color: rgba(0, 0, 0, 0.12);
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
      box-shadow: none;
    }

    .speed-dial-action:focus-visible {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12),
                  0 0 0 2px rgba(25, 118, 210, 0.2);
    }

    .action-icon {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .tooltip {
      position: absolute;
      background-color: rgba(97, 97, 97, 0.9);
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }

    .speed-dial-action:hover .tooltip {
      opacity: 1;
    }

    /* Tooltip positioning based on parent direction */
    :host(.direction-up) .tooltip {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 8px;
    }

    :host(.direction-down) .tooltip {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 8px;
    }

    :host(.direction-left) .tooltip {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 8px;
    }

    :host(.direction-right) .tooltip {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 8px;
    }
  `;

  private _renderIcon(iconName: string) {
    // Simple icon mapping - same as SpeedDial
    const icons: Record<string, string> = {
      add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
      edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
      share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
      print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
      copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
      save: 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z',
      delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
      favorite: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
    };

    const path = icons[iconName] || icons.add;

    return html`
      <svg class="action-icon" viewBox="0 0 24 24">
        <path d="${path}"/>
      </svg>
    `;
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        // Stagger the animation based on delay
        setTimeout(() => {
          this.style.transitionDelay = `${this.delay}ms`;
        }, 0);
      } else {
        this.style.transitionDelay = '0ms';
      }
    }
  }

  private _handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true,
      detail: { icon: this.icon, tooltipTitle: this.tooltipTitle }
    }));
  }

  render() {
    const classes = [
      'speed-dial-action',
      this.open ? 'open' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button
        class="${classes}"
        aria-label="${this.tooltipTitle || this.icon}"
        ?disabled="${this.disabled}"
        tabindex="${this.open ? '0' : '-1'}"
        @click="${this._handleClick}"
      >
        ${this._renderIcon(this.icon)}
        ${this.tooltipTitle ? html`
          <div class="tooltip">${this.tooltipTitle}</div>
        ` : ''}
      </button>
    `;
  }
}