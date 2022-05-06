"use strict";
// プロジェクト全体で再利用する変数を定数で記入する場所
// 複数にファイルがまたがる際に、ロジックは各モジュール、定数の設定はここって思ってたほうが、定数変更時の変更画家の
// Python界のグローバル変数.envみたい？
// 他のモジュールでは、ベタ打ち定義しないで。

// 定数は大文字で。アンダースコア
export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes`;
export const TIMEOUT_SECOND = 10;
export const RESULT_PER_PAGE = 10;
export const KEY = "2e0d5386-03f0-45df-b71b-6bc881d70016";
export const MODAL_CLOSE_SECOND = 2.5;
