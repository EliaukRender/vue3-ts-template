/**
 * @file functionOverloading.ts
 * @description 函数重载：基于参数类型创 建函数重载
 * @date 2025-04-27
 */

/**
 * 创建一个函数重载
 * @returns 重载函数
 */
export function createOverload() {
  const funcMap = new Map();

  /**
   * 重载函数
   * @param this 上下文
   * @param args 参数
   * @returns 返回值
   */
  function overload(this: any, ...args: any[]) {
    const key = args.map((arg) => typeof arg).join(","); // 获取参数类型
    const cbFunction = funcMap.get(key); // 获取重载函数
    if (!cbFunction) {
      throw new Error(`没有找到对应的参数类型的函数实现： ${key}`);
    }
    return cbFunction.apply(this, args); // 执行重载函数
  }

  /**
   * 添加重载
   * @param args 可变参数列表ß
   */
  overload.add = function (...args: any[]) {
    const cbFunction = args.pop(); // 最后一个参数是回调函数
    if (typeof cbFunction !== "function") {
      throw new Error("最后一个参数必须是函数");
    }
    const key = args.join(","); // 参数类型列表
    console.log("key1", key);

    funcMap.set(key, cbFunction); // 设置重载函数
  };

  return overload;
}
