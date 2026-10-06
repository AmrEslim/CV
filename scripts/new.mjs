// Usage: npm run new:project <slug> | npm run new:post <slug>
import { writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const [kind, slug] = process.argv.slice(2);
if (!['project', 'post'].includes(kind) || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug ?? '')) {
  console.error('Usage: node scripts/new.mjs <project|post> <kebab-case-slug>');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);

const templates = {
  project: {
    file: `src/content/projects/${slug}.json`,
    body: JSON.stringify(
      {
        order: 99,
        status: 'wip',
        category: 'embedded',
        featured: false,
        technologies: [],
        images: [],
        link: '',
        en: { title: slug, subtitle: '', description: '', features: ['Feature name: what it does'] },
        de: { title: slug, subtitle: '', description: '', features: [] },
      },
      null,
      2
    ) + '\n',
  },
  post: {
    file: `src/content/posts/${slug}.en.md`,
    body: `---\ntitle: ${slug}\ndate: ${today}\ntags: []\nsummary: \ndraft: true\n---\n\nWrite here.\n`,
  },
};

const { file, body } = templates[kind];
await mkdir(path.dirname(file), { recursive: true });
try {
  await access(file);
  console.error(`${file} already exists`);
  process.exit(1);
} catch {
  await writeFile(file, body);
  console.log(`Created ${file}`);
}
