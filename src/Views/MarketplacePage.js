import React from 'react';
import './MarketplacePage.css';

// --- START: SVG Icon Components ---
const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
);
// --- END: SVG Icon Components ---


// Mock data for artists - later this will come from Firebase
const artists = [
  { id: 1, name: 'Samantha Rao', specialty: 'Stand-up Comedy', rating: 4.9, rate: 150, image: 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', isAvailable: true },
  { id: 2, name: 'David Chen', specialty: 'Poetry & Spoken Word', rating: 4.8, rate: 120, image: 'https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', isAvailable: true },
  { id: 3, name: 'Fatima Al-Jamil', specialty: 'Storytelling', rating: 5.0, rate: 200, image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', isAvailable: false },
  { id: 4, name: 'Leo Martinez', specialty: 'Improv Theatre', rating: 4.7, rate: 180, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', isAvailable: true },
];

const MarketplacePage = () => {
  return (
    <div className="marketplace-page">
      <header className="marketplace-header">
        <h1>Artist Marketplace</h1>
        <p>Book one-on-one sessions with our A-list and featured artists.</p>
      </header>
      <main className="marketplace-content">
        <div className="filter-bar">
          <div className="filter-group">
            <select name="category">
              <option value="">All Specialties</option>
              <option value="comedy">Stand-up Comedy</option>
              <option value="poetry">Poetry & Spoken Word</option>
              <option value="storytelling">Storytelling</option>
            </select>
            <select name="availability">
                <option value="">Availability</option>
                <option value="available">Available Now</option>
            </select>
          </div>
          <button className="filter-btn"><FilterIcon /> Apply Filters</button>
        </div>
        <div className="artist-grid">
            {artists.map(artist => (
                <div key={artist.id} className="artist-card">
                    <div className="artist-image-container">
                        <img src={artist.image} alt={artist.name} className="artist-image"/>
                        <div className={`availability-dot ${artist.isAvailable ? 'available' : ''}`}></div>
                    </div>
                    <div className="artist-info">
                        <h3 className="artist-name">{artist.name}</h3>
                        <p className="artist-specialty">{artist.specialty}</p>
                        <div className="artist-meta">
                            <span className="artist-rating"><StarIcon className="star-icon"/> {artist.rating}</span>
                            <span className="artist-rate">${artist.rate}/hr</span>
                        </div>
                    </div>
                    <button className="book-session-btn">Book a Session</button>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
