"use strict";
// 親クラス
import View from "./View.js";
// アイコンを読み込めるようにPath通す.
// Parcel2での書き方はPath名の前にurl:を。
import icons from "url:../../img/icons.svg";
// iconsはparcelに作られた新しいpathになってる
import Fraction from "fractional";

// viewのパートには、Viewというビルドインのクラスがある。
// 継承して使えるようにしたいので、viewでは基本クラス形態を取る
class RecipeView extends View {
  // viewにはparentElementをもたせる。これで、Viewに不可欠なDOM操作がめっちゃ簡単に。
  _parentElement = document.querySelector(".recipe");

  // controllerの中から、呼び出される必要があるためパブリックAPIでいる必要がある
  addHandlerRender(handler) {
    // URLのハッシュが変わるとshowRecipeする
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
      if (btn.classList.contains("btn--decrease-servings")) handler(-1);
      if (btn.classList.contains("btn--increase-servings")) handler(+1);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>
    
    <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>
    
      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data?.bookmarked ? "-fill" : ""
    }"></use>
      </svg>
    </button>
    </div>
    
    <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generateIngredientMarkup).join("")}  
    </ul>
    </div>
    
    <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.url}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
    </div>
  `;
  }

  // ちなみに上のmap内では、map(ing=>#generateIngredientMarkup(ing))じゃなくて
  //map(#generateIngredientMarkup)でいいらしい。
  _generateIngredientMarkup(ing) {
    const Fraction = require("fractional").Fraction;
    return `
        <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${
              ing.quantity ? new Fraction(ing.quantity).toString() : ""
            }</div>
            <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.description}
            </div>
        </li>
        `;
  }
}
// クラスから新しいオブジェクトを作ってそれをexport
export default new RecipeView();
