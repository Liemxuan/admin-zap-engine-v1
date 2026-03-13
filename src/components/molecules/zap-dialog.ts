export class ZapDialog extends HTMLElement {
  static get observedAttributes() {
    return ['open', 'title', 'description', 'width'];
  }

  private dialog: HTMLDialogElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'open') {
      if (newValue !== null) {
        this.dialog?.showModal();
      } else {
        this.dialog?.close();
      }
    } else {
      this.render();
    }
  }

  public show() {
    this.setAttribute('open', '');
  }

  public close() {
    this.removeAttribute('open');
  }

  render() {
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const width = this.getAttribute('width') || '32rem';

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          dialog {
            border: none;
            padding: 0;
            background: var(--bg-card, #18181b);
            color: var(--text-main, #fafafa);
            border-radius: 1.5rem;
            max-width: calc(100vw - 2rem);
            width: ${width};
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            font-family: 'Inter', sans-serif;
            border: 1px solid var(--border-color, #27272a);
          }

          dialog::backdrop {
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(8px);
          }

          .dialog-container {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .header {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }

          .header h2 {
            margin: 0;
            font-size: 1.25rem;
            font-weight: 700;
          }

          .header p {
            margin: 0;
            font-size: 0.875rem;
            color: var(--text-muted, #a1a1aa);
          }

          .footer {
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-color, #27272a);
          }

          .close-icon {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s;
          }

          .close-icon:hover {
            opacity: 1;
          }
        </style>
        <dialog id="zap-dialog">
          <div class="close-icon" id="header-close">
            <i data-lucide="x" style="width: 1.25rem; height: 1.25rem;"></i>
          </div>
          <div class="dialog-container">
            <div class="header">
              ${title ? `<h2>${title}</h2>` : '<slot name="title"></slot>'}
              ${description ? `<p>${description}</p>` : '<slot name="description"></slot>'}
            </div>
            <div class="body">
              <slot></slot>
            </div>
            <div class="footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </dialog>
      `;

      this.dialog = this.shadowRoot.getElementById('zap-dialog') as HTMLDialogElement;

      this.dialog.addEventListener('close', () => {
        this.removeAttribute('open');
        this.dispatchEvent(new CustomEvent('close'));
      });

      this.shadowRoot.getElementById('header-close')?.addEventListener('click', () => {
        this.close();
      });

      if (window.lucide) {
        window.lucide.createIcons({ root: this.shadowRoot as any });
      }

      // Check initial state
      if (this.hasAttribute('open')) {
        this.dialog.showModal();
      }
    }
  }
}

customElements.define('zap-dialog', ZapDialog);
