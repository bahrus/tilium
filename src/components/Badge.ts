import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Badge extends LitElement {
  @property({ type: String }) badgeContent = '';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  @property({ type: String }) variant: 'standard' | 'dot' = 'standard';
  @property({ type: String }) anchorOrigin: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' = 'top-right';
  @property({ type: Boolean }) invisible = false;
  @property({ type: Boolean }) showZero = false;
  @property({ type: Number }) max = 99;
  @property({ type: String }) overlap: 'rectangular' | 'circular' = 'rectangular';

  static styles = unsafeCSS`
    :host {
      display: inline-block;
      position: relative;
      vertical-align: middle;
    }

    .badge-wrapper {
      position: relative;
      display: inline-block;
    }

    .badge {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
      border-radius: 10px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      z-index: 1;
      transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
    }

    .badge.invisible {
      transform: scale(0) translate(50%, -50%);
    }

    /* Dot variant */
    .badge.dot {
      min-width: 8px;
      width: 8px;
      height: 8px;
      padding: 0;
      border-radius: 50%;
    }

    /* Positioning */
    .badge.top-right {
      top: 0;
      right: 0;
      transform: scale(1) translate(50%, -50%);
      transform-origin: 100% 0%;
    }

    .badge.top-left {
      top: 0;
      left: 0;
      transform: scale(1) translate(-50%, -50%);
      transform-origin: 0% 0%;
    }

    .badge.bottom-right {
      bottom: 0;
      right: 0;
      transform: scale(1) translate(50%, 50%);
      transform-origin: 100% 100%;
    }

    .badge.bottom-left {
      bottom: 0;
      left: 0;
      transform: scale(1) translate(-50%, 50%);
      transform-origin: 0% 100%;
    }

    /* Invisible positioning adjustments */
    .badge.invisible.top-right {
      transform: scale(0) translate(50%, -50%);
    }

    .badge.invisible.top-left {
      transform: scale(0) translate(-50%, -50%);
    }

    .badge.invisible.bottom-right {
      transform: scale(0) translate(50%, 50%);
    }

    .badge.invisible.bottom-left {
      transform: scale(0) translate(-50%, 50%);
    }

    /* Overlap adjustments for circular children */
    .badge-wrapper.circular .badge.top-right {
      top: 14%;
      right: 14%;
    }

    .badge-wrapper.circular .badge.top-left {
      top: 14%;
      left: 14%;
    }

    .badge-wrapper.circular .badge.bottom-right {
      bottom: 14%;
      right: 14%;
    }

    .badge-wrapper.circular .badge.bottom-left {
      bottom: 14%;
      left: 14%;
    }

    /* Color variants */
    .badge.default {
      background-color: rgba(0, 0, 0, 0.87);
      color: #fff;
    }

    .badge.primary {
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.contrastText};
    }

    .badge.secondary {
      background-color: ${theme.palette.secondary.main};
      color: ${theme.palette.secondary.contrastText};
    }

    .badge.error {
      background-color: ${theme.palette.error.main};
      color: ${theme.palette.error.contrastText};
    }

    .badge.warning {
      background-color: ${theme.palette.warning.main};
      color: ${theme.palette.warning.contrastText};
    }

    .badge.info {
      background-color: ${theme.palette.info.main};
      color: ${theme.palette.info.contrastText};
    }

    .badge.success {
      background-color: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
    }

    /* Content slot */
    .content {
      display: block;
    }
  `;

  private get displayContent(): string {
    if (this.variant === 'dot') {
      return '';
    }

    if (!this.badgeContent && !this.showZero) {
      return '';
    }

    const numericContent = Number(this.badgeContent);
    if (!isNaN(numericContent) && numericContent > this.max) {
      return `${this.max}+`;
    }

    return this.badgeContent;
  }

  private get shouldShowBadge(): boolean {
    if (this.invisible) {
      return false;
    }

    if (this.variant === 'dot') {
      return true;
    }

    if (!this.badgeContent) {
      return this.showZero && this.badgeContent === '0';
    }

    return true;
  }

  render() {
    const badgeClasses = [
      'badge',
      this.variant,
      this.color,
      this.anchorOrigin,
      !this.shouldShowBadge ? 'invisible' : ''
    ].filter(Boolean).join(' ');

    const wrapperClasses = [
      'badge-wrapper',
      this.overlap
    ].join(' ');

    return html`
      <div class="${wrapperClasses}">
        <div class="content">
          <slot></slot>
        </div>
        <span class="${badgeClasses}">
          ${this.displayContent}
        </span>
      </div>
    `;
  }
}