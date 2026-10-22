// Publishes the committed site to the gh-pages branch. The github-pages environment only
// accepts deployments from gh-pages, so the Actions workflow on main cannot deploy.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';

const noPush = process.argv.includes('--no-push');
const git = (args, cwd) =>
  execFileSync('git', ['-c', `safe.directory=${cwd.replaceAll('\\', '/')}`, ...args], {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim();

const root = process.cwd();

if (git(['status', '--porcelain', '--untracked-files=no'], root)) {
  console.error('Uncommitted changes found. Commit them first so the deploy matches a commit.');
  process.exit(1);
}

const head = git(['log', '-1', '--format=%h %s'], root);
const work = mkdtempSync(path.join(tmpdir(), 'cv-deploy-'));
const buildDir = path.join(work, 'build');
const treeDir = path.join(work, 'gh-pages');
let worktreeAdded = false;

try {
  console.log(`Building ${head}`);
  const viteDir = path.dirname(createRequire(import.meta.url).resolve('vite/package.json'));
  const vite = path.join(viteDir, JSON.parse(readFileSync(path.join(viteDir, 'package.json'), 'utf8')).bin.vite);
  execFileSync(process.execPath, [vite, 'build', '--outDir', buildDir, '--emptyOutDir'], {
    cwd: root,
    stdio: 'inherit',
  });

  git(['fetch', 'origin', 'gh-pages'], root);
  git(['worktree', 'add', '--detach', treeDir, 'origin/gh-pages'], root);
  worktreeAdded = true;

  for (const entry of readdirSync(treeDir)) {
    if (entry !== '.git') rmSync(path.join(treeDir, entry), { recursive: true, force: true });
  }
  cpSync(buildDir, treeDir, { recursive: true });

  git(['add', '-A'], treeDir);
  if (!git(['status', '--porcelain'], treeDir)) {
    console.log('gh-pages already matches this build. Nothing to deploy.');
  } else {
    git(['-c', 'core.autocrlf=false', 'commit', '-q', '-m', `Deploy ${head}`], treeDir);
    console.log(git(['log', '-1', '--oneline'], treeDir));
    if (noPush) {
      console.log('--no-push: skipping push.');
    } else {
      git(['push', 'origin', 'HEAD:gh-pages'], treeDir);
      console.log('Pushed to gh-pages. GitHub Pages usually takes a minute or two to update.');
    }
  }
} finally {
  if (worktreeAdded) git(['worktree', 'remove', '--force', treeDir], root);
  git(['worktree', 'prune'], root);
  rmSync(work, { recursive: true, force: true });
}
