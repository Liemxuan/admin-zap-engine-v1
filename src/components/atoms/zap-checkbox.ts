export class ZapCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'disabled', 'required', 'label', 'error', 'helper-text', 'value'];
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

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val: string) {
    this.setAttribute('name', val);
  }

  get value() {
    return this.getAttribute('value') || 'on';
  }

  set value(val: string) {
    this.setAttribute('value', val);
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
      detail: { checked: target.checked, value: this.value },
      bubbles: true,
      composed: true
    }));
  };

  render() {
    const label = this.getAttribute('label') || '';
    const checked = this.hasAttribute('checked');
    const disabled = this.hasAttribute('disabled');
    const required = this.hasAttribute('required');
    const error = this.hasAttribute('error');
    const helperText = this.getAttribute('helper-text') || '';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
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

          .checkbox-wrapper {
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

          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 1.25rem;
            width: 1.25rem;
            border: 1px solid ${error ? '#ef4444' : 'var(--border-color, #e2e8f0)'};
            border-radius: 0.375rem;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: var(--bg-card, #fff);
          }

          .container:hover input ~ .checkmark {
            border-color: ${error ? '#ef4444' : 'var(--color-brand-primary, #2b7fff)'};
          }

          input:checked ~ .checkmark {
            background-color: var(--color-brand-primary, #2b7fff);
            border-color: var(--color-brand-primary, #2b7fff);
          }

          input:checked ~ .checkmark:after {
            display: block;
          }

          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            left: 7px;
            top: 3px;
            width: 4px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }

          .container.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .content {
            display: flex;
            flex-direction: column;
          }

          .label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--text-main, #1e293b);
            line-height: 1.5;
          }

          .helper-text {
            font-size: 0.75rem;
            color: ${error ? '#ef4444' : 'var(--text-muted, #64748b)'};
            margin-top: 0.125rem;
          }

          input:focus-visible ~ .checkmark {
            box-shadow: 0 0 0 2px var(--bg-main, #ffffff), 0 0 0 4px var(--color-brand-primary, #2b7fff);
          }
        </style>
        <label class="container ${disabled ? 'disabled' : ''}">
          <div class="checkbox-wrapper">
            <input 
              type="checkbox" 
              ${checked ? 'checked' : ''} 
              ${disabled ? 'disabled' : ''}
              ${required ? 'required' : ''}
            />
            <span class="checkmark"></span>
          </div>
          <div class="content">
            ${label ? `<span class="label">${label}${required ? ' *' : ''}</span>` : ''}
            ${helperText ? `<span class="helper-text">${helperText}</span>` : ''}
          </div>
        </label>
      `;

      this._input = this.shadowRoot.querySelector('input');
      this._input?.addEventListener('change', this.handleChange);
    }
  }
}

customElements.define('zap-checkbox', ZapCheckbox);
