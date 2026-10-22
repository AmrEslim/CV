---
title: How this site's content works
date: 2026-08-01
tags: [meta, react, vite]
summary: Adding a project or a post is a single file, no code changes.
---

Projects live in `src/content/projects/*.json` and posts in `src/content/posts/*.md`.

## Adding a post

Run `npm run new:post my-post-title`, edit the generated file, and commit.
Create `my-post-title.de.md` next to it for the German version; the English one is the fallback.
Remove `draft: true` from the front matter to publish it; drafts only show in `npm start`.

## Adding a project

Run `npm run new:project my-project`, fill in the `en` (and optionally `de`) block, and drop images into `public/images`.
Run `npm run images` to generate the `.webp` versions.

Delete this post once you have written your own.
