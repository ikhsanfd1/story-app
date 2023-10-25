import '../../components/form/InputWithValidation';

const Login = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const loginRecordForm = document.querySelector('#loginRecordForm');

    const comingSoon = document.querySelector('coming-soon');
    comingSoon.style.display = 'none';

    loginRecordForm.addEventListener(
      'submit',
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        loginRecordForm.classList.remove('was-validated');
        const formData = this._getFormData();
        const isValid = this._validateFormData({ ...formData });

        if (isValid) {
          const cardLogin = document.querySelector('.card');
          cardLogin.style.display = 'none';
          comingSoon.style.display = 'block';
        } else {
          loginRecordForm.classList.add('was-validated');
          this._displayComingSoonMessage();
        }
      },
      false,
    );
  },

  _getFormData() {
    const usernameInput = document.querySelector('#validasiUsername');
    const passwordInput = document.querySelector('#validasiPassword');

    return {
      username: usernameInput.value,
      password: passwordInput.value,
    };
  },

  _validateFormData(formData) {
    const formDataValues = Object.values(formData);
    const isAnyValueEmpty = formDataValues.some((value) => value === '');

    return !isAnyValueEmpty;
  },

  _displayComingSoonMessage() {
    const comingSoon = document.querySelector('coming-soon');
    comingSoon.style.display = 'block';
  },
};

export default Login;
