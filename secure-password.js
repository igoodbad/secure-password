import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `secure-password`
 * Generate input password secure
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class SecurePassword extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .password-container{
          display: block;
        }
        input{
          padding: 0.9em;
          border: solid 0.1em #dedede;
          border-radius: 2em;
          background-color: #fff;
          width: 100%;
          box-sizing: border-box;
          transition: background-color 2s, border 2s;
        }
        input.error{
          background-color: #ffa1a1;
          border: solid 0.1em red;
        }
        input.success{
          background-color: #b4ffa1;
          border: solid 0.1em green;
        }
        .list{
          list-style: none;
          padding-left: 0;
        }
        .list li{
          background-color: #fff;
          padding: 0.2rem 0.5rem;
          transition: background-color 1.5s;
        }
        .list li.checkNo{
          background-color: #ffb9b9;
        }
        .list li.checkYes{
          background-color: #b9ffc9;
        }
        .check-circle{
          border: solid 0.1em black;
          border-radius: 2em;
        }
        .style-input{
          @apply --custom-input;
        }
      </style>
      <div class="password-container">
        <input id="[[idPassword]]" name="[[idPassword]]" class="style-input" type="password" placeholder="[[placeholderPassword]]" />
        <ul id="list-checks" class="list">
          <li id="upChar" class="checkNo">[[someUpperChar]]</li>
          <li id="lowChar" class="checkNo">[[someLowChar]]</li>
          <li id="aNumber" class="checkNo">[[someNumber]]</li>
          <li id="aSpecialChar" class="checkNo">[[someSpecialChar]]</li>
          <li id="minSizeWord" class="checkNo">[[_textMinSize]]</li>
        </ul>
        <input id="[[idConfirmPassword]]" name="[[idConfirmPassword]]" class="style-input" type="password" hidden$="[[!enableConfirm]]" placeholder="[[placeholderConfirm]]" />
      </div>
      
    `;
  }
  static get properties() {
    return {
      idPassword: {
        type: String,
        value: 'input-password',
      },
      idConfirmPassword: {
        type: String,
        value: 'input-confirm-password',
      },
      placeholderPassword: {
        type: String,
        value: 'Input the password'
      },
      placeholderConfirm: {
        type: String,
        value: 'Confirm the password'
      },
      someUpperChar: {
        type: String,
        value: "Al menos una letra en mayuscula"
      },
      someLowChar: {
        type: String,
        value: "Al menos una letra en minuscula"
      },
      someNumber: {
        type: String,
        value: "Al menos un numero"
      },
      someSpecialChar: {
        type: String,
        value: "Al menos un caracter especial"
      },
      enableConfirm: {
        type: Boolean,
        value: false
      },
      minSize: {
        type: Number,
        value: 8
      },
      titleSize: {
        type: String,
        value: "Minimo ~ caracteres"
      },

      _textMinSize: {
        type: String,
        computed: "_formatText(titleSize)"
      },
      _inputPassword: {
        type: HTMLElement,
        value: ()=>{}
      },
      _inputConfirmPassword: {
        type: HTMLElement,
        value: ()=>{}
      },
      _listCheck: {
        type: HTMLElement,
        value: ()=>{}
      }
    };
  }

  ready() {
    super.ready();
    this.set("_inputPassword", this.shadowRoot.querySelector("#" + this.idPassword));
    this.set("_inputConfirmPassword", this.shadowRoot.querySelector("#" + this.idConfirmPassword));
    this.set("_listCheck", this.shadowRoot.querySelector("#list-checks"));
    this._inputPassword.addEventListener("keyup", () => { this._checkPassword(this._inputPassword,this._listCheck) }, false);
    this._inputConfirmPassword.addEventListener("keyup", () => { this._checkMatchPassword(this._inputPassword, this._inputConfirmPassword) }, false);
  }

  _checkPassword(event,listCheck) {
    let upChar = listCheck.querySelector("#upChar");
    let lowChar = listCheck.querySelector("#lowChar");
    let aNumber = listCheck.querySelector("#aNumber");
    let aSpecialChar = listCheck.querySelector("#aSpecialChar");
    let minSizeWord = listCheck.querySelector("#minSizeWord");
    let upChars = new RegExp("[A-Z]", "g");
    let lowChars = new RegExp("[a-z]", "g");
    let numbers = new RegExp("[0-9]", "g");
    let specialChars = new RegExp("[|°¬!\"#\$%&/()=?¡\'¿´+¨*{}^`,.;:_-]", "g");
    upChar.className = (event.value.match(upChars) ?  "checkYes":"checkNo");
    lowChar.className = (event.value.match(lowChars) ?  "checkYes":"checkNo");
    aNumber.className = (event.value.match(numbers) ?  "checkYes":"checkNo");
    aSpecialChar.className = (event.value.match(specialChars) ?  "checkYes":"checkNo");
    minSizeWord.className = (event.value.length >= Number(this.minSize) ?  "checkYes":"checkNo");
    this.set("_inputConfirmPassword.value", "");
    this._inputConfirmPassword.classList.remove("error");
    this._inputConfirmPassword.classList.remove("success");
  }

  _checkMatchPassword(password, confirm){
    if(password.value === confirm.value){
      confirm.classList.remove("error");
      confirm.classList.add("success");
    }else{
      confirm.classList.remove("success");
      confirm.classList.add("error");
    }
  }

  _formatText(title){
    return title.replace("~",this.minSize);
  }

}

window.customElements.define('secure-password', SecurePassword);
