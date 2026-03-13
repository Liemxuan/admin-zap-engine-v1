export class ZapTabs extends HTMLElement {
    static get observedAttributes() {
        return ['active-tab', 'variant']; // variant: 'default', 'pills'
    }

    private _activeTab: string = '';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this._activeTab = this.getAttribute('active-tab') || '';
        this.render();
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'active-tab') {
                this._activeTab = newValue;
            }
            this.render();
        }
    }

    private handleTabClick(tabId: string) {
        this.setAttribute('active-tab', tabId);
        this.dispatchEvent(new CustomEvent('tab-change', {
            detail: { tabId },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const variant = this.getAttribute('variant') || 'default';
        const tabs = Array.from(this.querySelectorAll('zap-tab-item')).map(item => ({
            id: item.getAttribute('tab-id') || '',
            label: item.getAttribute('label') || '',
            icon: item.getAttribute('icon') || ''
        }));

        if (!this._activeTab && tabs.length > 0) {
            this._activeTab = tabs[0].id;
        }

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          :host {
            display: block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .tabs-header {
            display: flex;
            gap: 1.5rem;
            border-bottom: 1px solid var(--border-color, #e2e8f0);
            padding-bottom: 0px;
            margin-bottom: 1.5rem;
            position: relative;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .tabs-header::-webkit-scrollbar {
            display: none;
          }

          .tab-btn {
            background: none;
            border: none;
            padding: 0.75rem 0.25rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text-muted, #64748b);
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
          }

          .tab-btn:hover {
            color: var(--text-main, #0f172a);
          }

          .tab-btn.active {
            color: var(--color-brand-primary, #2b7fff);
          }

          .ink-bar {
            position: absolute;
            bottom: -1px;
            height: 2px;
            background: var(--color-brand-primary, #2b7fff);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 2px 2px 0 0;
            box-shadow: 0 -2px 10px var(--color-brand-primary-alpha, rgba(43, 127, 255, 0.2));
          }

          /* Pills Variant */
          .variant-pills {
            border-bottom: none;
            gap: 0.5rem;
            background: var(--border-color, #f1f5f9);
            padding: 0.25rem;
            border-radius: 0.75rem;
            display: inline-flex;
          }

          .variant-pills .tab-btn {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
          }

          .variant-pills .tab-btn.active {
            background: var(--bg-card, #ffffff);
            color: var(--color-brand-primary, #2b7fff);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          .variant-pills .ink-bar {
            display: none;
          }

          .content-area {
            position: relative;
          }

          ::slotted(zap-tab-item) {
            display: none;
          }

          ::slotted(zap-tab-item[active]) {
            display: block;
            animation: fadeIn 0.3s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
        <div class="tabs-header variant-${variant}">
          ${tabs.map(tab => `
            <button 
              class="tab-btn ${tab.id === this._activeTab ? 'active' : ''}" 
              data-id="${tab.id}"
            >
              ${tab.icon ? `<i data-lucide="${tab.icon}" style="width: 1rem; height: 1rem;"></i>` : ''}
              ${tab.label}
            </button>
          `).join('')}
          <div class="ink-bar" id="ink-bar"></div>
        </div>
        <div class="content-area">
          <slot></slot>
        </div>
      `;

            // Update slotted children visibility
            Array.from(this.querySelectorAll('zap-tab-item')).forEach(item => {
                if (item.getAttribute('tab-id') === this._activeTab) {
                    item.setAttribute('active', '');
                } else {
                    item.removeAttribute('active');
                }
            });

            // Position Ink Bar
            if (variant === 'default') {
                const activeBtn = this.shadowRoot.querySelector('.tab-btn.active') as HTMLElement;
                const bar = this.shadowRoot.getElementById('ink-bar');
                if (activeBtn && bar) {
                    bar.style.width = `${activeBtn.offsetWidth}px`;
                    bar.style.left = `${activeBtn.offsetLeft}px`;
                }
            }

            // Lucide Icons
            if ((window as any).lucide) {
                (window as any).lucide.createIcons({ root: this.shadowRoot });
            }

            // Event Listeners
            this.shadowRoot.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.handleTabClick(btn.getAttribute('data-id') || '');
                });
            });
        }
    }
}

export class ZapTabItem extends HTMLElement {
    static get observedAttributes() {
        return ['tab-id', 'label', 'icon', 'active'];
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
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          :host(:not([active])) { display: none; }
        </style>
        <slot></slot>
      `;
        }
    }
}

customElements.define('zap-tabs', ZapTabs);
customElements.define('zap-tab-item', ZapTabItem);
