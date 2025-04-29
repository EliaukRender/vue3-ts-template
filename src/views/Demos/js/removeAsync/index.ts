// /**
//  * @file index.ts
//  * @description 消除异步的传染性
//  * @date 2025-04-29
//  */
// import path from "path";
// import { fileURLToPath } from "url";

// // 获取当前文件的目录路径
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(__filename, __dirname);

// /**
//  * 使用的时候
//  */
// const getUser = () => {
//   // 异步读取文件
//   return fetch(path.join(__dirname, "user.json"));
// };

// function getUserInfo() {
//   return getUser();
// }

// function init() {
//   return getUserInfo();
// }

// interface ICache {
//   status: "pending" | "fulfilled" | "rejected";
//   value: any | null;
// }

// /**
//  * @description 函数描述
//  * @param {Function} fn - 要执行的需要await的函数
//  * @returns {void}
//  */
// function removeAsync(fn: Function): void {
//   // 1、保存旧的fetch
//   const oldFetch = globalThis.fetch;

//   // 2、重写fetch
//   const cache: ICache = {
//     status: "pending",
//     value: null,
//   };
//   const newFetch = async (
//     ...args: [RequestInfo | URL, RequestInit?]
//   ): Promise<Response> => {
//     // 有缓存的时候
//     if (cache.status === "fulfilled") {
//       return Promise.resolve(cache.value as Response);
//     } else if (cache.status === "rejected") {
//       return Promise.reject(cache.value);
//     }

//     // 没有缓存的时候
//     // 1、执行旧的fetch
//     const promise = oldFetch(...args)
//       .then((res: Response) => {
//         cache.status = "fulfilled";
//         cache.value = res;
//         return res;
//       })
//       .catch((err: unknown) => {
//         cache.status = "rejected";
//         cache.value = err as Response;
//         throw err;
//       });
//     // 2、抛出错误
//     throw promise;
//   };

//   globalThis.fetch = newFetch;

//   // 3、执行函数
//   try {
//     fn();
//   } catch (err) {
//     if (err instanceof Promise) {
//       err.finally(() => {
//         // 4、恢复旧的fetch
//         globalThis.fetch = newFetch;
//         fn();
//         globalThis.fetch = oldFetch;
//       });
//     }
//   }

//   // 4、恢复旧的fetch
//   globalThis.fetch = oldFetch;
// }

// const res = removeAsync(init);
// console.log(res);
