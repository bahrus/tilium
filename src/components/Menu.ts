import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export interface MenuItemData {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
  children?: MenuItemData[];
}

export class Menu extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Array }) items: MenuItemData[] = [];
  @property({ type: String }) anchorEl = '';
  @property({ type: String }) anchorOrigin: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-left';
  @property({ type: String }) transformOrigin: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top-left';
  @property({ type: Number }) elevation = 8;
  @property({ type: Boolean }) disableAutoFocus = false;
  @property({ type: Boolean }) disableRestoreFocus = false;
  @property({ type: String }) variant: 'menu' | 'selectedMenu' = 'menu';
  @property({ type: String }) selectedValue = '';

  @state() private _focusedIndex = -1;
  @state() private _submenuOpen: Record<string, boolean> = {};

  private _previousFocus?: HTMLElement;

  static styles = css`
    :host {
      position: fixed;
      z-index: 1300;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      pointer-events: none;
    }

    :host([open]) {
      pointer-events: auto;
    }

    .menu {
      min-width: 112px;
      max-width: 280px;
      max-height: calc(100vh - 96px);
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      padding: 8px 0;
      opacity: 0;
      transform: scale(0.8);
      transform-origin: var(--transform-origin, top left);
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1),
                  transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      overflow-y: auto;
      outline: none;
    }

    .menu.open {
      opacity: 1;
      transform: scale(1);
    }

    /* Elevation variants */
    .menu.elevation-1 {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    .menu.elevation-4 {
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                  0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }

    .menu.elevation-8 {
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .menu.elevation-16 {
      box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
                  0px 16px 24px 2px rgba(0, 0, 0, 0.14),
                  0px 6px 30px 5px rgba(0, 0, 0, 0.12);
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 16px;
      min-height: 48px;
      font-size: 1rem;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      position: relative;
    }

    .menu-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .menu-item:focus {
      background-color: rgba(0, 0, 0, 0.12);
    }

    .menu-item.selected {
      background-color: rgba(25, 118, 210, 0.08);
      color: #1976d2;
    }

    .menu-item.disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    .menu-item.has-submenu::after {
      content: '';
      position: absolute;
      right: 16px;
      width: 0;
      height: 0;
      border-left: 4px solid rgba(0, 0, 0, 0.54);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      fill: currentColor;
    }

    .menu-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .menu-divider {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.12);
      margin: 8px 0;
    }

    /* Submenu positioning */
    .submenu {
      position: absolute;
      left: 100%;
      top: 0;
      z-index: 1;
    }

    .submenu.left {
      left: auto;
      right: 100%;
    }

    /* Dense variant */
    .menu.dense .menu-item {
      min-height: 32px;
      padding: 4px 16px;
      font-size: 0.875rem;
    }

    /* Backdrop */
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background-color: transparent;
    }

    /* Transform origins */
    .menu.transform-top-left {
      transform-origin: top left;
    }

    .menu.transform-top-right {
      transform-origin: top right;
    }

    .menu.transform-bottom-left {
      transform-origin: bottom left;
    }

    .menu.transform-bottom-right {
      transform-origin: bottom right;
    }

    /* Anchor positioning */
    :host(.anchor-top-left) {
      top: var(--anchor-top, 0);
      left: var(--anchor-left, 0);
    }

    :host(.anchor-top-right) {
      top: var(--anchor-top, 0);
      right: var(--anchor-right, 0);
    }

    :host(.anchor-bottom-left) {
      bottom: var(--anchor-bottom, 0);
      left: var(--anchor-left, 0);
    }

    :host(.anchor-bottom-right) {
      bottom: var(--anchor-bottom, 0);
      right: var(--anchor-right, 0);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleDocumentClick.bind(this));
    document.addEventListener('keydown', this._handleDocumentKeydown.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
    document.removeEventListener('keydown', this._handleDocumentKeydown.bind(this));
    this._restoreFocus();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this._handleOpen();
      } else {
        this._handleClose();
      }
    }

    if (changedProperties.has('anchorEl') && this.anchorEl) {
      this._updatePosition();
    }
  }

  private _handleOpen() {
    if (!this.disableAutoFocus) {
      this._previousFocus = document.activeElement as HTMLElement;
      this._focusFirstItem();
    }
    this._updatePosition();
  }

  private _handleClose() {
    this._focusedIndex = -1;
    this._submenuOpen = {};
    if (!this.disableRestoreFocus) {
      this._restoreFocus();
    }
  }

  private _restoreFocus() {
    if (this._previousFocus) {
      this._previousFocus.focus();
      this._previousFocus = undefined;
    }
  }

  private _updatePosition() {
    if (!this.anchorEl) return;

    const anchor = document.getElementById(this.anchorEl) || document.querySelector(this.anchorEl);
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const menuRect = this.getBoundingClientRect();

    // Set positioning directly with inline styles
    switch (this.anchorOrigin) {
      case 'top-left':
        this.style.top = `${anchorRect.top}px`;
        this.style.left = `${anchorRect.left}px`;
        this.style.right = 'auto';
        this.style.bottom = 'auto';
        break;
      case 'top-right':
        this.style.top = `${anchorRect.top}px`;
        this.style.right = `${window.innerWidth - anchorRect.right}px`;
        this.style.left = 'auto';
        this.style.bottom = 'auto';
        break;
      case 'bottom-left':
        this.style.top = `${anchorRect.bottom}px`;
        this.style.left = `${anchorRect.left}px`;
        this.style.right = 'auto';
        this.style.bottom = 'auto';
        break;
      case 'bottom-right':
        this.style.top = `${anchorRect.bottom}px`;
        this.style.right = `${window.innerWidth - anchorRect.right}px`;
        this.style.left = 'auto';
        this.style.bottom = 'auto';
        break;
    }
  }

  private _handleDocumentClick(event: Event) {
    const target = event.target as Element;
    if (!this.contains(target) && this.open) {
      this._closeMenu();
    }
  }

  private _handleDocumentKeydown(event: KeyboardEvent) {
    if (!this.open) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this._closeMenu();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._focusNextItem();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._focusPreviousItem();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this._openSubmenu();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this._closeSubmenu();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this._selectFocusedItem();
        break;
      case 'Home':
        event.preventDefault();
        this._focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this._focusLastItem();
        break;
    }
  }

  private _focusFirstItem() {
    const firstEnabledIndex = this.items.findIndex(item => !item.disabled && !item.divider);
    if (firstEnabledIndex !== -1) {
      this._focusedIndex = firstEnabledIndex;
      this.requestUpdate();
    }
  }

  private _focusLastItem() {
    for (let i = this.items.length - 1; i >= 0; i--) {
      if (!this.items[i].disabled && !this.items[i].divider) {
        this._focusedIndex = i;
        this.requestUpdate();
        break;
      }
    }
  }

  private _focusNextItem() {
    for (let i = this._focusedIndex + 1; i < this.items.length; i++) {
      if (!this.items[i].disabled && !this.items[i].divider) {
        this._focusedIndex = i;
        this.requestUpdate();
        break;
      }
    }
  }

  private _focusPreviousItem() {
    for (let i = this._focusedIndex - 1; i >= 0; i--) {
      if (!this.items[i].disabled && !this.items[i].divider) {
        this._focusedIndex = i;
        this.requestUpdate();
        break;
      }
    }
  }

  private _openSubmenu() {
    const focusedItem = this.items[this._focusedIndex];
    if (focusedItem?.children) {
      this._submenuOpen = { ...this._submenuOpen, [focusedItem.id]: true };
      this.requestUpdate();
    }
  }

  private _closeSubmenu() {
    const focusedItem = this.items[this._focusedIndex];
    if (focusedItem) {
      this._submenuOpen = { ...this._submenuOpen, [focusedItem.id]: false };
      this.requestUpdate();
    }
  }

  private _selectFocusedItem() {
    const focusedItem = this.items[this._focusedIndex];
    if (focusedItem && !focusedItem.disabled) {
      this._handleItemClick(focusedItem, this._focusedIndex);
    }
  }

  private _closeMenu() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleItemClick(item: MenuItemData, index: number) {
    if (item.disabled) return;

    if (item.children) {
      // Toggle submenu
      this._submenuOpen = {
        ...this._submenuOpen,
        [item.id]: !this._submenuOpen[item.id]
      };
      this.requestUpdate();
    } else {
      // Select item and close menu
      this.dispatchEvent(new CustomEvent('select', {
        bubbles: true,
        composed: true,
        detail: { item, index }
      }));
      this._closeMenu();
    }
  }

  private _renderIcon(iconName?: string) {
    if (!iconName) return '';

    // Simple icon mapping - in a real implementation, you might use a proper icon library
    const icons: Record<string, string> = {
      home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      settings: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
      edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
      delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
      copy: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
      share: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
      check: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
    };

    const path = icons[iconName] || icons.check;

    return html`
      <svg class="menu-icon" viewBox="0 0 24 24">
        <path d="${path}"/>
      </svg>
    `;
  }

  private _renderMenuItem(item: MenuItemData, index: number) {
    if (item.divider) {
      return html`<div class="menu-divider"></div>`;
    }

    const isSelected = this.variant === 'selectedMenu' && this.selectedValue === item.id;
    const isFocused = this._focusedIndex === index;
    const hasSubmenu = item.children && item.children.length > 0;

    const classes = [
      'menu-item',
      item.disabled ? 'disabled' : '',
      isSelected ? 'selected' : '',
      hasSubmenu ? 'has-submenu' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button
        class="${classes}"
        tabindex="${isFocused ? '0' : '-1'}"
        @click="${() => this._handleItemClick(item, index)}"
        @mouseenter="${() => { this._focusedIndex = index; this.requestUpdate(); }}"
      >
        ${this._renderIcon(item.icon)}
        <span class="menu-text">${item.label}</span>
        ${isSelected ? this._renderIcon('check') : ''}
      </button>
      
      ${hasSubmenu && this._submenuOpen[item.id] ? html`
        <div class="submenu">
          <mui-menu
            .open=${true}
            .items=${item.children}
            @select=${this._handleSubmenuSelect}
            @close=${() => this._closeSubmenu()}
          ></mui-menu>
        </div>
      ` : ''}
    `;
  }

  private _handleSubmenuSelect(event: CustomEvent) {
    // Propagate submenu selection
    this.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      composed: true,
      detail: event.detail
    }));
    this._closeMenu();
  }

  render() {
    const classes = [
      'menu',
      this.open ? 'open' : '',
      `elevation-${this.elevation}`,
      `transform-${this.transformOrigin}`
    ].filter(Boolean).join(' ');

    return html`
      <div class="backdrop" style="display: ${this.open ? 'block' : 'none'}"></div>
      <div 
        class="${classes}"
        role="menu"
        tabindex="-1"
        style="display: ${this.open ? 'block' : 'none'}"
        @keydown=${this._handleDocumentKeydown}
      >
        ${this.items.map((item, index) => this._renderMenuItem(item, index))}
      </div>
    `;
  }
}

export class MenuItem extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) itemDisabled = false;
  @property({ type: String }) itemIcon = '';

  static styles = css`
    :host {
      display: block;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 16px;
      min-height: 48px;
      font-size: 1rem;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }

    .menu-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .menu-item:focus {
      background-color: rgba(0, 0, 0, 0.12);
    }

    .menu-item.selected {
      background-color: rgba(25, 118, 210, 0.08);
      color: #1976d2;
    }

    .menu-item.item-disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    .menu-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      fill: currentColor;
    }

    .menu-text {
      flex: 1;
    }
  `;

  private _handleClick() {
    if (this.itemDisabled) return;

    this.dispatchEvent(new CustomEvent('menu-item-click', {
      bubbles: true,
      composed: true,
      detail: { value: this.value }
    }));
  }

  render() {
    const classes = [
      'menu-item',
      this.selected ? 'selected' : '',
      this.itemDisabled ? 'item-disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button class="${classes}" @click="${this._handleClick}">
        ${this.itemIcon ? html`
          <svg class="menu-icon" viewBox="0 0 24 24">
            <use href="#${this.itemIcon}"></use>
          </svg>
        ` : ''}
        <span class="menu-text">
          <slot></slot>
        </span>
      </button>
    `;
  }
}