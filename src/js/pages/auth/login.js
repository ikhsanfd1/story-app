import Auth from '../../network/auth';
import Config from '../../config/config';
import Utils from '../../utils/utils';
import CheckUserAuth from './check-user-auth';

const Login = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');

    const passwordInput = document.querySelector('#validasiPassword');
    const passwordToggle = document.createElement('span');
    passwordToggle.innerHTML = `<i class="bi bi-eye ps-1"></i>`;

    passwordToggle.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    });

    passwordInput.parentNode.insertBefore(passwordToggle, passwordInput);

    loginForm.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();
        e.stopPropagation();

        loginForm.classList.add('was-validated');
        await this._getLogged();
      },
      false,
    );
  },

  async _getLogged() {
    const formData = this._getFormData();

    const validationError = this._validateFormData({ ...formData });

    if (validationError) {
      this._tampilkanPesanError(validationError);
      return;
    }

    this._tampilkanPesanError('');

    try {
      const response = await Auth.login({
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        this._tampilkanPesanError(`login gagal : ${response.message}`);
      } else {
        this._tampilkanPesanSuccess(`Berhasil login, mohon ditunggu`);

        Utils.aturUserToken(Config.USER_TOKEN_KEY, response.data.loginResult.token);
        setTimeout(() => {
          this._goToDashboardPage();
        }, 1000);
      }
    } catch (error) {
      console.error('An error occurred:', error);

      this._tampilkanPesanError('Email dan Password tidak valid, silahkan daftar terlebih dahulu');
    }
  },

  _getFormData() {
    const email = document.querySelector('#validasiEmail');
    const password = document.querySelector('#validasiPassword');

    return {
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData({ ...formData }) {
    let errorMessage = '';

    if (formData.password.length < 8) {
      if (errorMessage) {
        errorMessage += '\n';
      }
      errorMessage += 'Email dan kata sandi tidak valid';
    }

    return errorMessage || null;
  },

  _goToDashboardPage() {
    window.location.href = '/';
  },

  _tampilkanPesanError(errorMessage) {
    const errorElement = document.querySelector('#errorMessage');
    errorElement.textContent = '';
    errorElement.textContent = errorMessage;
    errorElement.style.color = 'red';
    errorElement.style.display = 'block';
  },

  _tampilkanPesanSuccess(successMessage) {
    const successElement = document.querySelector('#successMessage');
    successElement.textContent = '';
    successElement.textContent = successMessage;
    successElement.style.color = 'green';
    successElement.style.display = 'block';
  },
};

export default Login;
