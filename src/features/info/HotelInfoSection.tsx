import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export const HotelInfoSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [expanded, setExpanded] = useState(false);

    const fullDesc = hotelData?.description || 'Welcome to Hotel XYZ – a premier luxury hotel offering state-of-the-art accommodation, modern amenities, fine dining, and world-class hospitality services. Perfect for business executives, family vacations, and international travelers.';
    const shortDesc = fullDesc.slice(0, 160) + '...';

    return (
        <section className="hotel-info-section" style={{ padding: '24px 0 10px 0' }}>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {hotelData?.name || 'Hotel XYZ'}
                    </h2>
                    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Google reviews</span>
                        <span style={{ fontWeight: 800, color: '#0f172a' }}>{hotelData?.rating || 4.5}</span>
                        <span style={{ color: '#eab308' }}>★★★★★</span>
                        <span style={{ color: '#64748b' }}>({hotelData?.review_count?.toLocaleString() || '2,850'} Reviews)</span>
                    </div>
                </div>

                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {expanded ? fullDesc : shortDesc}
                    <button 
                        type="button" 
                        onClick={() => setExpanded(!expanded)} 
                        style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', marginLeft: '6px', fontSize: '13px' }}
                    >
                        {expanded ? 'Show Less' : 'Read More'}
                    </button>
                </p>
            </div>
        </section>
    );
};
