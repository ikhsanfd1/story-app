import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class CardPlaceholder extends LitWithoutShadowDom {
  constructor() {
    super();
  }

  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  render() {
    return html`
      <div class="row">
        <div class="col-md-4" aria-hidden="true">
          <div class="card mb-3 bg-red text-white placeholder-glow">
            <img
              src="/img/blank.png"
              class="card-img-top placeholder"
              alt=""
              id="imgCard"
              style="width: 100%; height: 200px;"
            />
            <div class="card-body col-md-12">
              <h5 class="card-title placeholder-glow" id="titleCard">
                <span class="placeholder col-6"></span>
              </h5>
              <h6 class="card-subtitle mb-2 text-body-secondary placeholder-glow" id="dateCard">
                <span class="placeholder col-11"></span>
              </h6>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#lihatLengkapModal"
                data-record-id=""
                id="idLihatLengkap"
              >
                <span class="placeholder col-md-3" style="height: 24px;"></span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                data-record-id=""
                ><span class="placeholder col-md-3">Edit Story</span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                data-record-id=""
                ><span class="placeholder col-md-4" style="height: 24px;">Hapus Story</span></a
              >
            </div>
          </div>
        </div>

        <div class="col-md-4" aria-hidden="true">
          <div class="card mb-3 bg-red text-white placeholder-glow">
            <img
              src="/img/blank.png"
              class="card-img-top placeholder"
              alt=""
              id="imgCard"
              style="width: 100%; height: 200px;"
            />
            <div class="card-body col-md-12">
              <h5 class="card-title placeholder-glow" id="titleCard">
                <span class="placeholder col-6"></span>
              </h5>
              <h6 class="card-subtitle mb-2 text-body-secondary placeholder-glow" id="dateCard">
                <span class="placeholder col-11"></span>
              </h6>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#lihatLengkapModal"
                data-record-id=""
                id="idLihatLengkap"
              >
                <span class="placeholder col-md-3" style="height: 24px;"></span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                data-record-id=""
                ><span class="placeholder col-md-3">Edit Story</span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                data-record-id=""
                ><span class="placeholder col-md-4" style="height: 24px;">Hapus Story</span></a
              >
            </div>
          </div>
        </div>

        <div class="col-md-4" aria-hidden="true">
          <div class="card mb-3 bg-red text-white placeholder-glow">
            <img
              src="/img/blank.png"
              class="card-img-top placeholder"
              alt=""
              id="imgCard"
              style="width: 100%; height: 200px;"
            />
            <div class="card-body col-md-12">
              <h5 class="card-title placeholder-glow" id="titleCard">
                <span class="placeholder col-6"></span>
              </h5>
              <h6 class="card-subtitle mb-2 text-body-secondary placeholder-glow" id="dateCard">
                <span class="placeholder col-11"></span>
              </h6>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#lihatLengkapModal"
                data-record-id=""
                id="idLihatLengkap"
              >
                <span class="placeholder col-md-3" style="height: 24px;"></span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
                data-record-id=""
                ><span class="placeholder col-md-3">Edit Story</span>
              </a>
              <a
                href="#"
                class="card-link placeholder-glow"
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                data-record-id=""
                ><span class="placeholder col-md-4" style="height: 24px;">Hapus Story</span></a
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('card-placeholder', CardPlaceholder);
