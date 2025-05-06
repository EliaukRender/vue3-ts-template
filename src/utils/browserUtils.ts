/**
 * @file browserUtils
 * @description 浏览器工具
 * @date 2025-05-06
 */

/**
 * 支持的语言类型
 */
export type SupportedLanguage = 'zh' | 'en';

/**
 * 中文语言标识符
 */
const CHINESE_LANGUAGE_CODES = [
  'cn',
  'zh',
  'zh-cn',
  'zh-tw',
  'zh-hk',
  'zh-sg',
  'zh-mo'
] as const;

/**
 * @description 获取浏览器默认语言
 * @returns {SupportedLanguage} 返回支持的语言类型
 */
export function getBrowserLang(): SupportedLanguage {
  // 获取浏览器语言并转换为小写
  const browserLang = navigator.language.toLowerCase();
  
  // 检查是否包含中文语言代码
  const isChinese = CHINESE_LANGUAGE_CODES.some(code => 
    browserLang.startsWith(code) || browserLang.includes(code)
  );
  
  return isChinese ? 'zh' : 'en';
}