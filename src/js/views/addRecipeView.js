"use strict";

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _message = "Recipe was successfully added!";
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    // コントローラは関係なくこのオブジェクトが呼び出されればすぐアクティブになるメソッド。
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  //   他のモジュールでは使われないからプライベート_でOK
  // 渡すthisはオブジェクトだよね
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      // inputひとつずつチクチク値取得しないでフォームデータ一括して取得する方法
      const dataArr = [...new FormData(this)]; // このthisは？this._parentElement!
      // 👆 [[field名, value], [field名, value], ...]という構造
      // オブジェクトに変換する方法
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new AddRecipeView();
