/**
* @file BollsLoading.vue
* @description 双色小球旋转动画效果
* @date 2025-04-26
*/
<template>
  <div class="bolls-loading">
    <div v-for="item in 36" :key="item" class="bolls-loading-item"></div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
@use "sass:math"; // 引入sass的math模块

$containerSize: 200px; // 圆环容器大小
$bollSize: 10px; // 小球直径
$bollCount: 36; // 小球数量
$duration: 2s; // 动画持续时间

.bolls-loading {
  position: relative;
  width: $containerSize;
  height: $containerSize;
  border-radius: 50%;
  background: lightblue;

  .bolls-loading-item {
    width: $bollSize;
    height: $bollSize;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: math.div(-$bollSize, 2);
    margin-top: math.div(-$bollSize, 2);
    transform-origin: center (math.div($containerSize, 2) + math.div($bollSize, 2));
    perspective: 100px; // 添加透视效果
    transform-style: preserve-3d; // 保持3D效果


    /* 遍历设置每个小球的旋转角度和动画延迟 */
    @for $i from 1 through $bollCount {
      &:nth-child(#{$i}) {
        transform: rotate(($i - 1) * math.div(360deg, $bollCount));

        &::before,
        &::after {
          animation-delay: - math.div($duration, $bollCount) * ($i - 1) * 6;
        }
      }
    }

    /* 两种颜色小球的公共样式 */
    &::before,
    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    /* 黑色小球 */
    &::before {
      top: -100%;
      background-color: #000000;
      animation: move-black $duration infinite;

      @keyframes move-black {
        0% {
          animation-timing-function: ease-in;
        }

        25% {
          transform: translate3d(0, 100%, $bollSize);
          animation-timing-function: ease-out;
        }

        50% {
          transform: translate3d(0, 200%, 0);
          animation-timing-function: ease-in;
        }

        75% {
          transform: translate3d(0, -100%, -$bollSize);
          animation-timing-function: ease-out;
        }
      }
    }

    /* 绿色小球 */
    &::after {
      background-color: greenyellow;
      top: 100%;
      animation: move-greenyellow $duration infinite;


      @keyframes move-greenyellow {
        0% {
          animation-timing-function: ease-in;
        }

        25% {
          transform: translate3d(0, -100%, -$bollSize);
          animation-timing-function: ease-out;
        }

        50% {
          transform: translate3d(0, -200%, 0);
          animation-timing-function: ease-in;
        }

        75% {
          transform: translate3d(0, -100%, $bollSize);
          animation-timing-function: ease-out;
        }
      }
    }
  }
}
</style>