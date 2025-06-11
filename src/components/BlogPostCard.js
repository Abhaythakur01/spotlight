import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPostCard.css';

const BlogPostCard = ({ post }) => {
  return (
    <div className="blog-post-card">
      <div className="blog-card-text">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-summary">{post.summary}</p>
        <Link to={`/blog/${post.id}`} className="blog-card-read-more">
          Read Article &rarr;
        </Link>
      </div>
      <div className="blog-card-image-wrapper">
        <img src={post.imageUrl} alt={post.title} className="blog-card-image" />
      </div>
    </div>
  );
};

export default BlogPostCard;