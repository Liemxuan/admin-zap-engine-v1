export class ZapBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'shape', 'appearance', 'disabled', 'dot'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'primary';
    const size = this.getAttribute('size') || 'md';
    const shape = this.getAttribute('shape') || 'default';
    const appearance = this.getAttribute('appearance') || 'default';
    const hasDot = this.hasAttribute('dot');
    // const disabled = this.hasAttribute('disabled');

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: inline-flex;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            vertical-align: middle;
          }

          .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid transparent;
            font-weight: 600;
            transition: all 0.2s;
            line-height: normal;
            white-space: nowrap;
            box-sizing: border-box;
            gap: 0.375rem;
          }

          /* Dot Indicator */
          .dot-indicator {
            width: 0.375rem;
            height: 0.375rem;
            border-radius: 50%;
            background-color: currentColor;
            display: ${hasDot ? 'block' : 'none'};
          }

          .variant-success .dot-indicator { background-color: #059669; }
          .variant-destructive .dot-indicator { background-color: #dc2626; }
          .variant-warning .dot-indicator { background-color: #d97706; }
          .variant-info .dot-indicator { background-color: #0284c7; }

          /* Variants */
          .variant-primary { background: var(--color-brand-primary, #2b7fff); color: white; }
          .variant-secondary { background: var(--border-color, #e4e4e7); color: var(--text-main, #18181b); }
          .variant-success { background: #10b981; color: white; }
          .variant-warning { background: #f59e0b; color: white; }
          .variant-info { background: var(--color-brand-accent, #0ea5e9); color: white; }
          .variant-destructive { background: #ef4444; color: white; }

          /* Appearances */
          .appearance-light.variant-primary { background: var(--color-brand-primary-alpha-soft, rgba(43, 127, 255, 0.1)); color: var(--color-brand-primary, #2b7fff); border-color: var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.2)); }
          .appearance-light.variant-success { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
          .appearance-light.variant-warning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: rgba(245, 158, 11, 0.2); }
          .appearance-light.variant-info { background: var(--color-brand-accent-alpha-soft, rgba(14, 165, 233, 0.1)); color: var(--color-brand-accent, #0ea5e9); border-color: var(--color-brand-accent-alpha, rgba(14, 165, 233, 0.2)); }
          .appearance-light.variant-destructive { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }

          .appearance-outline { background: transparent; }
          .appearance-outline.variant-primary { border-color: var(--color-brand-primary, #2b7fff); color: var(--color-brand-primary, #2b7fff); }
          .appearance-outline.variant-secondary { border-color: var(--border-color, #e4e4e7); color: var(--text-muted, #71717a); }

          /* Sizes */
          .size-xs { height: 1.25rem; padding: 0 0.375rem; font-size: 0.625rem; border-radius: 0.25rem; }
          .size-sm { height: 1.5rem; padding: 0 0.5rem; font-size: 0.75rem; border-radius: 0.375rem; }
          .size-md { height: 1.75rem; padding: 0 0.625rem; font-size: 0.8125rem; border-radius: 0.5rem; }
          .size-lg { height: 2rem; padding: 0 0.75rem; font-size: 0.875rem; border-radius: 0.625rem; }

          /* Shapes */
          .shape-circle { border-radius: 9999px; }

          /* State */
          :host([disabled]) .badge {
            opacity: 0.5;
            pointer-events: none;
          }
        </style>
        <div class="badge variant-${variant} size-${size} shape-${shape} appearance-${appearance}">
          <span class="dot-indicator"></span>
          <slot></slot>
        </div>
      `;
    }
  }
}

customElements.define('zap-badge', ZapBadge);
