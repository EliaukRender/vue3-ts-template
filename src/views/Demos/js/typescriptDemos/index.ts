/**
 * @file index.ts
 * @description ts类型使用案例合集
 * @date 2025-04-28
 */

/**
 * Demo1：泛型 + 联合类型
 */

// keyof T : 这个泛型T可能有string/number/symbol类型的key, symbol类型的key不能直接用于字符串拼接,所以需要 keyof T & string, &是交叉类型
// keyof T & string : 表示T的键名组成的字符串联合类型
// T[K] : 表示T的键名K的值的类型
type Watcher<T> = {
  on<K extends keyof T & string>(
    eventName: `${keyof T & string}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
};

declare function watch<T>(obj: T): Watcher<T>;

const personWatcher = watch({
  lastName: "张",
  firstName: "三",
  age: 18,
  gender: "男",
  email: "zhangsan@163.com",
  phone: "13800138000",
  address: "北京市海淀区",
});

personWatcher.on("firstNameChanged", (oldValue, newValue) => {
  console.log(`firstName 从 ${oldValue} 变为 ${newValue}`);
});


/**
 * Demo2: Record对象构造类型 + Partial可选类型
 */

// keyof any 表示所有可能的键名, 包括string/number/symbol类型，所以 K extends keyof any 表示K的类型是：string | number | symbol
// Record<K, T> 表示一个对象，键类型是K，值类型是T
// Partial<Record<K, T>> 表示一个对象，键类型是K，值类型是T，并且键是可选的
type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

type ThemeColors = "primary" | "secondary" | "error";


// 当使用 PartialRecord<ThemeColors, string> 时：
// K 被替换为 ThemeColors（即 "primary" | "secondary" | "error"）
// T 被替换为 string

// 先计算 Record<K, T>：
const colors: PartialRecord<ThemeColors, string> = {
  primary: "#1976d2",
  // secondary 和 error 是可选的
};

console.log(colors);
