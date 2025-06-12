// src/components/MicrophoneScene.js

import React, { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Model Component
function Model(props) {
  // Make sure the path to your .glb file is correct
  const { scene } = useGLTF('/assets/3d/microphone.glb'); 
  return <primitive object={scene} {...props} />;
}

// 2. Animation Component
const MicrophoneAnimation = () => {
  const modelRef = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the model based on scroll position
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2, // Rotate 360 degrees
        x: Math.PI / 4, // Tilt it a bit
        scrollTrigger: {
          trigger: ".homepage-content", // The element that drives the scroll
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smoothly scrub the animation
        }
      });
    }, modelRef);
    return () => ctx.revert();
  }, []);

  return <Model ref={modelRef} />;
}

// 3. Main Scene Canvas
export default function MicrophoneScene() {
  return (
    <Canvas 
        dpr={[1, 2]} 
        camera={{ fov: 50, position: [0, 0, 5] }} 
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}
    >
      <Stage environment="city" intensity={0.6}>
        <MicrophoneAnimation />
      </Stage>
    </Canvas>
  );
}