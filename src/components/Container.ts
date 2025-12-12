import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class Container extends LitElement {
  @property({ type: String }) component = 'div';
  @property({ type: Boolean }) disableGutters = false;
  @property({ type: Boolean }) fixed = false;
  @property({ type: String }) maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false = 'lg';

  static styles = css`
    :host {
      display: block;
    }

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      box-sizing: border-box;
    }

    /* Default gutters (padding) */
    .container:not(.disable-gutters) {
      padding-left: 16px;
      padding-right: 16px;
    }

    /* Responsive gutters */
    @media (min-width: 600px) {
      .container:not(.disable-gutters) {
        padding-left: 24px;
        padding-right: 24px;
      }
    }

    /* Fixed width containers */
    .container.fixed {
      min-height: 100vh;
    }

    /* Max width breakpoints */
    .container.max-width-xs {
      max-width: 444px;
    }

    @media (min-width: 600px) {
      .container.max-width-sm {
        max-width: 600px;
      }
    }

    @media (min-width: 900px) {
      .container.max-width-md {
        max-width: 900px;
      }
    }

    @media (min-width: 1200px) {
      .container.max-width-lg {
        max-width: 1200px;
      }
    }

    @media (min-width: 1536px) {
      .container.max-width-xl {
        max-width: 1536px;
      }
    }

    /* Fluid container (no max-width) */
    .container.max-width-false {
      max-width: none;
    }

    /* Responsive max-widths - containers grow with screen size */
    @media (min-width: 600px) {
      .container:not(.max-width-xs):not(.max-width-false) {
        max-width: 600px;
      }
    }

    @media (min-width: 900px) {
      .container:not(.max-width-xs):not(.max-width-sm):not(.max-width-false) {
        max-width: 900px;
      }
    }

    @media (min-width: 1200px) {
      .container:not(.max-width-xs):not(.max-width-sm):not(.max-width-md):not(.max-width-false) {
        max-width: 1200px;
      }
    }

    @media (min-width: 1536px) {
      .container:not(.max-width-xs):not(.max-width-sm):not(.max-width-md):not(.max-width-lg):not(.max-width-false) {
        max-width: 1536px;
      }
    }

    /* Breakpoint-specific max-widths */
    .container.max-width-xs {
      max-width: 444px;
    }

    .container.max-width-sm {
      max-width: 600px;
    }

    .container.max-width-md {
      max-width: 900px;
    }

    .container.max-width-lg {
      max-width: 1200px;
    }

    .container.max-width-xl {
      max-width: 1536px;
    }
  `;

  private _getClasses(): string {
    const classes = ['container'];

    if (this.disableGutters) {
      classes.push('disable-gutters');
    }

    if (this.fixed) {
      classes.push('fixed');
    }

    if (this.maxWidth !== false) {
      classes.push(`max-width-${this.maxWidth}`);
    } else {
      classes.push('max-width-false');
    }

    return classes.join(' ');
  }

  render() {
    return html`
      <div class="${this._getClasses()}">
        <slot></slot>
      </div>
    `;
  }
}