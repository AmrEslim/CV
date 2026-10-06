const BASE = import.meta.env.BASE_URL;
const imageUrl = (img) => (/^(https?:)?\/\//.test(img) ? img : `${BASE}images/${img}`);

const projectFiles = import.meta.glob('./projects/*.json', { eager: true, import: 'default' });
const postFiles = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

export const getProjects = (lang) =>
  Object.entries(projectFiles)
    .map(([file, data]) => {
      const { en, de, images = [], ...rest } = data;
      const text = { ...en, ...(lang === 'de' ? de : {}) };
      return {
        slug: file.match(/\/([^/]+)\.json$/)[1],
        status: 'active',
        ...rest,
        ...text,
        images: images.map(imageUrl),
      };
    })
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

// Supports `key: value` and `key: [a, b]`; anything richer belongs in the body.
const parseFrontMatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, value] = m;
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    } else if (value === 'true' || value === 'false') {
      meta[key] = value === 'true';
    } else {
      meta[key] = value.replace(/^["']|["']$/g, '');
    }
  }
  return { meta, body: match[2] };
};

// File names: <slug>.md or <slug>.<lang>.md
const allPosts = Object.entries(postFiles).map(([file, raw]) => {
  const [, slug, lang = 'en'] = file.match(/\/([^/]+?)(?:\.(en|de))?\.md$/);
  const { meta, body } = parseFrontMatter(raw);
  return {
    slug,
    lang,
    tags: [],
    ...meta,
    cover: meta.cover ? imageUrl(meta.cover) : null,
    body,
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
  };
});

export const getPosts = (lang) => {
  const bySlug = new Map();
  for (const post of allPosts) {
    if (post.draft && import.meta.env.PROD) continue;
    const current = bySlug.get(post.slug);
    if (!current || post.lang === lang || (current.lang !== lang && post.lang === 'en')) {
      bySlug.set(post.slug, post);
    }
  }
  return [...bySlug.values()].sort((a, b) => String(b.date).localeCompare(String(a.date)));
};
