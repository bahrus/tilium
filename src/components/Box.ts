import { LitElement, html, css, CSSResult } from 'lit';
import { property } from 'lit/decorators.js';

export class Box extends LitElement {
  @property({ type: String }) component = 'div';
  @property({ type: String }) display = '';
  @property({ type: String }) flexDirection = '';
  @property({ type: String }) flexWrap = '';
  @property({ type: String }) justifyContent = '';
  @property({ type: String }) alignItems = '';
  @property({ type: String }) alignContent = '';
  @property({ type: String }) gap = '';
  @property({ type: String }) rowGap = '';
  @property({ type: String }) columnGap = '';
  @property({ type: String }) flex = '';
  @property({ type: String }) flexGrow = '';
  @property({ type: String }) flexShrink = '';
  @property({ type: String }) flexBasis = '';
  @property({ type: String }) order = '';
  @property({ type: String }) alignSelf = '';
  
  // Spacing properties (margin and padding)
  @property({ type: String }) m = '';  // margin
  @property({ type: String }) mt = ''; // margin-top
  @property({ type: String }) mr = ''; // margin-right
  @property({ type: String }) mb = ''; // margin-bottom
  @property({ type: String }) ml = ''; // margin-left
  @property({ type: String }) mx = ''; // margin horizontal
  @property({ type: String }) my = ''; // margin vertical
  
  @property({ type: String }) p = '';  // padding
  @property({ type: String }) pt = ''; // padding-top
  @property({ type: String }) pr = ''; // padding-right
  @property({ type: String }) pb = ''; // padding-bottom
  @property({ type: String }) pl = ''; // padding-left
  @property({ type: String }) px = ''; // padding horizontal
  @property({ type: String }) py = ''; // padding vertical
  
  // Positioning
  @property({ type: String }) position = '';
  @property({ type: String }) top = '';
  @property({ type: String }) right = '';
  @property({ type: String }) bottom = '';
  @property({ type: String }) left = '';
  @property({ type: String }) zIndex = '';
  
  // Sizing
  @property({ type: String }) width = '';
  @property({ type: String }) height = '';
  @property({ type: String }) minWidth = '';
  @property({ type: String }) minHeight = '';
  @property({ type: String }) maxWidth = '';
  @property({ type: String }) maxHeight = '';
  
  // Colors and styling
  @property({ type: String }) bgcolor = '';
  @property({ type: String }) color = '';
  @property({ type: String }) border = '';
  @property({ type: String }) borderRadius = '';
  @property({ type: String }) boxShadow = '';
  @property({ type: String }) overflow = '';
  @property({ type: String }) textAlign = '';
  
  // Typography
  @property({ type: String }) fontSize = '';
  @property({ type: String }) fontWeight = '';
  @property({ type: String }) lineHeight = '';
  @property({ type: String }) letterSpacing = '';
  @property({ type: String }) textTransform = '';

