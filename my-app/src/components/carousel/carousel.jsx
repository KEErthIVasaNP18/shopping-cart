import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CarouselComponents.css';

const slides = [
  {
    image: "https://www.avikalp.com/cdn/shop/products/MWZ3562_wallpaper3.jpg?v=1746037673",
    title: "Birthday Dress for Women",
    desc: "Light, breezy, and perfect for your sunny days – explore our latest collection of women's summer wear.",
  },
  {
    image: "https://www.avikalp.com/cdn/shop/products/MWZ3564_wallpaper1.jpg?v=1746037669",
    title: "Fashions for women",
    desc: "Turn heads with this stunning evening dress – where elegance meets confidence in every stitch.",
  },
  {
    image: "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=612x612&w=0&k=20&c=wJ6yYbRrDfdmoViuQkX39s2z_0lCiNQYgEtLU--0EbY=",
    title: "Coats suits for men",
    desc: "Refined tailoring and timeless style – explore our premium collection of men's coats and suits for every occasion.",
  }
];

const DRAG_THRESHOLD = 50; // minimum px drag to trigger a slide change

const CarouselComponent = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // drag state stored in a ref so event handlers always see latest value
  const dragRef = useRef({ startX: 0, startY: 0, dragging: false });
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, 4000);
    return () => clearInterval(timerRef.current);
  }, [current, isPaused, goNext]);

  // ── Mouse drag handlers ──────────────────────────
  const handleMouseDown = (e) => {
    dragRef.current = { startX: e.clientX, startY: e.clientY, dragging: true };
    setIsDragging(false);
    setIsPaused(true);
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = Math.abs(e.clientX - dragRef.current.startX);
    if (dx > 5) setIsDragging(true); // visually show dragging cursor
  };

  const handleMouseUp = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    setIsDragging(false);
    setIsPaused(false);

    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      dx < 0 ? goNext() : goPrev();
    }
  };

  const handleMouseLeave = (e) => {
    if (dragRef.current.dragging) {
      const dx = e.clientX - dragRef.current.startX;
      dragRef.current.dragging = false;
      setIsDragging(false);
      setIsPaused(false);
      if (Math.abs(dx) >= DRAG_THRESHOLD) {
        dx < 0 ? goNext() : goPrev();
      }
    }
  };

  // ── Touch swipe handlers ─────────────────────────
  const handleTouchStart = (e) => {
    dragRef.current = {
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      dragging: true,
    };
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (!dragRef.current.dragging) return;
    const dx = e.changedTouches[0].clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    setIsPaused(false);

    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      dx < 0 ? goNext() : goPrev();
    }
  };

  return (
    <div className="custom-carousel-wrapper">
      <div
        className={`custom-carousel${isDragging ? ' is-dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        style={{ userSelect: 'none' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === current ? 'active' : ''}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              draggable={false}
            />
            <div className="carousel-caption">
              <h3>{slide.title}</h3>
              <p>{slide.desc}</p>
            </div>
          </div>
        ))}

        {/* Prev / Next arrows */}
        <button
          className="carousel-arrow carousel-arrow-prev"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <button
          className="carousel-arrow carousel-arrow-next"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next slide"
        >
          &#8250;
        </button>

        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === current ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); goTo(index); }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
