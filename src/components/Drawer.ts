import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Drawer extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) anchor: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @property({ type: String }) variant: 'temporary' | 'persistent' | 'permanent' = 'temporary';
  @property({ type: Number }) width = 240;
  @property({ type: Number }) height = 240;
  @property({ type: Boolean }) hideBackdrop = false;
  @property({ type: String }) elevation = '16';

  @state() private isAnimating = false;

  static styles = css`
    :host {
      position: fixed;
      z-index: 1200;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    :host([open]) {
      pointer-events: auto;
    }

    /* Backdrop */
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
      z-index: -1;
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    :host([hideBackdrop]) .backdrop {
      display: none;
    }

    /* Drawer paper */
    .drawer {
      position: fixed;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      box-shadow: 0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    /* Anchor positions */
    :host([anchor="left"]) .drawer {
      top: 0;
      bottom: 0;
      left: 0;
      width: var(--drawer-width, 240px);
      transform: translateX(-100%);
    }

    :host([anchor="right"]) .drawer {
      top: 0;
      bottom: 0;
      right: 0;
      width: var(--drawer-width, 240px);
      transform: translateX(100%);
    }

    :host([anchor="top"]) .drawer {
      top: 0;
      left: 0;
      right: 0;
      height: var(--drawer-height, 240px);
      transform: translateY(-100%);
    }

    :host([anchor="bottom"]) .drawer {
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--drawer-height, 240px);
      transform: translateY(100%);
    }

    /* Open state */
    :host([open][anchor="left"]) .drawer,
    :host([open][anchor="right"]) .drawer {
      transform: translateX(0);
    }

    :host([open][anchor="top"]) .drawer,
    :host([open][anchor="bottom"]) .drawer {
      transform: translateY(0);
    }

    /* Variant styles */
    :host([variant="permanent"]) {
      position: relative;
      z-index: auto;
    }

    :host([variant="permanent"]) .backdrop {
      display: none;
    }

    :host([variant="permanent"]) .drawer {
      position: relative;
      transform: none !important;
      box-shadow: none;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="permanent"][anchor="right"]) .drawer {
      border-right: none;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="permanent"][anchor="top"]) .drawer {
      border-right: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="permanent"][anchor="bottom"]) .drawer {
      border-right: none;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="persistent"]) {
      position: relative;
      z-index: auto;
    }

    :host([variant="persistent"]) .backdrop {
      display: none;
    }

    :host([variant="persistent"]) .drawer {
      position: relative;
      box-shadow: none;
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="persistent"][anchor="right"]) .drawer {
      border-right: none;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="persistent"][anchor="top"]) .drawer {
      border-right: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([variant="persistent"][anchor="bottom"]) .drawer {
      border-right: none;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    /* Content */
    .drawer-content {
      flex: 1;
      overflow-y: auto;
    }

    /* Responsive behavior */
    @media (max-width: 600px) {
      :host([anchor="left"]) .drawer,
      :host([anchor="right"]) .drawer {
        width: calc(100vw - 56px);
        max-width: 280px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateDrawerSize();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('width') || changedProperties.has('height')) {
      this.updateDrawerSize();
    }

    if (changedProperties.has('open')) {
      this.handleOpenChange();
    }
  }

  private updateDrawerSize() {
    if (this.anchor === 'left' || this.anchor === 'right') {
      this.style.setProperty('--drawer-width', `${this.width}px`);
    } else {
      this.style.setProperty('--drawer-height', `${this.height}px`);
    }
  }

  private handleOpenChange() {
    if (this.open) {
      this.dispatchEvent(new CustomEvent('drawer-opening', {
        bubbles: true,
        composed: true
      }));
    } else {
      this.dispatchEvent(new CustomEvent('drawer-closing', {
        bubbles: true,
        composed: true
      }));
    }

    // Handle animation state
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
      if (this.open) {
        this.dispatchEvent(new CustomEvent('drawer-opened', {
          bubbles: true,
          composed: true
        }));
      } else {
        this.dispatchEvent(new CustomEvent('drawer-closed', {
          bubbles: true,
          composed: true
        }));
      }
    }, 225);
  }

  private handleBackdropClick(e: Event) {
    if (this.variant === 'temporary' && !this.hideBackdrop) {
      this.closeDrawer();
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.variant === 'temporary') {
      this.closeDrawer();
    }
  }

  public openDrawer() {
    this.open = true;
  }

  public closeDrawer() {
    this.open = false;
  }

  public toggleDrawer() {
    this.open = !this.open;
  }

  render() {
    return html`
      ${this.variant === 'temporary' && !this.hideBackdrop ? html`
        <div 
          class="backdrop" 
          @click="${this.handleBackdropClick}"
          @keydown="${this.handleKeyDown}"
        ></div>
      ` : ''}
      
      <div class="drawer">
        <div class="drawer-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export class DrawerHeader extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: 0 16px;
      min-height: 64px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      background-color: inherit;
    }

    .header-content {
      display: flex;
      align-items: center;
      width: 100%;
      gap: 16px;
    }

    ::slotted([slot="icon"]) {
      flex-shrink: 0;
    }

    ::slotted([slot="title"]) {
      flex: 1;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      margin: 0;
    }

    ::slotted([slot="action"]) {
      flex-shrink: 0;
      margin-left: auto;
    }

    /* Dense variant */
    :host([dense]) {
      min-height: 48px;
      padding: 0 12px;
    }

    :host([dense]) .header-content {
      gap: 12px;
    }
  `;

  render() {
    return html`
      <div class="header-content">
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <slot></slot>
        <slot name="action"></slot>
      </div>
    `;
  }
}