import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export const HotelInfoSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [expandedSpecial, setExpandedSpecial] = useState(false);
    const [expandedAbout, setExpandedAbout] = useState(false);

    const fullDesc = hotelData?.what_makes_special || hotelData?.description || 'Indulge in the allure of this hidden gem, a luxury sanctuary with old-world charm, authentic fine dining, and a serene escape sans distractions, perfect for intimate celebrations, family stays, and leisure getaways.';
    const shortDesc = fullDesc.length > 180 ? fullDesc.slice(0, 180) + '...' : fullDesc;

    const backstoryText = hotelData?.backstory || "Retrod was established as a premier hospitality destination combining modern elegance, luxury guest amenities, fine dining, and unmatched personalized service in Bhubaneswar.";

    const locationStr = hotelData?.address || `${hotelData?.city || 'Bhubaneswar'}, ${hotelData?.state || 'Odisha'}, India`;

    return (
        <section className="hotel-royal-info-section" id="about-home" style={{ padding: '16px 0 24px 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <div style={{ background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #f1ece4)', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* 1. Header Title & Rating Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif", fontSize: '38px', fontWeight: 600, color: 'var(--text-dark, #2c221e)', margin: 0, lineHeight: 1.15, letterSpacing: '-0.3px' }}>
                            {hotelData?.name || 'Retrod'}
                        </h1>
                        <p style={{ fontSize: '15px', color: 'var(--text-muted, #786e65)', marginTop: '6px', margin: 0, fontWeight: 500 }}>
                            {locationStr}
                        </p>
                    </div>

                    {/* Rating Badge Top Right */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card-bg, #fffdf9)', border: '1px solid var(--border-color, #eedfc8)', padding: '6px 14px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(184,134,11,0.06)' }}>
                        <span style={{ color: '#d97706', fontSize: '15px' }}>★</span>
                        <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-dark, #1f2937)' }}>{hotelData?.google_rating || hotelData?.rating || 4.7}</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted, #6b7280)', fontWeight: 600 }}>({hotelData?.review_count?.toLocaleString() || '303'} reviews)</span>
                    </div>
                </div>

                {/* 2. "What makes this place special" Golden Border Box */}
                <div style={{ background: 'var(--card-bg, #faf8f3)', borderLeft: '3.5px solid #b8860b', borderRight: '1px solid var(--border-color, transparent)', borderTop: '1px solid var(--border-color, transparent)', borderBottom: '1px solid var(--border-color, transparent)', borderRadius: '0 10px 10px 0', padding: '16px 20px', marginTop: '4px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: 600, color: '#b8860b', margin: '0 0 6px 0', letterSpacing: '0.2px' }}>
                        What makes this place special
                    </h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-dark, #554d46)', lineHeight: 1.65, margin: 0 }}>
                        {expandedSpecial ? fullDesc : shortDesc}
                        {fullDesc.length > 180 && (
                            <button
                                type="button"
                                onClick={() => setExpandedSpecial(!expandedSpecial)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-dark, #2c221e)', fontWeight: 700, cursor: 'pointer', marginLeft: '6px', textDecoration: 'underline', fontSize: '13px' }}
                            >
                                {expandedSpecial ? 'Read Less' : 'Read More'}
                            </button>
                        )}
                    </p>
                </div>

                {/* 3. "About Home" & "Backstory" Detail Section */}
                <div style={{ paddingTop: '8px' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 600, color: 'var(--text-dark, #2c221e)', margin: '0 0 12px 0' }}>
                        About Home
                    </h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-dark, #554d46)', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                        {hotelData?.description || `Welcome to ${hotelData?.name || 'Retrod'} – a premier luxury business & resort hotel offering state-of-the-art accommodation, modern guest facilities, fine dining experiences, and personalized hospitality.`}
                    </p>
                    {expandedAbout && (
                        <p style={{ fontSize: '14px', color: 'var(--text-dark, #554d46)', lineHeight: 1.7, margin: '0 0 16px 0' }}>
                            {hotelData?.tagline || 'Experience Luxury & Comfort Redefined'} — Offering 24/7 dedicated butler assistance, bespoke culinary preparations, high-speed Wi-Fi, and plush organic bedding.
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => setExpandedAbout(!expandedAbout)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-dark, #2c221e)', fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '13px' }}
                    >
                        {expandedAbout ? 'Read Less' : 'Read More'}
                    </button>

                    <div style={{ marginTop: '24px' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 600, color: 'var(--text-dark, #2c221e)', margin: '0 0 8px 0' }}>
                            Backstory
                        </h3>
                        <p style={{ fontSize: '14px', color: 'var(--text-muted, #665d54)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>
                            "{backstoryText}"
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

