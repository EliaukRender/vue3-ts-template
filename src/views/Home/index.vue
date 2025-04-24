<template>
  <div class="home">
    <div class="item" v-slide-in="() => {}" v-for="item in 10" :key="item" ></div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {

});
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
