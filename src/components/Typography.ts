import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class Typography extends LitElement {
  @property({ type: String }) variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline' = 'body1';
  @property({ type: String }) align: 'left' | 'center' | 'right' | 'justify' = 'left';
  @property({ type: String }) color: 'initial' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' = 'initial';
  @property({ type: Boolean }) gutterBottom = false;
  @property({ type: Boolean }) noWrap = false;

  static styles = unsafeCSS`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .typography {
      margin: 0;
    }

    .h1 { font-size: 6rem; font-weight: 300; line-height: 1.167; }
    .h2 { font-size: 3.75rem; font-weight: 300; line-height: 1.2; }
    .h3 { font-size: 3rem; font-weight: 400; line-height: 1.167; }
    .h4 { font-size: 2.125rem; font-weight: 400; line-height: 1.235; }
    .h5 { font-size: 1.5rem; font-weight: 400; line-height: 1.334; }
    .h6 { font-size: 1.25rem; font-weight: 500; line-height: 1.6; }
    .subtitle1 { font-size: 1rem; font-weight: 400; line-height: 1.75; }
    .subtitle2 { font-size: 0.875rem; font-weight: 500; line-height: 1.57; }
    .body1 { font-size: 1rem; font-weight: 400; line-height: 1.5; }
    .body2 { font-size: 0.875rem; font-weight: 400; line-height: 1.43; }
    .caption { font-size: 0.75rem; font-weight: 400; line-height: 1.66; }
    .button { font-size: 0.875rem; font-weight: 500; line-height: 1.75; text-transform: uppercase; }
    .overline { font-size: 0.75rem; font-weight: 400; line-height: 2.66; text-transform: uppercase; }

    .align-left { text-align: left; }
    .align-center { text-align: center; }
    .align-right { text-align: right; }
    .align-justify { text-align: justify; }

    .color-initial { color: inherit; }
    .color-primary { color: #1976d2; }
    .color-secondary { color: #9c27b0; }
    .color-textPrimary { color: rgba(0, 0, 0, 0.87); }
    .color-textSecondary { color: rgba(0, 0, 0, 0.6); }
    .color-error { color: #d32f2f; }

    .gutterBottom { margin-bottom: 0.35em; }
    .noWrap { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  `;

  render() {
    const classes = [
      'typography',
      this.variant,
      `align-${this.align}`,
      `color-${this.color}`,
      this.gutterBottom ? 'gutterBottom' : '',
      this.noWrap ? 'noWrap' : ''
    ].join(' ');

    const tag = this.variant.startsWith('h') ? this.variant : 'p';

    return html`
      <${tag} class="${classes}">
        <slot></slot>
      </${tag}>
    `;
  }
}
