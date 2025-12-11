import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class Stepper extends LitElement {
  @property({ type: Number }) activeStep = 0;
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) alternativeLabel = false;
  @property({ type: Boolean }) nonLinear = false;

  @state() private steps: Step[] = [];

  static styles = css`
    :host {
      display: block;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    }

    .stepper {
      display: flex;
      padding: 24px;
    }

    /* Horizontal orientation */
    :host([orientation="horizontal"]) .stepper {
      flex-direction: row;
      align-items: center;
    }

    /* Vertical orientation */
    :host([orientation="vertical"]) .stepper {
      flex-direction: column;
      align-items: stretch;
    }

    /* Alternative label layout for horizontal */
    :host([orientation="horizontal"][alternativeLabel]) .stepper {
      align-items: flex-start;
    }

    ::slotted(mui-step) {
      flex: 1;
    }

    :host([orientation="vertical"]) ::slotted(mui-step) {
      flex: none;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('step-click', this.handleStepClick as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('step-click', this.handleStepClick as EventListener);
  }

  firstUpdated() {
    this.updateSteps();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('activeStep')) {
      this.updateSteps();
    }
  }

  private handleStepClick(e: CustomEvent) {
    const stepIndex = e.detail.index;
    if (this.nonLinear || stepIndex <= this.activeStep + 1) {
      const oldStep = this.activeStep;
      this.activeStep = stepIndex;
      
      this.dispatchEvent(new CustomEvent('step-change', {
        detail: { activeStep: stepIndex, previousStep: oldStep },
        bubbles: true,
        composed: true
      }));
    }
  }

  private updateSteps() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedElements = slot.assignedElements() as Step[];
      this.steps = assignedElements.filter(el => el.tagName.toLowerCase() === 'mui-step');
      
      // Update step states
      this.steps.forEach((step, index) => {
        step.index = index;
        step.active = index === this.activeStep;
        step.completed = index < this.activeStep;
        step.orientation = this.orientation;
        step.alternativeLabel = this.alternativeLabel;
        step.nonLinear = this.nonLinear;
        step.isLast = index === this.steps.length - 1;
      });
    }
  }

  private handleSlotChange() {
    this.updateSteps();
  }

  render() {
    return html`
      <div class="stepper">
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
  }
}

