export class ZapAlert extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'appearance', 'icon', 'closeable'];
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

  private handleClose = () => {
    this.remove();
    this.dispatchEvent(new CustomEvent('close'));
  };

  render() {
    const variant = this.getAttribute('variant') || 'secondary';
    const size = this.getAttribute('size') || 'md';
    const appearance = this.getAttribute('appearance') || 'solid';
    const icon = this.getAttribute('icon');
    const closeable = this.hasAttribute('closeable');

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            width: 100%;
          }

          .alert {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            width: 100%;
            box-sizing: border-box;
            border-radius: 1rem;
            border: 1px solid transparent;
            transition: all 0.2s;
            position: relative;
          }

          /* Variants */
          .variant-primary { background: var(--color-brand-primary, #2b7fff); color: white; border-color: var(--color-brand-primary-alpha, rgba(255,255,255,0.1)); }
          .variant-secondary { background: var(--bg-card, #18181b); color: var(--text-main, #fafafa); border-color: var(--border-color, #27272a); }
          .variant-success { background: #10b981; color: white; }
          .variant-warning { background: #f59e0b; color: white; }
          .variant-destructive { background: #ef4444; color: white; }

          /* Appearances */
          .appearance-light.variant-primary { background: var(--color-brand-primary-alpha-soft, rgba(43, 127, 255, 0.1)); color: var(--color-brand-primary, #2b7fff); border-color: var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.2)); }
          .appearance-light.variant-success { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
          
          .appearance-outline { background: transparent; border-color: currentColor; }

          /* Sizes */
          .size-sm { padding: 0.75rem; font-size: 0.75rem; }
          .size-md { padding: 1rem; font-size: 0.8125rem; }
          .size-lg { padding: 1.25rem; font-size: 0.9375rem; }

          .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 1.25rem;
            height: 1.25rem;
          }

          .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          ::slotted([slot="title"]) {
            font-weight: 700;
            margin: 0;
            font-size: 1.1em;
          }

          .close-btn {
            background: transparent;
            border: none;
            color: currentColor;
            opacity: 0.5;
            cursor: pointer;
            padding: 4px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s, opacity 0.2s;
          }

          .close-btn:hover {
            opacity: 1;
            background: var(--color-brand-primary-alpha-soft, rgba(255, 255, 255, 0.1));
            color: var(--color-brand-primary, #2b7fff);
          }
        </style>
        <div class="alert variant-${variant} size-${size} appearance-${appearance}">
          ${icon ? `<div class="icon-container"><i data-lucide="${icon}" style="width: 100%; height: 100%;"></i></div>` : ''}
          <div class="content">
            <slot name="title"></slot>
            <slot></slot>
          </div>
          ${closeable ? `<button class="close-btn" id="close-btn"><i data-lucide="x" style="width: 1rem; height: 1rem;"></i></button>` : ''}
        </div>
      `;

      // Setup Lucide icons in shadow root
      if (window.lucide) {
        window.lucide.createIcons({
          nameAttr: 'data-lucide',
          root: this.shadowRoot as any
        });
      }

      this.shadowRoot.getElementById('close-btn')?.addEventListener('click', this.handleClose);
    }
  }
}

customElements.define('zap-alert', ZapAlert);
