/**
 * @file index.vue
 * @description 固定宽高比组件, 代替aspect-ratio解决兼容性的问题
 * @date 2025-04-24
 */

 <!-- 使用示例 -->
 <!-- <div style="width: 200px">
  <FixedWhRadio :ratio="10 / 3">
    <div style="width: 100%; height: 100%; background-color: red">自定义内容</div>
  </FixedWhRadio>
</div> -->

<template>
  <div class="aspect-ratio-box" :style="ratioStyle">
    <div class="aspect-ratio-content">
      <div class="aspect-ratio-content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  ratio: number;
}

const props = withDefaults(defineProps<Props>(), {
  ratio: 16 / 9,
});

const ratioStyle = computed(() => {
  return {
    "--aspect-ratio": `${(1 / props.ratio) * 100}%`,
  };
});
</script>

<style scoped>
.aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-top: var(--aspect-ratio, 56.25%); /* 默认 16:9 */
}

.aspect-ratio-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aspect-ratio-content-inner {
  width: 100%;
  height: 100%;
  line-height: 100%;
}
</style>
