# Spotlight

### Project Overview

Spotlight is a dynamic and feature-rich web application built with React. It serves as a platform for artists and the community, offering features like a blog, artist showcases, membership options, a marketplace, and a community section. The application is designed with a modern aesthetic and an emphasis on user experience, incorporating smooth scrolling and animations.

### Core Technologies

The project is built on the following core technologies:

  * **React**: A popular JavaScript library for building user interfaces.
  * **Firebase**: Used for backend services, including authentication, database, and analytics.
  * **React Router**: For handling navigation and routing within the single-page application.
  * **GSAP (GreenSock Animation Platform)**: For creating high-performance animations.
  * **Three.js & React Three Fiber**: For creating and displaying 3D graphics.

### Features

The application includes the following key features and pages:

  * **Authentication**: User authentication is handled through Firebase, with protected routes for logged-in users.
  * **Dashboard**: A personalized space for authenticated users.
  * **Blog**: A blog section with individual post pages.
  * **Artist Pages**: Dedicated pages to showcase different types of artists.
  * **Membership**: A section for membership information and options.
  * **Community & Marketplace**: Recently added sections to foster community interaction and commerce.

### Getting Started

To get the project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Firebase:**
      * Create a Firebase project.
      * Create a `.env` file in the root of the project and add your Firebase configuration keys (e.g., `REACT_APP_API_KEY`, `REACT_APP_AUTH_DOMAIN`, etc.).
4.  **Run the application:**
    ```bash
    npm start
    ```

This will start the development server, and you can view the application in your browser, typically at `http://localhost:3000`.
