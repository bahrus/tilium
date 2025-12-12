import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Snackbar extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: String }) message = '';
  @property({ type: Number }) autoHideDuration = 6000;
  @property({ type: String }) anchorOrigin: 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-left' | 'top-center' | 'top-right' = 'bottom-left';
  @property({ type: String }) variant: 'standard' | 'filled' | 'outlined' = 'standard';
  @property({ type: String }) severity: 'success' | 'info' | 'warning' | 'error' | '' = '';
  @property({ type: Boolean }) closable = false;
  @property({ type: String }) action = '';
  @property({ type: String }) transitionDuration = '225ms';

  @state() private _visible = false;
  @state() private _mounted = false;
  private _autoHideTimer?: number;

  static styles = css`
    :host {
      position: fixed;
      z-index: 1400;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      pointer-events: none;
    }

    :host([open]) {
      pointer-events: auto;
    }

    /* Positioning */
    :host(.bottom-left) {
      bottom: 16px;
      left: 16px;
    }

    :host(.bottom-center) {
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host(.bottom-right) {
      bottom: 16px;
      right: 16px;
    }

    :host(.top-left) {
      top: 16px;
      left: 16px;
    }

    :host(.top-center) {
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host(.top-right) {
      top: 16px;
      right: 16px;
    }

    .snackbar {
      display: flex;
      align-items: center;
      min-width: 288px;
      max-width: 568px;
      padding: 6px 16px;
      border-radius: 4px;
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
                  0px 6px 10px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 18px 0px rgba(0, 0, 0, 0.12);
      background-color: #323232;
      color: #fff;
      font-size: 0.875rem;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity var(--transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1),
                  transform var(--transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1);
    }

    .snackbar.visible {
      opacity: 1;
      transform: scale(1);
    }

    .snackbar.mounted {
      transition: opacity var(--transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1),
                  transform var(--transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Variants */
    .snackbar.filled {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    .snackbar.outlined {
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      border: 1px solid rgba(0, 0, 0, 0.23);
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    }

    /* Severity Colors */
    .snackbar.success {
      background-color: #2e7d32;
      color: #fff;
    }

    .snackbar.info {
      background-color: #0288d1;
      color: #fff;
    }

    .snackbar.warning {
      background-color: #ed6c02;
      color: #fff;
    }

    .snackbar.error {
      background-color: #d32f2f;
      color: #fff;
    }

    .snackbar.filled.success {
      background-color: #2e7d32;
    }

    .snackbar.filled.info {
      background-color: #0288d1;
    }

    .snackbar.filled.warning {
      background-color: #ed6c02;
    }

    .snackbar.filled.error {
      background-color: #d32f2f;
    }

    .snackbar.outlined.success {
      background-color: #fff;
      color: #2e7d32;
      border-color: #2e7d32;
    }

    .snackbar.outlined.info {
      background-color: #fff;
      color: #0288d1;
      border-color: #0288d1;
    }

    .snackbar.outlined.warning {
      background-color: #fff;
      color: #ed6c02;
      border-color: #ed6c02;
    }

    .snackbar.outlined.error {
      background-color: #fff;
      color: #d32f2f;
      border-color: #d32f2f;
    }

    /* Content */
    .snackbar-content {
      display: flex;
      align-items: center;
      flex: 1;
      gap: 8px;
    }

    .severity-icon {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    .message {
      flex: 1;
      padding: 8px 0;
    }

    /* Actions */
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: 16px;
    }

    .action-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
      padding: 6px 8px;
      border-radius: 4px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .action-button:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .snackbar.outlined .action-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .close-button {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .close-button:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }

    .snackbar.outlined .close-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .close-icon {
      width: 18px;
      height: 18px;
    }

    /* Mobile responsive */
    @media (max-width: 600px) {
      :host(.bottom-left),
      :host(.bottom-center),
      :host(.bottom-right) {
        left: 8px;
        right: 8px;
        bottom: 8px;
        transform: none;
      }

      :host(.top-left),
      :host(.top-center),
      :host(.top-right) {
        left: 8px;
        right: 8px;
        top: 8px;
        transform: none;
      }

      .snackbar {
        min-width: auto;
        max-width: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.classList.add(this.anchorOrigin);
    this.style.setProperty('--transition-duration', this.transitionDuration);
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this._show();
      } else {
        this._hide();
      }
    }

    if (changedProperties.has('anchorOrigin')) {
      // Remove old positioning class
      const oldAnchor = changedProperties.get('anchorOrigin');
      if (oldAnchor) {
        this.classList.remove(oldAnchor);
      }
      // Add new positioning class
      this.classList.add(this.anchorOrigin);
    }

    if (changedProperties.has('transitionDuration')) {
      this.style.setProperty('--transition-duration', this.transitionDuration);
    }
  }

  private _show() {
    this._visible = true;
    
    // Force a reflow to ensure the element is rendered before applying the visible class
    requestAnimationFrame(() => {
      this._mounted = true;
      requestAnimationFrame(() => {
        this._visible = true;
      });
    });

    // Set up auto-hide timer
    if (this.autoHideDuration > 0) {
      this._clearAutoHideTimer();
      this._autoHideTimer = window.setTimeout(() => {
        this._handleClose();
      }, this.autoHideDuration);
    }
  }

  private _hide() {
    this._visible = false;
    this._clearAutoHideTimer();
    
    // Wait for transition to complete before unmounting
    setTimeout(() => {
      this._mounted = false;
    }, parseInt(this.transitionDuration) || 225);
  }

  private _clearAutoHideTimer() {
    if (this._autoHideTimer) {
      clearTimeout(this._autoHideTimer);
      this._autoHideTimer = undefined;
    }
  }

  private _handleClose() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: { reason: 'timeout' }
    }));
  }

  private _handleActionClick() {
    this.dispatchEvent(new CustomEvent('action', {
      bubbles: true,
      composed: true,
      detail: { action: this.action }
    }));
  }

  private _handleCloseClick() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: { reason: 'clickaway' }
    }));
  }

  private _renderSeverityIcon() {
    if (!this.severity) return '';

    const icons = {
      success: html`
        <svg class="severity-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
        </svg>
      `,
      info: html`
        <svg class="severity-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
        </svg>
      `,
      warning: html`
        <svg class="severity-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
        </svg>
      `,
      error: html`
        <svg class="severity-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"/>
        </svg>
      `
    };

    return icons[this.severity] || '';
  }

  render() {
    if (!this._mounted && !this.open) {
      return html``;
    }

    const classes = [
      'snackbar',
      this.variant,
      this.severity,
      this._visible ? 'visible' : '',
      this._mounted ? 'mounted' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}" role="alert" aria-live="assertive">
        <div class="snackbar-content">
          ${this._renderSeverityIcon()}
          <div class="message">${this.message}</div>
        </div>
        
        ${this.action || this.closable ? html`
          <div class="actions">
            ${this.action ? html`
              <button 
                class="action-button" 
                @click="${this._handleActionClick}"
                type="button"
              >
                ${this.action}
              </button>
            ` : ''}
            
            ${this.closable ? html`
              <button 
                class="close-button" 
                @click="${this._handleCloseClick}"
                type="button"
                aria-label="Close"
              >
                <svg class="close-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                </svg>
              </button>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._clearAutoHideTimer();
  }
}