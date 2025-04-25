<template>
  <div class="bolls-loading">
    <div v-for="item in 36" :key="item" class="bolls-loading-item"></div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style lang="scss" scoped>
$bolls-loading-size: 100px; // 圆环大小
$bolls-loading-item-diameter: 4px; // 小球直径
$bolls-loading-item-count: 36; // 小球数量

.bolls-loading {
  position: relative;
  width: $bolls-loading-size;
  height: $bolls-loading-size;
  border-radius: 50%;
  border: 1px solid red;

  .bolls-loading-item {
    width: $bolls-loading-item-diameter;
    height: $bolls-loading-item-diameter;
    border-radius: 50%;
    border: 1px solid #000000;
    position: absolute;
    top: 0;   
    left: 50%;
    margin-left: -$bolls-loading-item-diameter / 2;
    margin-top: -$bolls-loading-item-diameter / 2;
    transform-origin: center ($bolls-loading-size / 2 + $bolls-loading-item-diameter / 2); // 设置旋转中心点为圆环中心

    /* 循环生成小球 */
    @for $i from 1 through $bolls-loading-item-count {
      &:nth-child(#{$i}) {
        transform: rotate(($i - 1) * (360deg / $bolls-loading-item-count));
      }
    }
  }
}
</style>