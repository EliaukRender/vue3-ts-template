<template>
  <svg :style="iconStyle" aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed, type CSSProperties } from "vue";

interface SvgProps {
  name: string; // 图标的名称 ==> 必传
  prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: "icon",
  iconStyle: () => ({})
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

// 添加默认导出
defineOptions({
  name: 'SvgIcon'
});
</script>

<style scoped>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
  overflow: hidden;
}
</style>