import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import './form/InputWithValidation';
import './form/LihatImageInput';
import './form/ValidasiTextArea';

class ModalCardEdit extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="modal-dialog modal-xl text-purple pt-4">
        <div class="modal-content bg-yellow">
          <form class="row g-2" id="editRecordForm" novalidate>
            <div class="modal-header">
              <h5 class="modal-title" id="editModalLabel">${this.title}</h5>
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
                  <div class="col-12 col-sm-12">
                    <label for="validasiNama" class="form-label"></label>
                    <input-with-validation
                      id="inputNamaEdit"
                      type="text"
                      inputId="validasiNama"
                      invalidFeedbackMessage="Nama tidak boleh kosong"
                      validFeedbackMessage="Mantab"
                      required
                    ></input-with-validation>
                  </div>

                  <div class="col-12 col-sm-12">
                    <label for="validasiPhotoUrl" class="form-label"></label>
                    <lihat-image-input
                      id="inputImageEdit"
                      inputId="validasiPhotoUrl"
                      invalidFeedbackMessage="Gambar tidak boleh kosong"
                      validFeedbackMessage="Gambar cocok"
                    ></lihat-image-input>
                  </div>

                  <div class="col-12 col-sm-12">
                    <label for="validasiDeskripsi" class="form-label"></label>
                    <validasi-text-area
                      inputId="validasiDeskripsi"
                      invalidFeedbackMessage="Deskripsi tidak boleh kosong"
                      validFeedbackMessage="Oke"
                      required
                    ></validasi-text-area>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-modal" data-bs-dismiss="modal">
                ${msg(`Batal`)}
              </button>
              <button type="button" class="btn btn-primary" id="simpanPerubahan">
                ${msg(`Simpan Perubahan`)}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-card-edit', ModalCardEdit);
