export class ZapButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'label', 'size', 'color', 'disabled', 'fullwidth', 'href', 'loading', 'border-radius', 'icon', 'style-override'];
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
    const variant = this.getAttribute('variant') || 'contained';
    const label = this.getAttribute('label') || '';
    const size = this.getAttribute('size') || 'medium';
    const color = this.getAttribute('color') || 'primary';
    const disabled = this.hasAttribute('disabled');
    const fullWidth = this.hasAttribute('fullwidth');
    const href = this.getAttribute('href');
    const loading = this.hasAttribute('loading');
    const borderRadius = this.getAttribute('border-radius');
    const icon = this.getAttribute('icon');
    const hasLabel = !!label || !!this.innerHTML.trim();
    const styleOverride = this.getAttribute('style-override') || '';

    const isAnchor = !!href;
    const tag = isAnchor ? 'a' : 'button';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: ${fullWidth ? 'block' : 'inline-block'};
            vertical-align: middle;
            width: ${fullWidth ? '100%' : 'auto'};
          }

          ${tag} {
            all: unset;
            box-sizing: border-box;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: ${disabled || loading ? 'not-allowed' : 'pointer'};
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            gap: 0.5rem;
            width: 100%;
            text-decoration: none;
            opacity: ${disabled ? '0.5' : '1'};
            pointer-events: ${disabled || loading ? 'none' : 'auto'};
            ${styleOverride}
            ${borderRadius ? `border-radius: ${borderRadius};` : ''}
          }

          /* Sizes */
          .small { 
            height: 2rem; 
            min-width: 2rem;
            padding: ${hasLabel ? '0 0.75rem' : '0'}; 
            font-size: 0.75rem; 
          }
          .medium { 
            height: 2.5rem; 
            min-width: 2.5rem;
            padding: ${hasLabel ? '0 1.25rem' : '0'}; 
            font-size: 0.875rem; 
          }
          .large { 
            height: 3rem; 
            min-width: 3rem;
            padding: ${hasLabel ? '0 1.75rem' : '0'}; 
            font-size: 1rem; 
          }

          /* Variants & Colors */
          /* Contained */
          .contained.primary { background: var(--color-brand-primary, #2b7fff); color: white; }
          .contained.primary:hover { opacity: 0.9; }
          .contained.secondary { background: var(--color-brand-secondary, #db2777); color: white; }
          .contained.secondary:hover { opacity: 0.9; }
          .contained.success { background: #10b981; color: white; }
          .contained.error { background: #ef4444; color: white; }
          
          /* Outlined */
          .outlined { border: 1px solid currentColor; background: transparent; }
          .outlined.primary { 
            color: var(--color-brand-primary, #2b7fff); 
            border-color: var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.5)); 
          }
          .outlined.primary:hover { 
            background: var(--color-brand-primary-alpha-soft, rgba(43, 127, 255, 0.05)); 
          }
          
          /* Text */
          .text { background: transparent; }
          .text.primary { color: var(--color-brand-primary, #2b7fff); }
          .text.primary:hover { background: var(--color-brand-primary-alpha-soft, rgba(43, 127, 255, 0.05)); }

          /* Premium */
          .premium { 
            background: linear-gradient(135deg, var(--color-brand-primary, #2b7fff) 0%, var(--color-brand-secondary, #db2777) 100%);
            color: white;
            font-weight: 700;
            box-shadow: 0 10px 15px -3px var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.3));
          }
          .premium:hover { filter: brightness(1.1); transform: translateY(-1px); }
          .premium:active { transform: translateY(0); }

          .loading-spinner {
            width: 1rem;
            height: 1rem;
            border: 2px solid currentColor;
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            animation: rotation 1s linear infinite;
          }

          @keyframes rotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <${tag} 
          class="${variant} ${color} ${size}"
          ${isAnchor ? `href="${href}"` : ''}
          ${disabled ? 'disabled' : ''}
        >
          ${loading ? '<span class="loading-spinner"></span>' : ''}
          ${icon ? `<i data-lucide="${icon}" class="w-5 h-5"></i>` : ''}
          <slot name="start-icon"></slot>
          <slot>${label}</slot>
          <slot name="end-icon"></slot>
        </${tag}>
      `;

      if ((window as any).lucide) {
        (window as any).lucide.createIcons({
          root: this.shadowRoot
        });
      }
    }
  }
}

customElements.define('zap-button', ZapButton);
