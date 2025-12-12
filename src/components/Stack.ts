import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class Stack extends LitElement {
  @property({ type: String }) component = 'div';
  @property({ type: String }) direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'column';
  @property({ type: String }) spacing = '1';
  @property({ type: String }) divider = '';
  @property({ type: String }) justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  @property({ type: String }) alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' = 'stretch';
  @property({ type: Boolean }) useFlexGap = true;

  static styles = css`
    :host {
      display: block;
    }

    .stack {
      display: flex;
      box-sizing: border-box;
    }

    /* Direction */
    .direction-row {
      flex-direction: row;
    }

    .direction-row-reverse {
      flex-direction: row-reverse;
    }

    .direction-column {
      flex-direction: column;
    }

    .direction-column-reverse {
      flex-direction: column-reverse;
    }

    /* Justify Content */
    .justify-content-flex-start {
      justify-content: flex-start;
    }

    .justify-content-center {
      justify-content: center;
    }

    .justify-content-flex-end {
      justify-content: flex-end;
    }

    .justify-content-space-between {
      justify-content: space-between;
    }

    .justify-content-space-around {
      justify-content: space-around;
    }

    .justify-content-space-evenly {
      justify-content: space-evenly;
    }

    /* Align Items */
    .align-items-flex-start {
      align-items: flex-start;
    }

    .align-items-center {
      align-items: center;
    }

    .align-items-flex-end {
      align-items: flex-end;
    }

    .align-items-stretch {
      align-items: stretch;
    }

    .align-items-baseline {
      align-items: baseline;
    }

    /* Divider styles */
    .divider {
      background-color: rgba(0, 0, 0, 0.12);
      border: none;
      flex-shrink: 0;
    }

    .divider.horizontal {
      height: 1px;
      width: 100%;
    }

    .divider.vertical {
      width: 1px;
      height: 100%;
      align-self: stretch;
    }

    /* Fallback spacing for browsers without gap support */
    .stack:not(.use-flex-gap) > :not(:last-child) {
      margin-right: 0;
      margin-bottom: 0;
    }

    .stack.direction-row:not(.use-flex-gap) > :not(:last-child) {
      margin-right: var(--stack-spacing, 8px);
    }

    .stack.direction-row-reverse:not(.use-flex-gap) > :not(:first-child) {
      margin-right: var(--stack-spacing, 8px);
    }

    .stack.direction-column:not(.use-flex-gap) > :not(:last-child) {
      margin-bottom: var(--stack-spacing, 8px);
    }

    .stack.direction-column-reverse:not(.use-flex-gap) > :not(:first-child) {
      margin-bottom: var(--stack-spacing, 8px);
    }
  `;

  private _getSpacingValue(value: string): string {
    if (!value) return '0px';
    
    // Handle numeric values (multiply by 8px - Material Design spacing unit)
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return `${numValue * 8}px`;
    }
    
    // Handle string values (pass through as-is)
    return value;
  }

  private _generateDynamicStyles(): string {
    const styles: string[] = [];
    const spacingValue = this._getSpacingValue(this.spacing);

    // Only use gap if no dividers (dividers handle their own spacing)
    if (this.useFlexGap && !this.divider) {
      // Use modern gap property
      if (this.direction === 'row' || this.direction === 'row-reverse') {
        styles.push(`gap: 0 ${spacingValue};`);
      } else {
        styles.push(`gap: ${spacingValue} 0;`);
      }
    } else if (!this.divider) {
      // Use CSS custom property for fallback spacing
      styles.push(`--stack-spacing: ${spacingValue};`);
    }

    return styles.join(' ');
  }

  private _getClasses(): string {
    const classes = ['stack'];

    classes.push(`direction-${this.direction}`);
    classes.push(`justify-content-${this.justifyContent}`);
    classes.push(`align-items-${this.alignItems}`);

    if (this.useFlexGap) {
      classes.push('use-flex-gap');
    }

    if (this.divider) {
      classes.push('has-divider');
    }

    return classes.join(' ');
  }

  private _generateDividerStyles(): string {
    if (!this.divider) return '';

    const styles: string[] = [];
    const isHorizontal = this.direction === 'row' || this.direction === 'row-reverse';
    const halfSpacing = this._getSpacingValue((parseFloat(this.spacing) / 2).toString());

    if (this.divider === 'line') {
      if (isHorizontal) {
        styles.push(`
          .stack.has-divider ::slotted(*:not(:last-child)) {
            border-right: 1px solid rgba(0, 0, 0, 0.12);
            padding-right: ${halfSpacing};
            margin-right: ${halfSpacing};
          }
        `);
      } else {
        styles.push(`
          .stack.has-divider ::slotted(*:not(:last-child)) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            padding-bottom: ${halfSpacing};
            margin-bottom: ${halfSpacing};
          }
        `);
      }
    } else {
      // For custom dividers, we'll use a simpler approach with borders
      if (isHorizontal) {
        styles.push(`
          .stack.has-divider ::slotted(*:not(:last-child)) {
            position: relative;
            padding-right: ${halfSpacing};
            margin-right: ${halfSpacing};
          }
          .stack.has-divider ::slotted(*:not(:last-child))::after {
            content: '${this.divider}';
            position: absolute;
            right: -${halfSpacing};
            top: 50%;
            transform: translateY(-50%);
            color: rgba(0, 0, 0, 0.6);
            pointer-events: none;
          }
        `);
      } else {
        styles.push(`
          .stack.has-divider ::slotted(*:not(:last-child)) {
            position: relative;
            padding-bottom: ${halfSpacing};
            margin-bottom: ${halfSpacing};
          }
          .stack.has-divider ::slotted(*:not(:last-child))::after {
            content: '${this.divider}';
            position: absolute;
            bottom: -${halfSpacing};
            left: 50%;
            transform: translateX(-50%);
            color: rgba(0, 0, 0, 0.6);
            pointer-events: none;
          }
        `);
      }
    }

    return styles.join(' ');
  }

  render() {
    const dynamicStyles = this._generateDynamicStyles();
    const dividerStyles = this._generateDividerStyles();

    return html`
      <style>
        .stack {
          ${unsafeCSS(dynamicStyles)}
        }
        ${dividerStyles ? unsafeCSS(dividerStyles) : ''}
      </style>
      <div class="${this._getClasses()}">
        <slot></slot>
      </div>
    `;
  }
}