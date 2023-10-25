import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

class FooterApp extends LitElement {
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
            background-color: var(--background-secondary: #f73f52);
            color: #ffea85;
            text-align: center;
        }
        p {
          text-shadow: 2px 2px 2px black;
        }
    </style>
    <p>${msg(`Copyright &copy; 2023 by Ikhsan Fadhillah`)}</p> `;
  }
}

customElements.define('footer-app', FooterApp);
