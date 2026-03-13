export class ZapLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Welcome Back';
        const description = this.getAttribute('description') || 'Please enter your details to sign in.';

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          :host {
            display: block;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            max-width: 400px;
            width: 100%;
            margin: 0 auto;
          }

          .login-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .header {
            text-align: center;
            margin-bottom: 0.5rem;
          }

          .header h2 {
            margin: 0;
            font-size: 1.875rem;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.025em;
          }

          .header p {
            margin: 0.5rem 0 0;
            font-size: 0.875rem;
            color: #a1a1aa;
          }

          .form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .options {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.875rem;
          }

          .forgot-password {
            color: #a855f7;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
          }

          .forgot-password:hover {
            color: #c084fc;
          }

          .footer {
            text-align: center;
            font-size: 0.875rem;
            color: #71717a;
            margin-top: 0.5rem;
          }

          .footer a {
            color: #ffffff;
            text-decoration: none;
            font-weight: 500;
          }

          .footer a:hover {
            text-decoration: underline;
          }
        </style>

        <zap-card variant="glass" padding="2rem" shadow="xl">
          <div class="login-container">
            <div class="header">
              <h2>${title}</h2>
              <p>${description}</p>
            </div>

            <form class="form" id="login-form">
              <zap-input 
                label="Email address" 
                type="email" 
                placeholder="name@company.com" 
                required 
                fullwidth
                id="email-input"
              ></zap-input>

              <zap-input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                required 
                fullwidth
                id="password-input"
              ></zap-input>

              <div class="options">
                <zap-checkbox label="Remember me"></zap-checkbox>
                <a href="#" class="forgot-password">Forgot password?</a>
              </div>

              <zap-button label="Sign In" variant="primary" fullwidth type="submit"></zap-button>
            </form>

            <div class="footer">
              Don't have an account? <a href="#">Create account</a>
            </div>
          </div>
        </zap-card>
      `;

            this.shadowRoot.getElementById('login-form')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = (this.shadowRoot?.getElementById('email-input') as any)?.value;
                const password = (this.shadowRoot?.getElementById('password-input') as any)?.value;

                this.dispatchEvent(new CustomEvent('login-submit', {
                    detail: { email, password },
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
}

customElements.define('zap-login', ZapLogin);
