import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Chip extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) variant: 'filled' | 'outlined' = 'filled';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'default';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) deletable = false;
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      border-radius: 16px;
      padding: 0 12px;
      font-size: 0.8125rem;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      cursor: default;
      user-select: none;
    }

    .chip.small {
      height: 24px;
      font-size: 0.75rem;
    }

    .chip.clickable {
      cursor: pointer;
    }

    .chip.clickable:hover {
      opacity: 0.8;
    }

    .chip.filled.default {
      background-color: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.87);
    }

    .chip.filled.primary { background-color: ${theme.palette.primary.main}; color: ${theme.palette.primary.contrastText}; }
    .chip.filled.secondary { background-color: ${theme.palette.secondary.main}; color: ${theme.palette.secondary.contrastText}; }
    .chip.filled.error { background-color: ${theme.palette.error.main}; color: ${theme.palette.error.contrastText}; }
    .chip.filled.warning { background-color: ${theme.palette.warning.main}; color: ${theme.palette.warning.contrastText}; }
    .chip.filled.info { background-color: ${theme.palette.info.main}; color: ${theme.palette.info.contrastText}; }
    .chip.filled.success { background-color: ${theme.palette.success.main}; color: ${theme.palette.success.contrastText}; }

    .chip.outlined {
      background-color: transparent;
      border: 1px solid rgba(0, 0, 0, 0.23);
    }

    .chip.outlined.primary { border-color: ${theme.palette.primary.main}; color: ${theme.palette.primary.main}; }
    .chip.outlined.secondary { border-color: ${theme.palette.secondary.main}; color: ${theme.palette.secondary.main}; }
    .chip.outlined.error { border-color: ${theme.palette.error.main}; color: ${theme.palette.error.main}; }

    .delete-icon {
      margin-left: 5px;
      margin-right: -6px;
      cursor: pointer;
      font-size: 18px;
      opacity: 0.7;
    }

    .delete-icon:hover {
      opacity: 1;
    }

    .chip.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `;

  private handleClick() {
    if (this.clickable && !this.disabled) {
      this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
    }
  }

  private handleDelete(e: Event) {
    e.stopPropagation();
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('delete', { bubbles: true, composed: true }));
    }
  }

  render() {
    const classes = [
      'chip',
      this.variant,
      this.color,
      this.size,
      this.clickable ? 'clickable' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="${classes}" @click="${this.handleClick}">
        <slot></slot>
        ${this.label}
        ${this.deletable ? html`<span class="delete-icon" @click="${this.handleDelete}">×</span>` : ''}
      </div>
    `;
  }
}
