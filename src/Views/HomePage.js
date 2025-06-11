import React, { useState } from 'react';
import './HomePage.css';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// UPDATE: Import your local images here.
// Make sure you have created a 'carousel' folder inside 'src/assets/'
// and placed your images there.
import image1 from '../assets/carousel/image1.png';
import image2 from '../assets/carousel/image2.png';
import image3 from '../assets/carousel/image3.png';
import image4 from '../assets/carousel/image4.png';

// The array now uses the imported images.
const carouselImages = [
  image1,
  image2,
  image3,
  image4,
];

function HomePage() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="homepage-content">
      <section id="why-spotlight" className="why-spotlight-section">
        {/* Left Column: Image Carousel */}
        <div className="image-carousel-container">
          <img 
            src={carouselImages[currentIndex]} 
            alt="Spotlight feature" 
            className="carousel-image" 
          />
          <button onClick={handlePrev} className="carousel-btn prev" aria-label="Previous image">
            <FaChevronLeft />
          </button>
          <button onClick={handleNext} className="carousel-btn next" aria-label="Next image">
            <FaChevronRight />
          </button>
          <div className="carousel-dots">
            {carouselImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="text-content-container">
          <h2 className="section-title">{t('whySpotlightTitle')}</h2>
          <div className="spotlight-description-content">
            <p>{t('spotlightBrief1')}</p>
            <p>{t('spotlightBrief2')}</p>
            <p>{t('spotlightBrief3')}</p>
            <p>{t('spotlightBrief4')}</p>
          </div>
        </div>
      </section>
      {/* Other homepage sections can be added here */}
    </main>
  );
}
export default HomePage;
