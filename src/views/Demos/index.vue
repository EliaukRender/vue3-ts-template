<template>
  <div class="demos">
    <!-- 高度自适应过渡 -->
    <AutoHeightTransition />

    <!-- svg描边动画 -->
    <SvgOutlineAnimation />

    <!-- 小球加载动画 -->
    <BollsLoading />

  </div>
</template>

<script setup lang="ts">
import AutoHeightTransition from './components/AutoHeightTransition.vue'
import SvgOutlineAnimation from './components/SvgOutlineAnimation.vue'
import BollsLoading from './components/BollsLoading.vue'
</script>

<style lang="scss" scoped>
.demos {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