  static styles = css`
    :host {
      display: block;
    }

    .box {
      box-sizing: border-box;
    }

    /* Display utilities */
    .display-block { display: block; }
    .display-inline { display: inline; }
    .display-inline-block { display: inline-block; }
    .display-flex { display: flex; }
    .display-inline-flex { display: inline-flex; }
    .display-grid { display: grid; }
    .display-inline-grid { display: inline-grid; }
    .display-none { display: none; }

    /* Flexbox utilities */
    .flex-direction-row { flex-direction: row; }
    .flex-direction-row-reverse { flex-direction: row-reverse; }
    .flex-direction-column { flex-direction: column; }
    .flex-direction-column-reverse { flex-direction: column-reverse; }

    .flex-wrap-nowrap { flex-wrap: nowrap; }
    .flex-wrap-wrap { flex-wrap: wrap; }
    .flex-wrap-wrap-reverse { flex-wrap: wrap-reverse; }

    .justify-content-flex-start { justify-content: flex-start; }
    .justify-content-flex-end { justify-content: flex-end; }
    .justify-content-center { justify-content: center; }
    .justify-content-space-between { justify-content: space-between; }
    .justify-content-space-around { justify-content: space-around; }
    .justify-content-space-evenly { justify-content: space-evenly; }

    .align-items-flex-start { align-items: flex-start; }
    .align-items-flex-end { align-items: flex-end; }
    .align-items-center { align-items: center; }
    .align-items-baseline { align-items: baseline; }
    .align-items-stretch { align-items: stretch; }

    .align-content-flex-start { align-content: flex-start; }
    .align-content-flex-end { align-content: flex-end; }
    .align-content-center { align-content: center; }
    .align-content-space-between { align-content: space-between; }
    .align-content-space-around { align-content: space-around; }
    .align-content-stretch { align-content: stretch; }

    .align-self-auto { align-self: auto; }
    .align-self-flex-start { align-self: flex-start; }
    .align-self-flex-end { align-self: flex-end; }
    .align-self-center { align-self: center; }
    .align-self-baseline { align-self: baseline; }
    .align-self-stretch { align-self: stretch; }

    /* Position utilities */
    .position-static { position: static; }
    .position-relative { position: relative; }
    .position-absolute { position: absolute; }
    .position-fixed { position: fixed; }
    .position-sticky { position: sticky; }

    /* Text alignment */
    .text-align-left { text-align: left; }
    .text-align-center { text-align: center; }
    .text-align-right { text-align: right; }
    .text-align-justify { text-align: justify; }

    /* Overflow utilities */
    .overflow-visible { overflow: visible; }
    .overflow-hidden { overflow: hidden; }
    .overflow-scroll { overflow: scroll; }
    .overflow-auto { overflow: auto; }

    /* Text transform utilities */
    .text-transform-none { text-transform: none; }
    .text-transform-capitalize { text-transform: capitalize; }
    .text-transform-uppercase { text-transform: uppercase; }
    .text-transform-lowercase { text-transform: lowercase; }

    /* Color utilities */
    .color-primary { color: #1976d2; }
    .color-secondary { color: #dc004e; }
    .color-error { color: #d32f2f; }
    .color-warning { color: #ed6c02; }
    .color-info { color: #0288d1; }
    .color-success { color: #2e7d32; }
    .color-text-primary { color: rgba(0, 0, 0, 0.87); }
    .color-text-secondary { color: rgba(0, 0, 0, 0.6); }
    .color-text-disabled { color: rgba(0, 0, 0, 0.38); }

    .bgcolor-primary { background-color: #1976d2; }
    .bgcolor-secondary { background-color: #dc004e; }
    .bgcolor-error { background-color: #d32f2f; }
    .bgcolor-warning { background-color: #ed6c02; }
    .bgcolor-info { background-color: #0288d1; }
    .bgcolor-success { background-color: #2e7d32; }
    .bgcolor-grey-50 { background-color: #fafafa; }
    .bgcolor-grey-100 { background-color: #f5f5f5; }
    .bgcolor-grey-200 { background-color: #eeeeee; }
    .bgcolor-grey-300 { background-color: #e0e0e0; }
    .bgcolor-grey-400 { background-color: #bdbdbd; }
    .bgcolor-grey-500 { background-color: #9e9e9e; }
    .bgcolor-white { background-color: #ffffff; }
    .bgcolor-transparent { background-color: transparent; }
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

  private _generateDynamicStyles(): CSSResult {
    const styles: string[] = [];

    // Spacing styles
    if (this.m) {
      const value = this._getSpacingValue(this.m);
      styles.push(`margin: ${value};`);
    }
    if (this.mt) {
      const value = this._getSpacingValue(this.mt);
      styles.push(`margin-top: ${value};`);
    }
    if (this.mr) {
      const value = this._getSpacingValue(this.mr);
      styles.push(`margin-right: ${value};`);
    }
    if (this.mb) {
      const value = this._getSpacingValue(this.mb);
      styles.push(`margin-bottom: ${value};`);
    }
    if (this.ml) {
      const value = this._getSpacingValue(this.ml);
      styles.push(`margin-left: ${value};`);
    }
    if (this.mx) {
      const value = this._getSpacingValue(this.mx);
      styles.push(`margin-left: ${value}; margin-right: ${value};`);
    }
    if (this.my) {
      const value = this._getSpacingValue(this.my);
      styles.push(`margin-top: ${value}; margin-bottom: ${value};`);
    }

    if (this.p) {
      const value = this._getSpacingValue(this.p);
      styles.push(`padding: ${value};`);
    }
    if (this.pt) {
      const value = this._getSpacingValue(this.pt);
      styles.push(`padding-top: ${value};`);
    }
    if (this.pr) {
      const value = this._getSpacingValue(this.pr);
      styles.push(`padding-right: ${value};`);
    }
    if (this.pb) {
      const value = this._getSpacingValue(this.pb);
      styles.push(`padding-bottom: ${value};`);
    }
    if (this.pl) {
      const value = this._getSpacingValue(this.pl);
      styles.push(`padding-left: ${value};`);
    }
    if (this.px) {
      const value = this._getSpacingValue(this.px);
      styles.push(`padding-left: ${value}; padding-right: ${value};`);
    }
    if (this.py) {
      const value = this._getSpacingValue(this.py);
      styles.push(`padding-top: ${value}; padding-bottom: ${value};`);
    }

    // Flexbox styles
    if (this.gap) {
      styles.push(`gap: ${this._getSpacingValue(this.gap)};`);
    }
    if (this.rowGap) {
      styles.push(`row-gap: ${this._getSpacingValue(this.rowGap)};`);
    }
    if (this.columnGap) {
      styles.push(`column-gap: ${this._getSpacingValue(this.columnGap)};`);
    }
    if (this.flex) {
      styles.push(`flex: ${this.flex};`);
    }
    if (this.flexGrow) {
      styles.push(`flex-grow: ${this.flexGrow};`);
    }
    if (this.flexShrink) {
      styles.push(`flex-shrink: ${this.flexShrink};`);
    }
    if (this.flexBasis) {
      styles.push(`flex-basis: ${this.flexBasis};`);
    }
    if (this.order) {
      styles.push(`order: ${this.order};`);
    }

    // Positioning styles
    if (this.top) {
      styles.push(`top: ${this.top};`);
    }
    if (this.right) {
      styles.push(`right: ${this.right};`);
    }
    if (this.bottom) {
      styles.push(`bottom: ${this.bottom};`);
    }
    if (this.left) {
      styles.push(`left: ${this.left};`);
    }
    if (this.zIndex) {
      styles.push(`z-index: ${this.zIndex};`);
    }

    // Sizing styles
    if (this.width) {
      styles.push(`width: ${this.width};`);
    }
    if (this.height) {
      styles.push(`height: ${this.height};`);
    }
    if (this.minWidth) {
      styles.push(`min-width: ${this.minWidth};`);
    }
    if (this.minHeight) {
      styles.push(`min-height: ${this.minHeight};`);
    }
    if (this.maxWidth) {
      styles.push(`max-width: ${this.maxWidth};`);
    }
    if (this.maxHeight) {
      styles.push(`max-height: ${this.maxHeight};`);
    }

    // Styling properties
    if (this.border) {
      styles.push(`border: ${this.border};`);
    }
    if (this.borderRadius) {
      styles.push(`border-radius: ${this.borderRadius};`);
    }
    if (this.boxShadow) {
      styles.push(`box-shadow: ${this.boxShadow};`);
    }

    // Typography styles
    if (this.fontSize) {
      styles.push(`font-size: ${this.fontSize};`);
    }
    if (this.fontWeight) {
      styles.push(`font-weight: ${this.fontWeight};`);
    }
    if (this.lineHeight) {
      styles.push(`line-height: ${this.lineHeight};`);
    }
    if (this.letterSpacing) {
      styles.push(`letter-spacing: ${this.letterSpacing};`);
    }

    // Custom color and bgcolor (non-predefined values)
    if (this.color && !this.color.startsWith('text-') && !['primary', 'secondary', 'error', 'warning', 'info', 'success'].includes(this.color)) {
      styles.push(`color: ${this.color};`);
    }
    if (this.bgcolor && !this.bgcolor.startsWith('grey-') && !['primary', 'secondary', 'error', 'warning', 'info', 'success', 'white', 'transparent'].includes(this.bgcolor)) {
      styles.push(`background-color: ${this.bgcolor};`);
    }

    return css`
      .box {
        ${styles.join(' ')}
      }
    `;
  }

  private _getClasses(): string {
    const classes = ['box'];

    // Display
    if (this.display) {
      classes.push(`display-${this.display}`);
    }

    // Flexbox
    if (this.flexDirection) {
      classes.push(`flex-direction-${this.flexDirection}`);
    }
    if (this.flexWrap) {
      classes.push(`flex-wrap-${this.flexWrap}`);
    }
    if (this.justifyContent) {
      classes.push(`justify-content-${this.justifyContent}`);
    }
    if (this.alignItems) {
      classes.push(`align-items-${this.alignItems}`);
    }
    if (this.alignContent) {
      classes.push(`align-content-${this.alignContent}`);
    }
    if (this.alignSelf) {
      classes.push(`align-self-${this.alignSelf}`);
    }

    // Position
    if (this.position) {
      classes.push(`position-${this.position}`);
    }

    // Text alignment
    if (this.textAlign) {
      classes.push(`text-align-${this.textAlign}`);
    }

    // Overflow
    if (this.overflow) {
      classes.push(`overflow-${this.overflow}`);
    }

    // Text transform
    if (this.textTransform) {
      classes.push(`text-transform-${this.textTransform}`);
    }

    // Predefined colors
    if (this.color && (this.color.startsWith('text-') || ['primary', 'secondary', 'error', 'warning', 'info', 'success'].includes(this.color))) {
      classes.push(`color-${this.color}`);
    }

    // Predefined background colors
    if (this.bgcolor && (this.bgcolor.startsWith('grey-') || ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'white', 'transparent'].includes(this.bgcolor))) {
      classes.push(`bgcolor-${this.bgcolor}`);
    }

    return classes.join(' ');
  }

  render() {
    const dynamicStyles = this._generateDynamicStyles();
    
    return html`
      <style>
        ${dynamicStyles}
      </style>
      <div class="${this._getClasses()}">
        <slot></slot>
      </div>
    `;
  }
}