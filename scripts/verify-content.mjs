import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectDetails } from '../src/data/projectDetails.js';
import { projects } from '../src/data/projects.js';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];
const ids = new Set();
const orders = new Set();

for (const project of projects) {
  if (ids.has(project.id)) errors.push(`项目 ID 重复：${project.id}`);
  ids.add(project.id);

  if (orders.has(project.order)) errors.push(`项目序号重复：${project.order}`);
  orders.add(project.order);

  const detail = projectDetails[project.id];
  if (!detail) {
    errors.push(`缺少项目详情：${project.id}`);
    continue;
  }

  for (const file of detail.gallery ?? []) {
    const asset = resolve(root, 'src', 'assets', 'projects', project.id, file);
    if (!existsSync(asset)) errors.push(`缺少展示图片：${project.id}/${file}`);
  }

  if (project.url) {
    try {
      const url = new URL(project.url);
      if (url.protocol !== 'https:') errors.push(`外链必须使用 HTTPS：${project.url}`);
    } catch {
      errors.push(`外链格式错误：${project.url}`);
    }
  }
}

for (const id of Object.keys(projectDetails)) {
  if (!ids.has(id)) errors.push(`存在未展示的项目详情：${id}`);
}

for (const publicFile of ['favicon.svg', 'og.png']) {
  if (!existsSync(resolve(root, 'public', publicFile))) {
    errors.push(`缺少站点文件：public/${publicFile}`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(`内容检查通过：${projects.length} 个项目、全部展示图片和外链格式正常。`);
