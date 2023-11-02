import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  constructor() {
    super();
    this._checkAvailabilityProperty();
  }

  static get properties() {
    return {
      content: { type: String, reflect: true },
      to: { type: String, reflect: true },
    };
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('to')) {
      throw new Error(`Atribut "to" harus diterapkan pada elemen ${this.localName}`);
    }
  }

  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link text-white" href="${this.to}">${this.content}</a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
