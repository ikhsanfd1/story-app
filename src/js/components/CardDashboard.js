import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CardDashboard extends LitWithoutShadowDom {
  constructor() {
    super();

    this.content = '';
    this.description = '';
    this.classes = '';
  }

  static get properties() {
    return {
      content: {
        type: String,
        reflect: true,
      },
      description: {
        type: String,
        reflect: true,
      },
      classes: {
        type: String,
        reflect: true,
      },
    };
  }

  render() {
    return html`
      <div class="card ${this.classes}">
        <div class="card-body">
          <h1 class="card-title fs-2">
            ${this.content}<br />
            <span class="fs-5">${this.description}</span>
          </h1>
          <p class="card-text"></p>
        </div>
      </div>
    `;
  }
}

customElements.define('card-dashboard', CardDashboard);
