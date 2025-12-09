import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Divider extends LitElement {
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String }) variant: 'fullWidth' | 'inset' | 'middle' = 'fullWidth';

  static styles = css`
    :host {
      display: block;
    }

    .divider {
      border: none;
      background-color: rgba(0, 0, 0, 0.12);
    }

    .horizontal {
      height: 1px;
      width: 100%;
    }

    .horizontal.inset {
      margin-left: 72px;
    }

    .horizontal.middle {
      margin-left: 16px;
      margin-right: 16px;
    }

    .vertical {
      width: 1px;
      height: 100%;
      display: inline-block;
    }
  `;

  render() {
    return html`
      <hr class="divider ${this.orientation} ${this.variant}" />
    `;
  }
}
