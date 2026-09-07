# 赵雨鑫个人作品集

这是从当前网站导出的独立工程，包含页面代码、作品数据、图片素材和互动效果。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run check
```

`check` 会依次检查项目数据、图片文件、链接格式、代码规范和生产构建。

## 上线前配置

1. 复制 `.env.example` 为本地环境文件，并将 `NEXT_PUBLIC_SITE_URL` 设置为最终域名。
2. 运行 `npm run check`，确认检查全部通过。
3. 将 `dist/client/` 目录发布到静态网站托管服务。

工程采用静态导出，不依赖数据库或服务器端接口，适合 GitHub Pages、腾讯云 COS 或 CloudBase 静态托管。依赖缓存、临时检查文件和构建产物不会提交到 Git。

## 发布到 GitHub Pages

仓库已包含 `.github/workflows/deploy-pages.yml`。将源码推送到 GitHub 的 `main` 或 `master` 分支后，在仓库的 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**，工作流会自动构建并发布网站。

当前仓库对应的预计访问地址为：

`https://xixi1025-cloud.github.io/PORTFILIO/`

如需手动上传静态网站文件，可使用生成的 `outputs/github-pages-PORTFILIO.zip`。解压后上传其中的全部内容，入口文件是根目录的 `index.html`。
