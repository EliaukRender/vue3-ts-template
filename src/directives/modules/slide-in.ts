/**
 * @file slide-in.ts
 * @description 元素在进入视口的时候, 实现缓慢出现的效果
 * @date 2025-04-24
 */

import type { Directive, DirectiveBinding } from "vue";

// 默认动画配置
const DEFAULT_CONFIG = {
  offset: 200, // 动画偏移量
  duration: 300, // 动画持续时间
  easing: "ease-out", // 动画缓动函数
  direction: "up", // 动画方向：up, down, left, right
  opacity: 0.2, // 起始透明度
};

// 获取动画配置
const getAnimationConfig = (binding: DirectiveBinding) => {
  // 如果binding.value是对象，则使用自定义配置
  if (typeof binding.value === "object") {
    return {
      ...DEFAULT_CONFIG,
      ...binding.value,
    };
  }
  return DEFAULT_CONFIG;
};

// 获取动画关键帧
const getKeyframes = (config: typeof DEFAULT_CONFIG) => {
  const { offset, opacity, direction } = config;
  let transform = "";

  switch (direction) {
    case "up":
      transform = `translateY(${offset}px)`;
      break;
    case "down":
      transform = `translateY(-${offset}px)`;
      break;
    case "left":
      transform = `translateX(${offset}px)`;
      break;
    case "right":
      transform = `translateX(-${offset}px)`;
      break;
    default:
      transform = `translateY(${offset}px)`;
  }

  return [
    {
      transform,
      opacity,
    },
    {
      transform: "translate(0)",
      opacity: 1,
    },
  ];
};

// 观察器
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target as HTMLElement);
      if (animation) {
        animation.play();
        observer.unobserve(entry.target); // 动画播放完毕后取消监听
      }
    }
  });
});

// animation与监听元素的映射
const map = new WeakMap<HTMLElement, Animation>();

// 判断元素是否在视口下方
const belowViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
};

// 指令实现
const slideIn: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 如果元素不在视口下方, 则不进行动画
    if (!belowViewport(el)) {
      return;
    }
    // 获取动画配置
    const config = getAnimationConfig(binding);
    // 创建动画对象
    const animation = el.animate(getKeyframes(config), {
      duration: config.duration,
      easing: config.easing,
      fill: "forwards",
    });
    // 暂停动画
    animation.pause();
    // 监听元素
    observer.observe(el);
    // 将动画对象与元素进行关联
    map.set(el, animation);
  },

  beforeUnmount(el: HTMLElement) {
    observer.unobserve(el);
    map.delete(el);
  },
};

export default slideIn;
