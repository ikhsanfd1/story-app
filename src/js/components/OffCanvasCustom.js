import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class OffCanvasCustom extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div
        class="offcanvas offcanvas-start bg-yellow d-flex pt-3"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header pt-5">
          <h5 class="offcanvas-title text-purple bg-white" id="offcanvasWithBothOptionsLabel">
            ${this.title}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div class="card py-3">
            <img
              src="/img/wow.png"
              class="card-img-top ms-3"
              alt="..."
              style="width:200px; height:200px;"
            />
            <div class="card-body text-start text-purple card-text">
              <h4>Ikhsan Fadhillah</h4>
              <p>
                ${msg(`Sarjana S1 Sistem Informasi di Institut Teknologi Swadharma dan
              Bisnis`)}
              </p>
              <a href="https://github.com/ikhsanfd1" target="_blank" class="text-purple"
                ><i class="bi bi-github fs-3"></i
              ></a>
              <a
                href="https://www.linkedin.com/in/m-ikhsan-fadhillah-44542a262/"
                target="_blank"
                class="text-purple"
                ><i class="bi bi-linkedin fs-3"></i
              ></a>
              <a
                href="https://www.instagram.com/ikhsan_fdd/?hl=en"
                target="_blank"
                class="text-purple"
                ><i class="bi bi-instagram fs-3"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('off-canvas-custom', OffCanvasCustom);
