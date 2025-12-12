import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

export class CssBaseline extends LitElement {
  @property({ type: Boolean }) enableColorScheme = false;

  static styles = css`
    :host {
      display: contents;
    }
  `;

  private _getBaselineStyles(): string {
    return `
      /* CSS Reset and Normalization */
      html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        box-sizing: border-box;
        -webkit-text-size-adjust: 100%;
      }

      *, *::before, *::after {
        box-sizing: inherit;
      }

      /* Strong reset */
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }

      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, 
      footer, header, hgroup, menu, nav, section {
        display: block;
      }

      body {
        line-height: 1;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        background-color: #fff;
        color: rgba(0, 0, 0, 0.87);
        margin: 0;
        padding: 0;
        ${this.enableColorScheme ? 'color-scheme: light dark;' : ''}
      }

      ol, ul {
        list-style: none;
      }

      blockquote, q {
        quotes: none;
      }

      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }

      table {
        border-collapse: collapse;
        border-spacing: 0;
      }

      /* Material Design specific styles */
      strong, b {
        font-weight: 700;
      }

      /* Remove default button styles */
      button {
        background: transparent;
        border: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
        display: inline-flex;
        outline: 0;
        position: relative;
        align-items: center;
        user-select: none;
        vertical-align: middle;
        justify-content: center;
        text-decoration: none;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        color: inherit;
      }

      /* Input styles */
      input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
        margin: 0;
      }

      input:focus, textarea:focus, select:focus {
        outline: 0;
      }

      /* Link styles */
      a {
        color: #1976d2;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }

      /* Typography styles */
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }

      h1 {
        font-size: 6rem;
        font-weight: 300;
        line-height: 1.167;
        letter-spacing: -0.01562em;
      }

      h2 {
        font-size: 3.75rem;
        font-weight: 300;
        line-height: 1.2;
        letter-spacing: -0.00833em;
      }

      h3 {
        font-size: 3rem;
        font-weight: 400;
        line-height: 1.167;
        letter-spacing: 0em;
      }

      h4 {
        font-size: 2.125rem;
        font-weight: 400;
        line-height: 1.235;
        letter-spacing: 0.00735em;
      }

      h5 {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.334;
        letter-spacing: 0em;
      }

      h6 {
        font-size: 1.25rem;
        font-weight: 500;
        line-height: 1.6;
        letter-spacing: 0.0075em;
      }

      p {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }

      /* Form elements */
      fieldset {
        border: 0;
        margin: 0;
        padding: 0;
      }

      legend {
        display: block;
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        line-height: inherit;
        color: inherit;
        white-space: normal;
      }

      /* Image styles */
      img {
        border-style: none;
        max-width: 100%;
        height: auto;
      }

      /* Code styles */
      code, kbd, pre, samp {
        font-family: "Roboto Mono", monospace;
        font-size: 1em;
      }

      pre {
        margin: 0;
        overflow: auto;
      }

      /* Selection styles */
      ::selection {
        background-color: rgba(25, 118, 210, 0.08);
      }

      ::-moz-selection {
        background-color: rgba(25, 118, 210, 0.08);
      }

      /* Focus styles */
      :focus-visible {
        outline: 2px solid #1976d2;
        outline-offset: 2px;
      }

      /* Scrollbar styles for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      /* Print styles */
      @media print {
        *,
        *::before,
        *::after {
          background: transparent !important;
          color: #000 !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }

        a,
        a:visited {
          text-decoration: underline;
        }

        a[href]::after {
          content: " (" attr(href) ")";
        }

        abbr[title]::after {
          content: " (" attr(title) ")";
        }

        a[href^="#"]::after,
        a[href^="javascript:"]::after {
          content: "";
        }

        pre {
          white-space: pre-wrap !important;
        }

        pre,
        blockquote {
          border: 1px solid #999;
          page-break-inside: avoid;
        }

        thead {
          display: table-header-group;
        }

        tr,
        img {
          page-break-inside: avoid;
        }

        p,
        h2,
        h3 {
          orphans: 3;
          widows: 3;
        }

        h2,
        h3 {
          page-break-after: avoid;
        }
      }

      /* Dark mode support */
      ${this.enableColorScheme ? `
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #121212;
            color: rgba(255, 255, 255, 0.87);
          }

          a {
            color: #90caf9;
          }

          ::selection {
            background-color: rgba(144, 202, 249, 0.16);
          }

          ::-moz-selection {
            background-color: rgba(144, 202, 249, 0.16);
          }

          :focus-visible {
            outline-color: #90caf9;
          }

          ::-webkit-scrollbar-track {
            background: #2c2c2c;
          }

