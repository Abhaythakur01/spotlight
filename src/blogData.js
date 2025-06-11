// src/blogData.js

// Import your local images here, just like you did before.
// Make sure the path and file names are correct.
import standUpImage from './assets/stand-up.jpg';
import poetryImage from './assets/poetry.jpg';
import storytellingImage from './assets/storytelling.jpg';

// Define and export your posts from this single location.
export const mockPosts = [
  {
    id: '1',
    title: 'The Rise of Indie Stand-Up in the Digital Age',
    summary: 'How a new generation of comics is using digital platforms to build audiences and bypass traditional gatekeepers. An in-depth look at the tools and strategies for success.',
    imageUrl: standUpImage,
    content: 'In recent years, the landscape of stand-up comedy has undergone a seismic shift. Aspiring comedians no longer need to wait for a lucky break at a traditional comedy club. With platforms like YouTube, TikTok, and Instagram, they can build a global audience from their living rooms. This article explores the strategies that have proven most effective, from crafting viral short-form content to producing independent specials. We also interview three comics who have successfully navigated this new terrain, sharing their triumphs and tribulations.'
  },
  {
    id: '2',
    title: 'Poetry Slams: From Coffee Shops to Global Stages',
    summary: 'Explore the vibrant world of slam poetry. We trace its roots, celebrate its modern icons, and offer tips for aspiring poets looking to make their mark.',
    imageUrl: poetryImage,
    content: 'Full article content about poetry slams goes here...'
  },
  {
    id: '3',
    title: 'The Art of Storytelling: Crafting Narratives that Captivate',
    summary: 'What makes a story unforgettable? We dive into the essential elements of narrative structure, character development, and delivery with insights from master storytellers.',
    imageUrl: storytellingImage,
    content: 'Full article content about the art of storytelling goes here...'
  }
];