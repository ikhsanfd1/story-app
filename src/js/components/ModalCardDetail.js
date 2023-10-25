import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ModalCardDetail extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="modal-dialog modal-lg text-purple py-5">
        <div class="modal-content bg-yellow">
          <div class="modal-header">
            <h5 class="modal-title" id="lihatLengkapModalLabel">${this.title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-4">
                  <img src="" id="imgDetailRecord" class="img-fluid" alt="" />
                </div>

                <div class="col-md-8">
                  <ul class="list-group list-unstyled">
                    <li class="list-group-item">
                      <h5 class="my-1 detail-color" id="nameDetailRecord"></h5>
                    </li>
                    <li class="list-group-item detail-color" id="dateDetailRecord"></li>
                    <li class="list-group-item detail-color" id="descDetailRecord"></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-modal" data-bs-dismiss="modal">
              ${msg(`Tutup`)}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-card-detail', ModalCardDetail);
