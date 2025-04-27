/**
 * @file index.ts
 * @description 函数重载 的使用示例
 * @date 2025-04-27
 */

import { createOverload } from "./overloading";

const getUsers = createOverload(); // 创建重载函数


// 重载函数1： 获取所有用户
getUsers.add(() => {
  console.log("获取所有用户");
})

// 回调函数
const serchPage = (page: number, pageSize: number) => {
  console.log("按照分页搜索用户", page, pageSize);
}

// 重载函数2： 按照分页搜索用户
getUsers.add('number', serchPage);

// 重载函数3： 按照分页搜索用户
getUsers.add('number', 'number', serchPage);

// 重载函数4： 按照用户的姓名搜索
getUsers.add('string', () => {
  console.log("按照用户的姓名搜索");
});

// 重载函数5： 按照用户的姓名+性别搜索
getUsers.add('string', 'string', () => {
  console.log("按照用户的姓名+性别搜索");
});



/* 测试 */
getUsers() // 没有参数

getUsers(1); // 一个Number参数

getUsers(1, 10); // 两个Number参数

getUsers('a'); // 一个String参数

getUsers('a', 'b'); // 两个String参数


