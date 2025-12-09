import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Switch extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' = 'medium';

  static styles = css`
    :host {
      display: inline-block;
    }

    .switch-wrapper {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .switch-wrapper.disabled {
      cursor: default;
      pointer-events: none;
      opacity: 0.5;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .switch-track {
      position: relative;
      display: inline-block;
      border-radius: 12px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
      background-color: rgba(0, 0, 0, 0.38);
    }

    .medium .switch-track {
      width: 58px;
      height: 38px;
    }

    .small .switch-track {
      width: 40px;
      height: 24px;
    }

    .switch-track.checked {
      opacity: 0.5;
    }

    .switch-track.checked.primary { background-color: ${theme.palette.primary.main}; }
    .switch-track.checked.secondary { background-color: ${theme.palette.secondary.main}; }
    .switch-track.checked.error { background-color: ${theme.palette.error.main}; }
    .switch-track.checked.warning { background-color: ${theme.palette.warning.main}; }
    .switch-track.checked.info { background-color: ${theme.palette.info.main}; }
    .switch-track.checked.success { background-color: ${theme.palette.success.main}; }

    .switch-thumb {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #fafafa;
      box-shadow: ${theme.shadows[1]};
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .medium .switch-thumb {
      width: 20px;
      height: 20px;
      left: 9px;
    }

    .small .switch-thumb {
      width: 16px;
      height: 16px;
      left: 4px;
    }

    .switch-thumb.checked {
      background-color: white;
    }

    .medium .switch-thumb.checked {
      left: 29px;
    }

    .small .switch-thumb.checked {
      left: 20px;
    }
  `;

  private handleChange(e: Event) {
    if (this.disabled) return;
    
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const trackClasses = [
      'switch-track',
      this.checked ? `checked ${this.color}` : ''
    ].join(' ');

    const thumbClasses = [
      'switch-thumb',
      this.checked ? 'checked' : ''
    ].join(' ');

    return html`
      <label class="switch-wrapper ${this.size} ${this.disabled ? 'disabled' : ''}">
        <input
          type="checkbox"
          .checked="${this.checked}"
          ?disabled="${this.disabled}"
          @change="${this.handleChange}"
        />
        <span class="${trackClasses}">
          <span class="${thumbClasses}"></span>
        </span>
      </label>
    `;
  }
}
