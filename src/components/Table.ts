import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class Table extends LitElement {
  @property({ type: String }) size: 'small' | 'medium' = 'medium';
  @property({ type: Boolean }) stickyHeader = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .stickyHeader thead th {
      position: sticky;
      top: 0;
      z-index: 2;
    }
  `;

  render() {
    return html`
      <table class="${this.stickyHeader ? 'stickyHeader' : ''}">
        <slot></slot>
      </table>
    `;
  }
}

export class TableHead extends LitElement {
  static styles = css`
    :host {
      display: table-header-group;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class TableBody extends LitElement {
  static styles = css`
    :host {
      display: table-row-group;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class TableFooter extends LitElement {
  static styles = css`
    :host {
      display: table-footer-group;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

export class TableRow extends LitElement {
  @property({ type: Boolean }) hover = false;
  @property({ type: Boolean }) selected = false;

  static styles = css`
    :host {
      display: table-row;
      color: rgba(0, 0, 0, 0.87);
      outline: 0;
      vertical-align: middle;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host(.hover):hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    :host(.selected) {
      background-color: rgba(25, 118, 210, 0.08);
    }

    :host(.selected):hover {
      background-color: rgba(25, 118, 210, 0.12);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateClasses();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('hover') || changedProperties.has('selected')) {
      this.updateClasses();
    }
  }

  private updateClasses() {
    this.classList.toggle('hover', this.hover);
    this.classList.toggle('selected', this.selected);
  }

  render() {
    return html`<slot></slot>`;
  }
}