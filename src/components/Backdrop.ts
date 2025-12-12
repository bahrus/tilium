import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Backdrop extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) invisible = false;
  @property({ type: String }) transitionDuration = '225ms';
  @property({ type: Number }) zIndex = 1300;

  static styles = css`
    :host {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 0;
      bottom: 0;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-tap-highlight-color: transparent;
      z-index: var(--backdrop-z-index, 1300);
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--backdrop-transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  visibility var(--backdrop-transition-duration, 225ms) cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
    }

    :host([invisible]) {
      background-color: transparent;
    }

    .backdrop-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateCSSVariables();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('transitionDuration') || changedProperties.has('zIndex')) {
      this.updateCSSVariables();
    }

    if (changedProperties.has('open')) {
      this.handleOpenChange();
    }
  }

  private updateCSSVariables() {
    this.style.setProperty('--backdrop-transition-duration', this.transitionDuration);
    this.style.setProperty('--backdrop-z-index', this.zIndex.toString());
  }

  private handleOpenChange() {
    if (this.open) {
      // Prevent body scroll when backdrop is open
      document.body.style.overflow = 'hidden';
      
      // Focus trap - focus the backdrop
      this.focus();
      
      // Add escape key listener
      document.addEventListener('keydown', this.handleEscapeKey);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Remove escape key listener
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }

  private handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.handleClick(event);
    }
  };

  private handleClick(event: Event) {
    // Only handle clicks on the backdrop itself, not on children
    if (event.target === this || event.target === this.shadowRoot?.querySelector('.backdrop-content')) {
      this.dispatchEvent(new CustomEvent('backdrop-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true
      }));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up when component is removed
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  render() {
    return html`
      <div 
        class="backdrop-content" 
        @click="${this.handleClick}"
        tabindex="-1"
        role="presentation"
        aria-hidden="${!this.open}"
      >
        <slot></slot>
      </div>
    `;
  }
}