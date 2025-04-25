/**
* @file index.vue
* @description 固定宽高比组件使用示例
* @date 2025-04-25
*/
<template>
  <!-- fixed-wh-radio-example的宽度或者高度就是整个组件显示的宽度或者高度  -->
  <div class="fixed-wh-radio-example">
    <FixedWhRadio :ratio="10 / 3">
      <div style="width: 100%; height: 100%; background-color: red">自定义内容区域</div>
    </FixedWhRadio>
  </div>
</template>

<script setup lang="ts">
import FixedWhRadio from "../index.vue";
</script>

<style lang="scss" scoped>
.fixed-wh-radio-example {
  width: 200px;
}
</style>