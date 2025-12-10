import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class TableCell extends LitElement {
  @property({ type: String }) align: 'left' | 'center' | 'right' | 'justify' = 'left';
  @property({ type: String }) padding: 'normal' | 'checkbox' | 'none' = 'normal';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: String }) sortDirection: 'asc' | 'desc' | false = false;
  @property({ type: String }) variant: 'head' | 'body' | 'footer' = 'body';

  static styles = css`
    :host {
      display: table-cell;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.43;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      letter-spacing: 0.01071em;
      vertical-align: inherit;
      text-align: left;
      padding: 16px;
    }

    :host(.head) {
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
      line-height: 1.5rem;
      background-color: #fafafa;
    }

    :host(.body) {
      color: rgba(0, 0, 0, 0.87);
    }

    :host(.footer) {
      color: rgba(0, 0, 0, 0.87);
      font-size: 0.75rem;
      border-bottom: none;
    }

    :host(.small) {
      padding: 6px 16px 6px 16px;
    }

    :host(.small.checkbox) {
      width: 48px;
      padding: 0 0 0 4px;
    }

    :host(.checkbox) {
      width: 48px;
      padding: 0 0 0 16px;
    }

    :host(.none) {
      padding: 0;
    }

    :host(.align-center) {
      text-align: center;
    }

    :host(.align-right) {
      text-align: right;
    }

    :host(.align-justify) {
      text-align: justify;
    }

    .sortable {
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .sort-icon {
      margin-left: 4px;
      opacity: 0;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .sortable:hover .sort-icon,
    .sort-icon.active {
      opacity: 1;
    }

    .sort-icon.desc {
      transform: rotate(180deg);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateClasses();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('variant') || 
        changedProperties.has('size') || 
        changedProperties.has('padding') || 
        changedProperties.has('align')) {
      this.updateClasses();
    }
  }

  private updateClasses() {
    this.classList.toggle('head', this.variant === 'head');
    this.classList.toggle('body', this.variant === 'body');
    this.classList.toggle('footer', this.variant === 'footer');
    this.classList.toggle('small', this.size === 'small');
    this.classList.toggle('checkbox', this.padding === 'checkbox');
    this.classList.toggle('none', this.padding === 'none');
    this.classList.toggle('align-center', this.align === 'center');
    this.classList.toggle('align-right', this.align === 'right');
    this.classList.toggle('align-justify', this.align === 'justify');
  }

  private handleSort() {
    if (this.sortDirection !== false) {
      const newDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.dispatchEvent(new CustomEvent('sort', {
        detail: { direction: newDirection },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    const isSortable = this.sortDirection !== false;
    
    if (isSortable) {
      return html`
        <div class="sortable" @click="${this.handleSort}">
          <slot></slot>
          <span class="sort-icon ${this.sortDirection} ${this.sortDirection ? 'active' : ''}">
            ▲
          </span>
        </div>
      `;
    }

    return html`<slot></slot>`;
  }
}