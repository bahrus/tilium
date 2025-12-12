import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Modal extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) disableBackdropClick = false;
  @property({ type: Boolean }) disableEscapeKeyDown = false;
  @property({ type: Boolean }) hideBackdrop = false;
  @property({ type: Boolean }) disableAutoFocus = false;
  @property({ type: Boolean }) disableEnforceFocus = false;
  @property({ type: Boolean }) disableRestoreFocus = false;
  @property({ type: Boolean }) keepMounted = false;
  @property({ type: String }) closeAfterTransition = '';
  @property({ type: Number }) zIndex = 1300;

  @state() private _exited = true;
  @state() private _hasTransition = false;

  private _lastFocusedElement: Element | null = null;
  private _sentinelStart: HTMLElement | null = null;
  private _sentinelEnd: HTMLElement | null = null;
  private _modalRef: HTMLElement | null = null;

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--modal-z-index, 1300);
      display: none;
    }

    :host([open]) {
      display: flex;
    }

    .modal-root {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 1;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      -webkit-tap-highlight-color: transparent;
    }

    .modal-backdrop.entering {
      opacity: 0;
    }

    .modal-backdrop.entered {
      opacity: 1;
    }

    .modal-backdrop.exiting {
      opacity: 0;
    }

    .modal-backdrop.exited {
      opacity: 0;
    }

    .modal-backdrop.invisible {
      background-color: transparent;
    }

    .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      max-width: calc(100% - 64px);
      max-height: calc(100% - 64px);
      outline: 0;
      opacity: 1;
      transform: scale(1);
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
                  transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .modal-content.entering {
      opacity: 0;
      transform: scale(0.75);
    }

    .modal-content.entered {
      opacity: 1;
      transform: scale(1);
    }

    .modal-content.exiting {
      opacity: 0;
      transform: scale(0.75);
    }

    .modal-content.exited {
      opacity: 0;
      transform: scale(0.75);
    }

    /* Focus trap sentinels */
    .focus-sentinel {
      width: 0;
      height: 0;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      pointer-events: none;
    }

    /* Scrollbar management */
    :host([open]) {
      overflow: hidden;
    }

    /* Mobile optimizations */
    @media (max-width: 600px) {
      .modal-content {
        max-width: calc(100% - 32px);
        max-height: calc(100% - 32px);
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      .modal-backdrop,
      .modal-content {
        transition: none;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._setupZIndex();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._restoreBodyScroll();
    this._restoreFocus();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this._handleOpen();
      } else {
        this._handleClose();
      }
    }

    if (changedProperties.has('zIndex')) {
      this._setupZIndex();
    }
  }

  private _setupZIndex() {
    this.style.setProperty('--modal-z-index', this.zIndex.toString());
  }

  private _handleOpen() {
    this._exited = false;
    
    // Store the currently focused element
    if (!this.disableRestoreFocus) {
      this._lastFocusedElement = document.activeElement;
    }

    // Prevent body scroll
    this._preventBodyScroll();

    // Handle focus
    if (!this.disableAutoFocus) {
      this._autoFocus();
    }

    // Add event listeners
    this._addEventListeners();

    // Dispatch open event
    this._dispatchEvent('open');
  }

  private _handleClose() {
    // Remove event listeners
    this._removeEventListeners();

    // Restore body scroll
    this._restoreBodyScroll();

    // Restore focus
    if (!this.disableRestoreFocus) {
      this._restoreFocus();
    }

    // Handle transition
    if (this._hasTransition && this.closeAfterTransition) {
      // Wait for transition to complete
      setTimeout(() => {
        this._exited = true;
        this._dispatchEvent('exited');
      }, 225); // Default transition duration
    } else {
      this._exited = true;
      this._dispatchEvent('exited');
    }

    // Dispatch close event
    this._dispatchEvent('close');
  }

  private _preventBodyScroll() {
    const body = document.body;
    const scrollY = window.scrollY;
    
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
  }

  private _restoreBodyScroll() {
    const body = document.body;
    const scrollY = body.style.top;
    
    body.style.position = '';
    body.style.top = '';
    body.style.width = '';
    body.style.overflow = '';
    
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  private _autoFocus() {
    // Focus the modal content or first focusable element
    setTimeout(() => {
      if (this._modalRef) {
        const focusableElement = this._findFocusableElement(this._modalRef);
        if (focusableElement) {
          (focusableElement as HTMLElement).focus();
        } else {
          this._modalRef.focus();
        }
      }
    }, 0);
  }

  private _restoreFocus() {
    if (this._lastFocusedElement && typeof (this._lastFocusedElement as any).focus === 'function') {
      setTimeout(() => {
        (this._lastFocusedElement as HTMLElement).focus();
      }, 0);
    }
  }

  private _findFocusableElement(container: Element): Element | null {
    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');

    return container.querySelector(focusableSelectors);
  }

  private _addEventListeners() {
    document.addEventListener('keydown', this._handleKeyDown);
    if (!this.disableEnforceFocus) {
      document.addEventListener('focusin', this._handleFocusIn);
    }
  }

  private _removeEventListeners() {
    document.removeEventListener('keydown', this._handleKeyDown);
    document.removeEventListener('focusin', this._handleFocusIn);
  }

  private _handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !this.disableEscapeKeyDown) {
      event.preventDefault();
      event.stopPropagation();
      this._handleBackdropClick();
    }

    // Handle Tab key for focus trapping
    if (event.key === 'Tab' && !this.disableEnforceFocus) {
      this._handleTabKey(event);
    }
  };

  private _handleFocusIn = (event: FocusEvent) => {
    if (!this.disableEnforceFocus && this._modalRef && !this._modalRef.contains(event.target as Node)) {
      // Focus escaped the modal, bring it back
      this._autoFocus();
    }
  };

  private _handleTabKey(event: KeyboardEvent) {
    if (!this._modalRef) return;

    const focusableElements = this._modalRef.querySelectorAll([
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', '));

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  private _handleBackdropClick = (event?: Event) => {
    if (event) {
      event.stopPropagation();
    }

    if (!this.disableBackdropClick) {
      this._dispatchEvent('backdrop-click', { originalEvent: event });
      
      // Close the modal by default
      this.open = false;
    }
  };

  private _handleContentClick = (event: Event) => {
    // Prevent backdrop click when clicking on content
    event.stopPropagation();
  };

  private _dispatchEvent(type: string, detail?: any) {
    const event = new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail
    });
    this.dispatchEvent(event);
  }

  firstUpdated(changedProperties: Map<string, any>) {
    super.firstUpdated(changedProperties);
    
    // Get references to elements
    this._modalRef = this.shadowRoot?.querySelector('.modal-content') as HTMLElement;
    this._sentinelStart = this.shadowRoot?.querySelector('.focus-sentinel-start') as HTMLElement;
    this._sentinelEnd = this.shadowRoot?.querySelector('.focus-sentinel-end') as HTMLElement;

    // Make modal content focusable if it doesn't have tabindex
    if (this._modalRef && !this._modalRef.hasAttribute('tabindex')) {
      this._modalRef.setAttribute('tabindex', '-1');
    }

    // Check if content has transitions
    this._hasTransition = this.closeAfterTransition !== '';
  }

  render() {
    if (!this.open && !this.keepMounted && this._exited) {
      return html``;
    }

    const backdropClasses = [
      'modal-backdrop',
      this.hideBackdrop ? 'invisible' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="modal-root" @click="${this._handleBackdropClick}">
        <!-- Focus trap sentinels -->
        <div class="focus-sentinel focus-sentinel-start" tabindex="0"></div>
        
        <!-- Backdrop -->
        <div class="${backdropClasses}"></div>
        
        <!-- Modal content -->
        <div 
          class="modal-content" 
          role="dialog" 
          aria-modal="true"
          @click="${this._handleContentClick}"
        >
          <slot></slot>
        </div>
        
        <!-- Focus trap sentinels -->
        <div class="focus-sentinel focus-sentinel-end" tabindex="0"></div>
      </div>
    `;
  }
}

// Utility function to create a modal programmatically
export function createModal(options: {
  content?: HTMLElement | string;
  open?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  hideBackdrop?: boolean;
  zIndex?: number;
  onClose?: () => void;
  onOpen?: () => void;
} = {}): Modal {
  const modal = new Modal();
  
  // Set properties
  if (options.open !== undefined) modal.open = options.open;
  if (options.disableBackdropClick !== undefined) modal.disableBackdropClick = options.disableBackdropClick;
  if (options.disableEscapeKeyDown !== undefined) modal.disableEscapeKeyDown = options.disableEscapeKeyDown;
  if (options.hideBackdrop !== undefined) modal.hideBackdrop = options.hideBackdrop;
  if (options.zIndex !== undefined) modal.zIndex = options.zIndex;

  // Add content
  if (options.content) {
    if (typeof options.content === 'string') {
      modal.innerHTML = options.content;
    } else {
      modal.appendChild(options.content);
    }
  }

  // Add event listeners
  if (options.onClose) {
    modal.addEventListener('close', options.onClose);
  }
  if (options.onOpen) {
    modal.addEventListener('open', options.onOpen);
  }

  // Append to body
  document.body.appendChild(modal);

  return modal;
}