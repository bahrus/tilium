import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class ImageList extends LitElement {
  @property({ type: String }) variant: 'masonry' | 'quilted' | 'standard' | 'woven' = 'standard';
  @property({ type: Number }) cols = 2;
  @property({ type: Number }) gap = 4;
  @property({ type: Number }) rowHeight = 164;

  static styles = css`
    :host {
      display: block;
    }

    .image-list {
      display: grid;
      overflow-y: auto;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* Standard variant */
    .image-list.standard {
      grid-auto-rows: 1fr;
    }

    /* Masonry variant */
    .image-list.masonry {
      grid-auto-rows: auto;
    }

    /* Quilted variant */
    .image-list.quilted {
      grid-auto-rows: auto;
    }

    /* Woven variant */
    .image-list.woven {
      grid-auto-rows: 1fr;
    }

    ::slotted(mui-image-list-item) {
      display: block;
      position: relative;
      overflow: hidden;
    }

    ::slotted(mui-image-list-item img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* Standard layout - all items same size */
    .image-list.standard ::slotted(mui-image-list-item) {
      aspect-ratio: 1;
    }

    /* Masonry layout - items maintain aspect ratio */
    .image-list.masonry ::slotted(mui-image-list-item) {
      break-inside: avoid;
    }

    /* Quilted layout - featured items are larger */
    .image-list.quilted ::slotted(mui-image-list-item[featured]) {
      grid-column: span 2;
      grid-row: span 2;
    }

    /* Woven layout - alternating pattern */
    .image-list.woven ::slotted(mui-image-list-item:nth-child(odd)) {
      aspect-ratio: 1;
    }

    .image-list.woven ::slotted(mui-image-list-item:nth-child(even)) {
      aspect-ratio: 2 / 1;
    }
  `;

  private _getSpacingValue(value: number): string {
    return `${value * 8}px`;
  }

  private _generateDynamicStyles(): string {
    const styles: string[] = [];
    const gapValue = this._getSpacingValue(this.gap);

    // Grid template columns
    if (this.variant === 'masonry') {
      // Masonry uses CSS columns instead of grid
      styles.push(`
        column-count: ${this.cols};
        column-gap: ${gapValue};
        grid-template-columns: none;
      `);
    } else {
      styles.push(`
        grid-template-columns: repeat(${this.cols}, 1fr);
        gap: ${gapValue};
      `);
    }

    // Row height for standard and woven variants
    if (this.variant === 'standard' || this.variant === 'woven') {
      styles.push(`grid-auto-rows: ${this.rowHeight}px;`);
    }

    return styles.join(' ');
  }

  private _getClasses(): string {
    const classes = ['image-list'];
    classes.push(this.variant);
    return classes.join(' ');
  }

  render() {
    const dynamicStyles = this._generateDynamicStyles();

    return html`
      <style>
        .image-list {
          ${unsafeCSS(dynamicStyles)}
        }
      </style>
      <div class="${this._getClasses()}">
        <slot></slot>
      </div>
    `;
  }
}

export class ImageListItem extends LitElement {
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: Boolean }) featured = false;
  @property({ type: Number }) cols = 1;
  @property({ type: Number }) rows = 1;

  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
    }

    :host([featured]) {
      grid-column: span 2;
      grid-row: span 2;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .image:hover {
      transform: scale(1.05);
    }

    .image-bar {
      position: absolute;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
      color: white;
      padding: 16px;
      display: flex;
      align-items: flex-end;
    }

    .image-bar.top {
      top: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
      align-items: flex-start;
    }

    .image-bar.bottom {
      bottom: 0;
    }

    .image-bar-content {
      flex: 1;
      min-width: 0;
    }

    .image-bar-title {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.2;
      margin: 0 0 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .image-bar-subtitle {
      font-size: 0.875rem;
      opacity: 0.8;
      line-height: 1.2;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .image-bar-action {
      margin-left: 8px;
      flex-shrink: 0;
    }

    /* Loading state */
    .image-placeholder {
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 0.875rem;
    }

    /* Error state */
    .image-error {
      width: 100%;
      height: 100%;
      background-color: #fafafa;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 0.875rem;
      border: 1px dashed #ddd;
    }

    .error-icon {
      width: 24px;
      height: 24px;
      margin-bottom: 8px;
      opacity: 0.5;
    }
  `;

  @property({ type: String }) private _imageState: 'loading' | 'loaded' | 'error' = 'loading';

  private _handleImageLoad() {
    this._imageState = 'loaded';
  }

  private _handleImageError() {
    this._imageState = 'error';
  }

  private _renderImage() {
    if (this._imageState === 'error') {
      return html`
        <div class="image-error">
          <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <div>Failed to load image</div>
        </div>
      `;
    }

    if (this._imageState === 'loading') {
      return html`
        <div class="image-placeholder">
          <div>Loading...</div>
        </div>
        <img
          class="image"
          src="${this.src}"
          alt="${this.alt}"
          @load="${this._handleImageLoad}"
          @error="${this._handleImageError}"
          style="display: none;"
        />
      `;
    }

    return html`
      <img
        class="image"
        src="${this.src}"
        alt="${this.alt}"
        @load="${this._handleImageLoad}"
        @error="${this._handleImageError}"
      />
    `;
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('src')) {
      this._imageState = 'loading';
    }

    // Apply custom grid sizing
    if (this.cols !== 1) {
      this.style.gridColumn = `span ${this.cols}`;
    }
    if (this.rows !== 1) {
      this.style.gridRow = `span ${this.rows}`;
    }
  }

  render() {
    return html`
      <div class="image-container">
        ${this._renderImage()}
        <slot></slot>
      </div>
    `;
  }
}

export class ImageListItemBar extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String }) position: 'bottom' | 'top' | 'below' = 'bottom';

  static styles = css`
    :host {
      display: block;
    }

    .image-bar {
      position: absolute;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
      color: white;
      padding: 16px;
      display: flex;
      align-items: flex-end;
    }

    .image-bar.top {
      top: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
      align-items: flex-start;
    }

    .image-bar.bottom {
      bottom: 0;
    }

    .image-bar.below {
      position: static;
      background: none;
      color: inherit;
      padding: 8px 0;
    }

    .image-bar-content {
      flex: 1;
      min-width: 0;
    }

    .image-bar-title {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.2;
      margin: 0 0 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .image-bar-subtitle {
      font-size: 0.875rem;
      opacity: 0.8;
      line-height: 1.2;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .image-bar.below .image-bar-subtitle {
      opacity: 0.6;
      color: inherit;
    }

    .image-bar-action {
      margin-left: 8px;
      flex-shrink: 0;
    }
  `;

  private _getClasses(): string {
    const classes = ['image-bar'];
    classes.push(this.position);
    return classes.join(' ');
  }

  render() {
    return html`
      <div class="${this._getClasses()}">
        <div class="image-bar-content">
          ${this.title ? html`<div class="image-bar-title">${this.title}</div>` : ''}
          ${this.subtitle ? html`<div class="image-bar-subtitle">${this.subtitle}</div>` : ''}
        </div>
        <div class="image-bar-action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}