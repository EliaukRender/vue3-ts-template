/**
 * @file form.vue
 * @description dialog组件中的自定义内容
 * @date 2025-04-25
 */
<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">

const form = ref({
  name: "",
});

const onSubmit = () => {
  console.log("onSubmit", form.value);
}

defineExpose({
  onSubmit,
})
</script>

<style></style>