import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { theme } from '../styles/theme.js';

export class Card extends LitElement {
  @property({ type: Boolean }) raised = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      box-shadow: ${theme.shadows[1]};
    }

    .card.raised {
      box-shadow: ${theme.shadows[3]};
    }
  `;

  render() {
    return html`
      <div class="card ${this.raised ? 'raised' : ''}">
        <slot></slot>
      </div>
    `;
  }
}

export class CardContent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class CardActions extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: 8px;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}
