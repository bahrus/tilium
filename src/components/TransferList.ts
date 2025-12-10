import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export interface TransferListItem {
  id: string;
  label: string;
  disabled?: boolean;
}

export class TransferList extends LitElement {
  @property({ type: Array }) left: TransferListItem[] = [];
  @property({ type: Array }) right: TransferListItem[] = [];
  @property({ type: String }) leftTitle = 'Available';
  @property({ type: String }) rightTitle = 'Selected';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) dense = false;

  @state() private leftChecked: string[] = [];
  @state() private rightChecked: string[] = [];

  static styles = unsafeCSS`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .transfer-list {
      display: flex;
      align-items: center;
      gap: 16px;
      justify-content: center;
    }

    .list-container {
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 230px;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      overflow: hidden;
    }

    .list-header {
      background-color: #f5f5f5;
      padding: 8px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-weight: 500;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.87);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .list-content {
      flex: 1;
      overflow-y: auto;
      background-color: white;
    }

    .list-item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }

    .list-item:last-child {
      border-bottom: none;
    }

    .list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .list-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .list-item.dense {
      padding: 4px 16px;
    }

    .item-checkbox {
      margin-right: 12px;
    }

    .item-label {
      flex: 1;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.87);
    }

    .controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .control-button {
      background: none;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
      color: rgba(0, 0, 0, 0.87);
    }

    .control-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.87);
    }

    .control-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    .control-button svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .stats {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.6);
    }

    /* Custom checkbox styles */
    .checkbox {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(0, 0, 0, 0.54);
      border-radius: 2px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }

    .checkbox.checked {
      background-color: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.main};
    }

    .checkbox.checked::after {
      content: '✓';
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .checkbox.indeterminate {
      background-color: ${theme.palette.primary.main};
      border-color: ${theme.palette.primary.main};
    }

    .checkbox.indeterminate::after {
      content: '−';
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  `;

  private get leftCheckedCount(): number {
    return this.leftChecked.length;
  }

  private get rightCheckedCount(): number {
    return this.rightChecked.length;
  }

  private get canMoveRight(): boolean {
    return this.leftCheckedCount > 0 && !this.disabled;
  }

  private get canMoveLeft(): boolean {
    return this.rightCheckedCount > 0 && !this.disabled;
  }

  private get canMoveAllRight(): boolean {
    return this.left.length > 0 && !this.disabled;
  }

  private get canMoveAllLeft(): boolean {
    return this.right.length > 0 && !this.disabled;
  }

  private handleItemToggle(item: TransferListItem, side: 'left' | 'right') {
    if (item.disabled || this.disabled) return;

    if (side === 'left') {
      if (this.leftChecked.includes(item.id)) {
        this.leftChecked = this.leftChecked.filter(id => id !== item.id);
      } else {
        this.leftChecked = [...this.leftChecked, item.id];
      }
    } else {
      if (this.rightChecked.includes(item.id)) {
        this.rightChecked = this.rightChecked.filter(id => id !== item.id);
      } else {
        this.rightChecked = [...this.rightChecked, item.id];
      }
    }
  }

  private handleHeaderToggle(side: 'left' | 'right') {
    if (this.disabled) return;

    const items = side === 'left' ? this.left : this.right;
    const checked = side === 'left' ? this.leftChecked : this.rightChecked;
    const availableItems = items.filter(item => !item.disabled);
    
    if (checked.length === availableItems.length) {
      // Uncheck all
      if (side === 'left') {
        this.leftChecked = [];
      } else {
        this.rightChecked = [];
      }
    } else {
      // Check all available
      if (side === 'left') {
        this.leftChecked = availableItems.map(item => item.id);
      } else {
        this.rightChecked = availableItems.map(item => item.id);
      }
    }
  }

  private moveRight() {
    if (!this.canMoveRight) return;

    const itemsToMove = this.left.filter(item => this.leftChecked.includes(item.id));
    const remainingLeft = this.left.filter(item => !this.leftChecked.includes(item.id));
    
    this.left = remainingLeft;
    this.right = [...this.right, ...itemsToMove];
    this.leftChecked = [];

    this.dispatchChangeEvent();
  }

  private moveLeft() {
    if (!this.canMoveLeft) return;

    const itemsToMove = this.right.filter(item => this.rightChecked.includes(item.id));
    const remainingRight = this.right.filter(item => !this.rightChecked.includes(item.id));
    
    this.right = remainingRight;
    this.left = [...this.left, ...itemsToMove];
    this.rightChecked = [];

    this.dispatchChangeEvent();
  }

  private moveAllRight() {
    if (!this.canMoveAllRight) return;

    this.right = [...this.right, ...this.left];
    this.left = [];
    this.leftChecked = [];

    this.dispatchChangeEvent();
  }

  private moveAllLeft() {
    if (!this.canMoveAllLeft) return;

    this.left = [...this.left, ...this.right];
    this.right = [];
    this.rightChecked = [];

    this.dispatchChangeEvent();
  }

  private dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        left: this.left,
        right: this.right
      },
      bubbles: true,
      composed: true
    }));
  }

  private getHeaderCheckboxState(side: 'left' | 'right') {
    const items = side === 'left' ? this.left : this.right;
    const checked = side === 'left' ? this.leftChecked : this.rightChecked;
    const availableItems = items.filter(item => !item.disabled);
    
    if (checked.length === 0) return 'unchecked';
    if (checked.length === availableItems.length) return 'checked';
    return 'indeterminate';
  }

  private renderList(items: TransferListItem[], side: 'left' | 'right', title: string) {
    const checked = side === 'left' ? this.leftChecked : this.rightChecked;
    const headerState = this.getHeaderCheckboxState(side);
    
    return html`
      <div class="list-container">
        <div class="list-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div 
              class="checkbox ${headerState === 'checked' ? 'checked' : ''} ${headerState === 'indeterminate' ? 'indeterminate' : ''}"
              @click="${() => this.handleHeaderToggle(side)}"
            ></div>
            <span>${title}</span>
          </div>
          <span class="stats">${checked.length}/${items.length}</span>
        </div>
        
        <div class="list-content">
          ${items.map(item => html`
            <div 
              class="list-item ${item.disabled ? 'disabled' : ''} ${this.dense ? 'dense' : ''}"
              @click="${() => this.handleItemToggle(item, side)}"
            >
              <div 
                class="checkbox item-checkbox ${checked.includes(item.id) ? 'checked' : ''}"
              ></div>
              <span class="item-label">${item.label}</span>
            </div>
          `)}
          ${items.length === 0 ? html`
            <div class="list-item" style="justify-content: center; color: rgba(0, 0, 0, 0.6); font-style: italic;">
              No items
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="transfer-list">
        ${this.renderList(this.left, 'left', this.leftTitle)}
        
        <div class="controls">
          <button 
            class="control-button"
            ?disabled="${!this.canMoveAllRight}"
            @click="${this.moveAllRight}"
            title="Move all right"
          >
            <svg viewBox="0 0 24 24">
              <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/>
            </svg>
          </button>
          
          <button 
            class="control-button"
            ?disabled="${!this.canMoveRight}"
            @click="${this.moveRight}"
            title="Move selected right"
          >
            <svg viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
          
          <button 
            class="control-button"
            ?disabled="${!this.canMoveLeft}"
            @click="${this.moveLeft}"
            title="Move selected left"
          >
            <svg viewBox="0 0 24 24">
              <path d="M14 6l1.41 1.41L10.83 12l4.58 4.59L14 18l-6-6z"/>
            </svg>
          </button>
          
          <button 
            class="control-button"
            ?disabled="${!this.canMoveAllLeft}"
            @click="${this.moveAllLeft}"
            title="Move all left"
          >
            <svg viewBox="0 0 24 24">
              <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/>
            </svg>
          </button>
        </div>
        
        ${this.renderList(this.right, 'right', this.rightTitle)}
      </div>
    `;
  }
}