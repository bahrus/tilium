import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class LinearProgress extends LitElement {
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) variant: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  @property({ type: Number }) value: number = 0;
  @property({ type: Number }) valueBuffer: number = 0;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .progress {
      position: relative;
      overflow: hidden;
      height: 4px;
      background-color: rgba(0, 0, 0, 0.12);
    }

    .bar {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      transition: transform 0.2s linear;
      transform-origin: left;
    }

    .primary .bar { background-color: ${theme.palette.primary.main}; }
    .secondary .bar { background-color: ${theme.palette.secondary.main}; }
    .error .bar { background-color: ${theme.palette.error.main}; }
    .warning .bar { background-color: ${theme.palette.warning.main}; }
    .info .bar { background-color: ${theme.palette.info.main}; }
    .success .bar { background-color: ${theme.palette.success.main}; }

    .indeterminate .bar {
      width: 100%;
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    @keyframes indeterminate {
      0% {
        left: -35%;
        right: 100%;
      }
      60% {
        left: 100%;
        right: -90%;
      }
      100% {
        left: 100%;
        right: -90%;
      }
    }
  `;

  render() {
    const barStyle = this.variant === 'determinate' 
      ? `transform: scaleX(${this.value / 100})` 
      : '';

    return html`
      <div class="progress ${this.variant} ${this.color}">
        <div class="bar" style="${barStyle}"></div>
      </div>
    `;
  }
}
