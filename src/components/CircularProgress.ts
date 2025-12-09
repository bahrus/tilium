import { LitElement, html, unsafeCSS, svg } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class CircularProgress extends LitElement {
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: number = 40;
  @property({ type: Number }) thickness: number = 3.6;
  @property({ type: String }) variant: 'determinate' | 'indeterminate' = 'indeterminate';
  @property({ type: Number }) value: number = 0;

  static styles = unsafeCSS`
    :host {
      display: inline-block;
    }

    .progress {
      display: inline-block;
    }

    svg {
      display: block;
    }

    .indeterminate {
      animation: rotate 1.4s linear infinite;
    }

    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .indeterminate circle {
      stroke-dasharray: 80px, 200px;
      stroke-dashoffset: 0;
      animation: dash 1.4s ease-in-out infinite;
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1px, 200px;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -15px;
      }
      100% {
        stroke-dasharray: 100px, 200px;
        stroke-dashoffset: -125px;
      }
    }

    .primary circle { stroke: ${theme.palette.primary.main}; }
    .secondary circle { stroke: ${theme.palette.secondary.main}; }
    .error circle { stroke: ${theme.palette.error.main}; }
    .warning circle { stroke: ${theme.palette.warning.main}; }
    .info circle { stroke: ${theme.palette.info.main}; }
    .success circle { stroke: ${theme.palette.success.main}; }
  `;

  render() {
    const circumference = 2 * Math.PI * 20;
    const strokeDashoffset = this.variant === 'determinate' 
      ? circumference - (this.value / 100) * circumference 
      : 0;

    return html`
      <div class="progress ${this.variant} ${this.color}">
        ${svg`
          <svg width="${this.size}" height="${this.size}" viewBox="22 22 44 44">
            <circle
              cx="44"
              cy="44"
              r="20"
              fill="none"
              stroke-width="${this.thickness}"
              style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
            />
          </svg>
        `}
      </div>
    `;
  }
}
