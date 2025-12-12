import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Skeleton extends LitElement {
  @property({ type: String }) variant: 'text' | 'rectangular' | 'rounded' | 'circular' = 'text';
  @property({ type: String }) animation: 'pulse' | 'wave' | false = 'pulse';
  @property({ type: String }) width: string = '';
  @property({ type: String }) height: string = '';

  static styles = css`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .skeleton {
      display: block;
      background-color: rgba(0, 0, 0, 0.11);
      height: 1.2em;
      transform-origin: 0 55%;
      transform: scale(1, 0.60);
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }

    .skeleton.dark {
      background-color: rgba(255, 255, 255, 0.13);
    }

    /* Variants */
    .skeleton.text {
      margin-top: 0;
      margin-bottom: 0;
      height: 1.2em;
      transform-origin: 0 55%;
      transform: scale(1, 0.60);
      border-radius: 4px;
    }

    .skeleton.rectangular {
      height: 118px;
      transform: none;
      border-radius: 0;
    }

    .skeleton.rounded {
      height: 118px;
      transform: none;
      border-radius: 4px;
    }

    .skeleton.circular {
      height: 40px;
      width: 40px;
      transform: none;
      border-radius: 50%;
    }

    /* Animations */
    .skeleton.pulse {
      animation: skeleton-pulse 1.5s ease-in-out 0.5s infinite;
    }

    @keyframes skeleton-pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        opacity: 1;
      }
    }

    .skeleton.wave {
      position: relative;
      overflow: hidden;
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
      background-size: 200px 100%;
      background-repeat: no-repeat;
      animation: skeleton-wave 1.6s linear 0.5s infinite;
    }

    .skeleton.wave.dark {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
      background-size: 200px 100%;
      background-repeat: no-repeat;
    }

    @keyframes skeleton-wave {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    .skeleton.wave::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transform: translateX(-100%);
      animation: skeleton-wave-shimmer 1.6s linear 0.5s infinite;
    }

    .skeleton.wave.dark::after {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    }

    @keyframes skeleton-wave-shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    /* Size utilities */
    .skeleton.fit-content {
      max-width: fit-content;
    }

    /* Custom dimensions */
    .skeleton[style*="width"] {
      width: var(--skeleton-width);
    }

    .skeleton[style*="height"] {
      height: var(--skeleton-height);
    }
  `;

  private getSkeletonStyle() {
    const styles: string[] = [];
    
    if (this.width) {
      styles.push(`width: ${this.width}`);
    }
    
    if (this.height) {
      styles.push(`height: ${this.height}`);
    }
    
    return styles.length > 0 ? styles.join('; ') : '';
  }

  render() {
    const animationClass = this.animation ? this.animation : '';
    const style = this.getSkeletonStyle();

    return html`
      <div 
        class="skeleton ${this.variant} ${animationClass}"
        style="${style}"
        role="progressbar"
        aria-label="Loading content"
        aria-busy="true"
      ></div>
    `;
  }
}