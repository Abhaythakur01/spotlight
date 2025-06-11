import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPostPage.css';

// You would typically fetch this data, but for now, we'll reuse the mock data.
// In a real app, you might pass the data via state or fetch by ID.
const mockPosts = [
    { id: '1', title: 'The Rise of Indie Stand-Up in the Digital Age', summary: '...', imageUrl: 'https://via.placeholder.com/800x400.png/282c34/fca311?text=Stand-Up', content: 'In recent years, the landscape of stand-up comedy has undergone a seismic shift. Aspiring comedians no longer need to wait for a lucky break at a traditional comedy club. With platforms like YouTube, TikTok, and Instagram, they can build a global audience from their living rooms. This article explores the strategies that have proven most effective, from crafting viral short-form content to producing independent specials. We also interview three comics who have successfully navigated this new terrain, sharing their triumphs and tribulations.' },
    { id: '2', title: 'Poetry Slams: From Coffee Shops to Global Stages', summary: '...', imageUrl: 'https://via.placeholder.com/800x400.png/282c34/fca311?text=Poetry', content: 'Full article content about poetry slams goes here...' },
    { id: '3', title: 'The Art of Storytelling: Crafting Narratives that Captivate', summary: '...', imageUrl: 'https://via.placeholder.com/800x400.png/282c34/fca311?text=Storytelling', content: 'Full article content about the art of storytelling goes here...' }
];

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
      <img src={post.imageUrl} alt={post.title} className="blog-post-main-image" />
      <div className="blog-post-content">
        <p>{post.content}</p>
      </div>
    </article>
  );
};

export default BlogPostPage;