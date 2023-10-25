import { html } from 'lit';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ModalCardDelete extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
    recordId: { type: String },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.recordId = '';
  }

  render() {
    return html`
      <div class="modal-dialog modal-lg text-purple py-5">
        <div class="modal-content bg-yellow">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">${this.title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>${msg(`Anda yakin ingin menghapus cerita ini`)} ${this.recordId}?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-modal" data-bs-dismiss="modal">
              ${msg(`Batal`)}
            </button>
            <button type="button" class="btn btn-primary hapus-story" id="hapusStory">
              ${msg(`Hapus`)}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('modal-card-delete', ModalCardDelete);
