<template>
  <div class="home">
    <el-button type="primary" @click="openDemoPage">打开Demos</el-button>
  </div>
</template>

<script setup lang="tsx">

const router = useRouter()

// 前往demos页面
const openDemoPage = () => {
  router.push('/demos')
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  overflow-y: auto;
}

.item {
  width: 400px;
  height: 200px;
  background-color: lightblue;
  margin-bottom: 50px;
  flex-shrink: 0;
}
</style>
