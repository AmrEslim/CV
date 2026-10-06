import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getPosts } from '../../content';
import { formatDate } from './PostList';
import './Posts.css';

const markdownComponents = {
  a: ({ href, children }) => {
    const external = /^https?:\/\//.test(href ?? '');
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    );
  },
};

const PostPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const post = useMemo(() => getPosts(language).find((p) => p.slug === slug), [language, slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return undefined;
    const previous = document.title;
    document.title = `${post.title} | Amr Eslim`;
    return () => { document.title = previous; };
  }, [post]);

  return (
    <section className="scene posts-page">
      <article className="content-container posts-container">
        <Link to="/posts" className="posts-back">{t('posts.back')}</Link>
        {post ? (
          <>
            <h1 className="post-heading">{post.title}</h1>
            <div className="post-meta">
              <time dateTime={String(post.date)}>{formatDate(post.date, language)}</time>
              <span>{post.readingMinutes} {t('posts.minRead')}</span>
              {post.tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
            </div>
            {post.cover && <img className="post-hero-image" src={post.cover} alt="" />}
            <div className="post-body">
              <ReactMarkdown components={markdownComponents}>{post.body}</ReactMarkdown>
            </div>
          </>
        ) : (
          <p className="posts-empty">{slug}: {t('posts.notFound')}</p>
        )}
      </article>
    </section>
  );
};

export default PostPage;
