import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

// Helper to sanitize any accidental icon string prefixes from legacy data
export const cleanAmenityName = (raw: string): string => {
    if (!raw) return '';
    let name = raw.trim();
    const prefixes = [
        'sparkles', 'arkles', 'utensils', 'tensils', 'ensils', 
        'wifi', 'wind', 'droplet', 'clock', 'activity', 
        'thermometer', 'tv', 'truck', 'zap', 'navigation', 'shield'
    ];
    for (const p of prefixes) {
        if (name.toLowerCase().startsWith(p) && name.length > p.length && /[A-Z]/.test(name[p.length])) {
            name = name.slice(p.length).trim();
            break;
        }
    }
    return name;
};

// Rich, sharp SVG Icon renderer for hotel amenities
export const renderAmenityIcon = (name: string, iconKey?: string) => {
    const key = (iconKey || '').toLowerCase();
    const n = (name || '').toLowerCase();

    // 1. Wi-Fi / Internet
    if (key === 'wifi' || n.includes('wifi') || n.includes('wi-fi') || n.includes('internet')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
        );
    }
    // 2. Restaurant / Dining / Food / Cuisine
    if (key === 'utensils' || n.includes('restaurant') || n.includes('dining') || n.includes('food') || n.includes('cuisine') || n.includes('breakfast') || n.includes('meal')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
                <path d="M15 11v11" />
                <path d="M5 2v14a3 3 0 0 0 3 3v3" />
                <path d="M9 2v4" />
            </svg>
        );
    }
    // 3. Air Conditioning / AC / Climate
    if (key === 'wind' || n.includes('air conditioning') || n.includes('ac') || n.includes('climate') || n.includes('cooling')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
                <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
        );
    }
    // 4. Swimming Pool / Spa / Jacuzzi
    if (key === 'droplet' || key === 'pool' || n.includes('pool') || n.includes('swimming') || n.includes('spa') || n.includes('jacuzzi') || n.includes('water')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
                <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            </svg>
        );
    }
    // 5. Fitness Center / Gym / Activity
    if (key === 'activity' || n.includes('fitness') || n.includes('gym') || n.includes('workout') || n.includes('training') || n.includes('health')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14" />
                <path d="M18 5v14" />
                <path d="M2 9v6" />
                <path d="M22 9v6" />
                <path d="M6 12h12" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
            </svg>
        );
    }
    // 6. Luggage / Porter / Baggage Assistance
    if (n.includes('luggage') || n.includes('porter') || n.includes('baggage') || n.includes('assistance')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        );
    }
    // 7. 24/7 Front Desk / Room Service / Reception / Clock
    if (key === 'clock' || n.includes('24/7') || n.includes('room service') || n.includes('concierge') || n.includes('reception') || n.includes('front desk') || n.includes('service')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        );
    }
    // 8. TV / Smart TV / LED Screen
    if (key === 'tv' || n.includes('tv') || n.includes('television') || n.includes('screen')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
            </svg>
        );
    }
    // 9. Parking / Valet / Car
    if (key === 'navigation' || n.includes('parking') || n.includes('car') || n.includes('valet')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
            </svg>
        );
    }
    // 10. Hot Water / Geyser / Shower / Bath
    if (key === 'thermometer' || n.includes('hot') || n.includes('shower') || n.includes('bath') || n.includes('geyser')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1Z" />
                <path d="M6 12V5a2 2 0 0 1 2-2h3" />
            </svg>
        );
    }
    // 11. Airport Shuttle / Transport / Cab
    if (key === 'truck' || n.includes('shuttle') || n.includes('airport') || n.includes('transfer') || n.includes('cab') || n.includes('taxi')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v9" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
            </svg>
        );
    }
    // 12. EV Charging / Power Backup / Generator / Zap
    if (key === 'zap' || n.includes('ev') || n.includes('charging') || n.includes('power') || n.includes('generator') || n.includes('backup')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        );
    }
    // 13. Security / CCTV / Safe / Guard
    if (key === 'shield' || n.includes('security') || n.includes('cctv') || n.includes('safe') || n.includes('guard')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        );
    }
    // 14. Housekeeping / Laundry / Ironing
    if (n.includes('housekeeping') || n.includes('laundry') || n.includes('iron') || n.includes('cleaning')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.25 1.57L6 11.5V19a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-7.5l1.89-.74a2 2 0 0 0 1.25-1.57l.58-3.5a2 2 0 0 0-1.34-2.23z" />
            </svg>
        );
    }
    // 15. Bar / Lounge / Drinks / Beverage / Coffee / Tea / Kettle
    if (n.includes('bar') || n.includes('lounge') || n.includes('drink') || n.includes('coffee') || n.includes('tea') || n.includes('kettle')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
        );
    }
    // 16. Elevator / Lift / Accessibility
    if (n.includes('elevator') || n.includes('lift') || n.includes('wheelchair') || n.includes('accessible')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <polyline points="7 10 12 5 17 10" />
                <polyline points="7 14 12 19 17 14" />
            </svg>
        );
    }
    // 17. Work Desk / Study / Business Center / Conference / Banquet
    if (n.includes('desk') || n.includes('work') || n.includes('business') || n.includes('conference') || n.includes('banquet') || n.includes('meeting')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        );
    }
    // 18. Garden / Balcony / View / Nature / Terrace
    if (n.includes('garden') || n.includes('balcony') || n.includes('terrace') || n.includes('view') || n.includes('mountain') || n.includes('sea')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22v-9" />
                <path d="M9 7a3 3 0 0 1 6 0c0 4-3 6-3 6s-3-2-3-6z" />
                <path d="M12 13a4 4 0 0 0 4-4" />
                <path d="M12 17a5 5 0 0 1-5-5" />
            </svg>
        );
    }
    // 19. Kids Play Area / Games / Recreation
    if (n.includes('kids') || n.includes('play') || n.includes('game') || n.includes('recreation') || n.includes('child')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        );
    }
    // 20. Doctor on Call / Medical / First Aid
    if (n.includes('doctor') || n.includes('medical') || n.includes('aid') || n.includes('health')) {
        return (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="14" rx="2" />
                <line x1="12" y1="10" x2="12" y2="16" />
                <line x1="9" y1="13" x2="15" y2="13" />
            </svg>
        );
    }
    // Default Sparkles / Luxury
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
};