          ::-webkit-scrollbar-thumb {
            background: #555;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #777;
          }
        }
      ` : ''}

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._injectGlobalStyles();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeGlobalStyles();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('enableColorScheme')) {
      this._removeGlobalStyles();
      this._injectGlobalStyles();
    }
  }

  private _injectGlobalStyles() {
    // Remove existing baseline styles
    this._removeGlobalStyles();

    // Create and inject new styles
    const styleElement = document.createElement('style');
    styleElement.id = 'mui-css-baseline';
    styleElement.textContent = this._getBaselineStyles();
    document.head.appendChild(styleElement);
  }

  private _removeGlobalStyles() {
    const existingStyle = document.getElementById('mui-css-baseline');
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

export class ScopedCssBaseline extends LitElement {
  @property({ type: Boolean }) enableColorScheme = false;

  static styles = css`
    :host {
      display: block;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      box-sizing: border-box;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.00938em;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([enableColorScheme]) {
      color-scheme: light dark;
    }

    /* Apply baseline styles to slotted content */
    ::slotted(*) {
      box-sizing: border-box;
    }

    /* Reset margins and paddings for common elements */
    ::slotted(h1), ::slotted(h2), ::slotted(h3), 
    ::slotted(h4), ::slotted(h5), ::slotted(h6),
    ::slotted(p), ::slotted(blockquote), ::slotted(pre),
    ::slotted(dl), ::slotted(dd), ::slotted(ol), ::slotted(ul),
    ::slotted(figure), ::slotted(hr), ::slotted(fieldset) {
      margin: 0;
      padding: 0;
    }

    /* Typography styles */
    ::slotted(h1) {
      font-size: 6rem;
      font-weight: 300;
      line-height: 1.167;
      letter-spacing: -0.01562em;
      margin: 0;
    }

    ::slotted(h2) {
      font-size: 3.75rem;
      font-weight: 300;
      line-height: 1.2;
      letter-spacing: -0.00833em;
      margin: 0;
    }

    ::slotted(h3) {
      font-size: 3rem;
      font-weight: 400;
      line-height: 1.167;
      letter-spacing: 0em;
      margin: 0;
    }

    ::slotted(h4) {
      font-size: 2.125rem;
      font-weight: 400;
      line-height: 1.235;
      letter-spacing: 0.00735em;
      margin: 0;
    }

    ::slotted(h5) {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 1.334;
      letter-spacing: 0em;
      margin: 0;
    }

    ::slotted(h6) {
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      margin: 0;
    }

    ::slotted(p) {
      margin: 0;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.00938em;
    }

    /* List styles */
    ::slotted(ol), ::slotted(ul) {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    /* Link styles */
    ::slotted(a) {
      color: #1976d2;
      text-decoration: none;
    }

    ::slotted(a:hover) {
      text-decoration: underline;
    }

    /* Button styles */
    ::slotted(button) {
      background: transparent;
      border: 0;
      cursor: pointer;
      margin: 0;
      padding: 0;
      display: inline-flex;
      outline: 0;
      position: relative;
      align-items: center;
      user-select: none;
      vertical-align: middle;
      justify-content: center;
      text-decoration: none;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      letter-spacing: inherit;
      color: inherit;
    }

    /* Input styles */
    ::slotted(input), ::slotted(textarea), ::slotted(select) {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      color: inherit;
      margin: 0;
    }

    ::slotted(input:focus), ::slotted(textarea:focus), ::slotted(select:focus) {
      outline: 0;
    }

    /* Table styles */
    ::slotted(table) {
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* Image styles */
    ::slotted(img) {
      border-style: none;
      max-width: 100%;
      height: auto;
    }

    /* Code styles */
    ::slotted(code), ::slotted(kbd), ::slotted(pre), ::slotted(samp) {
      font-family: "Roboto Mono", monospace;
      font-size: 1em;
    }

    ::slotted(pre) {
      margin: 0;
      overflow: auto;
    }

    /* Strong and bold */
    ::slotted(strong), ::slotted(b) {
      font-weight: 700;
    }

    /* Fieldset and legend */
    ::slotted(fieldset) {
      border: 0;
      margin: 0;
      padding: 0;
    }

    ::slotted(legend) {
      display: block;
      width: 100%;
      max-width: 100%;
      padding: 0;
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
      line-height: inherit;
      color: inherit;
      white-space: normal;
    }

    /* Focus styles */
    ::slotted(:focus-visible) {
      outline: 2px solid #1976d2;
      outline-offset: 2px;
    }

    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      :host([enableColorScheme]) {
        background-color: #121212;
        color: rgba(255, 255, 255, 0.87);
      }

      :host([enableColorScheme]) ::slotted(a) {
        color: #90caf9;
      }

      :host([enableColorScheme]) ::slotted(:focus-visible) {
        outline-color: #90caf9;
      }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      ::slotted(*) {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}