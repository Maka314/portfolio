# 🚀 Mingchen's Portfolio

一个基于 **Next.js** 构建的个人作品集网站，集成了博客系统与管理后台，支持 Markdown 文章编写与实时预览。

## ✨ 技术特点

### 核心框架

- **Next.js 16** — 基于 React 19 的全栈框架，采用 App Router 架构，支持服务端渲染（SSR）与静态生成（SSG）
- **TypeScript** — 全项目类型安全，提供完善的类型定义
- **Tailwind CSS 3** — 原子化 CSS 框架，搭配 `@tailwindcss/typography` 插件实现优雅的排版样式
- **Turbopack** — 开发环境使用 Next.js 内置的 Turbopack 加速构建

### 动画与交互

- **Motion (Framer Motion)** — 高性能动画库，驱动页面过渡与微交互
  - Hero 区域的 Aurora 极光背景动画
  - RotatingText 逐字旋转动画效果
  - ProjectCard 3D 透视跟随鼠标倾斜效果（基于 `useMotionValue` + `useSpring` + `useTransform`）
  - 页面元素的 Spring 弹性入场动画

### 博客系统

- **Markdown 驱动** — 文章以 `.md` 文件存储，使用 `gray-matter` 解析 frontmatter 元数据（标题、日期、标签等）
- **React Markdown** — 实时 Markdown 渲染，支持在博客详情页和管理后台预览中展示
- **静态生成** — 博客文章页面通过 `generateStaticParams` 实现按需静态生成，优化加载性能
- **灵活存储** — 通过 `POSTS_DIR` 环境变量可自定义文章存储路径，支持外部持久化目录

### 管理后台

- **JWT 认证** — 基于 `jose` 库实现无状态 JWT 认证，支持 HttpOnly Cookie + Secure + SameSite 安全策略
- **路由守卫** — 通过 Next.js Middleware 实现后台路由保护，未登录自动重定向至登录页
- **RESTful API** — 完整的 CRUD API（`/api/posts`、`/api/posts/[slug]`），支持文章的创建、读取、更新和删除
- **富编辑体验** — 管理后台集成可调节侧边栏（`ResizableSidebar`）、编辑/预览/分屏三种视图模式、实时 Markdown 预览
- **自定义 Hook** — `useAdminPosts` 封装所有后台状态管理逻辑，实现关注点分离

### UI 组件

- **AuroraBackground** — CSS 动画驱动的极光渐变背景
- **RotatingText** — 支持逐字符分割、交错动画、自动轮播的文字旋转组件
- **ProjectCard** — 3D 透视交互卡片，鼠标跟随倾斜 + 弹性缩放
- **SectionHeading** — 统一的章节标题组件
- **深色模式** — 基于 `dark:` 变体的完整深色模式支持

### 部署优化

- **Standalone 输出** — `next.config.ts` 配置 `output: "standalone"`，生成独立的生产构建产物
- **多阶段 Docker 构建** — 基于 `node:20-alpine`，分离依赖安装、构建和生产运行三个阶段，最小化镜像体积
- **非 root 运行** — 生产容器使用专用 `nextjs` 用户运行，增强安全性
- **外部持久化** — Docker 部署支持通过 Volume 挂载实现博客文章数据持久化

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页（Hero + About + Projects）
│   ├── layout.tsx          # 根布局（Geist 字体 + 深色模式）
│   ├── globals.css         # 全局样式
│   ├── admin/page.tsx      # 管理后台仪表盘
│   ├── login/page.tsx      # 管理员登录页
│   ├── posts/[slug]/       # 博客文章详情页（SSG）
│   └── api/
│       ├── auth/           # 登录/登出 API
│       └── posts/          # 文章 CRUD API
├── components/
│   ├── Hero.tsx            # 首屏英雄区域
│   ├── About.tsx           # 个人介绍
│   ├── Projects.tsx        # 项目展示
│   ├── Footer.tsx          # 页脚
│   ├── admin/              # 管理后台组件
│   │   ├── PostEditor/     # 文章编辑器
│   │   ├── PreviewPane/    # Markdown 实时预览
│   │   ├── ContentEditor/  # Markdown 编辑区
│   │   ├── PostList/       # 文章列表
│   │   ├── MetadataForm/   # 元数据表单
│   │   ├── ResizableSidebar/ # 可拖拽调节侧边栏
│   │   └── ...
│   └── ui/                 # 通用 UI 组件
│       ├── aurora_background/  # 极光背景
│       ├── rotating_text/      # 旋转文字
│       ├── project_card/       # 3D 项目卡片
│       └── section_heading/    # 章节标题
├── hooks/
│   └── useAdminPosts.ts    # 管理后台状态管理 Hook
├── lib/
│   ├── auth.ts             # JWT 认证工具
│   └── markdown.ts         # Markdown 文件读取工具
├── types/
│   └── admin.ts            # TypeScript 类型定义
└── proxy.ts                # Next.js Middleware 路由守卫
```

## 🛠️ 快速开始

### 环境要求

- Node.js 20+
- npm / yarn / pnpm

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/Maka314/portfolio.git
cd portfolio

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的配置

# 启动开发服务器（Turbopack 加速）
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `ADMIN_PASSWORD` | ✅ | 管理后台登录密码 |
| `JWT_SECRET` | ✅ | JWT 签名密钥，建议使用高强度随机字符串 |
| `POSTS_DIR` | ❌ | 博客文章存储目录，默认为 `src/content/posts` |

## 🚢 部署

### 方式一：Docker 部署（推荐）

项目提供了多阶段构建的 Dockerfile 和便捷构建脚本：

```bash
# 使用构建脚本（自动读取 package.json 中的版本号打标签）
./build_docker.sh

# 或手动构建
docker build -t portfolio:latest .
```

运行容器（挂载 Volume 实现文章持久化）：

```bash
docker run -d \
  -p 3000:3000 \
  -v /path/to/your/posts:/data/posts \
  -e ADMIN_PASSWORD=your_password \
  -e JWT_SECRET=your_secret \
  -e POSTS_DIR=/data/posts \
  portfolio
```

也可使用 Docker Compose：

```bash
cp docker-compose.example.yml docker-compose.yml
# 编辑 docker-compose.yml 配置凭据
docker-compose up -d
```

### 方式二：Vercel 部署

直接导入 GitHub 仓库到 [Vercel](https://vercel.com)，配置环境变量即可一键部署。

### 方式三：传统部署

```bash
# 构建
npm run build

# 启动生产服务
npm start
```

> 注意：使用 standalone 输出模式，生产环境只需 `node server.js` 即可运行。

## 📝 博客文章格式

文章以 Markdown 文件存储，支持 frontmatter 元数据：

```markdown
---
title: 文章标题
date: 2025-01-01
description: 文章简介
tags: [标签1, 标签2]
---

文章正文内容...
```

## 📄 License

MIT
