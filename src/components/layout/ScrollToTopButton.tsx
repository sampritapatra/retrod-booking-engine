import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

export const ScrollToTopButton: React.FC = () => {
    const { currentView } = useBooking();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible || (currentView !== 'main' && currentView !== 'checkout' && currentView !== 'event')) {
        return null;
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="floating-scroll-top-btn"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                zIndex: 995,
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#b45309',
                color: '#ffffff',
                border: '2px solid #fde047',
                boxShadow: '0 4px 16px rgba(180, 83, 9, 0.5)',
                fontSize: '16px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animation: 'fadeInUp 0.3s ease-out',
            }}
        >
            ▲
        </button>
    );
};
