/**
* @file DynamicLoadStaticRes.vue
* @description 动态加载静态资源
* @date 2025-04-29
*/
<template>
  <div>
    <el-button type="primary" @click="handleClick(403)">403</el-button>
    <el-button type="primary" @click="handleClick(404)">404</el-button>
    <el-button type="primary" @click="handleClick(500)">500</el-button>
  </div>
  <img :src="imgPath" alt="">
</template>

<script setup lang='ts'>
/**
 * 自动依赖发现：
 *   1、多媒体元素的静态链接
 *   2、样式中的静态链接
 *   3、动态导入语句中的静态或者半静态的链接
 */
const imgPath = ref<string>('')

// 点击切换图片
const handleClick = (code: number) => {
  /**
   * 第一种方案：加载common文件夹下所有.png结尾的图片，这些图片全部会被打包
   */
  // import(`@/assets/images/common/${code}.png`).then(res => {
  //   console.log(res);
  //   imgPath.value = res.default
  // })

  /**
   * 第二种方案：推荐使用
   */
  // new URL()是浏览器原生的API，不经过webpack/vite的构建过程，所以不能使用@路径别名
  const url = new URL(`../../../assets/images/common/${code}.png`, import.meta.url)
  console.log(url.pathname);

  imgPath.value = url.pathname
}

onMounted(() => {
  handleClick(403)
})
</script>

<style lang="scss" scoped></style>