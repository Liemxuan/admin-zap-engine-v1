export class ZapInput extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'type', 'label', 'label-position', 'placeholder', 'disabled', 'readonly', 'value', 'error', 'helper-text', 'required', 'icon-start', 'icon-end', 'fullwidth'];
  }

  private _input: HTMLInputElement | null = null;
  private _showPassword = false;
  private _isSettingAttribute = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get value() {
    return this._input ? this._input.value : (this.getAttribute('value') || '');
  }

  set value(val: string) {
    if (this._input && this._input.value !== val) {
      this._input.value = val;
      this.updateContainerValueClass();
    }
    
    // Guard against infinite loops if setAttribute triggers attributeChangedCallback
    if (this.getAttribute('value') !== val) {
      this._isSettingAttribute = true;
      this.setAttribute('value', val);
      this._isSettingAttribute = false;
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val: string) {
    this.setAttribute('name', val);
  }

  focus() {
    this._input?.focus();
  }

  connectedCallback() {
    if (!this.shadowRoot?.innerHTML) {
      this.render();
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this._isSettingAttribute) return;
    if (oldValue === newValue) return;

    if (name === 'value') {
      if (this._input && this._input.value !== (newValue || '')) {
        this._input.value = newValue || '';
        this.updateContainerValueClass();
      }
    } else if (name === 'error' || name === 'helper-text') {
      this.updateErrorAndHelperText();
    } else if (name === 'disabled' || name === 'readonly' || name === 'placeholder') {
      this.updateInputState();
    } else if (this.shadowRoot?.innerHTML) {
      this.render();
    }
  }

  private updateInputState() {
    if (!this._input) return;
    this._input.disabled = this.hasAttribute('disabled');
    this._input.readOnly = this.hasAttribute('readonly');
    this._input.placeholder = this.getAttribute('placeholder') || '';
    
    const wrapper = this.shadowRoot?.querySelector('.input-wrapper');
    if (wrapper) {
      this.hasAttribute('disabled') ? wrapper.classList.add('disabled') : wrapper.classList.remove('disabled');
    }
  }

  private updateErrorAndHelperText() {
    const container = this.shadowRoot?.querySelector('.container');
    const inputWrapper = this.shadowRoot?.querySelector('.input-wrapper') as HTMLElement;
    const error = this.hasAttribute('error');
    const helperText = this.getAttribute('helper-text');

    if (container) {
      error ? container.classList.add('has-error') : container.classList.remove('has-error');
    }

    if (inputWrapper) {
      inputWrapper.style.borderColor = error ? '#ef4444' : '';
    }

    let helperTextEl = this.shadowRoot?.querySelector('.error-text');
    if (helperText) {
      if (!helperTextEl && container) {
        helperTextEl = document.createElement('div');
        helperTextEl.className = 'error-text';
        container.appendChild(helperTextEl);
      }
      if (helperTextEl) helperTextEl.textContent = helperText;
    } else if (helperTextEl) {
      helperTextEl.remove();
    }
  }

  private updateContainerValueClass() {
    const container = this.shadowRoot?.querySelector('.container');
    if (container) {
      if (this.value) {
        container.classList.add('has-value');
      } else {
        container.classList.remove('has-value');
      }
    }
  }

  private handleInput = (e: Event) => {
    e.stopPropagation(); // Stop native input event from bubbling out to avoid double events in React
    const target = e.target as HTMLInputElement;
    
    // Update internal state
    this.updateContainerValueClass();

    // Dispatch a single custom event
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  };

  private handleChange = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true
    }));
  };

  render() {
    const variant = this.getAttribute('variant') || 'medium';
    const typeAttr = this.getAttribute('type') || 'text';
    const label = this.getAttribute('label') || '';
    const labelPosition = this.getAttribute('label-position') || 'top';
    const placeholder = this.getAttribute('placeholder') || '';
    const value = this.getAttribute('value') || '';
    const disabled = this.hasAttribute('disabled');
    const readonly = this.hasAttribute('readonly');
    const required = this.hasAttribute('required');
    const error = this.hasAttribute('error');
    const helperText = this.getAttribute('helper-text') || '';
    const iconStart = this.getAttribute('icon-start');
    const iconEnd = this.getAttribute('icon-end');
    const fullWidth = this.hasAttribute('fullwidth');
    const hasValue = !!value;

    const isPassword = typeAttr === 'password';
    const currentType = isPassword ? (this._showPassword ? 'text' : 'password') : typeAttr;

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: ${fullWidth ? 'block' : 'inline-block'};
            width: ${fullWidth ? '100%' : 'auto'};
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }

          .container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }

          .label {
            font-size: 0.8125rem;
            font-weight: 500;
            color: #64748b;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
          }

          .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid ${error ? '#ef4444' : 'var(--border-color, #e2e8f0)'};
            border-radius: 0.75rem;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            background: var(--bg-card, #fff);
            padding: 0;
          }

          .input-wrapper:focus-within {
            border-color: ${error ? '#ef4444' : '#2b7fff'};
            box-shadow: 0 0 0 4px ${error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(43, 127, 255, 0.1)'};
          }

          .input-wrapper.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: var(--bg-main, #f8fafc);
          }

          input {
            all: unset;
            width: 100%;
            font-size: 0.875rem;
            box-sizing: border-box;
            background: transparent;
            color: var(--text-main, #1e293b);
            padding: 0 1rem;
          }

          input::placeholder {
            color: var(--text-muted, #94a3b8);
          }

          input:disabled {
            cursor: not-allowed;
          }

          .small { height: 2rem; }
          .medium { height: 2.75rem; }
          .large { height: 3.25rem; }

          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted, #64748b);
            flex-shrink: 0;
          }
          .icon-start { padding-left: 0.75rem; padding-right: 0.25rem; }
          .icon-end { padding-right: 0.75rem; padding-left: 0.25rem; }

          .password-toggle {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-muted, #64748b);
            transition: color 0.2s;
            background: none;
            border: none;
            outline: none;
            padding: 0 0.75rem;
          }
          
          .password-toggle:hover {
            color: #2b7fff;
          }
          
          .error-text {
            font-size: 0.75rem;
            color: #ef4444;
            margin-top: 0.25rem;
          }

          [data-lucide] {
            width: 1.125rem;
            height: 1.125rem;
          }
        </style>
        <div class="container ${labelPosition} ${error ? 'has-error' : ''} ${hasValue ? 'has-value' : ''}">
          ${label && labelPosition === 'top' ? `<label class="label">${label}${required ? ' *' : ''}</label>` : ''}
          <div class="input-wrapper ${variant} ${disabled ? 'disabled' : ''}">
            ${label && labelPosition === 'floating' ? `<label class="label">${label}${required ? ' *' : ''}</label>` : ''}
            ${iconStart ? `<div class="icon icon-start"><i data-lucide="${iconStart}"></i></div>` : ''}
            <input 
              type="${currentType}" 
              placeholder="${labelPosition === 'floating' ? '' : placeholder}" 
              value="${value}"
              ${disabled ? 'disabled' : ''}
              ${readonly ? 'readonly' : ''}
              style="padding-left: ${iconStart ? '0' : ''}; padding-right: ${(iconEnd || isPassword) ? '0' : ''};"
            />
            ${isPassword ? `
              <button class="password-toggle" type="button" aria-label="${this._showPassword ? 'Hide password' : 'Show password'}">
                <i data-lucide="${this._showPassword ? 'eye-off' : 'eye'}"></i>
              </button>
            ` : (iconEnd ? `<div class="icon icon-end"><i data-lucide="${iconEnd}"></i></div>` : '')}
          </div>
          ${helperText ? `<div class="error-text">${helperText}</div>` : ''}
        </div>
      `;

      this._input = this.shadowRoot.querySelector('input');
      this._input?.addEventListener('input', this.handleInput);
      this._input?.addEventListener('change', this.handleChange);

      const toggle = this.shadowRoot.querySelector('.password-toggle');
      toggle?.addEventListener('click', (e) => {
        e.preventDefault();
        this._showPassword = !this._showPassword;
        this.render();
      });

      if ((window as any).lucide) {
        (window as any).lucide.createIcons({
          root: this.shadowRoot
        });
      }
    }
  }
}

customElements.define('zap-input', ZapInput);
