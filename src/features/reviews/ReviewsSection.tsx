import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

interface ReviewItem {
    id: number;
    author: string;
    avatarLetter: string;
    rating: number;
    date: string;
    comment: string;
    source: string;
}

const SAMPLE_REVIEWS: ReviewItem[] = [
    {
        id: 1,
        author: 'Ananya Sharma',
        avatarLetter: 'A',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Exceptional hospitality! The staff was incredibly welcoming, room cleanliness was top-notch. Highly recommend for families!',
        source: 'Google Review'
    },
    {
        id: 2,
        author: 'Rohan Mehta',
        avatarLetter: 'R',
        rating: 5,
        date: '1 month ago',
        comment: 'Outstanding stay experience. Beautiful room decor, comfortable bed, fast Wi-Fi, and delicious breakfast buffet.',
        source: 'Google Review'
    },
    {
        id: 3,
        author: 'Priya Verma',
        avatarLetter: 'P',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Very polite management and prompt room service. The location is very convenient. Truly 5-star experience!',
        source: 'Google Review'
    },
    {
        id: 4,
        author: 'Vikram Das',
        avatarLetter: 'V',
        rating: 5,
        date: '2 months ago',
        comment: 'Seamless experience from booking to check-out. Luxurious rooms with modern amenities. Great value for money!',
        source: 'Google Review'
    },
    {
        id: 5,
        author: 'Sneha Patel',
        avatarLetter: 'S',
        rating: 5,
        date: '1 week ago',
        comment: 'Pure luxury! The ambiance, prompt service, and hygienic rooms made our holiday unforgettable.',
        source: 'Google Review'
    }
];

export const ReviewsSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Check if Google reviews integration is enabled
    const enableGoogleReviews = hotelData?.enable_google_reviews !== false;
    if (!enableGoogleReviews) {
        return null;
    }

    const overallRating = hotelData?.google_rating || hotelData?.rating || 4.8;
    const rawReviews = hotelData?.reviews || [];
    
    // Format any raw Google API reviews for standard rendering
    const formattedReviews: ReviewItem[] = rawReviews.map((r: any, idx: number) => ({
        id: r.id || idx,
        author: r.author || r.author_name || 'Verified Guest',
        avatarLetter: r.avatar_letter || (r.author || r.author_name || 'G')[0].toUpperCase(),
        rating: intValue(r.rating, 5),
        date: r.date || r.relative_time_description || 'Recently',
        comment: r.comment || r.text || '',
        source: r.source || 'Google Review'
    }));

    const isDefaultDemo = !hotelData?.slug || ['retrod', 'demo', 'hotelxyz', 'hotel-xyz'].includes(hotelData.slug.toLowerCase());
    const reviewsList = formattedReviews.length > 0 ? formattedReviews : (isDefaultDemo ? SAMPLE_REVIEWS : []);

    if (reviewsList.length === 0) {
        return null;
    }

    // Helper to safely parse ratings
    function intValue(val: any, fallback: number): number {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? fallback : parsed;
    }

    // Multiplied array for smooth continuous carousel track
    const multiReviews = [...reviewsList, ...reviewsList, ...reviewsList];

    return (
        <section 
            className="reviews-section" 
            id="reviews" 
            style={{ 
                padding: isMobile ? '20px 0 16px 0' : '28px 0 20px 0', 
                borderTop: '1px solid #e2e8f0', 
                width: '100%', 
                scrollMarginTop: '80px'
            }}
        >
            {/* Header matches Amenities & Facilities and Location exactly */}
            <div 
                className="reviews-section-header" 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    marginBottom: isMobile ? '12px' : '18px', 
                    flexWrap: 'wrap', 
                    gap: '10px',
                    width: '100%'
                }}
            >
                <div>
                    <h3 
                        className="reviews-title"
                        style={{ 
                            fontFamily: "'Playfair Display', Georgia, serif", 
                            fontSize: isMobile ? '20px' : '24px', 
                            fontWeight: 700, 
                            color: '#0f172a', 
                            margin: '0 0 3px 0', 
                            letterSpacing: '-0.01em' 
                        }}
                    >
                        Guest Reviews &amp; Feedback
                    </h3>
                    <p style={{ fontSize: isMobile ? '12.5px' : '13px', color: '#64748b', margin: 0, lineHeight: 1.3 }}>
                        See what verified guests are saying about their stay
                    </p>
                </div>
 
                <div 
                    className="reviews-google-badge" 
                    style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: '#fffdf9', 
                        border: '1.5px solid #d4af37', 
                        borderRadius: '30px', 
                        padding: '5px 14px', 
                        boxShadow: '0 2px 8px rgba(212,175,55,0.15)',
                        flexShrink: 0
                    }}
                >
                    <svg width="17" height="17" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#0f172a' }}>⭐ {overallRating}</span>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>(Google Reviews)</span>
                </div>
            </div>
 
            {/* Smooth Continuous Slow Marquee Track with Golden-Bordered Rectangle Cards */}
            <div style={{ width: '100%', overflow: 'hidden', padding: '6px 0 12px 0' }}>
                <div className="marquee-track">
                    {multiReviews.map((item, idx) => (
                        <div
                            key={idx}
                            className="review-rect-card"
                            style={{
                                width: isMobile ? '270px' : '310px',
                                minHeight: isMobile ? '145px' : '155px',
                                borderRadius: '16px',
                                background: '#ffffff',
                                border: '2px solid #d4af37',
                                boxShadow: '0 4px 18px rgba(212, 175, 55, 0.18), 0 2px 6px rgba(0,0,0,0.04)',
                                padding: isMobile ? '14px 16px' : '16px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexShrink: 0,
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Card Top: Author & Golden Stars */}
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: '#0f172a',
                                                color: '#d4af37',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '14px',
                                                border: '1.5px solid #d4af37',
                                                flexShrink: 0,
                                                boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                            }}
                                        >
                                            {item.avatarLetter}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a', lineHeight: 1.2 }}>
                                                {item.author}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                                {item.date} • <span style={{ color: '#16a34a', fontWeight: 600 }}>Verified</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 5 Golden Stars */}
                                    <div style={{ color: '#f59e0b', fontSize: '12px', letterSpacing: '1px', display: 'flex' }}>
                                        {'★'.repeat(item.rating)}{'☆'.repeat(Math.max(0, 5 - item.rating))}
                                    </div>
                                </div>

                                {/* Review Content */}
                                <p
                                    style={{
                                        fontSize: '12px',
                                        lineHeight: 1.4,
                                        color: '#334155',
                                        margin: '4px 0 0 0',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >
                                    "{item.comment}"
                                </p>
                            </div>

                            {/* Card Bottom: Verified Badge */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #f1ece4' }}>
                                <span style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                    </svg>
                                    Google Verified
                                </span>
                                <span style={{ fontSize: '10.5px', color: '#b45309', fontWeight: 700 }}>
                                    ✓ Stayed at Hotel
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
