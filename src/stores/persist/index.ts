/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 store name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */

import type { PersistenceOptions } from "pinia-plugin-persistedstate";

const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
    paths
  };
  return persist;
};

export default piniaPersistConfig;