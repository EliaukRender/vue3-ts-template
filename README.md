# Vue 3 Universal Template

这是一个基于 Vue 3 的通用项目模板，集成了以下技术栈：

- Vue 3
- TypeScript
- Pinia (状态管理)
- Vue Router (路由管理)
- Axios (HTTP 请求)
- SCSS (样式处理)

## 项目结构

```
src/
├── api/          # API 请求相关
├── assets/       # 静态资源
├── components/   # 公共组件
├── composables/  # 组合式函数
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── styles/       # 全局样式
├── types/        # TypeScript 类型定义
├── utils/        # 工具函数
└── views/        # 页面组件
```

## 开始使用

1. 安装依赖

```bash
# node版本推荐
nvm install 18.18.0
nvm use 18.18.0
```

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

3. 构建生产版本

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
