import { LitElement, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Paper extends LitElement {
  @property({ type: Number }) elevation: number = 1;
  @property({ type: Boolean }) square = false;

  static styles = unsafeCSS`
    :host {
      display: block;
    }

    .paper {
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
    }

    .paper.square {
      border-radius: 0;
    }

    .elevation-0 { box-shadow: ${theme.shadows[0]}; }
    .elevation-1 { box-shadow: ${theme.shadows[1]}; }
    .elevation-2 { box-shadow: ${theme.shadows[2]}; }
    .elevation-3 { box-shadow: ${theme.shadows[3]}; }
    .elevation-4 { box-shadow: ${theme.shadows[4]}; }
  `;

  render() {
    return html`
      <div class="paper elevation-${this.elevation} ${this.square ? 'square' : ''}">
        <slot></slot>
      </div>
    `;
  }
}
