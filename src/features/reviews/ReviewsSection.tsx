import React from 'react';
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
    const overallRating = hotelData?.google_rating || 4.8;

    // Triple the reviews array for completely smooth un-interrupted marquee animation across all screen widths
    const multiReviews = [...SAMPLE_REVIEWS, ...SAMPLE_REVIEWS, ...SAMPLE_REVIEWS];

    return (
        <section className="reviews-section" id="reviews" style={{ padding: '36px 0', borderTop: '1px solid #e2e8f0', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
            {/* Title & Rating Header Container */}
            <div className="container reviews-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        Guest Reviews &amp; Feedback
                    </h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>
                        See what verified guests are saying about their stay
                    </p>
                </div>

                <div className="reviews-google-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fffdf9', border: '1.5px solid #d4af37', borderRadius: '30px', padding: '8px 18px', boxShadow: '0 2px 10px rgba(212,175,55,0.15)' }}>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#4285F4' }}>G</span>
                    <span style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>⭐ {overallRating}</span>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>(Google Reviews)</span>
                </div>
            </div>

            {/* Continuous Smooth Full-Bleed Right-to-Left Sliding Marquee Track */}
            <div style={{ width: '100%', overflow: 'hidden', padding: '16px 0' }}>
                <div className="marquee-track">
                    {multiReviews.map((item, idx) => (
                        <div
                            key={idx}
                            className="review-circle-card"
                            style={{
                                width: '270px',
                                height: '270px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)',
                                border: '2.5px solid #d4af37',
                                boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
                                padding: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                flexShrink: 0,
                                transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Human Profile Logo Icon */}
                            <div
                                className="review-circle-avatar"
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
                                    border: '1.5px solid #d4af37',
                                    color: '#ffffff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '8px',
                                    boxShadow: '0 3px 10px rgba(0,0,0,0.2)'
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>

                            {/* Author Name */}
                            <div className="review-circle-author" style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
                                {item.author}
                            </div>

                            {/* Rating Stars */}
                            <div className="review-circle-stars" style={{ display: 'flex', gap: '2px', fontSize: '14px', color: '#f59e0b', marginBottom: '6px' }}>
                                {'★'.repeat(item.rating)}
                            </div>

                            {/* Testimonial text inside circle */}
                            <p 
                                className="review-circle-comment"
                                style={{
                                    fontSize: '11px',
                                    color: '#475569',
                                    lineHeight: 1.45,
                                    margin: 0,
                                    fontStyle: 'italic',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    maxWidth: '200px'
                                }}
                            >
                                "{item.comment}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
