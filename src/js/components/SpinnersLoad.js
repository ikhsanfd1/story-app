import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class SpinnersLoad extends LitWithoutShadowDom {
  constructor() {
    super();
    this.title = '';
  }

  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  render() {
    return html`
      <div class="d-flex justify-content-center">
        <button class="btn btn-purple fs-4 text-white" type="button" disabled>
          ${this.title}
          <span class="spinner-grow spinner-grow-lg" role="status" aria-hidden="true"></span>
        </button>
      </div>
    `;
  }
}

customElements.define('spinners-load', SpinnersLoad);
