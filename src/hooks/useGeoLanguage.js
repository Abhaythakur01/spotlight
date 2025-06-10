import { useEffect } from 'react';
import axios from 'axios';

const regionLanguageMap = {
  'Tamil Nadu': 'ta',
  'Kerala': 'ml',
  'Karnataka': 'kn',
  'Andhra Pradesh': 'te',
  'Telangana': 'te'
};

const useGeoLanguage = () => {
  useEffect(() => {
    const detectUserLocation = async () => {
      try {
        const res = await axios.get('https://ipapi.co/json/');
        const region = res?.data?.region;
        const lang = regionLanguageMap[region];

        if (lang) {
          const interval = setInterval(() => {
            const combo = document.querySelector('select.goog-te-combo');
            if (combo) {
              combo.value = lang;
              combo.dispatchEvent(new Event('change'));
              clearInterval(interval);
            }
          }, 500);
        }
      } catch (err) {
        console.error('GeoLanguage error:', err);
      }
    };

    detectUserLocation();
  }, []);
};

export default useGeoLanguage;
