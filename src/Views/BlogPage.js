// src/Views/BlogPage.js

import React from 'react';
import BlogPostCard from '../components/BlogPostCard';
import './BlogPage.css';

// UPDATE: Import the mockPosts array from our new central data file.
import { mockPosts } from '../blogData';

// The local mockPosts array has been removed from this file.

const BlogPage = () => {
  return (
    <div className="blog-page-container">
      <div className="blog-page-header">
        <h1 className="blog-page-title">Fresh Posts</h1>
        <p className="blog-page-subtitle">Insights and stories from the world of performing arts.</p>
      </div>
      <div className="blog-posts-list">
        {mockPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;