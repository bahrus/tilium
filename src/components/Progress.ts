import { LitElement, html, css, svg } from 'lit';
import { property } from 'lit/decorators.js';

export class Progress extends LitElement {
  @property({ type: String }) variant: 'linear' | 'circular' = 'linear';
  @property({ type: String }) color: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' = 'primary';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | number = 'medium';
  @property({ type: Number }) value = 0;
  @property({ type: Number }) buffer = 0;
  @property({ type: String }) mode: 'determinate' | 'indeterminate' | 'buffer' | 'query' = 'indeterminate';
  @property({ type: Number }) thickness = 3.6;
  @property({ type: Boolean }) showLabel = false;
  @property({ type: String }) label = '';

  static styles = css`
    :host {
      display: inline-block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    /* Linear Progress Styles */
    .linear-progress {
      position: relative;
      width: 100%;
      height: 4px;
      background-color: rgba(0, 0, 0, 0.12);
      border-radius: 2px;
      overflow: hidden;
    }

    .linear-progress.thick {
      height: 6px;
      border-radius: 3px;
    }

    .linear-progress.thin {
      height: 2px;
      border-radius: 1px;
    }

    .linear-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: inherit;
      transition: transform 0.2s ease-in-out;
    }

    .linear-buffer {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-radius: inherit;
      opacity: 0.3;
    }

    /* Linear Colors */
    .linear-progress.primary .linear-bar {
      background-color: #1976d2;
    }

    .linear-progress.primary .linear-buffer {
      background-color: #1976d2;
    }

    .linear-progress.secondary .linear-bar {
      background-color: #9c27b0;
    }

    .linear-progress.secondary .linear-buffer {
      background-color: #9c27b0;
    }

    .linear-progress.error .linear-bar {
      background-color: #d32f2f;
    }

    .linear-progress.error .linear-buffer {
      background-color: #d32f2f;
    }

    .linear-progress.warning .linear-bar {
      background-color: #ed6c02;
    }

    .linear-progress.warning .linear-buffer {
      background-color: #ed6c02;
    }

    .linear-progress.info .linear-bar {
      background-color: #0288d1;
    }

    .linear-progress.info .linear-buffer {
      background-color: #0288d1;
    }

    .linear-progress.success .linear-bar {
      background-color: #2e7d32;
    }

    .linear-progress.success .linear-buffer {
      background-color: #2e7d32;
    }

    /* Linear Animations */
    .linear-progress.indeterminate .linear-bar {
      animation: linear-indeterminate 2s infinite linear;
      transform-origin: left;
    }

    @keyframes linear-indeterminate {
      0% {
        transform: translateX(-100%) scaleX(0);
      }
      50% {
        transform: translateX(-100%) scaleX(1);
      }
      100% {
        transform: translateX(100%) scaleX(1);
      }
    }

    .linear-progress.query .linear-bar {
      animation: linear-query 2s infinite ease-in-out;
    }

    @keyframes linear-query {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Circular Progress Styles */
    .circular-progress {
      display: inline-block;
      position: relative;
    }

    .circular-progress svg {
      display: block;
      transform: rotate(-90deg);
    }

    .circular-progress.indeterminate svg {
      animation: circular-rotate 1.4s linear infinite;
    }

    @keyframes circular-rotate {
      0% { transform: rotate(-90deg); }
      100% { transform: rotate(270deg); }
    }

    .circular-progress.indeterminate circle {
      stroke-dasharray: 80px, 200px;
      stroke-dashoffset: 0;
      animation: circular-dash 1.4s ease-in-out infinite;
    }

    @keyframes circular-dash {
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

    /* Circular Colors */
    .circular-progress.primary circle {
      stroke: #1976d2;
    }

    .circular-progress.secondary circle {
      stroke: #9c27b0;
    }

    .circular-progress.error circle {
      stroke: #d32f2f;
    }

    .circular-progress.warning circle {
      stroke: #ed6c02;
    }

    .circular-progress.info circle {
      stroke: #0288d1;
    }

    .circular-progress.success circle {
      stroke: #2e7d32;
    }

    /* Progress Label */
    .progress-label {
      margin-top: 8px;
      text-align: center;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }

    .progress-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .progress-container.linear {
      align-items: stretch;
    }

    /* Progress with label inline */
    .progress-with-label {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .progress-with-label.vertical {
      flex-direction: column;
      gap: 8px;
    }

    .progress-percentage {
      min-width: 35px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }
  `;

  private getSizeValue(): number {
    if (typeof this.size === 'number') {
      return this.size;
    }
    
    switch (this.size) {
      case 'small': return this.variant === 'circular' ? 24 : 2;
      case 'medium': return this.variant === 'circular' ? 40 : 4;
      case 'large': return this.variant === 'circular' ? 56 : 6;
      default: return this.variant === 'circular' ? 40 : 4;
    }
  }

  private getThicknessClass(): string {
    if (this.variant !== 'linear') return '';
    
    const size = this.getSizeValue();
    if (size <= 2) return 'thin';
    if (size >= 6) return 'thick';
    return '';
  }

  private renderLinearProgress() {
    const bufferWidth = this.mode === 'buffer' ? `${this.buffer}%` : '0%';
    const progressWidth = this.mode === 'determinate' ? `${this.value}%` : '100%';
    const thicknessClass = this.getThicknessClass();

    return html`
      <div class="linear-progress ${this.color} ${this.mode} ${thicknessClass}">
        ${this.mode === 'buffer' ? html`
          <div class="linear-buffer" style="width: ${bufferWidth}"></div>
        ` : ''}
        <div class="linear-bar" style="width: ${progressWidth}"></div>
      </div>
    `;
  }

  private renderCircularProgress() {
    const size = this.getSizeValue();
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = this.mode === 'determinate' 
      ? circumference - (this.value / 100) * circumference 
      : 0;

    return html`
      <div class="circular-progress ${this.color} ${this.mode}">
        ${svg`
          <svg width="${size}" height="${size}" viewBox="22 22 44 44">
            <circle
              cx="44"
              cy="44"
              r="${radius}"
              fill="none"
              stroke-width="${this.thickness}"
              stroke="rgba(0, 0, 0, 0.12)"
            />
            <circle
              cx="44"
              cy="44"
              r="${radius}"
              fill="none"
              stroke-width="${this.thickness}"
              style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
            />
          </svg>
        `}
      </div>
    `;
  }

  private renderLabel() {
    if (!this.showLabel) return '';

    const labelText = this.label || (this.mode === 'determinate' ? `${Math.round(this.value)}%` : '');
    
    if (!labelText) return '';

    return html`<div class="progress-label">${labelText}</div>`;
  }

  private renderWithInlineLabel() {
    const labelText = this.label || (this.mode === 'determinate' ? `${Math.round(this.value)}%` : '');
    
    return html`
      <div class="progress-with-label ${this.variant === 'circular' ? 'vertical' : ''}">
        ${this.variant === 'linear' ? this.renderLinearProgress() : this.renderCircularProgress()}
        ${labelText ? html`<span class="progress-percentage">${labelText}</span>` : ''}
      </div>
    `;
  }

  render() {
    if (this.showLabel && this.variant === 'linear' && (this.label || this.mode === 'determinate')) {
      return this.renderWithInlineLabel();
    }

    return html`
      <div class="progress-container ${this.variant}">
        ${this.variant === 'linear' ? this.renderLinearProgress() : this.renderCircularProgress()}
        ${this.renderLabel()}
      </div>
    `;
  }
}