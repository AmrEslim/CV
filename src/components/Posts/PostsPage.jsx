import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getPosts } from '../../content';
import PostList from './PostList';
import './Posts.css';

const PostsPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const posts = useMemo(() => getPosts(language), [language]);
  const pageTitle = `${t('posts.title')} | Amr Eslim`;
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const tags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags))].sort(), [posts]);
  const filteredPosts = posts.filter((post) => {
    const searchable = `${post.title} ${post.summary ?? ''} ${post.body} ${post.tags.join(' ')}`.toLowerCase();
    return searchable.includes(query.trim().toLowerCase()) && (!activeTag || post.tags.includes(activeTag));
  });

  useEffect(() => {
    const previous = document.title;
    document.title = pageTitle;
    return () => { document.title = previous; };
  }, [pageTitle]);

  return (
    <section className="scene posts-page">
      <div className="content-container posts-container">
        <Link to="/#hero" className="posts-back">{t('posts.back')}</Link>
        <header className="archive-header">
          <p className="eyebrow">Amr Eslim · Berlin</p>
          <h1>{t('posts.title')}</h1>
          <p>{t('posts.archiveIntro')}</p>
        </header>

        <div className="archive-tools">
          <label className="post-search">
            <span className="sr-only">{t('posts.search')}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('posts.search')}
            />
          </label>
          {tags.length > 0 && (
            <div className="tag-filters" role="group" aria-label={t('posts.filterTags')}>
              <button
                type="button"
                className={!activeTag ? 'active' : ''}
                aria-pressed={!activeTag}
                onClick={() => setActiveTag('')}
              >
                {t('posts.allTags')}
              </button>
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={activeTag === tag ? 'active' : ''}
                  aria-pressed={activeTag === tag}
                  onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <PostList posts={filteredPosts} emptyMessage={posts.length ? t('posts.noResults') : t('posts.empty')} />
      </div>
    </section>
  );
};

export default PostsPage;
