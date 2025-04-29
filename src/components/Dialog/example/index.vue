/**
* @file index.vue
* @description 命令式弹窗组件示例
* @date 2025-04-25
*/
<template>
  <el-button type="primary" @click="handleClick">打开命令式弹窗</el-button>
</template>

<script setup lang="ts">
import { renderDialog } from "../index";
import Form from "./form.vue";

// 打开弹窗
const handleClick = () => {
  /**
   * unmountDialog 卸载弹窗
   * contentInstance 弹窗内容实例 (可以访问到组件暴露出来的变量与方法)
   * visible 弹窗是否显示
   */
  const { visible, unmountDialog, contentInstance } = renderDialog(Form, {}, { modelValue: true })
  console.log(visible, unmountDialog, contentInstance)
}

</script>

<style></style>