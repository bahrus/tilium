import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Autocomplete extends LitElement {
  @property({ type: Array }) options: any[] = [];
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) freeSolo = false;
  @property({ type: Boolean }) clearOnEscape = true;
  @property({ type: Boolean }) disableClearable = false;
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: Function }) getOptionLabel?: (option: any) => string;
  @property({ type: Function }) isOptionEqualToValue?: (option: any, value: any) => boolean;
  @property({ type: Function }) filterOptions?: (options: any[], state: any) => any[];

  @state() private inputValue = '';
  @state() private focused = false;
  @state() private open = false;
  @state() private selectedOptions: any[] = [];
  @state() private highlightedIndex = -1;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      position: relative;
      width: 100%;
    }

    .autocomplete-root {
      position: relative;
      width: 100%;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      cursor: text;
    }

    .input-wrapper.outlined {
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 16.5px 14px;
      transition: border-color 200ms cubic-bezier(0.0, 0, 0.2, 1);
    }

    .input-wrapper.outlined.focused {
      border-color: ${theme.palette.primary.main};
      border-width: 2px;
      padding: 15.5px 13px;
    }

    .input-wrapper.small.outlined {
      padding: 8.5px 14px;
    }

    .input-wrapper.small.outlined.focused {
      padding: 7.5px 13px;
    }

    .input-wrapper.filled {
      background-color: rgba(0, 0, 0, 0.06);
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      border-radius: 4px 4px 0 0;
      padding: 25px 12px 8px;
    }

    .input-wrapper.filled.focused {
      background-color: rgba(0, 0, 0, 0.09);
      border-bottom: 2px solid ${theme.palette.primary.main};
      padding-bottom: 7px;
    }

    .input-wrapper.standard {
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      padding: 4px 0 5px;
    }

    .input-wrapper.standard.focused {
      border-bottom: 2px solid ${theme.palette.primary.main};
      padding-bottom: 4px;
    }

    .input-wrapper.disabled {
      opacity: 0.5;
      pointer-events: none;
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
    }

    label.floating,
    label.has-value {
      top: 0;
      transform: translateY(-50%);
      font-size: 0.75rem;
    }

    label.focused {
      color: ${theme.palette.primary.main};
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-right: 8px;
      flex: 1;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      padding: 4px 8px;
      font-size: 0.8125rem;
      max-width: 100%;
    }

    .tag-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tag-delete {
      margin-left: 4px;
      cursor: pointer;
      opacity: 0.7;
      font-size: 16px;
      line-height: 1;
    }

    .tag-delete:hover {
      opacity: 1;
    }

    input {
      font-family: inherit;
      font-size: 1rem;
      border: none;
      outline: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.87);
      flex: 1;
      min-width: 30px;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }

    .end-adornment {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .clear-button,
    .dropdown-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .clear-button:hover,
    .dropdown-button:hover {
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.04);
    }

    .loading-indicator {
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      box-shadow: ${theme.shadows[2]};
      max-height: 200px;
      overflow-y: auto;
      z-index: 1300;
      margin-top: 4px;
    }

    .option {
      padding: 8px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 1rem;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .option:hover,
    .option.highlighted {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .option.selected {
      background-color: rgba(25, 118, 210, 0.08);
    }

    .no-options {
      padding: 16px;
      text-align: center;
      color: rgba(0, 0, 0, 0.6);
      font-style: italic;
    }
  `;

  private getOptionLabelInternal(option: any): string {
    if (this.getOptionLabel) {
      return this.getOptionLabel(option);
    }
    return typeof option === 'string' ? option : option?.label || String(option);
  }

  private isOptionEqualToValueInternal(option: any, value: any): boolean {
    if (this.isOptionEqualToValue) {
      return this.isOptionEqualToValue(option, value);
    }
    return option === value;
  }

  private filterOptionsInternal(options: any[], inputValue: string): any[] {
    if (this.filterOptions) {
      return this.filterOptions(options, { inputValue });
    }
    
    if (!inputValue) return options;
    
    return options.filter(option => 
      this.getOptionLabelInternal(option)
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    );
  }

  private handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.inputValue = input.value;
    this.open = true;
    this.highlightedIndex = -1;
    
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { value: this.inputValue },
      bubbles: true,
      composed: true
    }));
  }

  private handleInputFocus() {
    this.focused = true;
    if (this.options.length > 0) {
      this.open = true;
    }
  }

  private handleInputBlur() {
    this.focused = false;
    // Delay closing to allow option selection
    setTimeout(() => {
      this.open = false;
    }, 150);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const filteredOptions = this.filterOptionsInternal(this.options, this.inputValue);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.open = true;
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, filteredOptions.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.highlightedIndex >= 0 && filteredOptions[this.highlightedIndex]) {
          this.selectOption(filteredOptions[this.highlightedIndex]);
        } else if (this.freeSolo && this.inputValue) {
          this.selectOption(this.inputValue);
        }
        break;
      case 'Escape':
        this.open = false;
        if (this.clearOnEscape) {
          this.inputValue = '';
        }
        break;
    }
  }

  private selectOption(option: any) {
    if (this.multiple) {
      const isSelected = this.selectedOptions.some(selected => 
        this.isOptionEqualToValueInternal(selected, option)
      );
      
      if (!isSelected) {
        this.selectedOptions = [...this.selectedOptions, option];
        this.inputValue = '';
      }
    } else {
      this.selectedOptions = [option];
      this.inputValue = this.getOptionLabelInternal(option);
      this.open = false;
    }
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { 
        value: this.multiple ? this.selectedOptions : this.selectedOptions[0] 
      },
      bubbles: true,
      composed: true
    }));
  }

  private removeOption(optionToRemove: any) {
    this.selectedOptions = this.selectedOptions.filter(option => 
      !this.isOptionEqualToValueInternal(option, optionToRemove)
    );
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { 
        value: this.multiple ? this.selectedOptions : this.selectedOptions[0] 
      },
      bubbles: true,
      composed: true
    }));
  }

  private clearAll() {
    this.selectedOptions = [];
    this.inputValue = '';
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.multiple ? [] : null },
      bubbles: true,
      composed: true
    }));
  }

  private toggleDropdown() {
    this.open = !this.open;
  }

  render() {
    const hasValue = this.selectedOptions.length > 0 || this.inputValue.length > 0;
    const showClearButton = !this.disableClearable && hasValue && !this.disabled;
    const filteredOptions = this.filterOptionsInternal(this.options, this.inputValue);

    const labelClasses = [
      this.focused ? 'floating focused' : '',
      hasValue ? 'has-value' : ''
    ].join(' ');

    const wrapperClasses = [
      'input-wrapper',
      this.variant,
      this.size,
      this.focused ? 'focused' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="autocomplete-root">
        ${this.label ? html`<label class="${labelClasses}">${this.label}</label>` : ''}
        
        <div class="${wrapperClasses}" @click="${() => this.shadowRoot?.querySelector('input')?.focus()}">
          ${this.multiple ? html`
            <div class="tags-container">
              ${this.selectedOptions.map(option => html`
                <div class="tag">
                  <span class="tag-label">${this.getOptionLabelInternal(option)}</span>
                  <span class="tag-delete" @click="${(e: Event) => { e.stopPropagation(); this.removeOption(option); }}">×</span>
                </div>
              `)}
              <input
                .value="${this.inputValue}"
                placeholder="${this.selectedOptions.length === 0 ? this.placeholder : ''}"
                ?disabled="${this.disabled}"
                @input="${this.handleInputChange}"
                @focus="${this.handleInputFocus}"
                @blur="${this.handleInputBlur}"
                @keydown="${this.handleKeyDown}"
              />
            </div>
          ` : html`
            <input
              .value="${this.inputValue}"
              placeholder="${this.placeholder}"
              ?disabled="${this.disabled}"
              @input="${this.handleInputChange}"
              @focus="${this.handleInputFocus}"
              @blur="${this.handleInputBlur}"
              @keydown="${this.handleKeyDown}"
            />
          `}

          <div class="end-adornment">
            ${this.loading ? html`
              <div class="loading-indicator">⟳</div>
            ` : ''}
            
            ${showClearButton ? html`
              <button class="clear-button" @click="${this.clearAll}" tabindex="-1">
                ×
              </button>
            ` : ''}
            
            <button class="dropdown-button" @click="${this.toggleDropdown}" tabindex="-1">
              ${this.open ? '▲' : '▼'}
            </button>
          </div>
        </div>

        ${this.open ? html`
          <div class="dropdown">
            ${filteredOptions.length === 0 ? html`
              <div class="no-options">No options</div>
            ` : filteredOptions.map((option, index) => {
              const isSelected = this.selectedOptions.some(selected => 
                this.isOptionEqualToValueInternal(selected, option)
              );
              const isHighlighted = index === this.highlightedIndex;
              
              return html`
                <div 
                  class="option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}"
                  @click="${() => this.selectOption(option)}"
                >
                  ${this.getOptionLabelInternal(option)}
                </div>
              `;
            })}
          </div>
        ` : ''}
      </div>
    `;
  }
}