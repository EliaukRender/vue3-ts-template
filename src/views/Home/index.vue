<template>
  <div class="home" v-resize-observer="handleResize">
    <SvgIcon name="expression-1" />
    <SvgIcon name="expression-1" :icon-style="{ width: '2em', height: '2em' }"></SvgIcon>

    <div class="item"></div>
  </div>
</template>

<script setup lang="ts">
import { showFullScreenLoading, hideFullScreenLoading } from "@/components/Loading/loading";
defineOptions({
  name: 'Home'
})

const handleResize = () => {
  console.log("handleResize");
}

onMounted(() => {
  console.log("onMounted");
  showFullScreenLoading();

  setTimeout(() => {
    hideFullScreenLoading();
  }, 30000);
})
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  overflow-y: auto;
}
.item {
  // width: 1rem;
  // height: 1rem;
  width: 100px;
  height: 100px;
  background-color: lightblue;
}

.icon-container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
  color: #333;
  &:hover {
    color: #409eff;
  }
}
</style>
