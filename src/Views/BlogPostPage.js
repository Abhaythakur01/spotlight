// src/Views/BlogPostPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPostPage.css';

// UPDATE: Import the mockPosts array from our new central data file.
import { mockPosts } from '../blogData';

// The local mockPosts array has been removed from this file.

const BlogPostPage = () => {
  const { postId } = useParams();
  const post = mockPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h2>Post not found!</h2>
        <Link to="/blog">Back to all posts</Link>
      </div>
    );
  }

  return (
    <article className="blog-post-container">
      <h1 className="blog-post-title">{post.title}</h1>
      {/* This img tag will now receive the correct local image path */}
      <img src={post.imageUrl} alt={post.title} className="blog-post-main-image" />
      <div className="blog-post-content">
        <p>{post.content}</p>
      </div>
    </article>
  );
};

export default BlogPostPage;