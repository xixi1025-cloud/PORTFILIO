import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, extname, join } from 'node:path';

const clientDir = join(process.cwd(), 'dist', 'client');
const workDir = join(clientDir, 'work');
const htmlFiles = readdirSync(workDir).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const slug = basename(file, '.html');
  const routeDir = join(workDir, slug);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(join(workDir, file), join(routeDir, 'index.html'));
}

writeFileSync(join(clientDir, '.nojekyll'), '');

const basePath = (process.env.STATIC_BASE_PATH ?? '').replace(/^\/*|\/*$/g, '');
if (basePath) {
  const prefix = `/${basePath}`;
  const textExtensions = new Set(['.html', '.rsc', '.css', '.js', '.json']);
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory)) {
      const path = join(directory, entry);
      if (statSync(path).isDirectory()) visit(path);
      else if (textExtensions.has(extname(entry))) files.push(path);
    }
  };

  visit(clientDir);
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    const updated = source
      .replace(/(["'])\/(?=[A-Za-z0-9_#])/g, `$1${prefix}/`)
      .replace(/url\((["']?)\/(?!\/)/g, `url($1${prefix}/`);
    if (updated !== source) writeFileSync(file, updated);
  }
  console.log(`GitHub Pages 子路径已写入：${prefix}/`);
}

console.log(`静态发布目录已整理：${htmlFiles.length} 个作品详情页支持无扩展名访问。`);
