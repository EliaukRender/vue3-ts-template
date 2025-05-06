/**
 * @file index.ts
 * @description  颜色相关的处理工具
 * @date 2025-05-04
 */

/**
 * @description: 将16进制的颜色转换成rgba格式的颜色
 * @return rgba格式的颜色
 * @param hex string 16进制颜色
 * @param alpha number rgba颜色
 */
export const hexToRgba = (hex: string, alpha = 1): string => {
  hex = hex.replace('#', '');

  // 将三个颜色通道分别提取出来
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 返回 RGB 格式的颜色值
  return 'rgba(' + r + ', ' + g + ', ' + b + ',' + alpha + ')';
};
