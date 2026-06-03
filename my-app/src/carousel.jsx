import React, { useState, useEffect } from 'react';
import './CarouselComponents.css';

const slides = [
  {
    image: "https://www.avikalp.com/cdn/shop/products/MWZ3562_wallpaper3.jpg?v=1746037673",
    title: "Birthday Dress for Women",
    desc: "Light, breezy, and perfect for your sunny days explore our latest collection of women's summer wear.",
    titleColor: "black",
    descColor: "black"
  },
  {
    image: "https://www.avikalp.com/cdn/shop/products/MWZ3564_wallpaper1.jpg?v=1746037669",
    title: "Fashions for women",
    desc: "Turn heads with this stunning evening dress – where elegance meets confidence in every stitch.",
    titleColor: "blue",
    descColor: "blue"
  },
  {
    image: "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=612x612&w=0&k=20&c=wJ6yYbRrDfdmoViuQkX39s2z_0lCiNQYgEtLU--0EbY=",
    title: "Coats suits for men",
    desc: "Refined tailoring and timeless style – explore our premium collection of men’s coats and suits for every occasion.",
    titleColor: "white",
    descColor: "white"
  }
];

const CarouselComponent = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="custom-carousel-wrapper">
      <div className="custom-carousel">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === current ? 'active' : ''}`}
          >
            <img src={slide.image} alt={slide.title} />
            <div className="carousel-caption glass-card">
              <h3 style={{ color: slide.titleColor }}>{slide.title}</h3>
              <p style={{ color: slide.descColor }}>{slide.desc}</p>
            </div>
          </div>
        ))}
        
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === current ? 'active' : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
