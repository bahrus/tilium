import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Slider extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) color: 'primary' | 'secondary' = 'primary';

  static styles = unsafeCSS`
    :host {
      display: block;
      padding: 13px 0;
    }

    .slider {
      position: relative;
      width: 100%;
      height: 2px;
      background-color: rgba(0, 0, 0, 0.26);
      border-radius: 1px;
      cursor: pointer;
    }

    .track {
      position: absolute;
      height: 100%;
      border-radius: 1px;
    }

    .primary .track { background-color: ${theme.palette.primary.main}; }
    .secondary .track { background-color: ${theme.palette.secondary.main}; }

    .thumb {
      position: absolute;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -9px;
      border-radius: 50%;
      background-color: currentColor;
      transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .primary .thumb { color: ${theme.palette.primary.main}; }
    .secondary .thumb { color: ${theme.palette.secondary.main}; }

    .thumb:hover {
      box-shadow: 0px 0px 0px 8px rgba(25, 118, 210, 0.16);
    }

    .slider.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      margin: 0;
    }
  `;

  private handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    return html`
      <div class="slider ${this.color} ${this.disabled ? 'disabled' : ''}">
        <div class="track" style="width: ${percentage}%"></div>
        <div class="thumb" style="left: ${percentage}%"></div>
        <input
          type="range"
          .value="${String(this.value)}"
          min="${this.min}"
          max="${this.max}"
          step="${this.step}"
          ?disabled="${this.disabled}"
          @input="${this.handleInput}"
        />
      </div>
    `;
  }
}
