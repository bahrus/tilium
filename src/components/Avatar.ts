import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Avatar extends LitElement {
  @property({ type: String }) alt = '';
  @property({ type: String }) src = '';
  @property({ type: String }) variant: 'circular' | 'rounded' | 'square' = 'circular';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | string = 'medium';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  
  @state() private imageError = false;
  @state() private hasSlottedContent = false;

  static styles = css`
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
      box-sizing: border-box;
    }

    /* Size variants */
    :host([size="small"]) {
      width: 24px;
      height: 24px;
      font-size: 0.875rem;
    }

    :host([size="medium"]), :host(:not([size])) {
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
    }

    :host([size="large"]) {
      width: 56px;
      height: 56px;
      font-size: 1.75rem;
    }

    /* Shape variants */
    :host([variant="circular"]), :host(:not([variant])) {
      border-radius: 50%;
    }

    :host([variant="rounded"]) {
      border-radius: 8px;
    }

    :host([variant="square"]) {
      border-radius: 0;
    }

    /* Color variants */
    :host([color="default"]), :host(:not([color])) {
      background-color: #bdbdbd;
      color: #fff;
    }

    :host([color="primary"]) {
      background-color: #1976d2;
      color: #fff;
    }

    :host([color="secondary"]) {
      background-color: #9c27b0;
      color: #fff;
    }

    :host([color="error"]) {
      background-color: #d32f2f;
      color: #fff;
    }

    :host([color="warning"]) {
      background-color: #ed6c02;
      color: #fff;
    }

    :host([color="info"]) {
      background-color: #0288d1;
      color: #fff;
    }

    :host([color="success"]) {
      background-color: #2e7d32;
      color: #fff;
    }

    /* Image */
    .avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }

    /* Fallback content */
    .avatar-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-text {
      font-weight: 500;
      text-transform: uppercase;
      font-size: inherit;
    }

    .avatar-icon {
      width: 60%;
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar-icon svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }

    /* Default person icon */
    .default-icon {
      width: 60%;
      height: 60%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateCustomSize();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('size')) {
      this.updateCustomSize();
    }
    
    if (changedProperties.has('src')) {
      this.imageError = false;
    }
  }

  firstUpdated(changedProperties: Map<string, any>) {
    super.firstUpdated(changedProperties);
    this.checkSlottedContent();
  }

  private updateCustomSize() {
    // Handle custom size (numeric or CSS value)
    if (this.size && !['small', 'medium', 'large'].includes(this.size)) {
      const sizeValue = this.size.includes('px') || this.size.includes('rem') || this.size.includes('em') || this.size.includes('%')
        ? this.size 
        : `${this.size}px`;
      
      this.style.width = sizeValue;
      this.style.height = sizeValue;
      
      // Adjust font size for custom sizes
      const numericSize = parseInt(this.size);
      if (!isNaN(numericSize)) {
        this.style.fontSize = `${Math.max(numericSize * 0.4, 12)}px`;
      }
    } else {
      this.style.removeProperty('width');
      this.style.removeProperty('height');
      this.style.removeProperty('font-size');
    }
  }

  private checkSlottedContent() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedNodes = slot.assignedNodes();
      this.hasSlottedContent = assignedNodes.length > 0;
    }
  }

  private handleImageLoad() {
    this.imageError = false;
  }

  private handleImageError() {
    this.imageError = true;
  }

  private handleSlotChange(e: Event) {
    this.checkSlottedContent();
  }

  private getInitials(text: string): string {
    if (!text) return '';
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return '';
    
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  }

  private renderContent() {
    // Priority 1: Valid image source without error
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

    // Priority 2: Slotted content (icons, custom elements)
    if (this.hasSlottedContent) {
      return html`
        <div class="avatar-icon">
          <slot @slotchange="${(e: Event) => this.handleSlotChange(e)}"></slot>
        </div>
      `;
    }

    // Priority 3: Initials from alt text
    const initials = this.getInitials(this.alt);
    if (initials) {
      return html`
        <div class="avatar-content">
          <span class="avatar-text">${initials}</span>
        </div>
      `;
    }

    // Priority 4: Default person icon
    return html`
      <div class="avatar-content">
        <svg class="default-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
    `;
  }

  render() {
    return html`
      ${this.renderContent()}
      <slot @slotchange="${(e: Event) => this.handleSlotChange(e)}" style="display: none;"></slot>
    `;
  }
}