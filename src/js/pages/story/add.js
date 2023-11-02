import CheckUserAuth from '../auth/check-user-auth';
import Stories from '../../network/stories';

const Add = {
  async init() {
    CheckUserAuth.checkLoginState();
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

  async _sendPost() {
    const formData = this._getFormData();

    if (this._validateFormData({ ...formData })) {
      console.log('formData');
      console.log(formData);

      try {
        const response = await Stories.listStories(formData);
        window.alert('New stories add successfully');
        const successAlert = document.querySelector('#successAlert');
        successAlert.classList.remove('d-none');
        this._menujuHalamanDashboard();
      } catch (error) {
        console.error(error);
      }
    }
  },

  _getFormData() {
    const photoUrlInput = document.querySelector('#validasiPhotoUrl');
    const deskripsiInput = document.querySelector('#validasiDeskripsi');

    return {
      photo: photoUrlInput.files[0],
      description: deskripsiInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataFiltered = Object.values(formData).filter((item) => item === '');

    return formDataFiltered.length === 0;
  },

  _menujuHalamanDashboard() {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  },
};

export default Add;
