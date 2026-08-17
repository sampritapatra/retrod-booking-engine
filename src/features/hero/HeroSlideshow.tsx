import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

export const HeroSlideshow: React.FC = () => {
    const { hotelData, openModal } = useBooking();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = (hotelData?.images && hotelData.images.length > 0)
        ? hotelData.images.filter(img => img.image_url && img.image_url.trim()).map(img => ({ url: img.image_url, caption: img.caption || hotelData.name }))
        : (hotelData?.gallery_images && hotelData.gallery_images.length > 0)
        ? hotelData.gallery_images.filter(img => img.url && img.url.trim())
        : (hotelData?.hero_banner_url && hotelData.hero_banner_url.trim())
        ? [{ url: hotelData.hero_banner_url, caption: hotelData.name || 'Property Showcase' }]
        : [];

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

    if (slides.length === 0) {
        const themeColor = hotelData?.theme_color || '#d97706';
        return (
            <div 
                className="hero-slideshow-container hero-empty-banner" 
                style={{ 
                    position: 'relative', 
                    minHeight: '260px',
                    width: '100%',
                    background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    textAlign: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                    overflow: 'hidden'
                }}
            >
                {/* Subtle luxury background pattern / glow */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '600px',
                    height: '400px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${themeColor}22 0%, transparent 70%)`,
                    pointerEvents: 'none'
                }} />

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#f8fafc',
                        marginBottom: '16px',
                        letterSpacing: '0.5px'
                    }}>
                        <span>✨</span> Official Direct Booking Engine
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(26px, 4vw, 40px)',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: '0 0 10px 0',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        letterSpacing: '-0.5px',
                        lineHeight: 1.2
                    }}>
                        {hotelData?.name || 'Welcome to our Hotel'}
                    </h1>

                    {hotelData?.tagline && (
                        <p style={{
                            fontSize: '16px',
                            color: '#cbd5e1',
                            margin: '0 0 12px 0',
                            fontWeight: 500
                        }}>
                            {hotelData.tagline}
                        </p>
                    )}

                    {(hotelData?.city || hotelData?.address) && (
                        <p style={{
                            fontSize: '13px',
                            color: '#94a3b8',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                        }}>
                            <span>📍</span> {[hotelData.address, hotelData.city, hotelData.state].filter(Boolean).join(', ')}
                        </p>
                    )}
                </div>
            </div>
        );
    }

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
                            background: '#b45309', 
                            color: '#ffffff', 
                            border: '2px solid #fde047', 
                            borderRadius: '50%', 
                            width: '44px', 
                            height: '44px', 
                            cursor: 'pointer', 
                            fontSize: '20px',
                            fontWeight: 900,
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 4px 16px rgba(180, 83, 9, 0.55)',
                            zIndex: 10,
                            transition: 'all 0.2s ease'
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
                            background: '#b45309', 
                            color: '#ffffff', 
                            border: '2px solid #fde047', 
                            borderRadius: '50%', 
                            width: '44px', 
                            height: '44px', 
                            cursor: 'pointer', 
                            fontSize: '20px',
                            fontWeight: 900,
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            boxShadow: '0 4px 16px rgba(180, 83, 9, 0.55)',
                            zIndex: 10,
                            transition: 'all 0.2s ease'
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
