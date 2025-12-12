import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Link extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit' | 'textPrimary' | 'textSecondary' = 'primary';
  @property({ type: String }) variant: 'text' | 'outlined' | 'contained' = 'text';
  @property({ type: String }) underline: 'none' | 'hover' | 'always' = 'hover';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) component = 'a';

  static styles = css`
    :host {
      display: inline;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .link {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: inherit;
      line-height: inherit;
      font-weight: inherit;
      text-decoration: none;
      cursor: pointer;
      border-radius: 4px;
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  text-decoration 150ms cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
      border: none;
      background: none;
      padding: 0;
      margin: 0;
    }

    .link:focus {
      outline: 2px solid rgba(25, 118, 210, 0.5);
      outline-offset: 2px;
    }

    .link.disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    /* Text variant colors */
    .link.text.primary {
      color: #1976d2;
    }

    .link.text.primary:hover {
      color: #1565c0;
      background-color: rgba(25, 118, 210, 0.04);
    }

    .link.text.secondary {
      color: #9c27b0;
    }

    .link.text.secondary:hover {
      color: #7b1fa2;
      background-color: rgba(156, 39, 176, 0.04);
    }

    .link.text.error {
      color: #d32f2f;
    }

    .link.text.error:hover {
      color: #c62828;
      background-color: rgba(211, 47, 47, 0.04);
    }

    .link.text.warning {
      color: #ed6c02;
    }

    .link.text.warning:hover {
      color: #e65100;
      background-color: rgba(237, 108, 2, 0.04);
    }

    .link.text.info {
      color: #0288d1;
    }

    .link.text.info:hover {
      color: #0277bd;
      background-color: rgba(2, 136, 209, 0.04);
    }

    .link.text.success {
      color: #2e7d32;
    }

    .link.text.success:hover {
      color: #1b5e20;
      background-color: rgba(46, 125, 50, 0.04);
    }

    .link.text.inherit {
      color: inherit;
    }

    .link.text.inherit:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .link.text.textPrimary {
      color: rgba(0, 0, 0, 0.87);
    }

    .link.text.textPrimary:hover {
      color: rgba(0, 0, 0, 0.6);
      background-color: rgba(0, 0, 0, 0.04);
    }

    .link.text.textSecondary {
      color: rgba(0, 0, 0, 0.6);
    }

    .link.text.textSecondary:hover {
      color: rgba(0, 0, 0, 0.87);
      background-color: rgba(0, 0, 0, 0.04);
    }

    /* Outlined variant */
    .link.outlined {
      padding: 4px 8px;
      border: 1px solid currentColor;
      border-radius: 4px;
    }

    .link.outlined.primary {
      color: #1976d2;
      border-color: rgba(25, 118, 210, 0.5);
    }

    .link.outlined.primary:hover {
      background-color: rgba(25, 118, 210, 0.04);
      border-color: #1976d2;
    }

    .link.outlined.secondary {
      color: #9c27b0;
      border-color: rgba(156, 39, 176, 0.5);
    }

    .link.outlined.secondary:hover {
      background-color: rgba(156, 39, 176, 0.04);
      border-color: #9c27b0;
    }

    .link.outlined.error {
      color: #d32f2f;
      border-color: rgba(211, 47, 47, 0.5);
    }

    .link.outlined.error:hover {
      background-color: rgba(211, 47, 47, 0.04);
      border-color: #d32f2f;
    }

    .link.outlined.warning {
      color: #ed6c02;
      border-color: rgba(237, 108, 2, 0.5);
    }

    .link.outlined.warning:hover {
      background-color: rgba(237, 108, 2, 0.04);
      border-color: #ed6c02;
    }

    .link.outlined.info {
      color: #0288d1;
      border-color: rgba(2, 136, 209, 0.5);
    }

    .link.outlined.info:hover {
      background-color: rgba(2, 136, 209, 0.04);
      border-color: #0288d1;
    }

    .link.outlined.success {
      color: #2e7d32;
      border-color: rgba(46, 125, 50, 0.5);
    }

    .link.outlined.success:hover {
      background-color: rgba(46, 125, 50, 0.04);
      border-color: #2e7d32;
    }

    /* Contained variant */
    .link.contained {
      padding: 6px 16px;
      border-radius: 4px;
      color: #fff;
      font-weight: 500;
    }

    .link.contained.primary {
      background-color: #1976d2;
    }

    .link.contained.primary:hover {
      background-color: #1565c0;
    }

    .link.contained.secondary {
      background-color: #9c27b0;
    }

    .link.contained.secondary:hover {
      background-color: #7b1fa2;
    }

    .link.contained.error {
      background-color: #d32f2f;
    }

    .link.contained.error:hover {
      background-color: #c62828;
    }

    .link.contained.warning {
      background-color: #ed6c02;
    }

    .link.contained.warning:hover {
      background-color: #e65100;
    }

    .link.contained.info {
      background-color: #0288d1;
    }

    .link.contained.info:hover {
      background-color: #0277bd;
    }

    .link.contained.success {
      background-color: #2e7d32;
    }

    .link.contained.success:hover {
      background-color: #1b5e20;
    }

    /* Underline styles */
    .link.underline-none {
      text-decoration: none;
    }

    .link.underline-hover {
      text-decoration: none;
    }

    .link.underline-hover:hover {
      text-decoration: underline;
    }

    .link.underline-always {
      text-decoration: underline;
    }

    /* Focus styles for contained variant */
    .link.contained:focus {
      outline: 2px solid rgba(255, 255, 255, 0.5);
    }

    /* Active states */
    .link:active {
      transform: scale(0.98);
    }

    .link.contained:active {
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
                  0px 4px 5px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }

    /* External link icon */
    .external-icon {
      width: 16px;
      height: 16px;
      margin-left: 4px;
      opacity: 0.7;
    }

    /* Button-like styling when component is button */
    .link.button-component {
      background: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }
  `;

  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  private _isExternalLink(): boolean {
    if (!this.href) return false;
    
    try {
      const url = new URL(this.href, window.location.href);
      return url.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }

  private _renderExternalIcon() {
    if (!this._isExternalLink() || this.variant === 'contained') return '';

    return html`
      <svg class="external-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
      </svg>
    `;
  }

  render() {
    const classes = [
      'link',
      this.variant,
      this.color,
      `underline-${this.underline}`,
      this.disabled ? 'disabled' : '',
      this.component === 'button' ? 'button-component' : ''
    ].filter(Boolean).join(' ');

    const commonProps = {
      class: classes,
      'aria-disabled': this.disabled ? 'true' : 'false',
      '@click': this._handleClick
    };

    if (this.component === 'button') {
      return html`
        <button
          ...${commonProps}
          type="button"
          ?disabled=${this.disabled}
        >
          <slot></slot>
          ${this._renderExternalIcon()}
        </button>
      `;
    }

    // Default to anchor element
    const rel = this.rel || (this._isExternalLink() ? 'noopener noreferrer' : '');
    
    return html`
      <a
        ...${commonProps}
        href=${this.disabled ? '' : this.href}
        target=${this.target}
        rel=${rel}
        tabindex=${this.disabled ? '-1' : '0'}
      >
        <slot></slot>
        ${this._renderExternalIcon()}
      </a>
    `;
  }
}