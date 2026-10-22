import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';

export const formatDate = (date, language) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date ?? '');
  return d.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-GB', {
    year: 'numeric', month: 'short', day: '2-digit',
  });
};

const PostList = ({ posts, emptyMessage }) => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  if (posts.length === 0) return <p className="posts-empty">{emptyMessage || t('posts.empty')}</p>;

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link to={`/posts/${post.slug}`} className="post-row">
            {post.cover && <img className="post-cover" src={post.cover} alt="" loading="lazy" decoding="async" />}
            <div className="post-row-body">
              <div className="post-meta">
                <time dateTime={String(post.date)}>{formatDate(post.date, language)}</time>
                <span>{post.readingMinutes} {t('posts.minRead')}</span>
              </div>
              <h3 className="post-title">{post.title}</h3>
              {post.summary && <p className="post-summary">{post.summary}</p>}
              {post.tags.length > 0 && (
                <ul className="post-tags" aria-label={t('posts.topics')}>
                  {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
