<template>
  <div class="sun-rise-down">
    <div class="main">
      <div class="container" ref="container">
        <div class="sun" ref="sun"></div>
      </div>
      <input 
        type="range" 
        class="slider" 
        min="0" 
        max="100" 
        :value="inputValue"
        @input="handleChange" 
      />
      <div>控制太阳升起降落</div>
    </div>
  </div>
</template>

<script setup lang="ts"> 
const inputValue = ref<number>(50)
const container = useTemplateRef('container')
const sun = useTemplateRef('sun')

// 更新动画延迟
const updateAnimationDelay = (newValue: number) => {
  const delayTime = `-${newValue / 100}s`
  if (sun.value) {
    sun.value.style.setProperty('--delay-time', delayTime)
  }
  if (container.value) {
    container.value.style.setProperty('--delay-time', delayTime)
  }
}

// 处理输入框变化
const handleChange = (event: Event) => {
  inputValue.value = Number((event.target as HTMLInputElement).value)
  updateAnimationDelay(inputValue.value)
}

// 组件挂载后初始化动画延迟
onMounted(() => {
  updateAnimationDelay(inputValue.value)
})
</script>

<style lang="scss" scoped>
.sun-rise-down {
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .container {
      position: relative;
      width: 600px;
      height: 400px;
      margin-bottom: 30px;
      animation: dayRise 1s var(--delay-time) linear forwards paused;

      .sun {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transform-origin: 300px 300px 0; /* 旋转时的圆形中心点 */
        /* 初始状态时，太阳因为延迟--duration=-0.5s，所以动画已经播放了50%然后暂停了 */
        animation: sunDay 1s var(--delay-time) linear forwards paused;
      }
    }

    .slider {
      width: 300px;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      outline: none;
      cursor: pointer;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        background: #1E90FF;
        border-radius: 50%;
        cursor: pointer;
        transition: background 0.2s;
      }

      &::-webkit-slider-thumb:hover {
        background: #187bcd;
      }
    }
  }
}

/* 太阳动画 */
@keyframes sunDay {
  0% {
    transform: rotateZ(0deg);
    background: #eda404;
    box-shadow: 0 0 20px 5px #eda404;
  }
  50% {
    transform: rotateZ(45deg);
    background: #ed3102;
    box-shadow: 0 0 20px 5px #ed3102;
  }
  100% {
    transform: rotateZ(90deg);
    background: #cccccc;
    box-shadow: 0 0 20px 5px #cccccc;
  }
}

/* 背景天空动画 */
@keyframes dayRise {
  0% {
    background: #fdeea9;
  }
  50% {
    background: #cccccc;
  }
  100% {
    background: #000000;
  }
}
</style> 