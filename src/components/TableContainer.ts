import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class TableContainer extends LitElement {
  @property({ type: String }) component: string = 'div';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
    }

    .container {
      width: 100%;
      overflow-x: auto;
    }
  `;

  render() {
    return html`
      <div class="container">
        <slot></slot>
      </div>
    `;
  }
}