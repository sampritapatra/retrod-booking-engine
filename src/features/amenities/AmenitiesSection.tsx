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
        <section className="amenities-section" id="amenities">
            <h3 className="amenities-title">Amenities</h3>
            
            <div className="amenities-grid">
                {defaultAmenities.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="amenity-card-item"
                    >
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
