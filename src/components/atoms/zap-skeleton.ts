export class ZapSkeleton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'width', 'height'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const variant = this.getAttribute('variant') || 'rect'; // rect, circle, text
    const width = this.getAttribute('width') || '100%';
    const height = this.getAttribute('height') || (variant === 'circle' ? width : (variant === 'text' ? '1rem' : '4rem'));

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: ${width};
            height: ${height};
          }

          .skeleton {
            width: 100%;
            height: 100%;
            background: var(--border-color, rgba(255, 255, 255, 0.05));
            border-radius: ${variant === 'circle' ? '50%' : (variant === 'text' ? '4px' : '1rem')};
            position: relative;
            overflow: hidden;
          }

          .skeleton::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              var(--color-brand-primary-alpha-soft, rgba(255, 255, 255, 0.03)),
              transparent
            );
            animation: pulse 2s infinite ease-in-out;
          }

          @keyframes pulse {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        </style>
        <div class="skeleton"></div>
      `;
    }
  }
}

customElements.define('zap-skeleton', ZapSkeleton);
