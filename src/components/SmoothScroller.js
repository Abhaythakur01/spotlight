import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * SmoothScroller Component
 * This component wraps the main application content to provide
 * a smooth scrolling experience using GSAP's ScrollSmoother plugin.
 */
const SmoothScroller = ({ children }) => {
  const mainRef = useRef(null);
  const smootherRef = useRef(null);

  useLayoutEffect(() => {
    // Create a GSAP context for proper cleanup in React
    const ctx = gsap.context(() => {
      // Create the ScrollSmoother instance
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5, // How long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // Looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // Much shorter smoothing time on touch devices
      });
    }, mainRef);

    // Cleanup function to revert all GSAP animations and ScrollTriggers
    return () => ctx.revert();
  }, []);

  return (
    // The required wrapper structure for ScrollSmoother
    <div id="smooth-wrapper" ref={mainRef}>
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroller;
