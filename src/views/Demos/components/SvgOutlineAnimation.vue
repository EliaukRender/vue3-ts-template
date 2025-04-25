/**
* @file SvgOutlineAnimation.vue
* @description svg描边动画效果
* @date 2025-04-25
*/
<template>
  <div class="svg-container">
    <svg class="svg-outline-animation-svg" viewBox="0 0 600 200">
      <!-- H -->
      <path d="M50 40v120M50 100h60M110 40v120" class="letter" stroke="#368fff" stroke-width="5" fill="none"/>
      <!-- E -->
      <path d="M140 40v120M140 40h60M140 100h40M140 160h60" class="letter" stroke="#368fff" stroke-width="5" fill="none"/>
      <!-- L -->
      <path d="M230 40v120M230 160h60" class="letter" stroke="#368fff" stroke-width="5" fill="none"/>
      <!-- L -->
      <path d="M320 40v120M320 160h60" class="letter" stroke="#368fff" stroke-width="5" fill="none"/>
      <!-- O -->
      <path d="M410 100c0-33.333 20-70 70-70s70 36.667 70 70-20 70-70 70-70-36.667-70-70" class="letter" stroke="#368fff" stroke-width="5" fill="none"/>
    </svg>
  </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue'

onMounted(() => {
  const paths = document.querySelectorAll('.svg-outline-animation-svg .letter') as NodeListOf<SVGPathElement>
  if (!paths.length) return
  
  paths.forEach((path, index) => {
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}` // 设置虚线长度
    path.style.strokeDashoffset = `${length}` // 设置虚线偏移量
    
    // 添加动画，每个字母依次出现
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 1s ease-in-out'
      path.style.strokeDashoffset = '0'
    }, index * 500)
  })
})
</script>

<style lang='scss' scoped>
.svg-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg-outline-animation-svg {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.letter {
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>