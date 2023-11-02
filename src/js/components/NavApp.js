import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavApp extends LitWithoutShadowDom {
  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  static get properties() {
    return {
      brandName: { type: String, reflect: true },
    };
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('brandName')) {
      throw new Error(`Atribut "brandName" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
        <nav class="navbar navbar-expand-md">
            <div class="container">
                <span class="navbar-brand fw-bold text-white">${this.brandName}</span>
                <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
            >
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <nav-links class="ms-auto mb-2 mb-md-0 mx-5">
                </div>
            </div>
      </nav>
        `;
  }
}

customElements.define('nav-app', NavApp);
