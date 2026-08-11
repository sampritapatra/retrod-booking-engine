import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

export const HeroSlideshow: React.FC = () => {
    const { hotelData, openModal } = useBooking();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = (hotelData?.images && hotelData.images.length > 0)
        ? hotelData.images.map(img => ({ url: img.image_url, caption: img.caption || hotelData.name }))
        : (hotelData?.gallery_images && hotelData.gallery_images.length > 0)
        ? hotelData.gallery_images
        : (hotelData?.hero_banner_url || hotelData?.logo_url)
        ? [{ url: (hotelData.hero_banner_url || hotelData.logo_url)!, caption: hotelData.name || 'Property Showcase' }]
        : [
            { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop", caption: `${hotelData?.name || 'Hotel'} Exterior` }
        ];

    useEffect(() => {
        if (slides.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slides.length);
        }, 4500);
        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    };

    return (
        <div 
            className="hero-slideshow-container" 
            style={{ 
                position: 'relative', 
                height: '500px', 
                maxHeight: '65vh',
                width: '100%',
                borderRadius: '0', 
                overflow: 'hidden', 
                margin: 0, 
                boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                background: '#000000'
            }}
        >
            {slides.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'scale(1)' : 'scale(1.04)',
                            transition: 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s ease-out',
                            pointerEvents: isActive ? 'auto' : 'none',
                            backgroundImage: `url(${slide.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Top and Bottom Dark Gradient */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.45) 100%)', zIndex: 1 }} />
                        
                        {/* Side Blackness Vignette Gradient (Left & Right) */}
                        <div style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.75) 100%)', 
                            pointerEvents: 'none',
                            zIndex: 2
                        }} />

                        {/* Slide Caption Tag (Top-Right of Picture, Smaller and Clean) */}
                        <div 
                            className="hero-slide-caption-tag"
                            style={{ 
                                position: 'absolute', 
                                top: '16px', 
                                right: '20px', 
                                background: 'rgba(0, 0, 0, 0.65)', 
                                backdropFilter: 'blur(10px)',
                                color: '#ffffff', 
                                padding: '4px 12px', 
                                borderRadius: '20px', 
                                fontSize: '11.5px', 
                                fontWeight: 700,
                                letterSpacing: '0.2px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                zIndex: 3
                            }}
                        >
                            {slide.caption}
                        </div>
                    </div>
                );
            })}

            {/* Navigation Arrow Controls */}
            {slides.length > 1 && (
                <>
                    <button 
                        type="button" 
                        onClick={prevSlide} 
                        style={{ 
                            position: 'absolute', 
                            left: '16px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            background: 'rgba(15, 23, 42, 0.55)', 
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '50%', 
                            width: '44px', 
                            height: '44px', 
                            cursor: 'pointer', 
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        aria-label="Previous Slide"
                    >
                        ❮
                    </button>
                    <button 
                        type="button" 
                        onClick={nextSlide} 
                        style={{ 
                            position: 'absolute', 
                            right: '16px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            background: 'rgba(15, 23, 42, 0.55)', 
                            backdropFilter: 'blur(6px)',
                            color: '#ffffff', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '50%', 
                            width: '44px', 
                            height: '44px', 
                            cursor: 'pointer', 
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}
                        aria-label="Next Slide"
                    >
                        ❯
                    </button>
                </>
            )}

            {/* Slide Indicator Dots */}
            {slides.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                    zIndex: 10
                }}>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentIndex(i)}
                            style={{
                                width: i === currentIndex ? '24px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: i === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out'
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* View All Photos Button */}
            <button
                type="button"
                onClick={() => openModal('gallery')}
                style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    right: '20px', 
                    background: '#ffffff', 
                    color: '#0f172a', 
                    border: 'none', 
                    padding: '8px 18px', 
                    borderRadius: '24px', 
                    fontSize: '13px', 
                    fontWeight: 800, 
                    cursor: 'pointer', 
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    zIndex: 10,
                    transition: 'transform 0.2s'
                }}
            >
                📷 View All Photos ({slides.length})
            </button>
        </div>
    );
};
