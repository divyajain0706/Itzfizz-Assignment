import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const STATS_DATA = [
  { value: '58%', label: 'Increase in pick up point use' },
  { value: '23%', label: 'Decreased in customer phone calls' },
  { value: '27%', label: 'Increase in user satisfaction' },
  { value: '40%', label: 'Reduction in bounce rate' },
];

export default function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation (Headline & Stats)
      const letters = headlineRef.current.querySelectorAll('.letter');

      const loadTl = gsap.timeline();

      loadTl
        .fromTo(
          letters,
          { opacity: 0, y: 40, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: 'back.out(1.7)',
          }
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .fromTo(
          carRef.current,
          { opacity: 0, scale: 0.6, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.6'
        );

      // 2. Scroll-Driven Hero Animation (Core Requirement)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=2500', // Scroll distance for full hero animation sequence
          scrub: 1.2,    // Smooth interpolation (easing)
          pin: true,     // Pin hero while scrolling
          anticipatePin: 1,
        },
      });

      // Animate the main visual element (Car) along a dynamic scroll path
      scrollTl
        // Waypoint 1: Drive right and scale up slightly
        .to(carRef.current, {
          x: '35vw',
          y: '5vh',
          rotation: 8,
          scale: 1.15,
          ease: 'power1.inOut',
        })
        // Waypoint 2: Turn towards center-left, scale down slightly to simulate distance
        .to(carRef.current, {
          x: '-25vw',
          y: '20vh',
          rotation: -12,
          scale: 1.05,
          ease: 'power1.inOut',
        })
        // Waypoint 3: Drive down towards bottom right with final scale boost
        .to(carRef.current, {
          x: '20vw',
          y: '35vh',
          rotation: 5,
          scale: 1.25,
          ease: 'power1.inOut',
        })
        // Fade out stats slightly as hero reaches end of scroll
        .to(
          statsRef.current,
          {
            opacity: 0.3,
            scale: 0.95,
            stagger: 0.05,
          },
          0
        );
    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP animations on unmount
  }, []);

  const headlineText = "WELCOME ITZFIZZ";

  return (
    <div ref={containerRef} className="app-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      {/* Navigation Header */}
      <header className="navbar">
        <div className="logo">ITZFIZZ<span>DIGITAL</span></div>
        <div className="nav-tag">Scroll Experience</div>
      </header>

      {/* HERO SECTION (Pinned on Scroll) */}
      <section ref={heroRef} className="hero-section">
        {/* Letter-Spaced Headline */}
        <h1 ref={headlineRef} className="hero-headline">
          {headlineText.split('').map((char, index) => (
            <span
              key={index}
              className={`letter ${char === ' ' ? 'space' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Impact Metrics Grid */}
        <div className="stats-container">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={idx}
              ref={(el) => (statsRef.current[idx] = el)}
              className="stat-card"
            >
              <span className="stat-number">{stat.value}</span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Animated Visual Object (Sleek Car Graphic) */}
        <div ref={carRef} className="car-visual-wrapper">
          <img src="/src/assets/herocar.png" alt="Car Visual" className="car-svg" />
            {/* Underglow Effect */}
            <ellipse cx="250" cy="170" rx="200" ry="20" fill="url(#carGlow)" opacity="0.8" />
            
            {/* Car Chassis */}
            <path
              d="M50 140 C80 140 110 110 160 100 C210 90 280 85 360 105 C410 118 450 135 470 140 C480 143 475 155 460 155 L60 155 C45 155 40 140 50 140 Z"
              fill="url(#bodyGradient)"
            />
            {/* Cabin / Roof */}
            <path
              d="M170 98 C200 60 270 55 330 88 C345 96 355 105 355 105 Z"
              fill="url(#roofGradient)"
              opacity="0.9"
            />
            {/* Windshield Highlights */}
            <path
              d="M230 68 C270 65 320 85 325 90 C300 90 240 85 220 82 Z"
              fill="#00f2fe"
              opacity="0.6"
            />
            {/* Headlights */}
            <ellipse cx="465" cy="138" rx="8" ry="12" fill="#00f2fe" filter="drop-shadow(0 0 10px #00f2fe)" />
            {/* Wheels */}
            <circle cx="120" cy="155" r="28" fill="#111827" stroke="#00f2fe" strokeWidth="4" />
            <circle cx="120" cy="155" r="12" fill="#374151" />
            <circle cx="390" cy="155" r="28" fill="#111827" stroke="#00f2fe" strokeWidth="4" />
            <circle cx="390" cy="155" r="12" fill="#374151" />

            {/* Gradients */}
            <defs>
              <radialGradient id="carGlow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stopColor="#ff5e62" stopOpacity="0.7" />
    <stop offset="100%" stopColor="#ff5e62" stopOpacity="0" />
  </radialGradient>
  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#ff5e62" />
    <stop offset="50%" stopColor="#d946ef" />
    <stop offset="100%" stopColor="#8b5cf6" />
  </linearGradient>
  <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stopColor="#f43f5e" />
    <stop offset="100%" stopColor="#a855f7" />
  </linearGradient>
</defs>

        </div>
      </section>

      {/* NEXT SECTION (Shows continuation after hero scroll completes) */}
      <section className="content-section">
        <h2>Crafted for High Performance</h2>
        <p>Smooth, GPU-accelerated motion powered by GSAP ScrollTrigger.</p>
      </section>
    </div>
  );
}