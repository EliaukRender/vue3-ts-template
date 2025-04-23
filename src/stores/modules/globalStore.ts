import { defineStore } from 'pinia'
import piniaPersistConfig from '../persist'

// state 类型
interface GlobalState {
  count: number
}

/**
 * 项目全局公用的状态
 */
export const useGlobalStore = defineStore('global-store', {
  state: (): GlobalState => ({
    count: 0
  }),
  getters: {
    doubleCount: (state: GlobalState) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  },
  persist: piniaPersistConfig('global-store', ['count']) // 持久化数据
})

