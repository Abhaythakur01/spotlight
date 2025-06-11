import React from 'react';
import { useParams } from 'react-router-dom';
import './ArtistCategoryPage.css';

const ArtistCategoryPage = () => {
  const { category } = useParams();

  // A helper function to format the URL parameter into a nice title
  const formatTitle = (slug) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const pageTitle = formatTitle(category);

  return (
    <div className="artist-category-container">
      <div className="artist-category-header">
        <h1 className="artist-category-title">Welcome, {pageTitle}s!</h1>
        <p className="artist-category-subtitle">
          This is the dedicated space for {pageTitle}s in the Spotlight community.
        </p>
        <p>More content and features coming soon!</p>
      </div>
    </div>
  );
};

export default ArtistCategoryPage;