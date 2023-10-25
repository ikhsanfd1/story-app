import { html, nothing } from 'lit';
import { allLocales } from '../../generated/locale-codes';
import { updateWhenLocaleChanges } from '@lit/localize';
import { getLocale, localeNames, setLocaleFromUrl } from '../localization.js';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLinkAuth extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }
  render() {
    return html`
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-nowrap"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
        >
          <div class="me-2 d-inline-block">
            <img
              id="imgUserLogged"
              style="width: 25px;height: 25px"
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
                <a class="dropdown-item" @click=${() => this._localeChanged(locale)} ?id=${locale}>
                  ${localeNames[locale]}
                </a>
              </li>
            `;
          })}
        </ul>
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
}

customElements.define('nav-link-auth', NavLinkAuth);
