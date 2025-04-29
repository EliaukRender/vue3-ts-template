/**
 * @file index.ts
 * @description 通过Proxy实现单例模式
 * @date 2025-04-29
 */

// 一个class, 目前没有实现单例模式
class MyVideo {
  constructor() {
    console.log();
  }
}

/**
 * @description 实现class的单例模式 （singleton方法可以expoer出去，在需要使用单例模式的时候调用）
 * @param {T} _class - 需要实现单例的class
 * @returns {T} 返回单例模式的class
 */
function singleton<T extends new (...args: any[]) => any>(_class: T): T {
  let instance: InstanceType<T>;

  // 创建一个代理对象，第一个参数是目标对象，第二个参数是代理对象的handler
  // 代理对象的handler可以重写目标对象的某些行为，比如construct、get、set、apply、has等
  const proxy = new Proxy(_class, {

    // construct是Proxy的handler，用于拦截new操作符
    // target是目标对象，args是构造函数的参数
    // 当使用new操作符创建实例时，会调用construct方法
    construct(target: T, args: any[]): InstanceType<T> {
      if (!instance) {
        // 使用Reflect.construct来创建实例
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  });

  proxy.prototype.constructor = proxy; // 重写constructor，保证外部访问到的constructor是proxy
  return proxy;
}

const SingletonMyVideo = singleton(MyVideo); // 得到单例模式的class

export default new SingletonMyVideo();
