import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Accordion extends LitElement {
  @property({ type: Boolean }) expanded = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) disableGutters = false;
  @property({ type: String }) variant: 'elevation' | 'outlined' = 'elevation';
  @property({ type: Boolean }) square = false;
  @property({ type: String }) TransitionComponent = 'collapse';
  @property({ type: String }) TransitionProps = '';

  static styles = css`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .accordion {
      position: relative;
      transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1);
      overflow-anchor: none;
    }

    .accordion:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .accordion.variant-elevation {
      box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 3px 0px rgba(0, 0, 0, 0.12);
      margin: 8px 0;
    }

    .accordion.variant-elevation:first-child {
      margin-top: 0;
    }

    .accordion.variant-elevation:last-child {
      margin-bottom: 0;
    }

    .accordion.variant-outlined {
      border: 1px solid rgba(0, 0, 0, 0.12);
      margin: 0;
    }

    .accordion.variant-outlined:not(:first-child) {
      border-top: 0;
    }

    .accordion.square {
      border-radius: 0;
    }

    .accordion:not(.square) {
      border-radius: 4px;
    }

    .accordion.variant-outlined:not(.square):first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    .accordion.variant-outlined:not(.square):last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    .accordion.expanded {
      margin: 16px 0;
    }

    .accordion.expanded.variant-outlined {
      margin: 0;
    }

    .accordion.disabled {
      background-color: rgba(0, 0, 0, 0.12);
    }

    .accordion.disabled .accordion-summary {
      opacity: 0.38;
    }

    /* Remove gutters */
    .accordion.disable-gutters {
      margin: 0;
    }

    .accordion.disable-gutters.variant-elevation {
      box-shadow: none;
    }
  `;

  private _handleToggle() {
    if (this.disabled) return;

    const oldExpanded = this.expanded;
    this.expanded = !this.expanded;

    this.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { 
        expanded: this.expanded,
        previousExpanded: oldExpanded
      }
    }));
  }

  render() {
    const classes = [
      'accordion',
      `variant-${this.variant}`,
      this.expanded ? 'expanded' : '',
      this.disabled ? 'disabled' : '',
      this.disableGutters ? 'disable-gutters' : '',
      this.square ? 'square' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot name="summary" @click="${this._handleToggle}"></slot>
        <slot name="details" ?hidden="${!this.expanded}"></slot>
      </div>
    `;
  }
}

export class AccordionSummary extends LitElement {
  @property({ type: String }) expandIcon = 'expand_more';
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) iconButtonProps = '';

  static styles = css`
    :host {
      display: block;
    }

    .accordion-summary {
      display: flex;
      align-items: center;
      padding: 0 16px;
      min-height: 48px;
      cursor: pointer;
      transition: min-height 150ms cubic-bezier(0.4, 0, 0.2, 1),
                  background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      outline: none;
      position: relative;
    }

    .accordion-summary:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .accordion-summary:focus {
      background-color: rgba(0, 0, 0, 0.12);
    }

    .accordion-summary.disabled {
      cursor: default;
      pointer-events: none;
    }

    .summary-content {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 12px 0;
    }

    .expand-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin-left: auto;
      transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
      color: rgba(0, 0, 0, 0.54);
    }

    .expand-icon.expanded {
      transform: rotate(180deg);
    }

    .expand-icon svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    /* Focus ring */
    .accordion-summary::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      pointer-events: none;
      transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .accordion-summary:focus-visible::after {
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
    }
  `;

  private _renderExpandIcon() {
    // Default expand_more icon
    const expandMorePath = 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z';
    
    return html`
      <svg viewBox="0 0 24 24">
        <path d="${expandMorePath}"/>
      </svg>
    `;
  }

  private _handleClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Let the event bubble up to the Accordion component
    this.dispatchEvent(new CustomEvent('summary-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  render() {
    const accordion = this.closest('mui-accordion') as Accordion;
    const isExpanded = accordion?.expanded || false;

    return html`
      <button 
        class="accordion-summary ${this.disabled ? 'disabled' : ''}"
        @click="${this._handleClick}"
        aria-expanded="${isExpanded}"
        tabindex="${this.disabled ? '-1' : '0'}"
      >
        <div class="summary-content">
          <slot></slot>
        </div>
        <div class="expand-icon ${isExpanded ? 'expanded' : ''}">
          ${this._renderExpandIcon()}
        </div>
      </button>
    `;
  }
}

export class AccordionDetails extends LitElement {
  @property({ type: Boolean }) disablePadding = false;

  static styles = css`
    :host {
      display: block;
    }

    .accordion-details {
      padding: 8px 16px 16px;
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }

    .accordion-details.disable-padding {
      padding: 0;
    }

    /* Animation for content reveal */
    :host([hidden]) {
      display: none !important;
    }

    .accordion-details {
      animation: accordion-expand 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes accordion-expand {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  render() {
    const classes = [
      'accordion-details',
      this.disablePadding ? 'disable-padding' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}

export class AccordionActions extends LitElement {
  @property({ type: Boolean }) disableSpacing = false;

  static styles = css`
    :host {
      display: block;
    }

    .accordion-actions {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      justify-content: flex-end;
      gap: 8px;
    }

    .accordion-actions.disable-spacing {
      padding: 0;
    }
  `;

  render() {
    const classes = [
      'accordion-actions',
      this.disableSpacing ? 'disable-spacing' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}