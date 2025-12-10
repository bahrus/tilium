import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class ToggleButton extends LitElement {
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';
  @property({ type: String }) color: 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean }) fullWidth = false;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    .toggle-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      background-color: transparent;
      outline: 0;
      border: 1px solid rgba(0, 0, 0, 0.12);
      margin: 0;
      border-radius: 4px;
      padding: 0;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
      text-decoration: none;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      color: rgba(0, 0, 0, 0.87);
      width: 100%;
    }

    .toggle-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .toggle-button:disabled {
      color: rgba(0, 0, 0, 0.26);
      border-color: rgba(0, 0, 0, 0.12);
      cursor: default;
      pointer-events: none;
    }

    /* Size variants */
    .toggle-button.small {
      padding: 4px 8px;
      font-size: 0.8125rem;
      min-height: 32px;
    }

    .toggle-button.medium {
      padding: 6px 12px;
      font-size: 0.875rem;
      min-height: 36px;
    }

    .toggle-button.large {
      padding: 8px 16px;
      font-size: 0.9375rem;
      min-height: 42px;
    }

    /* Selected state - standard */
    .toggle-button.selected.standard {
      background-color: rgba(0, 0, 0, 0.08);
      border-color: rgba(0, 0, 0, 0.12);
    }

    .toggle-button.selected.standard:hover {
      background-color: rgba(0, 0, 0, 0.12);
    }

    /* Selected state - primary */
    .toggle-button.selected.primary {
      background-color: rgba(25, 118, 210, 0.12);
      border-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
    }

    .toggle-button.selected.primary:hover {
      background-color: rgba(25, 118, 210, 0.16);
    }

    /* Selected state - secondary */
    .toggle-button.selected.secondary {
      background-color: rgba(156, 39, 176, 0.12);
      border-color: ${theme.palette.secondary.main};
      color: ${theme.palette.secondary.main};
    }

    .toggle-button.selected.secondary:hover {
      background-color: rgba(156, 39, 176, 0.16);
    }

    /* Selected state - error */
    .toggle-button.selected.error {
      background-color: rgba(211, 47, 47, 0.12);
      border-color: ${theme.palette.error.main};
      color: ${theme.palette.error.main};
    }

    .toggle-button.selected.error:hover {
      background-color: rgba(211, 47, 47, 0.16);
    }

    /* Selected state - warning */
    .toggle-button.selected.warning {
      background-color: rgba(237, 108, 2, 0.12);
      border-color: ${theme.palette.warning.main};
      color: ${theme.palette.warning.main};
    }

    .toggle-button.selected.warning:hover {
      background-color: rgba(237, 108, 2, 0.16);
    }

    /* Selected state - info */
    .toggle-button.selected.info {
      background-color: rgba(2, 136, 209, 0.12);
      border-color: ${theme.palette.info.main};
      color: ${theme.palette.info.main};
    }

    .toggle-button.selected.info:hover {
      background-color: rgba(2, 136, 209, 0.16);
    }

    /* Selected state - success */
    .toggle-button.selected.success {
      background-color: rgba(46, 125, 50, 0.12);
      border-color: ${theme.palette.success.main};
      color: ${theme.palette.success.main};
    }

    .toggle-button.selected.success:hover {
      background-color: rgba(46, 125, 50, 0.16);
    }

    /* Content */
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `;

  private handleClick() {
    if (this.disabled) return;

    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { 
        value: this.value,
        selected: !this.selected 
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const classes = [
      'toggle-button',
      this.selected ? 'selected' : '',
      this.color,
      this.size
    ].filter(Boolean).join(' ');

    return html`
      <button 
        class="${classes}" 
        ?disabled="${this.disabled}"
        @click="${this.handleClick}"
      >
        <span class="content">
          <slot></slot>
        </span>
      </button>
    `;
  }
}

export class ToggleButtonGroup extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: Array }) values: string[] = [];
  @property({ type: String }) color: 'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) exclusive = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) fullWidth = false;

  static styles = unsafeCSS`
    :host {
      display: inline-flex;
    }

    :host([fullWidth]) {
      display: flex;
      width: 100%;
    }

    .toggle-button-group {
      display: flex;
    }

    .toggle-button-group.horizontal {
      flex-direction: row;
    }

    .toggle-button-group.vertical {
      flex-direction: column;
    }

    .toggle-button-group.fullWidth {
      width: 100%;
    }

    /* Remove borders between buttons */
    ::slotted(mui-toggle-button:not(:first-child)) {
      margin-left: -1px !important;
    }

    .toggle-button-group.vertical ::slotted(mui-toggle-button:not(:first-child)) {
      margin-left: 0 !important;
      margin-top: -1px !important;
    }

    /* Border radius for first and last buttons */
    .toggle-button-group.horizontal ::slotted(mui-toggle-button:first-child) {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    .toggle-button-group.horizontal ::slotted(mui-toggle-button:last-child) {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }

    .toggle-button-group.horizontal ::slotted(mui-toggle-button:not(:first-child):not(:last-child)) {
      border-radius: 0 !important;
    }

    .toggle-button-group.vertical ::slotted(mui-toggle-button:first-child) {
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }

    .toggle-button-group.vertical ::slotted(mui-toggle-button:last-child) {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;
    }

    .toggle-button-group.vertical ::slotted(mui-toggle-button:not(:first-child):not(:last-child)) {
      border-radius: 0 !important;
    }

    /* Full width buttons */
    .toggle-button-group.fullWidth ::slotted(mui-toggle-button) {
      flex: 1 !important;
    }

    /* Ensure selected buttons appear above others */
    ::slotted(mui-toggle-button[selected]) {
      z-index: 1 !important;
      position: relative !important;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('toggle', this.handleToggle);
    this.updateChildButtons();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('toggle', this.handleToggle);
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || 
        changedProperties.has('values') || 
        changedProperties.has('color') || 
        changedProperties.has('size') || 
        changedProperties.has('disabled')) {
      this.updateChildButtons();
    }
  }

  private updateChildButtons() {
    const buttons = this.querySelectorAll('mui-toggle-button') as NodeListOf<ToggleButton>;
    
    buttons.forEach(button => {
      // Set group properties
      button.color = this.color;
      button.size = this.size;
      button.disabled = this.disabled || button.disabled;
      button.fullWidth = this.fullWidth;
      
      // Set selected state
      if (this.exclusive) {
        button.selected = button.value === this.value;
      } else {
        button.selected = this.values.includes(button.value);
      }
    });
  }

  private handleToggle = (e: CustomEvent) => {
    e.stopPropagation();
    
    const { value, selected } = e.detail;
    
    if (this.exclusive) {
      // Single selection mode
      if (selected) {
        this.value = value;
      } else {
        // Allow deselection in exclusive mode
        this.value = '';
      }
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    } else {
      // Multiple selection mode
      if (selected) {
        if (!this.values.includes(value)) {
          this.values = [...this.values, value];
        }
      } else {
        this.values = this.values.filter(v => v !== value);
      }
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { values: this.values },
        bubbles: true,
        composed: true
      }));
    }
  };

  render() {
    const classes = [
      'toggle-button-group',
      this.orientation,
      this.fullWidth ? 'fullWidth' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}