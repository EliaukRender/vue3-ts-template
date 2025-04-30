<template>
  <h1>方案一</h1>
  <!-- 第1种实现：clip-path -->
  <div class="wave-image">
    <img src="@/assets/images/bgs/bg-1.jpg" alt="wave" class="wave-clip" />
  </div>

  <h1>方案二的基本实现思路</h1>
  <!-- 第2种实现：纯css实现mask波浪遮罩层---思路展示 -->
  <div class="wave-contaniner">
  </div>

  <h1>方案二的实现效果</h1>
  <!-- 第2种实现：纯css实现mask波浪遮罩层 -->
  <div class="waves-mask">
    <img src="@/assets/images/bgs/bg-1.jpg" alt="wave" class="wave-clip" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use "sass:math";

.wave-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.wave-clip {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* 16个高波峰的波浪 */
  clip-path: path("M0,30 C45,60 45,0 90,30 C135,60 135,0 180,30 C225,60 225,0 270,30 C315,60 315,0 360,30 C405,60 405,0 450,30 C495,60 495,0 540,30 C585,60 585,0 630,30 C675,60 675,0 720,30 C765,60 765,0 810,30 C855,60 855,0 900,30 C945,60 945,0 990,30 C1035,60 1035,0 1080,30 C1125,60 1125,0 1170,30 C1215,60 1215,0 1260,30 C1305,60 1305,0 1350,30 C1395,60 1395,0 1440,30 V300 H0 Z"
    );
}

/* 第二种实现：纯css */
$r: 50; // 圆的半径
$detalY: 40; // y轴偏移量
$detalX: 2 * math.sqrt($r * $r - $detalY * $detalY); // x轴的偏移量

.wave-contaniner {
  width: 100%;
  height: 200px;
  border: 1px solid #ccc;

  /* 
    第一个参数：圆的半径   
    第二个参数：圆心位置    
    第三个参数：颜色    
    第四个参数：颜色 
    */
  background-image: radial-gradient(#{$r}px at 50% #{$r + $detalY}px,
    red 100%,
    transparent 102%),
  radial-gradient(#{$r}px at 50% #{-$detalY}px, transparent 100%, red 102%);

  /* 背景尺寸：横向尺寸2个x轴偏移量 纵向尺寸100% */
  background-size: #{2 * $detalX}px 100%;

  /* 背景位置： 水平居中 纵向顶部对齐 */
  background-position: calc(50% - #{$detalX}px) 0,
  50% #{$r}px;

  background-repeat: repeat-x;



  /* 第二种实现的最终效果：波浪遮罩 */
  $bg:
    /* 第一个背景： 波峰 */
    radial-gradient(
      /* 半径、圆心位置 */
      #{$r}px at 50% #{$r + $detalY}px,
      /* 渐变颜色1 */
      red 100%,
      /* 渐变颜色2 */
      transparent 102%,
      /* 尺寸 */
      #{2 * $detalX}px 100%,
      /* 位置 */
      calc(50% - #{$detalX}px) 0,
      /* x轴重复 */
      repeat-x),

    /* 第一个背景： 波谷 */
    radial-gradient(
      /* 半径、圆心位置 */
      #{$r}px at 50% #{-$detalY}px,
      /* 渐变颜色1 */
      transparent 100%,
      /* 渐变颜色2 */
      red 102%,
      /* 尺寸 */
      #{2 * $detalX}px 100%,
      /* 位置 */
      50% #{$r}px,
      /* x轴重复 */
      repeat-x);

  mask: $bg;
  -webkit-mask: $bg;
}
</style>
