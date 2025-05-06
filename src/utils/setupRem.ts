/**
 * @file setupRem.ts
 * @description rem设置
 * @date 2025-05-06
 */

export function setupRem(): void {
  const setRem = () => {
    const htmlDom = document.documentElement;
    const width = htmlDom.clientWidth;
    if (width <= 1920) {
      htmlDom.style.fontSize = 16 + "px";
    } else {
      // 这里假设设计稿宽度大于1920px，划分为120份，即1rem = width / 120
      const fontSize = width / 120;
      htmlDom.style.fontSize = fontSize + "px";
    }
  };

  // 初始化
  setRem();

  // 改变窗口大小时重新设置
  window.addEventListener("resize", setRem);

  // 页面显示隐藏时重新设置
  document.addEventListener("visibilitychange", setRem);
}