export const AmenitiesSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const rawAmenities = hotelData?.amenities || [];
    if (!rawAmenities.length) return null;

    const amenities = rawAmenities.map((item) => ({
        ...item,
        name: cleanAmenityName(item.name || ''),
        rawName: item.name
    }));

    // On mobile, show 6-8 amenities in tight 2 columns; on desktop show up to 12
    const topAmenities = amenities.slice(0, isMobile ? 8 : 12);
    const totalIncludedCount = amenities.length;

    const filteredAmenities = amenities.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section 
            className="amenities-section container" 
            id="amenities" 
            style={{ 
                padding: isMobile ? '20px 0 16px 0' : '32px 0 24px 0', 
                borderTop: '1px solid #e2e8f0', 
                width: '100%',
                scrollMarginTop: '80px'
            }}
        >
            <h3
                className="amenities-title"
                style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: isMobile ? '20px' : '24px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: isMobile ? '12px' : '18px',
                    letterSpacing: '-0.01em'
                }}
            >
                Amenities &amp; Facilities
            </h3>

            {/* Responsive Amenities Grid: Tight 2-column on mobile, expansive auto-fill on desktop */}
            <div
                className="amenities-grid-full"
                style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: isMobile ? '8px 10px' : '14px 18px',
                    marginBottom: isMobile ? '14px' : '22px',
                    width: '100%'
                }}
            >
                {topAmenities.map((item, idx) => {
                    const cleanName = item.name;
                    return (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: isMobile ? '8px' : '12px',
                                padding: isMobile ? '8px 10px' : '10px 14px',
                                background: '#fffdf9',
                                border: '1px solid #eae3d5',
                                borderRadius: '10px',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div
                                style={{
                                    width: isMobile ? '30px' : '36px',
                                    height: isMobile ? '30px' : '36px',
                                    minWidth: isMobile ? '30px' : '36px',
                                    borderRadius: '50%',
                                    border: '1.5px solid #d4af37',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    background: 'linear-gradient(135deg, #fffdf8 0%, #fef8eb 100%)',
                                    color: '#b48a1c',
                                    boxShadow: '0 2px 5px rgba(212, 175, 55, 0.15)'
                                }}
                            >
                                {renderAmenityIcon(cleanName, item.icon_name || (item as any).icon)}
                            </div>
                            <span
                                style={{
                                    color: '#0f172a',
                                    fontSize: isMobile ? '12.5px' : '13.5px',
                                    fontWeight: 600,
                                    lineHeight: 1.25,
                                    wordBreak: 'break-word'
                                }}
                            >
                                {cleanName}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* View More Button */}
            {totalIncludedCount > (isMobile ? 8 : 12) && (
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        background: '#ffffff',
                        border: '1.5px solid #0f172a',
                        borderRadius: '24px',
                        padding: isMobile ? '8px 18px' : '10px 24px',
                        fontSize: isMobile ? '12.5px' : '13.5px',
                        fontWeight: 600,
                        color: '#0f172a',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0f172a';
                        e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#0f172a';
                    }}
                >
                    View all {totalIncludedCount} amenities
                </button>
            )}

            {/* Amenities Modal */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(15, 23, 42, 0.65)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            width: '100%',
                            maxWidth: '580px',
                            maxHeight: '85vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{ padding: '24px 28px 16px 28px', borderBottom: '1px solid #f1f5f9', position: 'relative' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
                                Amenities &amp; Facilities ({amenities.length})
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '20px',
                                    right: '20px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                            >
                                ✕
                            </button>

                            {/* Search Bar */}
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search amenities..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '11px 38px 11px 16px',
                                        borderRadius: '12px',
                                        border: '1.5px solid #e2e8f0',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#0f172a',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                                    onBlur={(e) => (e.target.style.borderColor = '#e2e8f0')}
                                />
                                <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '15px' }}>
                                    🔍
                                </span>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable List */}
                        <div style={{ padding: '20px 28px', overflowY: 'auto', flex: 1 }}>
                            {filteredAmenities.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '14px' }}>
                                    {filteredAmenities.map((item, iIdx) => {
                                        const cleanName = item.name;
                                        return (
                                            <div
                                                key={iIdx}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    padding: '8px 12px',
                                                    borderRadius: '10px',
                                                    background: '#f8fafc',
                                                    border: '1px solid #f1f5f9'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '32px',
                                                        height: '32px',
                                                        minWidth: '32px',
                                                        borderRadius: '50%',
                                                        border: '1.5px solid #d4af37',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0,
                                                        background: '#fffdf8',
                                                        color: '#b48a1c'
                                                    }}
                                                >
                                                    {renderAmenityIcon(cleanName, item.icon_name || (item as any).icon)}
                                                </div>
                                                <span style={{ fontSize: '13.5px', fontWeight: 500, color: '#1e293b' }}>
                                                    {cleanName}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '36px 0', color: '#64748b', fontSize: '14px' }}>
                                    No amenities found matching "{searchQuery}"
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div
                            style={{
                                padding: '16px 28px',
                                background: '#f8fafc',
                                borderTop: '1px solid #f1f5f9',
                                fontSize: '13px',
                                color: '#64748b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>Questions about our amenities?</span>
                            <a
                                href="#reach"
                                onClick={() => setIsModalOpen(false)}
                                style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}
                            >
                                Contact Hotel &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
