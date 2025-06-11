// src/Views/BlogPage.js

import React from 'react';
import BlogPostCard from '../components/BlogPostCard';
import './BlogPage.css';

// --- UPDATE: Import your local images ---
import standUpImage from '../assets/stand-up.jpg';
import poetryImage from '../assets/poetry.jpg';
import storytellingImage from '../assets/storytelling.jpg';
// -----------------------------------------

// Mock data - replace with API call later
const mockPosts = [
  {
    id: '1',
    title: 'The Rise of Indie Stand-Up in the Digital Age',
    summary: 'How a new generation of comics is using digital platforms to build audiences and bypass traditional gatekeepers. An in-depth look at the tools and strategies for success.',
    // --- UPDATE: Use the imported image variable ---
    imageUrl: standUpImage,
    content: 'Full article content about stand-up comedy goes here...'
  },
  {
    id: '2',
    title: 'Poetry Slams: From Coffee Shops to Global Stages',
    summary: 'Explore the vibrant world of slam poetry. We trace its roots, celebrate its modern icons, and offer tips for aspiring poets looking to make their mark.',
    // --- UPDATE: Use the imported image variable ---
    imageUrl: poetryImage,
    content: 'Full article content about poetry slams goes here...'
  },
  {
    id: '3',
    title: 'The Art of Storytelling: Crafting Narratives that Captivate',
    summary: 'What makes a story unforgettable? We dive into the essential elements of narrative structure, character development, and delivery with insights from master storytellers.',
    // --- UPDATE: Use the imported image variable ---
    imageUrl: storytellingImage,
    content: 'Full article content about the art of storytelling goes here...'
  }
];

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