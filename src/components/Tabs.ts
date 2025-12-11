import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Tabs extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String }) variant: 'standard' | 'scrollable' | 'fullWidth' = 'standard';
  @property({ type: Boolean }) centered = false;
  @property({ type: String }) indicatorColor: 'primary' | 'secondary' = 'primary';
  @property({ type: String }) textColor: 'primary' | 'secondary' | 'inherit' = 'primary';

  @state() private tabs: Tab[] = [];
  @state() private indicatorStyle = '';

  static styles = css`
    :host {
      display: flex;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .tabs-container {
      position: relative;
      display: flex;
      width: 100%;
    }

    .tabs-scroller {
      position: relative;
      display: flex;
      flex: 1 1 auto;
      overflow: hidden;
    }

    .tabs-flexContainer {
      display: flex;
      position: relative;
    }

    /* Horizontal orientation */
    :host([orientation="horizontal"]) .tabs-flexContainer {
      flex-direction: row;
    }

    /* Vertical orientation */
    :host([orientation="vertical"]) {
      flex-direction: column;
    }

    :host([orientation="vertical"]) .tabs-flexContainer {
      flex-direction: column;
    }

    /* Variant: standard */
    :host([variant="standard"]) .tabs-flexContainer {
      justify-content: flex-start;
    }

    /* Variant: centered */
    :host([centered]) .tabs-flexContainer {
      justify-content: center;
    }

    /* Variant: fullWidth */
    :host([variant="fullWidth"]) .tabs-flexContainer {
      justify-content: space-between;
    }

    :host([variant="fullWidth"]) ::slotted(mui-tab) {
      flex: 1;
    }

    /* Variant: scrollable */
    :host([variant="scrollable"]) .tabs-scroller {
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    :host([variant="scrollable"]) .tabs-scroller::-webkit-scrollbar {
      display: none;
    }

    /* Indicator */
    .indicator {
      position: absolute;
      transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      will-change: left, width, top, height;
    }

    /* Horizontal indicator */
    :host([orientation="horizontal"]) .indicator {
      height: 2px;
      bottom: 0;
      left: 0;
    }

    /* Vertical indicator */
    :host([orientation="vertical"]) .indicator {
      width: 2px;
      right: 0;
      top: 0;
    }

    /* Indicator colors */
    :host([indicatorColor="primary"]) .indicator {
      background-color: #1976d2;
    }

    :host([indicatorColor="secondary"]) .indicator {
      background-color: #9c27b0;
    }

    /* Scroll buttons */
    .scroll-button {
      display: none;
      align-items: center;
      justify-content: center;
      width: 40px;
      min-width: 40px;
      height: 100%;
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.54);
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .scroll-button:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    .scroll-button:disabled {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
    }

    :host([variant="scrollable"]) .scroll-button {
      display: flex;
    }

    /* Border bottom for horizontal tabs */
    :host([orientation="horizontal"]) .tabs-container {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    /* Border right for vertical tabs */
    :host([orientation="vertical"]) .tabs-container {
      border-right: 1px solid rgba(0, 0, 0, 0.12);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('tab-click', this.handleTabClick as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('tab-click', this.handleTabClick as EventListener);
  }

  firstUpdated() {
    this.updateTabs();
    this.updateIndicator();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.updateIndicator();
    }
  }

  private handleTabClick(e: CustomEvent) {
    const newValue = e.detail.value;
    if (newValue !== this.value) {
      const oldValue = this.value;
      this.value = newValue;
      
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: newValue, oldValue },
        bubbles: true,
        composed: true
      }));
    }
  }

  private updateTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedElements = slot.assignedElements() as Tab[];
      this.tabs = assignedElements.filter(el => el.tagName.toLowerCase() === 'mui-tab');
      
      // Set initial value if not set
      if (!this.value && this.tabs.length > 0) {
        this.value = this.tabs[0].value || '0';
      }
      
      // Update tab states
      this.tabs.forEach((tab, index) => {
        if (!tab.value) {
          tab.value = index.toString();
        }
        tab.selected = tab.value === this.value;
        tab.orientation = this.orientation;
        tab.textColor = this.textColor;
      });
    }
  }

  private updateIndicator() {
    const selectedTab = this.tabs.find(tab => tab.value === this.value);
    if (selectedTab) {
      const tabRect = selectedTab.getBoundingClientRect();
      const containerRect = this.getBoundingClientRect();
      
      if (this.orientation === 'horizontal') {
        const left = tabRect.left - containerRect.left;
        const width = tabRect.width;
        this.indicatorStyle = `left: ${left}px; width: ${width}px;`;
      } else {
        const top = tabRect.top - containerRect.top;
        const height = tabRect.height;
        this.indicatorStyle = `top: ${top}px; height: ${height}px;`;
      }
    }
  }

  private handleSlotChange() {
    this.updateTabs();
    this.updateIndicator();
  }

  private scrollTabsLeft() {
    const scroller = this.shadowRoot?.querySelector('.tabs-scroller');
    if (scroller) {
      scroller.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }

  private scrollTabsRight() {
    const scroller = this.shadowRoot?.querySelector('.tabs-scroller');
    if (scroller) {
      scroller.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }

  render() {
    return html`
      <div class="tabs-container">
        ${this.variant === 'scrollable' ? html`
          <button class="scroll-button" @click="${this.scrollTabsLeft}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
        ` : ''}
        
        <div class="tabs-scroller">
          <div class="tabs-flexContainer">
            <slot @slotchange="${this.handleSlotChange}"></slot>
            <div class="indicator" style="${this.indicatorStyle}"></div>
          </div>
        </div>
        
        ${this.variant === 'scrollable' ? html`
          <button class="scroll-button" @click="${this.scrollTabsRight}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }
}

export class Tab extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String }) textColor: 'primary' | 'secondary' | 'inherit' = 'primary';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      box-sizing: border-box;
      background-color: transparent;
      outline: 0;
      border: 0;
      margin: 0;
      border-radius: 0;
      padding: 0;
      cursor: pointer;
      user-select: none;
      vertical-align: middle;
      text-decoration: none;
      color: inherit;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.75;
      letter-spacing: 0.02857em;
      text-transform: uppercase;
      min-width: 90px;
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([disabled]) {
      color: rgba(0, 0, 0, 0.26);
      cursor: default;
      pointer-events: none;
    }

    /* Horizontal tabs */
    :host([orientation="horizontal"]) {
      flex-direction: column;
      min-height: 48px;
      padding: 12px 16px;
    }

    /* Vertical tabs */
    :host([orientation="vertical"]) {
      flex-direction: row;
      min-height: 48px;
      min-width: 160px;
      padding: 6px 16px;
      justify-content: flex-start;
    }

    /* Text colors */
    :host([textColor="primary"]) {
      color: rgba(0, 0, 0, 0.6);
    }

    :host([textColor="primary"][selected]) {
      color: #1976d2;
    }

    :host([textColor="secondary"]) {
      color: rgba(0, 0, 0, 0.6);
    }

    :host([textColor="secondary"][selected]) {
      color: #9c27b0;
    }

    :host([textColor="inherit"]) {
      color: inherit;
      opacity: 0.6;
    }

    :host([textColor="inherit"][selected]) {
      opacity: 1;
    }

    /* Hover effects */
    :host(:not([disabled]):hover) {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([textColor="primary"]:not([disabled]):hover) {
      color: #1976d2;
    }

    :host([textColor="secondary"]:not([disabled]):hover) {
      color: #9c27b0;
    }

    /* Ripple effect */
    .tab-content {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .tab-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: currentColor;
      opacity: 0;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      pointer-events: none;
    }

    :host(:not([disabled]):active) .tab-content::before {
      opacity: 0.12;
    }

    /* Icon and label layout */
    .tab-icon {
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host([orientation="vertical"]) .tab-icon {
      margin-bottom: 0;
      margin-right: 12px;
    }

    .tab-label {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    /* Hide label if only icon */
    :host(:not([label])) .tab-label:empty {
      display: none;
    }

    /* Adjust spacing when both icon and label are present */
    :host([orientation="horizontal"]) ::slotted([slot="icon"]) ~ .tab-label {
      margin-top: 4px;
    }

    :host([orientation="vertical"]) ::slotted([slot="icon"]) ~ .tab-label {
      margin-left: 12px;
    }
  `;

  private handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('tab-click', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="tab-content" @click="${this.handleClick}">
        <div class="tab-icon">
          <slot name="icon"></slot>
        </div>
        <div class="tab-label">
          ${this.label ? this.label : ''}
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export class TabPanel extends LitElement {
  @property({ type: String }) value = '';
  @property({ type: String }) tabsValue = '';
  @property({ type: Boolean }) keepMounted = false;

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    :host([hidden]) {
      display: none !important;
    }

    .panel-content {
      padding: 24px;
    }
  `;

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('tabsValue')) {
      this.updateVisibility();
    }
  }

  private updateVisibility() {
    const isVisible = this.value === this.tabsValue;
    
    if (!this.keepMounted && !isVisible) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
    
    this.style.display = isVisible ? 'block' : (this.keepMounted ? 'none' : 'none');
  }

  render() {
    return html`
      <div class="panel-content">
        <slot></slot>
      </div>
    `;
  }
}