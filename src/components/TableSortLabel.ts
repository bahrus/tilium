import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class TableSortLabel extends LitElement {
  @property({ type: Boolean }) active = false;
  @property({ type: String }) direction: 'asc' | 'desc' = 'asc';
  @property({ type: Boolean }) hideSortIcon = false;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      color: rgba(0, 0, 0, 0.87);
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host(:hover) {
      color: rgba(0, 0, 0, 0.87);
    }

    .content {
      display: flex;
      align-items: center;
    }

    .icon {
      width: 16px;
      height: 16px;
      margin-left: 4px;
      fill: currentColor;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      opacity: 0;
      user-select: none;
    }

    :host(:hover) .icon,
    .icon.active {
      opacity: 1;
    }

    .icon.desc {
      transform: rotate(180deg);
    }

    .icon.hidden {
      display: none;
    }
  `;

  private handleClick() {
    const newDirection = this.active && this.direction === 'asc' ? 'desc' : 'asc';
    
    this.dispatchEvent(new CustomEvent('sort', {
      detail: { 
        direction: newDirection,
        active: true
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const iconClasses = [
      'icon',
      this.active ? 'active' : '',
      this.direction === 'desc' ? 'desc' : '',
      this.hideSortIcon ? 'hidden' : ''
    ].join(' ');

    return html`
      <span class="content" @click="${this.handleClick}">
        <slot></slot>
        <svg class="${iconClasses}" viewBox="0 0 24 24">
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
        </svg>
      </span>
    `;
  }
}