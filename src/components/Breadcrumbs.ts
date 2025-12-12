import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  disabled?: boolean;
  icon?: string;
}

export class Breadcrumbs extends LitElement {
  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String }) separator = '/';
  @property({ type: Number }) maxItems = 8;
  @property({ type: Number }) itemsBeforeCollapse = 1;
  @property({ type: Number }) itemsAfterCollapse = 1;
  @property({ type: Boolean }) expandText = false;

  static styles = css`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .breadcrumb-item {
      display: flex;
      align-items: center;
    }

    .breadcrumb-item:not(:last-child)::after {
      content: var(--separator, '/');
      margin: 0 8px;
      color: rgba(0, 0, 0, 0.54);
      font-size: 0.875rem;
      user-select: none;
    }

    .breadcrumb-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #1976d2;
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      border-radius: 4px;
      padding: 4px 8px;
      margin: -4px -8px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .breadcrumb-link:hover {
      background-color: rgba(25, 118, 210, 0.04);
    }

    .breadcrumb-link:focus {
      outline: none;
      background-color: rgba(25, 118, 210, 0.12);
    }

    .breadcrumb-link.disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    .breadcrumb-text {
      display: flex;
      align-items: center;
      gap: 4px;
      color: rgba(0, 0, 0, 0.87);
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
    }

    .breadcrumb-text.disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    .breadcrumb-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .collapse-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: rgba(0, 0, 0, 0.54);
      cursor: pointer;
      font-size: 0.875rem;
      padding: 4px 8px;
      margin: -4px -8px;
      border-radius: 4px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      min-width: 24px;
      height: 24px;
    }

    .collapse-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .collapse-button:focus {
      outline: none;
      background-color: rgba(0, 0, 0, 0.12);
    }

    .collapse-menu {
      position: relative;
      display: inline-block;
    }

    .collapse-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1300;
      min-width: 160px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0px 3px 14px 2px rgba(0, 0, 0, 0.12);
      padding: 8px 0;
      margin-top: 4px;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  visibility 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .collapse-dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }

    .collapse-dropdown-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      color: rgba(0, 0, 0, 0.87);
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.43;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .collapse-dropdown-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .collapse-dropdown-item.disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    /* Custom separator support */
    .breadcrumb-item.custom-separator:not(:last-child)::after {
      content: var(--custom-separator);
    }

    /* Responsive behavior */
    @media (max-width: 600px) {
      .breadcrumbs {
        font-size: 0.75rem;
      }

      .breadcrumb-link,
      .breadcrumb-text {
        font-size: 0.75rem;
      }

      .breadcrumb-item:not(:last-child)::after {
        margin: 0 4px;
        font-size: 0.75rem;
      }
    }
  `;

  private _dropdownOpen = false;

  connectedCallback() {
    super.connectedCallback();
    this.style.setProperty('--separator', `"${this.separator}"`);
    document.addEventListener('click', this._handleDocumentClick.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleDocumentClick.bind(this));
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('separator')) {
      this.style.setProperty('--separator', `"${this.separator}"`);
    }
  }

  private _handleDocumentClick(event: Event) {
    const target = event.target as Element;
    if (!this.contains(target)) {
      this._dropdownOpen = false;
      this.requestUpdate();
    }
  }

  private _handleCollapseClick(event: Event) {
    event.stopPropagation();
    this._dropdownOpen = !this._dropdownOpen;
    this.requestUpdate();
  }

  private _handleBreadcrumbClick(item: BreadcrumbItem, index: number) {
    if (item.disabled) return;

    this.dispatchEvent(new CustomEvent('breadcrumb-click', {
      bubbles: true,
      composed: true,
      detail: { item, index }
    }));

    // Close dropdown if open
    if (this._dropdownOpen) {
      this._dropdownOpen = false;
      this.requestUpdate();
    }
  }

  private _renderIcon(iconName?: string) {
    if (!iconName) return '';

    // Simple icon mapping - in a real implementation, you might use a proper icon library
    const icons: Record<string, string> = {
      home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      folder: 'M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z',
      file: 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z',
      settings: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z'
    };

    const path = icons[iconName] || icons.file;

    return html`
      <svg class="breadcrumb-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="${path}"/>
      </svg>
    `;
  }

  private _renderBreadcrumbItem(item: BreadcrumbItem, index: number, isLast: boolean) {
    const content = html`
      ${this._renderIcon(item.icon)}
      <span>${item.label}</span>
    `;

    if (isLast || !item.href) {
      return html`
        <span class="breadcrumb-text ${item.disabled ? 'disabled' : ''}">
          ${content}
        </span>
      `;
    }

    return html`
      <a 
        class="breadcrumb-link ${item.disabled ? 'disabled' : ''}"
        href="${item.href || '#'}"
        @click="${(e: Event) => {
          if (!item.href || item.href === '#') {
            e.preventDefault();
          }
          this._handleBreadcrumbClick(item, index);
        }}"
      >
        ${content}
      </a>
    `;
  }

  private _renderCollapsedItems(collapsedItems: BreadcrumbItem[]) {
    return html`
      <div class="collapse-menu">
        <button 
          class="collapse-button"
          @click="${this._handleCollapseClick}"
          aria-label="Show more breadcrumbs"
          aria-expanded="${this._dropdownOpen}"
        >
          ...
        </button>
        <div class="collapse-dropdown ${this._dropdownOpen ? 'open' : ''}">
          ${collapsedItems.map((item, index) => html`
            <a 
              class="collapse-dropdown-item ${item.disabled ? 'disabled' : ''}"
              href="${item.href || '#'}"
              @click="${(e: Event) => {
                if (!item.href || item.href === '#') {
                  e.preventDefault();
                }
                this._handleBreadcrumbClick(item, index);
              }}"
            >
              ${this._renderIcon(item.icon)}
              <span>${item.label}</span>
            </a>
          `)}
        </div>
      </div>
    `;
  }

  render() {
    if (!this.items || this.items.length === 0) {
      return html``;
    }

    const totalItems = this.items.length;
    
    // If we don't need to collapse, render all items
    if (totalItems <= this.maxItems) {
      return html`
        <nav aria-label="breadcrumb">
          <ol class="breadcrumbs">
            ${this.items.map((item, index) => html`
              <li class="breadcrumb-item">
                ${this._renderBreadcrumbItem(item, index, index === totalItems - 1)}
              </li>
            `)}
          </ol>
        </nav>
      `;
    }

    // Calculate which items to show and which to collapse
    const startItems = this.items.slice(0, this.itemsBeforeCollapse);
    const endItems = this.items.slice(-this.itemsAfterCollapse);
    const collapsedItems = this.items.slice(this.itemsBeforeCollapse, -this.itemsAfterCollapse);

    return html`
      <nav aria-label="breadcrumb">
        <ol class="breadcrumbs">
          ${startItems.map((item, index) => html`
            <li class="breadcrumb-item">
              ${this._renderBreadcrumbItem(item, index, false)}
            </li>
          `)}
          
          ${collapsedItems.length > 0 ? html`
            <li class="breadcrumb-item">
              ${this._renderCollapsedItems(collapsedItems)}
            </li>
          ` : ''}
          
          ${endItems.map((item, index) => {
            const actualIndex = totalItems - this.itemsAfterCollapse + index;
            const isLast = index === endItems.length - 1;
            return html`
              <li class="breadcrumb-item">
                ${this._renderBreadcrumbItem(item, actualIndex, isLast)}
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }
}