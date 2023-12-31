import { html, nothing } from 'lit';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class LihatImageInput extends LitWithoutShadowDom {
  constructor() {
    super();

    this.type = 'text';
    this.defaultImage = '';
    this.defaultImageAlt = '';
  }
  static get properties() {
    return {
      inputId: { type: String, reflect: true },
      defaultImage: { type: String, reflect: true },
      defaultImageAlt: { type: String, reflect: true },

      validFeedbackMessage: { type: String, reflect: true },
      invalidFeedbackMessage: { type: String, reflect: true },

      required: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`
      <div style="width: 100%; height: 20rem" class="mb-3 ${!this.defaultImage ? 'd-none' : ''}">
        ${this._imagePreviewTemplate()}
      </div>
      <input
        type="file"
        class="form-control"
        id=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />

      ${this._feedbackTemplate()}
    `;
  }

  _updatePhotoPreview() {
    const photoUrlImgChange = document.querySelector('#validasiPhotoUrlImgChange');
    const photoUrlInput = document.querySelector('#validasiPhotoUrl');

    let validasiPhotoUrlImg = null;
    if (this.defaultImage) {
      validasiPhotoUrlImg = document.querySelector('#validasiPhotoUrlImg');
    }

    const photo = photoUrlInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (this.defaultImage) {
        validasiPhotoUrlImg.classList.add('d-none');
      }
      photoUrlImgChange.parentElement.classList.remove('d-none');
      photoUrlImgChange.classList.remove('d-none');
      photoUrlImgChange.style.backgroundImage = `url('${event.target.result}')`;
    };

    reader.readAsDataURL(photo);
  }

  _feedbackTemplate() {
    let validFeedbackTemplate = '';
    let invalidFeedbackTemplate = '';
    if (this.validFeedbackMessage) {
      validFeedbackTemplate = html`
        <div class="valid-feedback">${this.validFeedbackMessage}</div>
      `;
    }
    if (this.invalidFeedbackMessage) {
      invalidFeedbackTemplate = html`
        <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
      `;
    }

    return html`${validFeedbackTemplate}${invalidFeedbackTemplate}`;
  }

  _imagePreviewTemplate() {
    const imgChangeTemplate = html`
      <div
        class="w-100 h-100 ${this.defaultImage ? 'd-none' : ''}"
        style="
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          width: 100%;
          height: 200px;
        "
        id="${this.inputId || nothing}ImgChange"
      ></div>
    `;
    if (this.defaultImage) {
      return html`
        <img
          class="img-fluid h-100"
          src="${this.defaultImage}"
          alt="${this.defaultImageAlt}"
          id="${this.inputId || nothing}Img"
          style="width: 100%; height: 200px;"
        />
        ${imgChangeTemplate}
      `;
    }

    return html` ${imgChangeTemplate} `;
  }
}

customElements.define('lihat-image-input', LihatImageInput);
