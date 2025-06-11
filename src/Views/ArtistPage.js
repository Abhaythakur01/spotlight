import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArtistPage.css';

// --- Placeholder Data ---
// In a real application, this data would come from a database like Firestore.
const artistData = {
    'stand-up-comic': {
        title: 'Stand-up Comedy',
        description: 'Stand-up comedy is a comedic performance to a live audience, in which the performer speaks directly to them from the stage. It is one of the most raw and engaging forms of live entertainment.',
        images: ['/assets/comedy-1.jpg', '/assets/comedy-2.jpg', '/assets/comedy-3.jpg'],
        events: [
            { id: 1, title: 'Friday Night Laughs', date: 'Oct 25, 2025', venue: 'The Comedy Club, Mumbai' },
            { id: 2, title: 'Open Mic Bonanza', date: 'Nov 02, 2025', venue: 'Canvas Laugh Club, Delhi' },
        ]
    },
    'poet': {
        title: 'Poetry & Spoken Word',
        description: 'Poetry is a form of literature that uses aesthetic and often rhythmic qualities of language to evoke meanings in addition to, or in place of, the prosaic ostensible meaning. Spoken word is a performance art that is word-based.',
        images: ['/assets/poetry-1.jpg', '/assets/poetry-2.jpg', '/assets/poetry-3.jpg'],
        events: [
            { id: 1, title: 'An Evening of Verse', date: 'Oct 28, 2025', venue: 'Prithvi Theatre, Mumbai' },
            { id: 2, title: 'Slam Poetry Sunday', date: 'Nov 05, 2025', venue: 'Atta Galatta, Bangalore' },
        ]
    },
    'singer': {
        title: 'Singers & Vocalists',
        description: 'From classical to contemporary, singers use their voices to create melody and harmony. This category celebrates every vocalist who brings stories to life through song.',
        images: ['/assets/singer-1.jpg', '/assets/singer-2.jpg', '/assets/singer-3.jpg'],
        events: [
            { id: 1, title: 'Acoustic Unplugged Night', date: 'Nov 10, 2025', venue: 'The Finch, Mumbai' },
        ]
    },
    'storyteller': {
        title: 'Storytellers',
        description: 'Storytelling is the ancient art of conveying events in words, sounds, and images. Our platform is a stage for modern-day bards to captivate audiences with their narratives.',
        images: ['/assets/storyteller-1.jpg', '/assets/storyteller-2.jpg', '/assets/storyteller-3.jpg'],
        events: [
            { id: 1, title: 'Tall Tales Tuesday', date: 'Nov 12, 2025', venue: 'The Habitat, Mumbai' },
        ]
    },
    'dancer': {
        title: 'Dancers & Choreographers',
        description: 'Dance is the art of movement. From contemporary to classical, hip-hop to salsa, we celebrate the artists who express emotions and stories through the language of their bodies.',
        images: ['/assets/dancer-1.jpg', '/assets/dancer-2.jpg', '/assets/dancer-3.jpg'],
        events: [
            { id: 1, title: 'Urban Motion: A Hip-Hop Showcase', date: 'Nov 15, 2025', venue: 'NCPA, Mumbai' },
            { id: 2, title: 'Kathak Evening', date: 'Nov 22, 2025', venue: 'Kala Ghoda Arts Precinct' },
        ]
    },
    'theater-artist': {
        title: 'Theater Artists',
        description: 'Theater is a collaborative form of fine art that uses live performers, typically actors or actresses, to present the experience of a real or imagined event before a live audience.',
        images: ['/assets/theater-1.jpg', '/assets/theater-2.jpg', '/assets/theater-3.jpg'],
        events: [
            { id: 1, title: 'A Midsummer Night\'s Dream', date: 'Nov 20, 2025', venue: 'The Royal Opera House, Mumbai' },
        ]
    },
};

// --- Reusable Image Carousel ---
const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    if (!images || images.length === 0) {
        return <div className="carousel-container placeholder"></div>;
    }

    return (
        <div className="carousel-container">
            <button onClick={goToPrevious} className="carousel-btn prev">‹</button>
            <div className="carousel-slide" style={{ backgroundImage: `url(${images[currentIndex]})` }}></div>
            <button onClick={goToNext} className="carousel-btn next">›</button>
        </div>
    );
};

// --- Reusable Upcoming Events Section ---
const UpcomingEvents = ({ events }) => {
    if (!events || events.length === 0) {
        return (
            <div className="upcoming-events">
                <h3>Upcoming Events</h3>
                <p>No upcoming events scheduled. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            <div className="events-list">
                {events.map(event => (
                    <div key={event.id} className="event-card">
                        <h4>{event.title}</h4>
                        <p>{event.date} • {event.venue}</p>
                        <Link to={`/events/${event.id}`} className="event-ticket-btn">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Main Artist Page Component ---
export default function ArtistPage() {
    const { artistType } = useParams(); // Matches the :artistType in the URL
    const [data, setData] = useState(null);

    useEffect(() => {
        const currentArtistData = artistData[artistType.toLowerCase()];
        setData(currentArtistData || { title: "Category Not Found", description: "", images: [], events: [] });
    }, [artistType]);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="artist-page">
            <ImageCarousel images={data.images} />
            <div className="artist-page-content">
                <div className="artist-description">
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                <UpcomingEvents events={data.events} />
            </div>
        </div>
    );
}