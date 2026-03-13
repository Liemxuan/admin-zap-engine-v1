export class ZapSwitch extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'label', 'helper-text', 'size'];
  }

  private _input: HTMLInputElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get checked() {
    return this._input?.checked || this.hasAttribute('checked');
  }

  set checked(val: boolean) {
    if (this._input) {
      this._input.checked = val;
    }
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: target.checked },
      bubbles: true,
      composed: true
    }));
  };

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const helperText = this.getAttribute('helper-text') || '';
    const size = this.getAttribute('size') || 'medium';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: inline-block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            cursor: pointer;
            user-select: none;
          }

          .container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            position: relative;
          }

          .switch-wrapper {
            position: relative;
            display: inline-block;
            width: ${size === 'small' ? '2rem' : '2.5rem'};
            height: ${size === 'small' ? '1.125rem' : '1.375rem'};
          }

          input {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--border-color, #27272a);
            transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 999px;
            border: 1px solid transparent;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: ${size === 'small' ? '0.75rem' : '1rem'};
            width: ${size === 'small' ? '0.75rem' : '1rem'};
            left: ${size === 'small' ? '0.125rem' : '0.125rem'};
            bottom: ${size === 'small' ? '0.125rem' : '0.125rem'};
            background-color: var(--bg-card, #fafafa);
            transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
            box-shadow: 0 1px 2px rgba(0,0,0,0.2);
          }

          input:checked + .slider {
            background-color: var(--color-brand-primary, #2b7fff);
          }

          input:focus-visible + .slider {
            box-shadow: 0 0 0 2px var(--bg-main, #09090b), 0 0 0 4px var(--color-brand-primary, #2b7fff);
          }

          input:checked + .slider:before {
            transform: translateX(${size === 'small' ? '0.875rem' : '1.125rem'});
          }

          .container.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .container.disabled .slider {
            cursor: not-allowed;
          }

          .content {
            display: flex;
            flex-direction: column;
          }

          .label {
            font-size: 0.875rem;
            font-weight: 500;
            color: inherit;
            line-height: 1.5;
          }

          .helper-text {
            font-size: 0.75rem;
            color: var(--text-muted, #a1a1aa);
            margin-top: 0.125rem;
          }
        </style>
        <label class="container ${disabled ? 'disabled' : ''}">
          <div class="switch-wrapper">
            <input 
              type="checkbox" 
              ${checked ? 'checked' : ''} 
              ${disabled ? 'disabled' : ''}
            />
            <span class="slider"></span>
          </div>
          <div class="content">
            ${label ? `<span class="label">${label}</span>` : ''}
            ${helperText ? `<span class="helper-text">${helperText}</span>` : ''}
          </div>
        </label>
      `;

      this._input = this.shadowRoot.querySelector('input');
      this._input?.addEventListener('change', this.handleChange);
    }
  }
}

customElements.define('zap-switch', ZapSwitch);
