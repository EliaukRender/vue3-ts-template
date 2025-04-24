/// <reference types="vite/client" />

// 声明Vue文件
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const component: DefineComponent<{}, {}, any> | Vue;
//   export default component;
// }

// 添加 SVG 图标虚拟模块的类型声明
declare module 'virtual:svg-icons-register' {
  const content: any
  export default content
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 可以在这里添加更多的环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 