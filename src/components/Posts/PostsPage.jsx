import React, { useMemo } from 'react';
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

  return (
    <section className="scene posts-page">
      <div className="content-container posts-container">
        <Link to="/" className="posts-back">{t('posts.back')}</Link>
        <h1 className="section-title">{t('posts.title')}</h1>
        <PostList posts={posts} />
      </div>
    </section>
  );
};

export default PostsPage;
