<template>
  <div class="demos">
    <div class="demos-container">
      <!-- 左侧菜单 -->
      <div class="menu">
        <div v-for="(item, index) in demoList" :key="index" class="menu-item"
          :class="{ active: currentDemoName === item.name }" @click="handleSelectDemo(item.component, item.name)">
          <span class="menu-item-text">{{ item.name }}</span>
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="content">
        <div class="content-container">
          <component :is="currentDemo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AutoHeightTransition from './components/AutoHeightTransition.vue'
import SvgOutlineAnimation from './components/SvgOutlineAnimation.vue'
import BollsLoading from './components/BollsLoading.vue'
import DynamicLoadStaticRes from './components/DynamicLoadStaticRes.vue'
import DialogExample from '@/components/Dialog/example/index.vue'
import StickyPosition from './components/StickyPosition.vue'
import WavesImage from './components/WavesImage.vue'
import MouseMoveDirection from './components/MouseMoveDirection.vue'

// 组件列表
const demoList = [
  { name: '高度自适应过渡', component: AutoHeightTransition },
  { name: '命令式弹窗示例', component: DialogExample },
  { name: 'SVG描边动画', component: SvgOutlineAnimation },
  { name: '小球加载动画', component: BollsLoading },
  { name: '动态加载静态资源', component: DynamicLoadStaticRes },
  { name: '粘性定位', component: StickyPosition },
  { name: '波浪效果', component: WavesImage },
  { name: '鼠标移动方向', component: MouseMoveDirection }
]

// 当前选中的组件和名称
const currentDemo = shallowRef(demoList[0].component)
const currentDemoName = ref(demoList[0].name)

// 选择组件
const handleSelectDemo = (component: any, name: string) => {
  currentDemo.value = component
  currentDemoName.value = name
}
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
  background-color: #f0f2f5;

  .demos-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .menu {
    width: 240px;
    height: 100%;
    border-right: 1px solid #e8e8e8;
    overflow-y: auto;
    background-color: #fff;
    padding: 16px 0;
    user-select: none;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e8e8e8;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
      background-color: #f5f5f5;
    }

    .menu-item {
      padding: 12px 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: flex;
      align-items: center;
      margin: 4px 8px;
      border-radius: 4px;

      &:hover {
        background-color: #f5f5f5;
        color: #1890ff;
      }

      &.active {
        background: linear-gradient(90deg, #e6f7ff 0%, #f0f9ff 100%);
        color: #1890ff;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1);

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #1890ff, #69c0ff);
          border-radius: 0 2px 2px 0;
        }

        .menu-item-text {
          transform: translateX(4px);
        }
      }

      .menu-item-text {
        transition: transform 0.3s ease;
      }
    }
  }

  .content {
    flex: 1;
    padding: 16px;
    background-color: #f2f3f4;
    overflow: hidden;

    .content-container {
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      overflow-x: hidden;
      overflow-y: auto;
    }

  }
}
</style>
