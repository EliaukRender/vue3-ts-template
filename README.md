# Vue 3 Universal Template

这是一个基于 Vue 3 的通用项目模板，集成了以下技术栈：

- Vue 3
- TypeScript
- Pinia (状态管理)
- Vue Router (路由管理)
- Axios (HTTP 请求)
- SCSS (样式处理)
- Element Plus (UI 组件库)
- PostCSS (CSS 处理)
- Vite (构建工具)

## 项目结构

```text
src/
├── api/          # API 请求相关
├── assets/       # 静态资源
├── components/   # 公共组件
│   ├── Dialog/   # 对话框组件
│   ├── FixedWhRadio/  # 固定宽高比单选框组件
│   ├── Loading/  # 加载组件
│   ├── Message/  # 消息提示组件
│   └── SvgIcon/  # SVG 图标组件
├── composables/  # 组合式函数
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── styles/       # 全局样式
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
│   └── loadGlobalPlugins.ts  # 全局插件加载工具
└── views/        # 页面组件
    ├── Demos/    # 演示页面
    │   ├── components/  # 演示用组件
    │   │   ├── AutoHeightTransition.vue  # 自动高度过渡动画组件
    │   │   ├── BollsLoading.vue         # 球体加载动画组件
    │   │   └── SvgOutlineAnimation.vue  # SVG 描边动画组件
    │   └── js/         # JavaScript/TypeScript 相关演示
    │       ├── functionOverloading/  # 函数重载演示
    │       └── typescriptDemos/      # TypeScript 特性演示
    └── Home/     # 首页
```

## 开始使用

### 安装依赖

```bash
# node版本推荐
nvm install 18.18.0
nvm use 18.18.0
```

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 环境变量

- `VITE_API_BASE_URL`: API 基础 URL

## 特性

- 使用 TypeScript 进行类型检查
- 使用 Pinia 进行状态管理
- 使用 Vue Router 进行路由管理
- 使用 Axios 进行 HTTP 请求
- 使用 SCSS 进行样式处理
- 支持环境变量配置
- 支持组件自动导入
- 支持路由懒加载
- 集成 Element Plus UI 组件库
- 支持 PostCSS 和 PostCSS Preset Env
- 支持 px 到 rem 的自动转换
- 支持 SVG 图标自动导入
- 支持 Vue JSX
- 支持 TypeScript 严格模式
- 使用 Vite 6.x 作为构建工具
- 支持 Vue 3.5.x 新特性
