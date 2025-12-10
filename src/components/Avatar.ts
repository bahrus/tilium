import { LitElement, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Avatar extends LitElement {
  @property({ type: String }) alt = '';
  @property({ type: String }) src = '';
  @property({ type: String }) variant: 'circular' | 'rounded' | 'square' = 'circular';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | string = 'medium';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  @state() private imageError = false;
  @state() private imageLoaded = false;

  static styles = unsafeCSS`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      flex-shrink: 0;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      line-height: 1;
      overflow: hidden;
      user-select: none;
    }

    .avatar {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: #fff;
      background-color: #bdbdbd;
      font-size: 1.25rem;
      font-weight: 400;
    }

    /* Size variants */
    :host(.small) {
      width: 24px;
      height: 24px;
    }

    :host(.small) .avatar {
      font-size: 0.875rem;
    }

    :host(.medium) {
      width: 40px;
      height: 40px;
    }

    :host(.medium) .avatar {
      font-size: 1.25rem;
    }

    :host(.large) {
      width: 56px;
      height: 56px;
    }

    :host(.large) .avatar {
      font-size: 1.75rem;
    }

    /* Shape variants */
    :host(.circular) {
      border-radius: 50%;
    }

    :host(.rounded) {
      border-radius: 8px;
    }

    :host(.square) {
      border-radius: 0;
    }

    /* Color variants */
    .avatar.default {
      background-color: #bdbdbd;
      color: #fff;
    }

    .avatar.primary {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
    }

    .avatar.secondary {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.secondary.contrastText};
    }

    .avatar.error {
      background-color: ${theme.palette.error.main};
      color: ${theme.palette.error.contrastText};
    }

    .avatar.warning {
      background-color: ${theme.palette.warning.main};
      color: ${theme.palette.warning.contrastText};
    }

    .avatar.info {
      background-color: ${theme.palette.info.main};
      color: ${theme.palette.info.contrastText};
    }

    .avatar.success {
      background-color: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
    }

    /* Image */
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      text-align: center;
      color: transparent;
    }

    /* Fallback content */
    .avatar-fallback {
      width: 75%;
      height: 75%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-text {
      font-weight: 500;
      text-transform: uppercase;
    }

    /* Custom size handling */
    :host([size]) {
      width: var(--avatar-size);
      height: var(--avatar-size);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateHostClasses();
    this.updateCustomSize();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('variant') || changedProperties.has('size')) {
      this.updateHostClasses();
      this.updateCustomSize();
    }
    if (changedProperties.has('src')) {
      this.imageError = false;
      this.imageLoaded = false;
    }
  }

  private updateHostClasses() {
    // Remove existing classes
    this.classList.remove('small', 'medium', 'large', 'circular', 'rounded', 'square');
    
    // Add size class (only for predefined sizes)
    if (this.size && ['small', 'medium', 'large'].includes(this.size)) {
      this.classList.add(this.size);
    }
    
    // Add variant class
    if (this.variant) {
      this.classList.add(this.variant);
    }
  }

  private updateCustomSize() {
    // Handle custom size (numeric or CSS value)
    if (this.size && !['small', 'medium', 'large'].includes(this.size)) {
      const sizeValue = (this.size.includes('px') || this.size.includes('rem') || this.size.includes('em')) 
        ? this.size 
        : `${this.size}px`;
      this.style.setProperty('--avatar-size', sizeValue);
      this.setAttribute('size', '');
    } else {
      this.style.removeProperty('--avatar-size');
      this.removeAttribute('size');
    }
  }

  private handleImageLoad() {
    this.imageLoaded = true;
    this.imageError = false;
  }

  private handleImageError() {
    this.imageError = true;
    this.imageLoaded = false;
  }

  private getInitials(text: string): string {
    if (!text) return '';
    
    const words = text.trim().split(/\s+/);
    if (words.length === 1) {
      return words[0].charAt(0);
    }
    return words[0].charAt(0) + words[words.length - 1].charAt(0);
  }

  private renderContent() {
    // If we have a valid image source and no error, show image
    if (this.src && !this.imageError) {
      return html`
        <img
          class="avatar-img"
          src="${this.src}"
          alt="${this.alt}"
          @load="${this.handleImageLoad}"
          @error="${this.handleImageError}"
        />
      `;
    }

    // Check if we have slotted content (icons, custom content)
    const slot = this.shadowRoot?.querySelector('slot');
    const hasSlottedContent = slot?.assignedNodes().length > 0;

    if (hasSlottedContent) {
      return html`
        <div class="avatar-fallback">
          <slot></slot>
        </div>
      `;
    }

    // Fallback to initials from alt text
    const initials = this.getInitials(this.alt);
    if (initials) {
      return html`
        <span class="avatar-text">${initials}</span>
      `;
    }

    // Final fallback - generic person icon
    return html`
      <div class="avatar-fallback">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    `;
  }

  render() {
    return html`
      <div class="avatar ${this.color}">
        ${this.renderContent()}
      </div>
    `;
  }
}