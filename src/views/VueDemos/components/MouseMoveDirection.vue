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
const containerRef = useTemplateRef<HTMLDivElement | null>('containerRef')
const maskRef = useTemplateRef<HTMLDivElement | null>('maskRef')


const handleMouseMove = (e: MouseEvent) => {
  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect || !maskRef.value) return

  // 重置所有类名和transform
  maskRef.value.classList.remove('right', 'top', 'left', 'bottom')
  maskRef.value.style.transform = ''

  // 容器的基本角度
  const basicDeg = Math.atan2(rect.height, rect.width) * 180 / Math.PI

  // 鼠标进入容器时，相对容器中心的角度
  const x = e.offsetX - rect.width / 2
  const y = rect.height / 2 - e.offsetY
  const deg = Math.atan2(y, x) * 180 / Math.PI

  // 判断鼠标进入div的方向
  if (deg >= -basicDeg && deg < basicDeg) {
    maskRef.value.classList.add('right')
  } else if (deg >= basicDeg && deg < 180 - basicDeg) {
    maskRef.value.classList.add('top')
  } else if ((deg >= 180 - basicDeg && deg < 180) || (deg >= -180 && deg < -180 + basicDeg)) {
    maskRef.value.classList.add('left')
  } else {
    maskRef.value.classList.add('bottom')
  }
}

const handleMouseLeave = () => {
  if (!maskRef.value) return
  maskRef.value.classList.remove('right', 'top', 'left', 'bottom')
  maskRef.value.style.transform = ''
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
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
  opacity: 0;
  visibility: hidden;
}

.mask.top,
.mask.bottom,
.mask.left,
.mask.right {
  opacity: 1;
  visibility: visible;
}

.mask.top {
  top: -100%;
  left: 0;
  transform: translateY(0);
}

.mask.bottom {
  bottom: -100%;
  left: 0;
  transform: translateY(0);
}

.mask.left {
  top: 0;
  left: -100%;
  transform: translateX(0);
}

.mask.right {
  top: 0;
  right: -100%;
  transform: translateX(0);
}

.container:hover .mask.top {
  transform: translateY(100%);
}

.container:hover .mask.bottom {
  transform: translateY(-100%);
}

.container:hover .mask.left {
  transform: translateX(100%);
}

.container:hover .mask.right {
  transform: translateX(-100%);
}
</style>