import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Card extends LitElement {
  @property({ type: Boolean }) raised = false;
  @property({ type: String }) variant: 'elevation' | 'outlined' = 'elevation';
  @property({ type: Number }) elevation = 1;

  static styles = css`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .card {
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      position: relative;
    }

    /* Elevation variant */
    :host([variant="elevation"]) .card,
    :host(:not([variant])) .card {
      box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    }

    :host([raised]) .card {
      box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }

    /* Outlined variant */
    :host([variant="outlined"]) .card {
      box-shadow: none;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    /* Elevation levels */
    :host([elevation="0"]) .card {
      box-shadow: none;
    }

    :host([elevation="1"]) .card {
      box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
    }

    :host([elevation="2"]) .card {
      box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    }

    :host([elevation="3"]) .card {
      box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }

    :host([elevation="4"]) .card {
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    }

    /* Hover effects for interactive cards */
    :host([clickable]) .card {
      cursor: pointer;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([clickable]) .card:hover {
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
      transform: translateY(-1px);
    }

    :host([clickable][variant="outlined"]) .card:hover {
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    }
  `;

  render() {
    return html`
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}

export class CardHeader extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) subheader = '';

  static styles = css`
    :host {
      display: block;
      padding: 16px 16px 0;
    }

    .header {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }

    .header-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .text-content {
      flex: 1;
      min-width: 0;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      margin: 0;
      color: rgba(0, 0, 0, 0.87);
    }

    .subheader {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.43;
      letter-spacing: 0.01071em;
      margin: 0;
      color: rgba(0, 0, 0, 0.6);
      margin-top: 4px;
    }

    ::slotted([slot="avatar"]) {
      margin-right: 16px;
    }

    ::slotted([slot="action"]) {
      margin-left: auto;
      align-self: flex-start;
    }
  `;

  render() {
    return html`
      <div class="header">
        <div class="header-content">
          <slot name="avatar"></slot>
          <div class="text-content">
            ${this.title ? html`<h2 class="title">${this.title}</h2>` : ''}
            ${this.subheader ? html`<p class="subheader">${this.subheader}</p>` : ''}
            <slot name="title"></slot>
            <slot name="subheader"></slot>
          </div>
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

export class CardMedia extends LitElement {
  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) component: 'img' | 'video' | 'div' = 'img';
  @property({ type: String }) height = '140px';

  static styles = css`
    :host {
      display: block;
      position: relative;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    .media {
      width: 100%;
      object-fit: cover;
      display: block;
    }

    .media-div {
      width: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }

    ::slotted(*) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
    }
  `;

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('height')) {
      this.style.height = this.height;
    }
    if (changedProperties.has('src') && this.component === 'div') {
      this.style.backgroundImage = `url(${this.src})`;
    }
  }

  render() {
    if (this.component === 'img') {
      return html`
        <img 
          class="media" 
          src="${this.src}" 
          alt="${this.alt}"
          style="height: ${this.height}"
        />
        <slot></slot>
      `;
    }

    if (this.component === 'video') {
      return html`
        <video 
          class="media" 
          src="${this.src}"
          style="height: ${this.height}"
          controls
        ></video>
        <slot></slot>
      `;
    }

    return html`
      <div 
        class="media-div"
        style="height: ${this.height}; background-image: url(${this.src})"
      >
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

    :host(:last-child) {
      padding-bottom: 24px;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class CardActions extends LitElement {
  @property({ type: Boolean }) disableSpacing = false;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: 8px;
      box-sizing: border-box;
    }

    :host(:not([disableSpacing])) ::slotted(*) {
      margin-left: 8px;
    }

    :host(:not([disableSpacing])) ::slotted(*:first-child) {
      margin-left: 0;
    }

    ::slotted([slot="right"]) {
      margin-left: auto;
    }
  `;

  render() {
    return html`
      <slot></slot>
      <slot name="right"></slot>
    `;
  }
}
