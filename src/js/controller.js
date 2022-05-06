"use strict";
import * as model from "./model.js";
import { MODAL_CLOSE_SECOND } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";

// ポリフィリング。npm i core-js regenerator-runtime
// For everything
import "core-js/stable";
// For async
import "regenerator-runtime/runtime";
import { MODAL_CLOSE_SECOND } from "./config.js";

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // URLの#を取得。（し、＃マークを除去）
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Loading recipe
    await model.loadRecipe(id);

    // rendering recipe
    // render: recipViewへのrecipeの渡しかた。
    // recipeView側でもrenderメソッド用意しとく必要アリ
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage());

    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  model.state.search.page = goToPage;
  paginationView.render(model.state.search);
};

const controlServings = function (plusMinus) {
  const newServings = model.state.recipe.servings + plusMinus;
  if (newServings === 0) return;
  model.updateServings(newServings);
  // これだと画像など全データを読み込み直す
  // recipeView.render(model.state.recipe);
  // Browserでのトラブルになりかねないので、ページ上で更新したい部分だけの変更がおすすめ
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add and remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update view
  recipeView.update(model.state.recipe);
  // Render list
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // 早速ビューで見よう
    recipeView.render(model.state.recipe);

    // フォーム上に成功メッセージだそう
    addRecipeView.renderMessage();

    // ブックマークビュー更新
    bookmarksView.render(model.state.bookmarks);

    // ID をURLに反映させよう(レシピが自分のURLを手に入れる)
    // リロードせずにURLを変更できる（3つの引数、状態、タイトル）
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // 記入したフォームを閉じよう
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECOND * 1000);
  } catch (err) {
    console.error("👻👻", err);
    addRecipeView.renderError(err.message);
  }

  const newFeature = function () {
    console.log("Hello");
  };
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
};
init();
