import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class ButtonGroup extends LitElement {
  @property({ type: String }) variant: 'text' | 'contained' | 'outlined' = 'outlined';
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) disableElevation = false;
  @property({ type: Boolean }) fullWidth = false;

  static styles = unsafeCSS`
    :host {
      display: inline-flex;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    :host([fullWidth]) {
      display: flex;
      width: 100%;
    }

    .button-group {
      display: flex;
      border-radius: 4px;
      overflow: hidden;
    }

    .button-group.vertical {
      flex-direction: column;
    }

    .button-group.horizontal {
      flex-direction: row;
    }

    .button-group.fullWidth {
      width: 100%;
    }

    /* Button styling within group */
    ::slotted(*) {
      border-radius: 0 !important;
      margin: 0 !important;
      position: relative;
      z-index: 1;
    }

    /* First button */
    .button-group.horizontal ::slotted(*:first-child) {
      border-top-left-radius: 4px !important;
      border-bottom-left-radius: 4px !important;
    }

    .button-group.vertical ::slotted(*:first-child) {
      border-top-left-radius: 4px !important;
      border-top-right-radius: 4px !important;
    }

    /* Last button */
    .button-group.horizontal ::slotted(*:last-child) {
      border-top-right-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
    }

    .button-group.vertical ::slotted(*:last-child) {
      border-bottom-left-radius: 4px !important;
      border-bottom-right-radius: 4px !important;
    }

    /* Single button (first and last) */
    .button-group ::slotted(*:only-child) {
      border-radius: 4px !important;
    }

    /* Outlined variant - remove adjacent borders */
    .button-group.outlined.horizontal ::slotted(*:not(:last-child)) {
      border-right: none !important;
    }

    .button-group.outlined.vertical ::slotted(*:not(:last-child)) {
      border-bottom: none !important;
    }

    /* Contained variant - add separators */
    .button-group.contained.horizontal ::slotted(*:not(:last-child))::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 1px;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: 2;
    }

    .button-group.contained.vertical ::slotted(*:not(:last-child))::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: 2;
    }

    /* Text variant - no separators needed */
    .button-group.text ::slotted(*) {
      background-color: transparent !important;
    }

    /* Hover effects */
    .button-group.horizontal ::slotted(*:hover) {
      z-index: 3;
    }

    .button-group.vertical ::slotted(*:hover) {
      z-index: 3;
    }

    /* Disabled state */
    .button-group.disabled ::slotted(*) {
      pointer-events: none;
      opacity: 0.5;
    }

    /* Full width buttons */
    .button-group.fullWidth ::slotted(*) {
      flex: 1;
      width: auto !important;
    }

    /* Size variants - pass through to children */
    .button-group.small ::slotted(*) {
      padding: 4px 10px !important;
      font-size: 0.8125rem !important;
    }

    .button-group.medium ::slotted(*) {
      padding: 6px 16px !important;
      font-size: 0.875rem !important;
    }

    .button-group.large ::slotted(*) {
      padding: 8px 22px !important;
      font-size: 0.9375rem !important;
    }

    /* Color variants for contained buttons */
    .button-group.contained.primary ::slotted(*) {
      background-color: ${theme.palette.primary.main} !important;
      color: ${theme.palette.primary.contrastText} !important;
    }

    .button-group.contained.secondary ::slotted(*) {
      background-color: ${theme.palette.secondary.main} !important;
      color: ${theme.palette.secondary.contrastText} !important;
    }

    .button-group.contained.error ::slotted(*) {
      background-color: ${theme.palette.error.main} !important;
      color: ${theme.palette.error.contrastText} !important;
    }

    .button-group.contained.warning ::slotted(*) {
      background-color: ${theme.palette.warning.main} !important;
      color: ${theme.palette.warning.contrastText} !important;
    }

    .button-group.contained.info ::slotted(*) {
      background-color: ${theme.palette.info.main} !important;
      color: ${theme.palette.info.contrastText} !important;
    }

    .button-group.contained.success ::slotted(*) {
      background-color: ${theme.palette.success.main} !important;
      color: ${theme.palette.success.contrastText} !important;
    }

    /* Color variants for outlined buttons */
    .button-group.outlined.primary ::slotted(*) {
      color: ${theme.palette.primary.main} !important;
      border-color: rgba(25, 118, 210, 0.5) !important;
    }

    .button-group.outlined.secondary ::slotted(*) {
      color: ${theme.palette.secondary.main} !important;
      border-color: rgba(156, 39, 176, 0.5) !important;
    }

    .button-group.outlined.error ::slotted(*) {
      color: ${theme.palette.error.main} !important;
      border-color: rgba(211, 47, 47, 0.5) !important;
    }

    .button-group.outlined.warning ::slotted(*) {
      color: ${theme.palette.warning.main} !important;
      border-color: rgba(237, 108, 2, 0.5) !important;
    }

    .button-group.outlined.info ::slotted(*) {
      color: ${theme.palette.info.main} !important;
      border-color: rgba(2, 136, 209, 0.5) !important;
    }

    .button-group.outlined.success ::slotted(*) {
      color: ${theme.palette.success.main} !important;
      border-color: rgba(46, 125, 50, 0.5) !important;
    }

    /* Color variants for text buttons */
    .button-group.text.primary ::slotted(*) {
      color: ${theme.palette.primary.main} !important;
    }

    .button-group.text.secondary ::slotted(*) {
      color: ${theme.palette.secondary.main} !important;
    }

    .button-group.text.error ::slotted(*) {
      color: ${theme.palette.error.main} !important;
    }

    .button-group.text.warning ::slotted(*) {
      color: ${theme.palette.warning.main} !important;
    }

    .button-group.text.info ::slotted(*) {
      color: ${theme.palette.info.main} !important;
    }

    .button-group.text.success ::slotted(*) {
      color: ${theme.palette.success.main} !important;
    }

    /* Elevation */
    .button-group.contained:not(.disableElevation) {
      box-shadow: ${theme.shadows[2]};
    }

    .button-group.contained:not(.disableElevation):hover {
      box-shadow: ${theme.shadows[4]};
    }

    .button-group.contained.disableElevation {
      box-shadow: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateHostAttributes();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('fullWidth')) {
      this.updateHostAttributes();
    }
  }

  private updateHostAttributes() {
    this.toggleAttribute('fullWidth', this.fullWidth);
  }

  render() {
    const classes = [
      'button-group',
      this.variant,
      this.color,
      this.size,
      this.orientation,
      this.disabled ? 'disabled' : '',
      this.disableElevation ? 'disableElevation' : '',
      this.fullWidth ? 'fullWidth' : ''
    ].filter(Boolean).join(' ');

    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `;
  }
}