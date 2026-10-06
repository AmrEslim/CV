import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useLanguage } from '../../context/LanguageContext';
import { getPosts } from '../../content';
import PostList from './PostList';
import './Posts.css';

const LATEST_COUNT = 3;

const PostsSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const posts = useMemo(() => getPosts(language), [language]);

  if (posts.length === 0) return null;

  return (
    <section id="posts" className="scene">
      <div className="content-container posts-container">
        <h2 className="section-title">{t('posts.title')}</h2>
        <PostList posts={posts.slice(0, LATEST_COUNT)} />
        {posts.length > LATEST_COUNT && (
          <Link to="/posts" className="posts-more">{t('posts.allPosts')}</Link>
        )}
      </div>
    </section>
  );
};

export default PostsSection;
