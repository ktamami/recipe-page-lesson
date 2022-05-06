"use strict";

import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // currentPage 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupNext(curPage);
    }

    // the last pages
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupPrev(curPage);
    }

    // other pages
    if (curPage < numPages) {
      return `${this._generateMarkupPrev(curPage)}${this._generateMarkupNext(
        curPage
      )}`;
    }

    // it has only 1 page
    return;
  }

  _generateMarkupPrev(page) {
    return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
          </button>`;
  }
  _generateMarkupNext(page) {
    return `
          <button data-goto="${
            page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();
