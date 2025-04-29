/**
* @file AutoHeightTransition.vue
* @description 高度过渡动画效果
* @date 2025-04-24
*/
<template>
  <el-button type="primary" @click="handleClick">{{ isExpand ? '收起' : '展开' }}</el-button>

  <div class="auto-height-transition">
    <div class="content">
      这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字这是一段很长的文字
    </div>
  </div>
</template>

<script setup lang="ts">

const isExpand = ref(false) // 是否展开

const handleClick = () => {
  const box = document.querySelector('.auto-height-transition') as HTMLElement
  if (!box) return
  box.style.transition = 'height 0.5s ease-in-out'

  // 展开
  if (!isExpand.value) {
    box.style.height = 'auto'
    const autoHeight = box.getBoundingClientRect().height // 获取auto时的实际高度值
    box.style.height = '0px'
    // 让浏览器渲染
    box.getBoundingClientRect() // 强制浏览器渲染(元素调用这个方法就可以使浏览器渲染)
    box.style.height = `${autoHeight}px`
  } else {
    // 收起
    box.style.height = '0px'
  }
  isExpand.value = !isExpand.value
}
</script>

<style lang="scss" scoped>
.auto-height-transition {
  width: 300px;
  height: 0;   /* 初始高度为0，隐藏容器内容 */
  overflow: hidden;
  background-color: lightcoral;
  line-height: 5;
}
</style>
