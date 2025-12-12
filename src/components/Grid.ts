import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class Grid extends LitElement {
  @property({ type: String }) component = 'div';
  @property({ type: Boolean }) container = false;
  @property({ type: Boolean }) item = false;
  @property({ type: String }) direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  @property({ type: String }) wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'wrap';
  @property({ type: String }) justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  @property({ type: String }) alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' = 'stretch';
  @property({ type: String }) alignContent: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' = 'stretch';
  
  // Spacing (using Material Design 8px unit system)
  @property({ type: String }) spacing = '0';
  @property({ type: String }) rowSpacing = '';
  @property({ type: String }) columnSpacing = '';
  
  // Grid sizes for different breakpoints (1-12 or 'auto' or true)
  @property({ type: String }) xs = '';
  @property({ type: String }) sm = '';
  @property({ type: String }) md = '';
  @property({ type: String }) lg = '';
  @property({ type: String }) xl = '';
  
  // Offset for different breakpoints
  @property({ type: String }) xsOffset = '';
  @property({ type: String }) smOffset = '';
  @property({ type: String }) mdOffset = '';
  @property({ type: String }) lgOffset = '';
  @property({ type: String }) xlOffset = '';

  static styles = css`
    :host {
      display: block;
    }

    .grid {
      box-sizing: border-box;
    }

    /* Container styles */
    .grid-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      box-sizing: border-box;
    }

    /* Direction */
    .direction-row { flex-direction: row; }
    .direction-row-reverse { flex-direction: row-reverse; }
    .direction-column { flex-direction: column; }
    .direction-column-reverse { flex-direction: column-reverse; }

    /* Wrap */
    .wrap-nowrap { flex-wrap: nowrap; }
    .wrap-wrap { flex-wrap: wrap; }
    .wrap-wrap-reverse { flex-wrap: wrap-reverse; }

    /* Justify Content */
    .justify-content-flex-start { justify-content: flex-start; }
    .justify-content-center { justify-content: center; }
    .justify-content-flex-end { justify-content: flex-end; }
    .justify-content-space-between { justify-content: space-between; }
    .justify-content-space-around { justify-content: space-around; }
    .justify-content-space-evenly { justify-content: space-evenly; }

    /* Align Items */
    .align-items-flex-start { align-items: flex-start; }
    .align-items-center { align-items: center; }
    .align-items-flex-end { align-items: flex-end; }
    .align-items-stretch { align-items: stretch; }
    .align-items-baseline { align-items: baseline; }

    /* Align Content */
    .align-content-stretch { align-content: stretch; }
    .align-content-center { align-content: center; }
    .align-content-flex-start { align-content: flex-start; }
    .align-content-flex-end { align-content: flex-end; }
    .align-content-space-between { align-content: space-between; }
    .align-content-space-around { align-content: space-around; }

    /* Grid item base */
    .grid-item {
      box-sizing: border-box;
      margin: 0;
    }

    /* Grid sizes - xs (default, no media query) */
    .grid-xs-auto { flex-grow: 1; flex-basis: 0; max-width: 100%; }
    .grid-xs-true { flex-grow: 1; flex-basis: 0; max-width: 100%; }
    .grid-xs-1 { flex-grow: 0; flex-basis: 8.333333%; max-width: 8.333333%; }
    .grid-xs-2 { flex-grow: 0; flex-basis: 16.666667%; max-width: 16.666667%; }
    .grid-xs-3 { flex-grow: 0; flex-basis: 25%; max-width: 25%; }
    .grid-xs-4 { flex-grow: 0; flex-basis: 33.333333%; max-width: 33.333333%; }
    .grid-xs-5 { flex-grow: 0; flex-basis: 41.666667%; max-width: 41.666667%; }
    .grid-xs-6 { flex-grow: 0; flex-basis: 50%; max-width: 50%; }
    .grid-xs-7 { flex-grow: 0; flex-basis: 58.333333%; max-width: 58.333333%; }
    .grid-xs-8 { flex-grow: 0; flex-basis: 66.666667%; max-width: 66.666667%; }
    .grid-xs-9 { flex-grow: 0; flex-basis: 75%; max-width: 75%; }
    .grid-xs-10 { flex-grow: 0; flex-basis: 83.333333%; max-width: 83.333333%; }
    .grid-xs-11 { flex-grow: 0; flex-basis: 91.666667%; max-width: 91.666667%; }
    .grid-xs-12 { flex-grow: 0; flex-basis: 100%; max-width: 100%; }

    /* Grid offsets - xs */
    .grid-xs-offset-1 { margin-left: 8.333333%; }
    .grid-xs-offset-2 { margin-left: 16.666667%; }
    .grid-xs-offset-3 { margin-left: 25%; }
    .grid-xs-offset-4 { margin-left: 33.333333%; }
    .grid-xs-offset-5 { margin-left: 41.666667%; }
    .grid-xs-offset-6 { margin-left: 50%; }
    .grid-xs-offset-7 { margin-left: 58.333333%; }
    .grid-xs-offset-8 { margin-left: 66.666667%; }
    .grid-xs-offset-9 { margin-left: 75%; }
    .grid-xs-offset-10 { margin-left: 83.333333%; }
    .grid-xs-offset-11 { margin-left: 91.666667%; }

    /* sm breakpoint (600px+) */
    @media (min-width: 600px) {
      .grid-sm-auto { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-sm-true { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-sm-1 { flex-grow: 0; flex-basis: 8.333333%; max-width: 8.333333%; }
      .grid-sm-2 { flex-grow: 0; flex-basis: 16.666667%; max-width: 16.666667%; }
      .grid-sm-3 { flex-grow: 0; flex-basis: 25%; max-width: 25%; }
      .grid-sm-4 { flex-grow: 0; flex-basis: 33.333333%; max-width: 33.333333%; }
      .grid-sm-5 { flex-grow: 0; flex-basis: 41.666667%; max-width: 41.666667%; }
      .grid-sm-6 { flex-grow: 0; flex-basis: 50%; max-width: 50%; }
      .grid-sm-7 { flex-grow: 0; flex-basis: 58.333333%; max-width: 58.333333%; }
      .grid-sm-8 { flex-grow: 0; flex-basis: 66.666667%; max-width: 66.666667%; }
      .grid-sm-9 { flex-grow: 0; flex-basis: 75%; max-width: 75%; }
      .grid-sm-10 { flex-grow: 0; flex-basis: 83.333333%; max-width: 83.333333%; }
      .grid-sm-11 { flex-grow: 0; flex-basis: 91.666667%; max-width: 91.666667%; }
      .grid-sm-12 { flex-grow: 0; flex-basis: 100%; max-width: 100%; }

      .grid-sm-offset-1 { margin-left: 8.333333%; }
      .grid-sm-offset-2 { margin-left: 16.666667%; }
      .grid-sm-offset-3 { margin-left: 25%; }
      .grid-sm-offset-4 { margin-left: 33.333333%; }
      .grid-sm-offset-5 { margin-left: 41.666667%; }
      .grid-sm-offset-6 { margin-left: 50%; }
      .grid-sm-offset-7 { margin-left: 58.333333%; }
      .grid-sm-offset-8 { margin-left: 66.666667%; }
      .grid-sm-offset-9 { margin-left: 75%; }
      .grid-sm-offset-10 { margin-left: 83.333333%; }
      .grid-sm-offset-11 { margin-left: 91.666667%; }
    }

    /* md breakpoint (900px+) */
    @media (min-width: 900px) {
      .grid-md-auto { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-md-true { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-md-1 { flex-grow: 0; flex-basis: 8.333333%; max-width: 8.333333%; }
      .grid-md-2 { flex-grow: 0; flex-basis: 16.666667%; max-width: 16.666667%; }
      .grid-md-3 { flex-grow: 0; flex-basis: 25%; max-width: 25%; }
      .grid-md-4 { flex-grow: 0; flex-basis: 33.333333%; max-width: 33.333333%; }
      .grid-md-5 { flex-grow: 0; flex-basis: 41.666667%; max-width: 41.666667%; }
      .grid-md-6 { flex-grow: 0; flex-basis: 50%; max-width: 50%; }
      .grid-md-7 { flex-grow: 0; flex-basis: 58.333333%; max-width: 58.333333%; }
      .grid-md-8 { flex-grow: 0; flex-basis: 66.666667%; max-width: 66.666667%; }
      .grid-md-9 { flex-grow: 0; flex-basis: 75%; max-width: 75%; }
      .grid-md-10 { flex-grow: 0; flex-basis: 83.333333%; max-width: 83.333333%; }
      .grid-md-11 { flex-grow: 0; flex-basis: 91.666667%; max-width: 91.666667%; }
      .grid-md-12 { flex-grow: 0; flex-basis: 100%; max-width: 100%; }

      .grid-md-offset-1 { margin-left: 8.333333%; }
      .grid-md-offset-2 { margin-left: 16.666667%; }
      .grid-md-offset-3 { margin-left: 25%; }
      .grid-md-offset-4 { margin-left: 33.333333%; }
      .grid-md-offset-5 { margin-left: 41.666667%; }
      .grid-md-offset-6 { margin-left: 50%; }
      .grid-md-offset-7 { margin-left: 58.333333%; }
      .grid-md-offset-8 { margin-left: 66.666667%; }
      .grid-md-offset-9 { margin-left: 75%; }
      .grid-md-offset-10 { margin-left: 83.333333%; }
      .grid-md-offset-11 { margin-left: 91.666667%; }
    }

    /* lg breakpoint (1200px+) */
    @media (min-width: 1200px) {
      .grid-lg-auto { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-lg-true { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-lg-1 { flex-grow: 0; flex-basis: 8.333333%; max-width: 8.333333%; }
      .grid-lg-2 { flex-grow: 0; flex-basis: 16.666667%; max-width: 16.666667%; }
      .grid-lg-3 { flex-grow: 0; flex-basis: 25%; max-width: 25%; }
      .grid-lg-4 { flex-grow: 0; flex-basis: 33.333333%; max-width: 33.333333%; }
      .grid-lg-5 { flex-grow: 0; flex-basis: 41.666667%; max-width: 41.666667%; }
      .grid-lg-6 { flex-grow: 0; flex-basis: 50%; max-width: 50%; }
      .grid-lg-7 { flex-grow: 0; flex-basis: 58.333333%; max-width: 58.333333%; }
      .grid-lg-8 { flex-grow: 0; flex-basis: 66.666667%; max-width: 66.666667%; }
      .grid-lg-9 { flex-grow: 0; flex-basis: 75%; max-width: 75%; }
      .grid-lg-10 { flex-grow: 0; flex-basis: 83.333333%; max-width: 83.333333%; }
      .grid-lg-11 { flex-grow: 0; flex-basis: 91.666667%; max-width: 91.666667%; }
      .grid-lg-12 { flex-grow: 0; flex-basis: 100%; max-width: 100%; }

      .grid-lg-offset-1 { margin-left: 8.333333%; }
      .grid-lg-offset-2 { margin-left: 16.666667%; }
      .grid-lg-offset-3 { margin-left: 25%; }
      .grid-lg-offset-4 { margin-left: 33.333333%; }
      .grid-lg-offset-5 { margin-left: 41.666667%; }
      .grid-lg-offset-6 { margin-left: 50%; }
      .grid-lg-offset-7 { margin-left: 58.333333%; }
      .grid-lg-offset-8 { margin-left: 66.666667%; }
      .grid-lg-offset-9 { margin-left: 75%; }
      .grid-lg-offset-10 { margin-left: 83.333333%; }
      .grid-lg-offset-11 { margin-left: 91.666667%; }
    }

    /* xl breakpoint (1536px+) */
    @media (min-width: 1536px) {
      .grid-xl-auto { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-xl-true { flex-grow: 1; flex-basis: 0; max-width: 100%; }
      .grid-xl-1 { flex-grow: 0; flex-basis: 8.333333%; max-width: 8.333333%; }
      .grid-xl-2 { flex-grow: 0; flex-basis: 16.666667%; max-width: 16.666667%; }
      .grid-xl-3 { flex-grow: 0; flex-basis: 25%; max-width: 25%; }
      .grid-xl-4 { flex-grow: 0; flex-basis: 33.333333%; max-width: 33.333333%; }
      .grid-xl-5 { flex-grow: 0; flex-basis: 41.666667%; max-width: 41.666667%; }
      .grid-xl-6 { flex-grow: 0; flex-basis: 50%; max-width: 50%; }
      .grid-xl-7 { flex-grow: 0; flex-basis: 58.333333%; max-width: 58.333333%; }
      .grid-xl-8 { flex-grow: 0; flex-basis: 66.666667%; max-width: 66.666667%; }
      .grid-xl-9 { flex-grow: 0; flex-basis: 75%; max-width: 75%; }
      .grid-xl-10 { flex-grow: 0; flex-basis: 83.333333%; max-width: 83.333333%; }
      .grid-xl-11 { flex-grow: 0; flex-basis: 91.666667%; max-width: 91.666667%; }
      .grid-xl-12 { flex-grow: 0; flex-basis: 100%; max-width: 100%; }

      .grid-xl-offset-1 { margin-left: 8.333333%; }
      .grid-xl-offset-2 { margin-left: 16.666667%; }
      .grid-xl-offset-3 { margin-left: 25%; }
      .grid-xl-offset-4 { margin-left: 33.333333%; }
      .grid-xl-offset-5 { margin-left: 41.666667%; }
      .grid-xl-offset-6 { margin-left: 50%; }
      .grid-xl-offset-7 { margin-left: 58.333333%; }
      .grid-xl-offset-8 { margin-left: 66.666667%; }
      .grid-xl-offset-9 { margin-left: 75%; }
      .grid-xl-offset-10 { margin-left: 83.333333%; }
      .grid-xl-offset-11 { margin-left: 91.666667%; }
    }
  `;

  private _getSpacingValue(value: string): string {
    if (!value) return '';
    
    // Handle numeric values (multiply by 8px - Material Design spacing unit)
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return `${numValue * 8}px`;
    }
    
    // Handle string values (pass through as-is)
    return value;
  }

  private _generateSpacingStyles(): string {
    const styles: string[] = [];
    
    if (this.container) {
      const spacing = this.spacing || '0';
      const rowSpacing = this.rowSpacing || spacing;
      const columnSpacing = this.columnSpacing || spacing;
      
      if (spacing !== '0' || rowSpacing !== '0' || columnSpacing !== '0') {
        const rowValue = this._getSpacingValue(rowSpacing);
        const columnValue = this._getSpacingValue(columnSpacing);
        
        // Container gets negative margins to offset item padding
        if (rowValue) {
          styles.push(`margin-top: -${rowValue};`);
          styles.push(`margin-bottom: -${rowValue};`);
        }
        if (columnValue) {
          styles.push(`margin-left: -${columnValue};`);
          styles.push(`margin-right: -${columnValue};`);
        }
        
        // Items get padding
        styles.push(`> * { padding-top: ${rowValue}; padding-bottom: ${rowValue}; padding-left: ${columnValue}; padding-right: ${columnValue}; }`);
      }
    }
    
    return styles.join(' ');
  }

  private _getClasses(): string {
    const classes = ['grid'];

    if (this.container) {
      classes.push('grid-container');
      
      // Container-specific classes
      classes.push(`direction-${this.direction}`);
      classes.push(`wrap-${this.wrap}`);
      classes.push(`justify-content-${this.justifyContent}`);
      classes.push(`align-items-${this.alignItems}`);
      classes.push(`align-content-${this.alignContent}`);
    }

    if (this.item) {
      classes.push('grid-item');
      
      // Grid size classes
      if (this.xs) classes.push(`grid-xs-${this.xs}`);
      if (this.sm) classes.push(`grid-sm-${this.sm}`);
      if (this.md) classes.push(`grid-md-${this.md}`);
      if (this.lg) classes.push(`grid-lg-${this.lg}`);
      if (this.xl) classes.push(`grid-xl-${this.xl}`);
      
      // Offset classes
      if (this.xsOffset) classes.push(`grid-xs-offset-${this.xsOffset}`);
      if (this.smOffset) classes.push(`grid-sm-offset-${this.smOffset}`);
      if (this.mdOffset) classes.push(`grid-md-offset-${this.mdOffset}`);
      if (this.lgOffset) classes.push(`grid-lg-offset-${this.lgOffset}`);
      if (this.xlOffset) classes.push(`grid-xl-offset-${this.xlOffset}`);
    }

    return classes.join(' ');
  }

  render() {
    const spacingStyles = this._generateSpacingStyles();
    
    return html`
      ${spacingStyles ? html`
        <style>
          .grid {
            ${unsafeCSS(spacingStyles)}
          }
        </style>
      ` : ''}
      <div class="${this._getClasses()}">
        <slot></slot>
      </div>
    `;
  }
}