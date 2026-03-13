export class ZapRadio extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'name', 'value', 'label', 'error', 'helper-text'];
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
      this.updateGroup();
    } else {
      this.removeAttribute('checked');
    }
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val: string) {
    this.setAttribute('name', val);
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
    if (target.checked) {
      this.checked = true;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: true, value: this.value, name: this.name },
        bubbles: true,
        composed: true
      }));
    }
  };

  private updateGroup() {
    const name = this.name;
    if (!name) return;

    // Find other radios with the same name in the same root (document or shadow root)
    const root = this.getRootNode() as Document | ShadowRoot;
    const radios = root.querySelectorAll(`zap-radio[name="${name}"]`);

    radios.forEach(radio => {
      if (radio !== this && (radio as ZapRadio).checked) {
        (radio as ZapRadio).checked = false;
      }
    });
  }

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const name = this.getAttribute('name') || '';
    const error = this.hasAttribute('error');
    const helperText = this.getAttribute('helper-text') || '';

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
            align-items: flex-start;
            gap: 0.75rem;
            position: relative;
          }

          .radio-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.25rem;
            height: 1.25rem;
            margin-top: 0.125rem;
          }

          input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .outer-circle {
            position: absolute;
            top: 0;
            left: 0;
            height: 1.25rem;
            width: 1.25rem;
            background-color: var(--bg-main, #09090b);
            border: 1px solid ${error ? '#ef4444' : 'var(--border-color, #27272a)'};
            border-radius: 50%;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .container:hover input ~ .outer-circle {
            border-color: ${error ? '#ef4444' : 'var(--color-brand-primary, #2b7fff)'};
            background-color: var(--bg-card, #18181b);
          }

          input:checked ~ .outer-circle {
            border-color: var(--color-brand-primary, #2b7fff);
          }

          .inner-circle {
            position: absolute;
            width: 0.625rem;
            height: 0.625rem;
            background-color: var(--color-brand-primary, #2b7fff);
            border-radius: 50%;
            transform: scale(0);
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }

          input:checked ~ .inner-circle {
            transform: scale(1);
          }

          .container.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .container.disabled .outer-circle {
            background-color: var(--bg-card, #18181b);
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
            color: ${error ? '#ef4444' : 'var(--text-muted, #a1a1aa)'};
            margin-top: 0.125rem;
          }

          input:focus-visible ~ .outer-circle {
            box-shadow: 0 0 0 2px var(--bg-main, #09090b), 0 0 0 4px var(--color-brand-primary, #2b7fff);
          }
        </style>
        <label class="container ${disabled ? 'disabled' : ''}">
          <div class="radio-wrapper">
            <input 
              type="radio" 
              name="${name}"
              ${checked ? 'checked' : ''} 
              ${disabled ? 'disabled' : ''}
            />
            <span class="outer-circle"></span>
            <span class="inner-circle"></span>
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

customElements.define('zap-radio', ZapRadio);
