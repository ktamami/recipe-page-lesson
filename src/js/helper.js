"use strict";
// プロジェクトで何度も再利用する関数専用
import { TIMEOUT_SECOND } from "./config.js";

// timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// Refactoring (下のJSONを2つにまとめる)
export const ajax = async function (url, uploadData = undefined) {
  try {
    const response = await Promise.race([
      uploadData
        ? fetch(url, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url),
      timeout(TIMEOUT_SECOND),
    ]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message}`);
    // this returned data is resolved value of Promise
    return data;
  } catch (err) {
    //ここでエラーを返したいときは、throwな！
    //ここでrejectさせるにはthrowで即座に終わらす方法
    throw err;
  }
};

// // get from json
// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECOND)]);
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message}`);
//     // this returned data is resolved value of Promise
//     return data;
//   } catch (err) {
//     //ここでエラーを返したいときは、throwな！
//     //ここでrejectさせるにはthrowで即座に終わらす方法
//     throw err;
//   }
// };

// // to json
// export const sendJSON = async function (url, uploadData) {
//   try {
//     const response = await Promise.race([
//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIMEOUT_SECOND),
//     ]);
//     const data = await response.json();
//     if (!response.ok) throw new Error(`${data.message}`);
//     // this returned data is resolved value of Promise
//     return data;
//   } catch (err) {
//     //ここでエラーを返したいときは、throwな！
//     //ここでrejectさせるにはthrowで即座に終わらす方法
//     throw err;
//   }
// };
