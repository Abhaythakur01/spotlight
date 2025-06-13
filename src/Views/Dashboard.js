import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext'; 
import './Dashboard.css'; 

// --- Helper: Icon Components ---
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);

// --- Video Player Modal Component ---
const VideoPlayer = ({ videoUrl, onClose }) => {
    if (!videoUrl) return null;

    const getEmbedUrl = (url) => {
        try {
            let videoId;
            if (url.includes('youtu.be')) {
                videoId = new URL(url).pathname.split('/').pop();
            } else {
                videoId = new URL(url).searchParams.get('v');
            }
            // Add params for autoplay and better control
            return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0` : '';
        } catch (e) {
            console.error("Couldn't create embed URL", e);
            return '';
        }
    };
    
    const embedUrl = getEmbedUrl(videoUrl);
    if (!embedUrl) return null; // Don't render if URL is invalid

    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <button className="close-modal-btn" onClick={onClose}>&times;</button>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---
const Dashboard = () => {
    const { currentUser, userProfile, loading, updateUserProfile } = useAuth();

    const [bioText, setBioText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newVideoLink, setNewVideoLink] = useState('');
    const [playingVideo, setPlayingVideo] = useState(null);

    useEffect(() => {
        if (userProfile) {
            setBioText(userProfile.bio || '');
        }
    }, [userProfile]);

    const getYouTubeThumbnail = (url) => {
        try {
            let videoId;
            if (url.includes('youtu.be')) {
                videoId = new URL(url).pathname.split('/').pop();
            } else {
                videoId = new URL(url).searchParams.get('v');
            }
            return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 'https://placehold.co/480x360/1a1a1a/FFC107?text=Invalid+Link';
        } catch (error) {
            return 'https://placehold.co/480x360/1a1a1a/FFC107?text=Invalid+Link';
        }
    };

    const handleSaveClick = () => {
        updateUserProfile({ bio: bioText });
        setIsEditing(false);
    };

    const handleAddVideoClick = () => {
        if (!newVideoLink || !userProfile) return;
        const updatedVideos = [...(userProfile.videos || []), newVideoLink];
        updateUserProfile({ videos: updatedVideos });
        setNewVideoLink('');
    };

    if (loading || !userProfile) {
        return <div className="dashboard-loading">Loading Spotlight...</div>;
    }

    if (!currentUser) {
        return <div className="dashboard-loading">Please log in to view your dashboard.</div>;
    }

    return (
        // The <> fragment is key to letting the modal sit outside the main container
        <>
            <VideoPlayer videoUrl={playingVideo} onClose={() => setPlayingVideo(null)} />
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Welcome, {userProfile.displayName}</h1>
                    <p>This is your creative portfolio. Shape it, share it, and shine.</p>
                </header>

                <main className="dashboard-content">
                    {/* Profile Section */}
                    <section className="profile-section card">
                        <div className="profile-header">
                            <h2>My Profile</h2>
                            <button className="edit-btn" onClick={() => isEditing ? handleSaveClick() : setIsEditing(true)}>
                                {isEditing ? <><SaveIcon /> Save</> : <><EditIcon /> Edit</>}
                            </button>
                        </div>
                        <div className="profile-body">
                            <div className="profile-picture-container">
                                <img 
                                    key={userProfile.profileImageUrl} 
                                    src={userProfile.profileImageUrl} 
                                    alt="Profile" 
                                    className="profile-picture"
                                />
                            </div>
                            <div className="profile-details">
                                <h3>{userProfile.displayName}</h3>
                                {isEditing ? (
                                    <textarea 
                                        className="bio-textarea"
                                        value={bioText}
                                        onChange={(e) => setBioText(e.target.value)}
                                        placeholder="Tell your story..."
                                    />
                                ) : (
                                    <p className="bio-text">{userProfile.bio}</p>
                                )}
                            </div>
                        </div>
                    </section>
                    
                    {/* YouTube Showcase Section */}
                    <section className="youtube-section card">
                        <h2>My Showcase</h2>
                        <p className="subtitle">Add YouTube links to feature your performances.</p>
                        <div className="add-video-form">
                            <input 
                                type="text"
                                value={newVideoLink}
                                onChange={(e) => setNewVideoLink(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="video-input"
                            />
                            <button onClick={handleAddVideoClick} className="add-btn">Add Video</button>
                        </div>
                        <div className="video-grid">
                            {userProfile.videos && userProfile.videos.map((videoUrl, index) => (
                                <button key={index} className="video-thumbnail-card" onClick={() => setPlayingVideo(videoUrl)}>
                                    <img src={getYouTubeThumbnail(videoUrl)} alt="YouTube Thumbnail" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/480x360/1a1a1a/FFC107?text=Video'; }} />
                                    <div className="play-icon">
                                        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Coming Soon: Posts Section */}
                    <section className="posts-section card">
                        <h2>Studio Buzz</h2>
                         <p className="subtitle">Announce events or share your thoughts. Coming soon!</p>
                         <div className="coming-soon-overlay">
                            <textarea placeholder="What's on your mind?" disabled/>
                            <button className="add-btn" disabled>Post</button>
                         </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Dashboard;
