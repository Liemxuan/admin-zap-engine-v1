export class ZapAccordion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            width: 100%;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            border: 1px solid var(--border-color, #e2e8f0);
            border-radius: 1rem;
            overflow: hidden;
            background: var(--bg-card, #ffffff);
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          }

          ::slotted(zap-accordion-item) {
            border-bottom: 1px solid var(--border-color, #e2e8f0);
          }

          ::slotted(zap-accordion-item:last-of-type) {
            border-bottom: none;
          }
        </style>
        <div class="accordion">
          <slot></slot>
        </div>
      `;
        }
    }
}

export class ZapAccordionItem extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'open', 'icon'];
    }

    private _isOpen: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._isOpen = this.hasAttribute('open');
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'open') {
                this._isOpen = newValue !== null;
            }
            this.render();
        }
    }

    private toggle() {
        this._isOpen = !this._isOpen;
        if (this._isOpen) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
        this.dispatchEvent(new CustomEvent('toggle', {
            detail: { open: this._isOpen },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const title = this.getAttribute('title') || 'Untitled';
        const icon = this.getAttribute('icon');

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          
          .item { width: 100%; box-sizing: border-box; }

          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            cursor: pointer;
            background: none;
            border: none;
            width: 100%;
            font-family: inherit;
            transition: background 0.2s;
            text-align: left;
          }

          .header:hover {
            background: var(--color-brand-primary-alpha-soft, rgba(43, 127, 255, 0.03));
          }

          .title-group {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-main, #0f172a);
            font-weight: 600;
            font-size: 0.875rem;
          }

          .chevron {
            color: var(--text-muted, #64748b);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: rotate(${this._isOpen ? '180deg' : '0deg'});
          }

          .content-wrapper {
            display: grid;
            grid-template-rows: ${this._isOpen ? '1fr' : '0fr'};
            transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .content {
            overflow: hidden;
            padding: 0 1.25rem;
            color: var(--text-muted, #64748b);
            font-size: 0.875rem;
            line-height: 1.5;
          }

          .inner-content {
            padding-bottom: 1.25rem;
          }
        </style>
        <div class="item">
          <button class="header" id="trigger">
            <div class="title-group">
              ${icon ? `<i data-lucide="${icon}" style="width: 1.125rem; height: 1.125rem; color: var(--color-brand-primary);"></i>` : ''}
              <span>${title}</span>
            </div>
            <div class="chevron">
              <i data-lucide="chevron-down" style="width: 1.125rem; height: 1.125rem;"></i>
            </div>
          </button>
          <div class="content-wrapper">
            <div class="content">
              <div class="inner-content">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      `;

            if ((window as any).lucide) {
                (window as any).lucide.createIcons({ root: this.shadowRoot });
            }

            this.shadowRoot.getElementById('trigger')?.addEventListener('click', () => this.toggle());
        }
    }
}

customElements.define('zap-accordion', ZapAccordion);
customElements.define('zap-accordion-item', ZapAccordionItem);
