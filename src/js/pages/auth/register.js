import Auth from '../../network/auth';

import CheckUserAuth from './check-user-auth';

const Register = {
  async init() {
    CheckUserAuth.checkLoginState();

    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');

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

    registerForm.addEventListener(
      'submit',
      async (e) => {
        e.preventDefault();
        e.stopPropagation();

        registerForm.classList.add('was-validated');
        await this._getRegistered();
      },
      false,
    );
  },

  async _getRegistered() {
    const formData = this._getFormData();

    const validationError = this._validateFormData({ ...formData });

    if (validationError) {
      this._tampilkanPesanError(validationError);
      return;
    }

    this._tampilkanPesanError('');

    try {
      const response = await Auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (response.error) {
        this._tampilkanPesanError(`Registrasi gagal : ${response.message}`);
      } else {
        this._tampilkanPesanSuccess(`Berhasil daftar, silahkan login kembali`);

        setTimeout(() => {
          this._goToLoginPage();
        }, 1000);
      }
    } catch (error) {
      console.error('An error occurred:', error);

      this._tampilkanPesanError(
        'Kemungkinan: Email tidak valid / Email sudah terdaftar, gunakan email lain / Silakan coba lagi nanti.',
      );
    }
  },

  _getFormData() {
    const name = document.querySelector('#validasiNama');
    const email = document.querySelector('#validasiEmail');
    const password = document.querySelector('#validasiPassword');

    return {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  },

  _validateFormData({ ...formData }) {
    let errorMessage = '';

    if (/[~!@#$%^&*-_=+{};:'"<>,.?/|`()0123456789]/.test(formData.name)) {
      errorMessage = 'Nama tidak boleh mengandung karakter khusus dan angka .';
    }

    if (formData.name.length < 3) {
      if (errorMessage) {
        errorMessage += '\n';
      }
      errorMessage += 'Nama harus memiliki setidaknya 3 karakter.';
    }

    if (formData.password.length < 8) {
      if (errorMessage) {
        errorMessage += '\n';
      }
      errorMessage += 'Kata sandi harus memiliki setidaknya 8 karakter .';
    }

    return errorMessage || null;
  },

  _goToLoginPage() {
    window.location.href = '/auth/login.html';
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

export default Register;
