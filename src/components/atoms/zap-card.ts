export class ZapCard extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'padding', 'border-radius', 'shadow'];
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
    const variant = this.getAttribute('variant') || 'default'; // default, glass, outlined
    const padding = this.getAttribute('padding') || '1.5rem';
    const borderRadius = this.getAttribute('border-radius') || '1.5rem';
    const shadow = this.getAttribute('shadow') || 'md'; // none, sm, md, lg, xl

    const shadows: Record<string, string> = {
      'none': 'none',
      'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    };

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .card {
            padding: ${padding};
            border-radius: ${borderRadius};
            box-shadow: ${shadows[shadow] || shadows['md']};
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
            box-sizing: border-box;
          }

          /* Variants */
          .variant-default {
            background: var(--bg-card, #18181b);
            border: 1px solid var(--border-color, #27272a);
            color: inherit;
          }

          .variant-glass {
            background: var(--bg-glass, rgba(255, 255, 255, 0.03));
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-glass, rgba(255, 255, 255, 0.05));
            color: inherit;
          }

          .variant-outlined {
            background: transparent;
            border: 1px solid var(--border-color, #27272a);
            color: inherit;
          }

          .variant-brutalist {
            background: var(--zap-card-bg, #ffffff);
            border: 3px solid #000000;
            box-shadow: 4px 4px 0px #000000;
            color: #000000;
            border-radius: 0px !important;
          }

          .card:hover {
            border-color: var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.3));
          }

          .variant-brutalist:hover {
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px #000000;
            border-color: #000000;
          }

          ::slotted([slot="header"]) {
            margin-bottom: 1rem;
            flex-shrink: 0;
          }

          ::slotted([slot="footer"]) {
            margin-top: auto;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
            flex-shrink: 0;
          }

          .content {
            flex-grow: 1;
          }
        </style>
        <div class="card variant-${variant}">
          <slot name="header"></slot>
          <div class="content">
            <slot></slot>
          </div>
          <slot name="footer"></slot>
        </div>
      `;
    }
  }
}

customElements.define('zap-card', ZapCard);