export class Step extends LitElement {
  @property({ type: Number }) index = 0;
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) completed = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) optional = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: Boolean }) alternativeLabel = false;
  @property({ type: Boolean }) nonLinear = false;
  @property({ type: Boolean }) isLast = false;

  static styles = css`
    :host {
      display: flex;
      position: relative;
    }

    /* Horizontal orientation */
    :host([orientation="horizontal"]) {
      flex-direction: row;
      align-items: center;
    }

    /* Vertical orientation */
    :host([orientation="vertical"]) {
      flex-direction: column;
      min-height: 72px;
    }

    /* Alternative label layout */
    :host([orientation="horizontal"][alternativeLabel]) {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .step-button {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .step-button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .step-button:disabled {
      cursor: default;
      pointer-events: none;
    }

    /* Vertical step button */
    :host([orientation="vertical"]) .step-button {
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      padding: 8px 0;
    }

    /* Alternative label step button */
    :host([alternativeLabel]) .step-button {
      flex-direction: column;
      padding: 8px 12px;
    }

    .step-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 500;
      margin-right: 8px;
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([orientation="vertical"]) .step-icon,
    :host([alternativeLabel]) .step-icon {
      margin-right: 0;
      margin-bottom: 8px;
    }

    /* Icon states */
    .step-icon {
      background-color: rgba(0, 0, 0, 0.38);
      color: #fff;
    }

    :host([active]) .step-icon {
      background-color: #1976d2;
      color: #fff;
    }

    :host([completed]) .step-icon {
      background-color: #1976d2;
      color: #fff;
    }

    :host([error]) .step-icon {
      background-color: #d32f2f;
      color: #fff;
    }

    :host([disabled]) .step-icon {
      background-color: rgba(0, 0, 0, 0.26);
      color: rgba(0, 0, 0, 0.38);
    }

    .step-label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    :host([alternativeLabel]) .step-label {
      align-items: center;
      text-align: center;
    }

    .step-label-text {
      font-size: 14px;
      line-height: 1.43;
      color: rgba(0, 0, 0, 0.87);
      transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host([active]) .step-label-text {
      color: rgba(0, 0, 0, 0.87);
      font-weight: 500;
    }

    :host([completed]) .step-label-text {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([disabled]) .step-label-text {
      color: rgba(0, 0, 0, 0.38);
    }

    :host([error]) .step-label-text {
      color: #d32f2f;
    }

    .step-label-optional {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      margin-top: 4px;
    }

    :host([error]) .step-label-optional {
      color: #d32f2f;
    }

    /* Connector line */
    .step-connector {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.12);
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    /* Horizontal connector */
    :host([orientation="horizontal"]) .step-connector {
      top: 50%;
      left: calc(100% - 8px);
      right: -50%;
      height: 1px;
      transform: translateY(-50%);
    }

    /* Vertical connector */
    :host([orientation="vertical"]) .step-connector {
      left: 12px;
      top: 32px;
      bottom: -8px;
      width: 1px;
    }

    /* Alternative label connector */
    :host([alternativeLabel]) .step-connector {
      top: 12px;
      left: calc(50% + 20px);
      right: calc(-50% + 20px);
      height: 1px;
    }

    /* Hide connector on last step */
    :host([isLast]) .step-connector {
      display: none;
    }

    /* Completed connector */
    :host([completed]) .step-connector {
      background-color: #1976d2;
    }

    /* Check icon for completed steps */
    .check-icon {
      width: 16px;
      height: 16px;
    }
  `;

  private handleClick() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('step-click', {
        detail: { index: this.index },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <button 
        class="step-button" 
        @click="${this.handleClick}"
        ?disabled="${this.disabled}"
        aria-current="${this.active ? 'step' : 'false'}"
      >
        <div class="step-icon">
          ${this.completed && !this.error ? html`
            <svg class="check-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          ` : html`${this.index + 1}`}
        </div>
        
        <div class="step-label">
          <span class="step-label-text">
            <slot></slot>
          </span>
          ${this.optional ? html`
            <span class="step-label-optional">Optional</span>
          ` : ''}
        </div>
      </button>
      
      <div class="step-connector"></div>
    `;
  }
}

export class StepLabel extends LitElement {
  @property({ type: Boolean }) optional = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) optionalText = 'Optional';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .step-label-text {
      font-size: 14px;
      line-height: 1.43;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([error]) .step-label-text {
      color: #d32f2f;
    }

    .step-label-optional {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54);
      margin-top: 4px;
    }

    :host([error]) .step-label-optional {
      color: #d32f2f;
    }
  `;

  render() {
    return html`
      <span class="step-label-text">
        <slot></slot>
      </span>
      ${this.optional ? html`
        <span class="step-label-optional">${this.optionalText}</span>
      ` : ''}
    `;
  }
}

export class StepContent extends LitElement {
  @property({ type: Number }) step = 0;
  @property({ type: Number }) activeStep = 0;
  @property({ type: Boolean }) transitionDuration = true;

  static styles = css`
    :host {
      display: block;
      margin-left: 12px;
      padding-left: 20px;
      padding-bottom: 8px;
      border-left: 1px solid rgba(0, 0, 0, 0.12);
    }

    :host([hidden]) {
      display: none !important;
    }

    .step-content {
      padding: 16px 0;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    :host(:not([active])) .step-content {
      opacity: 0;
    }

    .step-content-actions {
      margin-top: 16px;
      display: flex;
      gap: 8px;
    }
  `;

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('activeStep') || changedProperties.has('step')) {
      this.hidden = this.step !== this.activeStep;
    }
  }

  render() {
    return html`
      <div class="step-content">
        <slot></slot>
        <div class="step-content-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}