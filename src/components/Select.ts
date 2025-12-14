import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Select extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: Boolean }) multiple = false;
  @state() private focused = false;
  @state() private open = false;
  @state() private options: Array<{value: string, text: string, selected: boolean}> = [];

  static styles = unsafeCSS`
    :host {
      display: inline-block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      position: relative;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    .select-field {
      position: relative;
      width: 100%;
    }

    label {
      position: absolute;
      left: 14px;
      transition: all 200ms cubic-bezier(0.0, 0, 0.2, 1);
      pointer-events: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 1rem;
      background-color: white;
      padding: 0 4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }

    label.floating,
    label.has-value {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.75rem;
    }

    label.focused {
      color: #1976d2;
    }

    .select-input {
      font-family: inherit;
      font-size: 1rem;
      width: 100%;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 16.5px 14px;
      padding-right: 32px;
      outline: none;
      background: white;
      color: rgba(0, 0, 0, 0.87);
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      min-height: 56px;
      box-sizing: border-box;
    }

    .select-input:hover:not(.disabled) {
      border-color: rgba(0, 0, 0, 0.87);
    }

    .select-input.focused {
      border-color: #1976d2;
      border-width: 2px;
      padding: 15.5px 13px;
      padding-right: 31px;
    }

    .select-input.disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: not-allowed;
      border-color: rgba(0, 0, 0, 0.26);
      background-color: rgba(0, 0, 0, 0.02);
    }

    .select-input.error {
      border-color: #d32f2f;
    }

    .dropdown-arrow {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      transition: transform 200ms cubic-bezier(0.0, 0, 0.2, 1);
      color: rgba(0, 0, 0, 0.54);
    }

    .dropdown-arrow.open {
      transform: translateY(-50%) rotate(180deg);
    }

    .dropdown-arrow.disabled {
      color: rgba(0, 0, 0, 0.26);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
      z-index: 1300;
      max-height: 300px;
      overflow-y: auto;
      margin-top: 4px;
    }

    .dropdown.hidden {
      display: none;
    }

    .option {
      padding: 12px 16px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.87);
      font-size: 1rem;
      line-height: 1.5;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
    }

    .option:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .option.selected {
      background-color: rgba(25, 118, 210, 0.08);
      color: #1976d2;
    }

    .option.focused {
      background-color: rgba(0, 0, 0, 0.08);
    }

    .option.disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: not-allowed;
    }

    .placeholder {
      color: rgba(0, 0, 0, 0.6);
    }

    .multiple-values {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
    }

    .value-chip {
      background-color: rgba(25, 118, 210, 0.08);
      color: #1976d2;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .value-chip .remove {
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      opacity: 0.7;
    }

    .value-chip .remove:hover {
      opacity: 1;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    document.addEventListener('click', this.handleDocumentClick);
    this.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    document.removeEventListener('click', this.handleDocumentClick);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  firstUpdated() {
    this.updateOptionsFromSlot();
  }

  private updateOptionsFromSlot() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const slottedElements = slot.assignedElements() as HTMLOptionElement[];
      this.options = slottedElements.map(option => ({
        value: option.value,
        text: option.textContent || option.value,
        selected: option.selected || option.value === this.value
      }));
    }
  }

  private handleClick = (e: Event) => {
    e.stopPropagation();
    if (this.disabled) return;
    
    this.open = !this.open;
    this.focused = this.open;
    this.requestUpdate();
  };

  private handleDocumentClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.open = false;
      this.focused = false;
      this.requestUpdate();
    }
  };

  private handleKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.open = !this.open;
        this.focused = this.open;
        this.requestUpdate();
        break;
      case 'Escape':
        this.open = false;
        this.focused = false;
        this.requestUpdate();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
          this.focused = true;
          this.requestUpdate();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.open) {
          this.open = true;
          this.focused = true;
          this.requestUpdate();
        }
        break;
    }
  };

  private handleOptionClick(option: {value: string, text: string, selected: boolean}) {
    if (this.multiple) {
      // Handle multiple selection - keep dropdown open
      const currentValues = this.value ? this.value.split(',') : [];
      const index = currentValues.indexOf(option.value);
      
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }
      
      this.value = currentValues.join(',');
      this.updateOptionsFromSlot();
    } else {
      // Handle single selection - close dropdown
      this.value = option.value;
      this.open = false;
      this.focused = false;
    }

    // Dispatch change event
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private removeValue(valueToRemove: string, e: Event) {
    e.stopPropagation();
    const currentValues = this.value ? this.value.split(',') : [];
    const index = currentValues.indexOf(valueToRemove);
    
    if (index > -1) {
      currentValues.splice(index, 1);
      this.value = currentValues.join(',');
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));

      this.requestUpdate();
    }
  }

  private getDisplayValue() {
    if (!this.value) {
      return '';
    }

    if (this.multiple) {
      const values = this.value.split(',');
      return values.map(val => {
        const option = this.options.find(opt => opt.value === val);
        return option ? option.text : val;
      });
    } else {
      const option = this.options.find(opt => opt.value === this.value);
      return option ? option.text : this.value;
    }
  }

  render() {
    const hasValue = this.value && this.value.length > 0;
    const labelClasses = [
      this.focused || this.open ? 'floating focused' : '',
      hasValue ? 'has-value' : ''
    ].join(' ');

    const inputClasses = [
      this.focused || this.open ? 'focused' : '',
      this.disabled ? 'disabled' : '',
      this.error ? 'error' : ''
    ].join(' ');

    const displayValue = this.getDisplayValue();

    return html`
      <div class="select-field ${this.variant}">
        ${this.label ? html`<label class="${labelClasses}">${this.label}</label>` : ''}
        
        <div class="select-input ${inputClasses}">
          ${this.multiple && Array.isArray(displayValue) ? html`
            <div class="multiple-values">
              ${displayValue.length > 0 ? displayValue.map((text, index) => {
                const values = this.value.split(',');
                const value = values[index];
                return html`
                  <div class="value-chip">
                    ${text}
                    <span class="remove" @click="${(e: Event) => this.removeValue(value, e)}">×</span>
                  </div>
                `;
              }) : html`<span class="placeholder">Select options...</span>`}
            </div>
          ` : html`
            <span class="${!hasValue ? 'placeholder' : ''}">
              ${hasValue ? displayValue : 'Select an option...'}
            </span>
          `}
        </div>

        <div class="dropdown-arrow ${this.open ? 'open' : ''} ${this.disabled ? 'disabled' : ''}">
          ▼
        </div>

        <div class="dropdown ${this.open ? '' : 'hidden'}">
          ${this.options.map(option => {
            const isSelected = this.multiple 
              ? this.value.split(',').includes(option.value)
              : this.value === option.value;
            
            return html`
              <div 
                class="option ${isSelected ? 'selected' : ''}"
                @click="${(e: Event) => {
                  e.stopPropagation();
                  this.handleOptionClick(option);
                }}"
              >
                ${option.text}
              </div>
            `;
          })}
        </div>

        <!-- Hidden slot to capture option elements -->
        <div style="display: none;">
          <slot @slotchange="${this.updateOptionsFromSlot}"></slot>
        </div>
      </div>
    `;
  }
}
