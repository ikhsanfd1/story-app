import { read } from '@popperjs/core';
import { data } from 'autoprefixer';

const Add = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const addFormRecord = document.querySelector('#addRecordForm');
    addFormRecord.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        event.stopPropagation();

        addFormRecord.classList.add('was-validated');
        this._sendPost();
      },
      false,
    );
  },

  _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      this._bacaGambarDataBase64(formData.photoUrl, (base64Data) => {
        formData.photoUrl = base64Data;
        if (this._apaPenyimpananAda()) {
          this._simpanData(formData);
        }
      });

      this._menujuHalamanDashboard();
    }
  },

  _bacaGambarDataBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  },

  _getFormData() {
    const photoUrlInput = document.querySelector('#validasiPhotoUrl');
    const deskripsiInput = document.querySelector('#validasiDeskripsi');

    return {
      id: this._unikId(),
      name: this._unikGuest(),
      photoUrl: photoUrlInput.files[0],
      description: deskripsiInput.value,
      createdAt: this._getCurrentDateTime(),
    };
  },

  _unikId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'story-';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars.charAt(randomIndex);
    }
    return id;
  },

  _unikGuest() {
    const angka = '123456789';
    let guest = 'guest-';
    for (let i = 0; i < 4; i++) {
      const randomGuest = Math.floor(Math.random() * angka.length);
      guest += angka.charAt(randomGuest);
    }
    return guest;
  },

  _getCurrentDateTime() {
    return new Date().toISOString();
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _apaPenyimpananAda() {
    if (typeof Storage === undefined) {
      alert('Browser Anda tidak support Local Storage');
      return false;
    }
    return true;
  },

  _simpanData(data) {
    const dataSimpanString = localStorage.getItem('dataSimpanStory');
    let dataSimpanStory = dataSimpanString ? JSON.parse(dataSimpanString) : [];

    if (!Array.isArray(dataSimpanStory)) {
      dataSimpanStory = [];
    }

    dataSimpanStory.push(data);

    localStorage.setItem('dataSimpanStory', JSON.stringify(dataSimpanStory));

    const photoUrlImgChange = document.querySelector('#validasiPhotoUrlImgChange');
    photoUrlImgChange.src = data.photoUrl;

    const successAlert = document.querySelector('#successAlert');
    successAlert.classList.remove('d-none');
  },

  _menujuHalamanDashboard() {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  },
};

export default Add;
