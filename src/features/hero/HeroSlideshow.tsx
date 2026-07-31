import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

export const HeroSlideshow: React.FC = () => {
    const { hotelData, openModal } = useBooking();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = hotelData?.gallery_images || [
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop", caption: "Grand Executive Lobby Lounge" },
        { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop", caption: "Presidential Luxury Suite" },
        { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop", caption: "Infinity Swimming Pool & Spa" },
        { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&auto=format&fit=crop", caption: "Fine Dining Restaurant & Bar" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrentIndex(prev => (prev + 1) % slides.length);
    };

    return (
        <div className="hero-slideshow-container" style={{ position: 'relative', height: '360px', borderRadius: '16px', overflow: 'hidden', margin: '20px 0', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
            {slides.map((slide, idx) => (
                <div
                    key={idx}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: idx === currentIndex ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        backgroundImage: `url(${slide.url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700 }}>
                        {slide.caption}
                    </div>
                </div>
            ))}

            <button type="button" onClick={prevSlide} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}>❮</button>
            <button type="button" onClick={nextSlide} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}>❯</button>

            <button
                type="button"
                onClick={() => openModal('gallery')}
                style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#ffffff', color: '#0f172a', border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
                📷 View All Photos ({slides.length})
            </button>
        </div>
    );
};
