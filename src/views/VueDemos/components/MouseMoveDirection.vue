/**
* @file MouseMoveDirection.vue
* @description 鼠标移动的方向
* @date 2025-05-02
*/

<template>
  <div class="container" ref="containerRef" @mouseenter="handleMouseMove" @mouseleave="handleMouseLeave">
    <div class="mask" ref="maskRef">从不同方向移动鼠标查看效果</div>
  </div>
</template>

<script setup lang='ts'>
const contaninerRef = useTemplateRef<HTMLDivElement | null>('containerRef')
const maskRef = useTemplateRef<HTMLDivElement | null>('maskRef')


const handleMouseMove = (e: MouseEvent) => {
  const rect = contaninerRef.value?.getBoundingClientRect()
  if (!rect) return
  const basicDeg = Math.atan2(rect.height, rect.width) * 180 / Math.PI
  console.log(basicDeg);


  const x = e.offsetX - rect.width / 2
  const y = rect.height / 2 - e.offsetY
  const deg = Math.atan2(y, x) * 180 / Math.PI
  console.log(deg);


  if (deg >= -basicDeg && deg < basicDeg) {
    maskRef.value?.classList.add('right')
    console.log('right');
  } else if (deg >= basicDeg && deg < 180 - basicDeg) {
    maskRef.value?.classList.add('top')
    console.log('top');
  } else if ((deg >= 180 - basicDeg && deg < 180) || (deg >= -180 && deg < -180 + basicDeg)) {
    maskRef.value?.classList.add('left')
    console.log('left');
  } else {
    maskRef.value?.classList.add('bottom')
    console.log('bottom');

  }
}

const handleMouseLeave = () => {
  maskRef.value?.classList.remove('right', 'top', 'left', 'bottom') // 清空上一次的效果
}
</script>

<style scoped>
.container {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.mask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  transform: translateX(-100);
}

.mask.top {
  top: -100%;
  left: 0;
  transform: translateY(100%);
  background-color: rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.mask.bottom {
  bottom: -100%;
  left: 0;
  transform: translateY(-100%);
}

.mask.left {
  top: 0;
  left: -100%;
  transform: translateX(100%);
}

.mask.right {
  top: 0;
  right: -100%;
  transform: translateX(-100%);
}

.container:hover .mask {
  transform: translate(0, 0);
}
</style>