// src/components/AnimateOnScroll.js

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const AnimateOnScroll = ({ children, from = { opacity: 0, y: 50 }, to = { opacity: 1, y: 0 }, scrub = false, ...props }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;

    // Set the initial state of the animation (the 'from' state)
    gsap.set(el, from);

    // Create the scroll-triggered animation
    gsap.to(el, {
      ...to,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%', // When the top of the element hits 85% of the viewport height
        end: 'bottom 20%', // When the bottom of the element hits 20% of the viewport height
        toggleActions: 'play none none none', // Play the animation on enter, do nothing on leave, enter back, or leave back
        scrub: scrub, // Set to true for a scrubbing effect, or a number for a delayed scrub
      },
    });

  }, [from, to, scrub]); // Rerun effect if animation properties change

  return (
    <div ref={elementRef} {...props}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;