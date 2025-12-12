import { LitElement, html, css } from 'lit';
import { property, state, query } from 'lit/decorators.js';

export class TextareaAutosize extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) minRows = 1;
  @property({ type: Number }) maxRows = Infinity;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) name = '';
  @property({ type: String }) id = '';
  @property({ type: Boolean }) required = false;
  @property({ type: String }) resize = 'none'; // 'none' | 'both' | 'horizontal' | 'vertical'
  @property({ type: String }) variant = 'outlined'; // 'outlined' | 'filled' | 'standard'
  @property({ type: Boolean }) error = false;
  @property({ type: String }) label = '';
  @property({ type: String }) helperText = '';
  @property({ type: Boolean }) fullWidth = false;
  @property({ type: String }) size = 'medium'; // 'small' | 'medium'

  @state() private _focused = false;
  @state() private _hasValue = false;

  @query('textarea') private _textarea!: HTMLTextAreaElement;
  @query('.shadow-textarea') private _shadowTextarea!: HTMLTextAreaElement;

  private _resizeObserver?: ResizeObserver;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    :host([fullWidth]) {
      display: block;
      width: 100%;
    }

    .textarea-container {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .input-label {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4375em;
      letter-spacing: 0.00938em;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 4px;
      transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
    }

    .input-label.focused {
      color: #1976d2;
    }

    .input-label.error {
      color: #d32f2f;
    }

    .input-label.disabled {
      color: rgba(0, 0, 0, 0.38);
    }

    .input-label.small {
      font-size: 14px;
    }

    .textarea-wrapper {
      position: relative;
      display: flex;
      align-items: flex-start;
    }

    /* Base textarea styles */
    textarea {
      font-family: inherit;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4375em;
      letter-spacing: 0.00938em;
      color: rgba(0, 0, 0, 0.87);
      box-sizing: border-box;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      resize: var(--textarea-resize, none);
      margin: 0;
      padding: 0;
      min-height: 1.4375em;
      overflow: hidden;
      transition: height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    textarea::placeholder {
      color: rgba(0, 0, 0, 0.42);
      opacity: 1;
      transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    textarea:disabled {
      color: rgba(0, 0, 0, 0.38);
      cursor: default;
    }

    textarea:disabled::placeholder {
      color: rgba(0, 0, 0, 0.38);
    }

    textarea.small {
      font-size: 14px;
    }

    /* Shadow textarea for height calculation */
    .shadow-textarea {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      visibility: hidden;
      overflow: hidden;
      height: 0;
      z-index: -1000;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      padding: inherit;
      border: inherit;
      box-sizing: inherit;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    /* Outlined variant */
    .textarea-wrapper.outlined {
      border: 1px solid rgba(0, 0, 0, 0.23);
      border-radius: 4px;
      padding: 16.5px 14px;
      transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .textarea-wrapper.outlined:hover:not(.disabled):not(.error) {
      border-color: rgba(0, 0, 0, 0.87);
    }

    .textarea-wrapper.outlined.focused:not(.error) {
      border-color: #1976d2;
      border-width: 2px;
      padding: 15.5px 13px;
    }

    .textarea-wrapper.outlined.error {
      border-color: #d32f2f;
    }

    .textarea-wrapper.outlined.disabled {
      border-color: rgba(0, 0, 0, 0.26);
    }

    .textarea-wrapper.outlined.small {
      padding: 8.5px 14px;
    }

    .textarea-wrapper.outlined.small.focused:not(.error) {
      padding: 7.5px 13px;
    }

    /* Filled variant */
    .textarea-wrapper.filled {
      background-color: rgba(0, 0, 0, 0.06);
      border-radius: 4px 4px 0 0;
      padding: 25px 12px 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .textarea-wrapper.filled:hover:not(.disabled):not(.error) {
      background-color: rgba(0, 0, 0, 0.09);
      border-bottom-color: rgba(0, 0, 0, 0.87);
    }

    .textarea-wrapper.filled.focused:not(.error) {
      background-color: rgba(0, 0, 0, 0.09);
      border-bottom-color: #1976d2;
      border-bottom-width: 2px;
      padding-bottom: 7px;
    }

    .textarea-wrapper.filled.error {
      border-bottom-color: #d32f2f;
    }

    .textarea-wrapper.filled.disabled {
      background-color: rgba(0, 0, 0, 0.12);
      border-bottom-color: rgba(0, 0, 0, 0.26);
      border-bottom-style: dotted;
    }

    .textarea-wrapper.filled.small {
      padding: 21px 12px 4px;
    }

    .textarea-wrapper.filled.small.focused:not(.error) {
      padding-bottom: 3px;
    }

    /* Standard variant */
    .textarea-wrapper.standard {
      padding: 4px 0 5px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.42);
      transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .textarea-wrapper.standard:hover:not(.disabled):not(.error) {
      border-bottom-color: rgba(0, 0, 0, 0.87);
    }

    .textarea-wrapper.standard.focused:not(.error) {
      border-bottom-color: #1976d2;
      border-bottom-width: 2px;
      padding-bottom: 4px;
    }

    .textarea-wrapper.standard.error {
      border-bottom-color: #d32f2f;
    }

    .textarea-wrapper.standard.disabled {
      border-bottom-color: rgba(0, 0, 0, 0.26);
      border-bottom-style: dotted;
    }

    .textarea-wrapper.standard.small {
      padding: 2px 0 3px;
    }

    .textarea-wrapper.standard.small.focused:not(.error) {
      padding-bottom: 2px;
    }

    /* Helper text */
    .helper-text {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.66;
      letter-spacing: 0.03333em;
      color: rgba(0, 0, 0, 0.6);
      margin: 3px 14px 0 14px;
      transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .helper-text.error {
      color: #d32f2f;
    }

    .helper-text.disabled {
      color: rgba(0, 0, 0, 0.38);
    }

    .textarea-wrapper.standard + .helper-text {
      margin-left: 0;
      margin-right: 0;
    }

    /* Resize options */
    :host([resize="both"]) textarea {
      resize: both;
    }

    :host([resize="horizontal"]) textarea {
      resize: horizontal;
    }

    :host([resize="vertical"]) textarea {
      resize: vertical;
    }

    /* Focus styles */
    .textarea-wrapper.focused {
      outline: none;
    }

    /* Mobile optimizations */
    @media (max-width: 600px) {
      textarea {
        font-size: 16px; /* Prevent zoom on iOS */
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      textarea,
      .textarea-wrapper,
      .input-label,
      .helper-text {
        transition: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupResizeObserver();
  }

  firstUpdated(changedProperties: Map<string, any>) {
    super.firstUpdated(changedProperties);
    this._updateHeight();
    this._updateHasValue();
    this._setupResizeStyles();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this._updateHeight();
      this._updateHasValue();
    }

    if (changedProperties.has('resize')) {
      this._setupResizeStyles();
    }
  }

  private _setupResizeStyles() {
    this.style.setProperty('--textarea-resize', this.resize);
  }

  private _setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this._updateHeight();
      });
    }
  }

  private _cleanupResizeObserver() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }

  private _updateHeight() {
    if (!this._textarea || !this._shadowTextarea) return;

    // Copy content to shadow textarea
    this._shadowTextarea.value = this.value || this.placeholder || ' ';

    // Get the computed height
    const shadowHeight = this._shadowTextarea.scrollHeight;
    
    // Calculate min and max heights based on rows
    const lineHeight = parseFloat(getComputedStyle(this._textarea).lineHeight) || 20;
    const minHeight = Math.max(lineHeight * this.minRows, lineHeight);
    const maxHeight = this.maxRows === Infinity ? Infinity : lineHeight * this.maxRows;

    // Apply constraints
    let newHeight = Math.max(minHeight, shadowHeight);
    if (maxHeight !== Infinity) {
      newHeight = Math.min(newHeight, maxHeight);
    }

    // Set the height
    this._textarea.style.height = `${newHeight}px`;

    // Enable scrolling if content exceeds maxRows
    if (maxHeight !== Infinity && shadowHeight > maxHeight) {
      this._textarea.style.overflowY = 'auto';
    } else {
      this._textarea.style.overflowY = 'hidden';
    }
  }

  private _updateHasValue() {
    this._hasValue = Boolean(this.value && this.value.length > 0);
  }

  private _handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const oldValue = this.value;
    this.value = target.value;

    // Dispatch input event
    this._dispatchEvent('input', {
      value: this.value,
      originalEvent: event
    });

    // Dispatch change event if value actually changed
    if (oldValue !== this.value) {
      this._dispatchEvent('change', {
        value: this.value,
        originalEvent: event
      });
    }

    this._updateHeight();
    this._updateHasValue();
  };

  private _handleFocus = (event: FocusEvent) => {
    this._focused = true;
    this._dispatchEvent('focus', { originalEvent: event });
  };

  private _handleBlur = (event: FocusEvent) => {
    this._focused = false;
    this._dispatchEvent('blur', { originalEvent: event });
  };

  private _handleKeyDown = (event: KeyboardEvent) => {
    this._dispatchEvent('keydown', {
      key: event.key,
      code: event.code,
      originalEvent: event
    });
  };

  private _handleKeyUp = (event: KeyboardEvent) => {
    this._dispatchEvent('keyup', {
      key: event.key,
      code: event.code,
      originalEvent: event
    });
  };

  private _dispatchEvent(type: string, detail?: any) {
    const event = new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
  }

  // Public methods
  focus() {
    this._textarea?.focus();
  }

  blur() {
    this._textarea?.blur();
  }

  select() {
    this._textarea?.select();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this._textarea?.setSelectionRange(start, end, direction);
  }

  get selectionStart(): number | null {
    return this._textarea?.selectionStart ?? null;
  }

  get selectionEnd(): number | null {
    return this._textarea?.selectionEnd ?? null;
  }

  get selectionDirection(): string | null {
    return this._textarea?.selectionDirection ?? null;
  }

  render() {
    const wrapperClasses = [
      'textarea-wrapper',
      this.variant,
      this._focused ? 'focused' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : '',
      this.size
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'input-label',
      this._focused ? 'focused' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : '',
      this.size
    ].filter(Boolean).join(' ');

    const helperTextClasses = [
      'helper-text',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="textarea-container">
        ${this.label ? html`
          <label class="${labelClasses}" for="${this.id || 'textarea'}">
            ${this.label}
          </label>
        ` : ''}
        
        <div class="${wrapperClasses}">
          <textarea
            id="${this.id || 'textarea'}"
            name="${this.name}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            ?required="${this.required}"
            class="${this.size}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
            @keydown="${this._handleKeyDown}"
            @keyup="${this._handleKeyUp}"
          ></textarea>
          
          <!-- Shadow textarea for height calculation -->
          <textarea
            class="shadow-textarea ${this.size}"
            tabindex="-1"
            readonly
            aria-hidden="true"
          ></textarea>
        </div>
        
        ${this.helperText ? html`
          <div class="${helperTextClasses}">
            ${this.helperText}
          </div>
        ` : ''}
      </div>
    `;
  }
}