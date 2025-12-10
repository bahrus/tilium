import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class AppBar extends LitElement {
  @property({ type: String }) position: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative' = 'static';
  @property({ type: String }) color: 'default' | 'primary' | 'secondary' | 'inherit' | 'transparent' = 'primary';
  @property({ type: String }) variant: 'regular' | 'dense' = 'regular';
  @property({ type: Boolean }) elevation = true;

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .appbar {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      flex-shrink: 0;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    /* Position variants */
    :host([position="fixed"]) .appbar {
      position: fixed;
      top: 0;
      left: auto;
      right: 0;
      z-index: 1100;
    }

    :host([position="absolute"]) .appbar {
      position: absolute;
      top: 0;
      left: auto;
      right: 0;
      z-index: 1100;
    }

    :host([position="sticky"]) .appbar {
      position: sticky;
      top: 0;
      z-index: 1100;
    }

    :host([position="static"]) .appbar,
    :host(:not([position])) .appbar {
      position: static;
    }

    :host([position="relative"]) .appbar {
      position: relative;
    }

    /* Color variants */
    :host([color="primary"]) .appbar,
    :host(:not([color])) .appbar {
      background-color: #1976d2;
      color: #fff;
    }

    :host([color="secondary"]) .appbar {
      background-color: #9c27b0;
      color: #fff;
    }

    :host([color="default"]) .appbar {
      background-color: #f5f5f5;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([color="inherit"]) .appbar {
      background-color: inherit;
      color: inherit;
    }

    :host([color="transparent"]) .appbar {
      background-color: transparent;
      color: inherit;
    }

    /* Elevation */
    :host([elevation]) .appbar {
      box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
    }

    :host(:not([elevation])) .appbar {
      box-shadow: none;
    }

    /* Toolbar container */
    .toolbar {
      position: relative;
      display: flex;
      align-items: center;
      padding-left: 24px;
      padding-right: 24px;
      min-height: 64px;
    }

    /* Dense variant */
    :host([variant="dense"]) .toolbar {
      min-height: 48px;
      padding-left: 16px;
      padding-right: 16px;
    }

    /* Mobile responsive */
    @media (max-width: 600px) {
      .toolbar {
        padding-left: 16px;
        padding-right: 16px;
        min-height: 56px;
      }

      :host([variant="dense"]) .toolbar {
        min-height: 48px;
        padding-left: 12px;
        padding-right: 12px;
      }
    }

    /* Slot styling */
    ::slotted(*) {
      display: flex;
      align-items: center;
    }

    ::slotted([slot="start"]) {
      margin-right: 16px;
    }

    ::slotted([slot="end"]) {
      margin-left: auto;
    }

    ::slotted([slot="title"]) {
      flex: 1;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      margin-right: 16px;
    }

    /* Dense title */
    :host([variant="dense"]) ::slotted([slot="title"]) {
      font-size: 1.125rem;
    }
  `;

  render() {
    return html`
      <div class="appbar">
        <div class="toolbar">
          <slot name="start"></slot>
          <slot name="title"></slot>
          <slot></slot>
          <slot name="end"></slot>
        </div>
      </div>
    `;
  }
}