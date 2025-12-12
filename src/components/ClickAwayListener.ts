import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class ClickAwayListener extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp' | false = 'onClick';
  @property({ type: String }) touchEvent: 'onTouchStart' | 'onTouchEnd' | false = 'onTouchEnd';

  private _mounted = false;
  private _syntheticEventExists = false;

  static styles = css`
    :host {
      display: contents;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._mounted = true;
    
    // Add event listeners after a microtask to avoid immediate triggering
    setTimeout(() => {
      this._addEventListeners();
    }, 0);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mounted = false;
    this._removeEventListeners();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('disabled') || 
        changedProperties.has('mouseEvent') || 
        changedProperties.has('touchEvent')) {
      this._removeEventListeners();
      if (!this.disabled) {
        this._addEventListeners();
      }
    }
  }

  private _addEventListeners() {
    if (this.disabled || !this._mounted) return;

    // Add mouse event listener
    if (this.mouseEvent) {
      const eventName = this._getEventName(this.mouseEvent);
      document.addEventListener(eventName, this._handleClickAway, true);
    }

    // Add touch event listener
    if (this.touchEvent) {
      const eventName = this._getEventName(this.touchEvent);
      document.addEventListener(eventName, this._handleClickAway, true);
    }
  }

  private _removeEventListeners() {
    // Remove mouse event listener
    if (this.mouseEvent) {
      const eventName = this._getEventName(this.mouseEvent);
      document.removeEventListener(eventName, this._handleClickAway, true);
    }

    // Remove touch event listener
    if (this.touchEvent) {
      const eventName = this._getEventName(this.touchEvent);
      document.removeEventListener(eventName, this._handleClickAway, true);
    }
  }

  private _getEventName(eventType: string): string {
    switch (eventType) {
      case 'onClick':
        return 'click';
      case 'onMouseDown':
        return 'mousedown';
      case 'onMouseUp':
        return 'mouseup';
      case 'onTouchStart':
        return 'touchstart';
      case 'onTouchEnd':
        return 'touchend';
      default:
        return 'click';
    }
  }

  private _handleClickAway = (event: Event) => {
    // Ignore events that occurred before the component was mounted
    if (!this._mounted) return;

    // Check if this is a synthetic event (React-style event handling)
    if (this._syntheticEventExists) {
      this._syntheticEventExists = false;
      return;
    }

    // Get the target element
    const target = event.target as Node;
    if (!target || !document.contains(target)) return;

    // Check if the click is inside any of our slotted children
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const assignedElements = slot.assignedElements({ flatten: true });
    const assignedNodes = slot.assignedNodes({ flatten: true });
    
    // Check all assigned elements and nodes
    for (const element of [...assignedElements, ...assignedNodes]) {
      if (element.nodeType === Node.ELEMENT_NODE) {
        const elementNode = element as Element;
        if (elementNode.contains(target) || elementNode === target) {
          return; // Click is inside, don't trigger clickaway
        }
      }
    }

    // If we get here, the click was outside all children
    this._dispatchClickAway(event);
  };

  private _dispatchClickAway(originalEvent: Event) {
    const clickAwayEvent = new CustomEvent('clickaway', {
      bubbles: true,
      composed: true,
      detail: {
        originalEvent,
        mouseEvent: this.mouseEvent,
        touchEvent: this.touchEvent
      }
    });

    this.dispatchEvent(clickAwayEvent);
  }

  private _handleSlotClick = (event: Event) => {
    // Mark that a synthetic event exists to prevent double triggering
    this._syntheticEventExists = true;
  };

  render() {
    return html`
      <slot @click="${this._handleSlotClick}"></slot>
    `;
  }
}

// Utility function for programmatic usage
export function createClickAwayListener(
  element: Element,
  callback: (event: Event) => void,
  options: {
    disabled?: boolean;
    mouseEvent?: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
    touchEvent?: 'onTouchStart' | 'onTouchEnd' | false;
  } = {}
): () => void {
  const {
    disabled = false,
    mouseEvent = 'onClick',
    touchEvent = 'onTouchEnd'
  } = options;

  let mounted = true;

  const getEventName = (eventType: string): string => {
    switch (eventType) {
      case 'onClick':
        return 'click';
      case 'onMouseDown':
        return 'mousedown';
      case 'onMouseUp':
        return 'mouseup';
      case 'onTouchStart':
        return 'touchstart';
      case 'onTouchEnd':
        return 'touchend';
      default:
        return 'click';
    }
  };

  const handleClickAway = (event: Event) => {
    if (!mounted || disabled) return;

    const target = event.target as Node;
    if (!target || !document.contains(target)) return;

    // Check if click is inside the element
    if (element.contains(target) || element === target) {
      return;
    }

    // Click is outside, trigger callback
    callback(event);
  };

  // Add event listeners
  const addListeners = () => {
    if (disabled || !mounted) return;

    if (mouseEvent) {
      const eventName = getEventName(mouseEvent);
      document.addEventListener(eventName, handleClickAway, true);
    }

    if (touchEvent) {
      const eventName = getEventName(touchEvent);
      document.addEventListener(eventName, handleClickAway, true);
    }
  };

  const removeListeners = () => {
    if (mouseEvent) {
      const eventName = getEventName(mouseEvent);
      document.removeEventListener(eventName, handleClickAway, true);
    }

    if (touchEvent) {
      const eventName = getEventName(touchEvent);
      document.removeEventListener(eventName, handleClickAway, true);
    }
  };

  // Start listening
  setTimeout(addListeners, 0);

  // Return cleanup function
  return () => {
    mounted = false;
    removeListeners();
  };
}