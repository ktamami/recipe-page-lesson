import icons from "url:../../img/icons.svg";

// 親クラスになるから、クラス自体をexportする
// インスタンスとしてではなく親クラス（完全ブループリント）として使われる
export default class View {
  _data;

  // 自動でparamを書き出してくれる
  // あとは自分で書いていく
  // paramのデータにほしい型, つづいてdescriptionをかける

  /**
   *　Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g.recipe)
   * @param {boolean} [render=true] If false, create markup instead of rendering to the DOM
   * @returns{undefined | string} A markup is returned if render=false
   * @this {Object} View instance
   * @author Tamam Kando
   * @todo Finish implementation
   */
  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    // HTMLストリングをDOMオブジェクトに変換する
    // 操作したいストリングを渡して、Browser上のリアルDOMにはいないけど、仮想DOMを作り上げる
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // 更新後
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // 今のと変更点があって、textContent(nodeValue)に言葉がはいいている子要素のみ
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }
      // こっちは要素の変更
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
     <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
        <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="message">
        <div>
            <svg>
                <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
