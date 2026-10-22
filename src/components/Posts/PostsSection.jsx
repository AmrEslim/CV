import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getPosts } from '../../content';
import PostList, { formatDate } from './PostList';
import './Posts.css';

const LATEST_COUNT = 3;

const PostsSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const posts = useMemo(() => getPosts(language), [language]);

  if (posts.length === 0) return null;

  const [latest, ...recent] = posts;

  return (
    <section id="posts" className="scene writing-preview">
      <div className="content-container posts-container">
        <div className="writing-heading">
          <div>
            <p className="eyebrow">{t('posts.recent')}</p>
            <h2>{t('posts.title')}</h2>
          </div>
          <Link to="/posts" className="text-link">{t('posts.allPosts')} <span aria-hidden="true">↗</span></Link>
        </div>

        <article className="featured-post">
          <div className="post-meta">
            <time dateTime={String(latest.date)}>{formatDate(latest.date, language)}</time>
            <span>{latest.readingMinutes} {t('posts.minRead')}</span>
          </div>
          <h3><Link to={`/posts/${latest.slug}`}>{latest.title}</Link></h3>
          {latest.summary && <p>{latest.summary}</p>}
          {latest.tags.length > 0 && (
            <ul className="post-tags" aria-label={t('posts.topics')}>
              {latest.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          )}
        </article>

        {recent.length > 0 && <PostList posts={recent.slice(0, LATEST_COUNT - 1)} />}
      </div>
    </section>
  );
};

export default PostsSection;
