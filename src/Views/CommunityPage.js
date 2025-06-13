import React from 'react';
import './CommunityPage.css';

// --- START: SVG Icon Components ---
const ThumbsUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h3z"/></svg>
);

const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const Share2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
);
// --- END: SVG Icon Components ---


// Mock data for posts - later this will come from Firebase
const posts = [
  { id: 1, author: 'Helena Jones', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', timestamp: '2h ago', text: 'Just finished a killer set at The Laughing Skull! The energy was insane tonight. 🔥 #standup #comedy', image: 'https://images.unsplash.com/photo-1598809405232-a424b4d62a74?q=80&w=2070&auto=format&fit=crop', likes: 102, comments: 12 },
  { id: 2, author: 'Raj Patel', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d', timestamp: '5h ago', text: 'Working on a new poem about the Mumbai monsoon. It\'s all about finding the rhythm in the rain. 🌧️', image: null, likes: 233, comments: 45 },
  { id: 3, author: 'Aisha Ahmed', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', timestamp: '1d ago', text: 'My next storytelling session is this Friday at The Cuckoo Club. Come through for some tales of travel and mischief!', image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop', likes: 88, comments: 7 },
];

const CommunityPage = () => {
  return (
    <div className="community-page">
      <header className="community-header">
        <h1>Community Hub</h1>
        <p>See what your fellow artists are creating, sharing, and talking about.</p>
      </header>
      <main className="community-content">
        <div className="create-post-card">
            <textarea placeholder="What's on your mind, artist?" />
            <button>Create Post</button>
        </div>
        <div className="post-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <img src={post.avatar} alt={post.author} className="post-avatar" />
                <div className="post-author-info">
                  <span className="post-author-name">{post.author}</span>
                  <span className="post-timestamp">{post.timestamp}</span>
                </div>
              </div>
              <p className="post-text">{post.text}</p>
              {post.image && <img src={post.image} alt="Post content" className="post-image" />}
              <div className="post-actions">
                <button className="action-btn"><ThumbsUpIcon /> <span>{post.likes}</span></button>
                <button className="action-btn"><MessageSquareIcon /> <span>{post.comments}</span></button>
                <button className="action-btn"><Share2Icon /> <span>Share</span></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
