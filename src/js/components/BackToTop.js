import { LitElement, html, css } from 'lit';

class BackToTop extends LitElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
        
        button {
          display: block;
          position: fixed;
          bottom: 20px;
          right: 25px;
          z-index: 999;
          font-size: 25px;
          box-shadow: 2px 2px 2px #7986c7;
          background-color: #f73f52;
          color: #ffea85;
          border-radius: 5px;
          cursor: pointer;
          padding-bottom: 2px;
        }
        button:hover {
            background-color: ##7986c7;
        }
    </style>
    <button>↑</button> 
        `;
  }
}

customElements.define('back-to-top', BackToTop);
