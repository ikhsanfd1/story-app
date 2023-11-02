import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class ComingSoon extends LitElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
    updateWhenLocaleChanges(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
        :host {
            display: block;
            width: 100%;
            background-color: #f73f52;
            color: #ffea85;
            text-align: center;
            margin-top: 80px;
            border-radius: 5px;
            box-shadow: 2px 2px 2px #7986c7;
        }
        h1 {
          text-shadow: 2px 2px 2px black;
        }
    </style>
    <h1>${msg(`maaf, untuk lupa akun sementara belum tersedia. Silahkan daftar ulang akun`)}</h1> 
    `;
  }
}

customElements.define('coming-soon', ComingSoon);
