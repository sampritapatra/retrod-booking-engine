import React from 'react';

export const AmenitiesSection: React.FC = () => {
    const defaultAmenities = [
        { name: 'Turndown Service', icon: '🛏️' },
        { name: 'In-Room Safe', icon: '🧳' },
        { name: 'Storage Facility', icon: '🧳' },
        { name: 'Common Hangout Area', icon: '🎲' },
        { name: 'Cafe', icon: '☕' },
        { name: 'Parking (Private)', icon: '🅿️' },
        { name: 'Water Dispenser', icon: '🚰' },
        { name: 'Free Wi-Fi', icon: '📶' },
        { name: 'Computers And Printers', icon: '🖨️' },
        { name: 'In-Room Work Desk', icon: '💼' },
        { name: 'Phone With Voicemail', icon: '📞' },
        { name: 'Fitness Center/Gym', icon: '🏋️‍♂️' },
        { name: 'Swimming Pool', icon: '🏊‍♂️' },
        { name: 'Spa And Wellness Center', icon: '🧘‍♀️' },
        { name: 'Yoga Or Fitness Classes', icon: '🧘‍♂️' },
        { name: 'Massage Services', icon: '💆‍♂️' },
        { name: 'Comfortable Beds', icon: '🛏️' }
    ];

    return (
        <section className="amenities-section" id="amenities" style={{ padding: '40px 0', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Amenities</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {defaultAmenities.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="amenity-card-item"
                        style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#0f172a',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
