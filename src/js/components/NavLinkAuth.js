import { html, nothing } from 'lit';
import { allLocales } from '../../generated/locale-codes';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { getLocale, localeNames, setLocaleFromUrl } from '../localization.js';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import Utils from '../utils/utils';
import Config from '../config/config';
import CheckUserAuth from '../pages/auth/check-user-auth';

class NavLinkAuth extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.isLoggedIn = false;
    this.checkUserAuth = CheckUserAuth;
  }

  static get properties() {
    return {
      isLoggedIn: { type: Boolean },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkLoginState();
  }

  async checkLoginState() {
    const userToken = Utils.ambilUserToken(Config.USER_TOKEN_KEY);
    this.isLoggedIn = Boolean(userToken);
  }

  render() {
    return html`
      <li class="nav-item">
        <div class="dropdown">
          <a
            class="nav-link dropdown-toggle text-nowrap"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
          >
            <div class="me-2 d-inline-block text-white">
              <img
                id="imgUserLogged"
                style="width: 30px;height: 30px"
                class="img-fluid rounded-pill"
                src="https://ui-avatars.com/api/?name=User%20Name&background=random"
                alt="User Name"
              />
            </div>
            <span id="nameUserLogged"></span>
          </a>
          <ul class="dropdown-menu">
            ${allLocales.map((locale) => {
              return html`
                <li>
                  <a
                    class="dropdown-item text-white"
                    @click=${() => this._localeChanged(locale)}
                    ?id=${locale}
                  >
                    ${localeNames[locale]}
                  </a>
                </li>
              `;
            })}
            ${this.isLoggedIn
              ? html`
                  <hr style="border-width: 2px; color: red;" />
                  <li class="bg-red">
                    <a class="dropdown-item text-purple" id="userLogOut" @click=${this._userLogOut}>
                      ${msg(`Keluar`)}
                    </a>
                  </li>
                `
              : nothing}
          </ul>
        </div>
      </li>
    `;
  }

  _localeChanged(newLocale) {
    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);

      window.history.pushState(null, '', url.toString());
      setLocaleFromUrl();
    }
  }

  _userLogOut(e) {
    e.preventDefault();
    Utils.destroyUserToken(Config.USER_TOKEN_KEY);

    this.checkUserAuth.checkLoginState();
  }
}

customElements.define('nav-link-auth', NavLinkAuth);
