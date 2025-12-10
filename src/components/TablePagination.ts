import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class TablePagination extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: Number }) page = 0;
  @property({ type: Number }) rowsPerPage = 10;
  @property({ type: Array }) rowsPerPageOptions = [5, 10, 25];
  @property({ type: String }) labelRowsPerPage = 'Rows per page:';
  @property({ type: String }) labelDisplayedRows = 'of';

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 16px;
      min-height: 52px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.87);
      border-top: 1px solid rgba(224, 224, 224, 1);
    }

    .pagination-toolbar {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .rows-per-page {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    select {
      font-family: inherit;
      font-size: inherit;
      border: none;
      background: transparent;
      outline: none;
      cursor: pointer;
      padding: 4px 8px;
    }

    .displayed-rows {
      margin: 0 32px 0 16px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    button:disabled:hover {
      background-color: transparent;
    }

    .icon {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;

  private get totalPages() {
    return Math.ceil(this.count / this.rowsPerPage);
  }

  private get displayedRowsStart() {
    return this.count === 0 ? 0 : this.page * this.rowsPerPage + 1;
  }

  private get displayedRowsEnd() {
    return Math.min(this.count, (this.page + 1) * this.rowsPerPage);
  }

  private handleRowsPerPageChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const newRowsPerPage = parseInt(select.value);
    
    this.dispatchEvent(new CustomEvent('rows-per-page-change', {
      detail: { rowsPerPage: newRowsPerPage },
      bubbles: true,
      composed: true
    }));
  }

  private handlePageChange(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.dispatchEvent(new CustomEvent('page-change', {
        detail: { page: newPage },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="pagination-toolbar">
        <div class="rows-per-page">
          <span>${this.labelRowsPerPage}</span>
          <select @change="${this.handleRowsPerPageChange}" .value="${String(this.rowsPerPage)}">
            ${this.rowsPerPageOptions.map(option => html`
              <option value="${option}">${option}</option>
            `)}
          </select>
        </div>

        <div class="displayed-rows">
          ${this.displayedRowsStart}–${this.displayedRowsEnd} ${this.labelDisplayedRows} ${this.count}
        </div>

        <div class="actions">
          <button 
            @click="${() => this.handlePageChange(0)}"
            ?disabled="${this.page === 0}"
            title="First page"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>
            </svg>
          </button>

          <button 
            @click="${() => this.handlePageChange(this.page - 1)}"
            ?disabled="${this.page === 0}"
            title="Previous page"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button 
            @click="${() => this.handlePageChange(this.page + 1)}"
            ?disabled="${this.page >= this.totalPages - 1}"
            title="Next page"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>

          <button 
            @click="${() => this.handlePageChange(this.totalPages - 1)}"
            ?disabled="${this.page >= this.totalPages - 1}"
            title="Last page"
          >
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}