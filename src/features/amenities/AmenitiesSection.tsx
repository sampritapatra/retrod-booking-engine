import React, { useState } from 'react';

export interface AmenityCategory {
    category: string;
    items: {
        name: string;
        included: boolean;
        icon?: string;
    }[];
}

const CATEGORIZED_AMENITIES: AmenityCategory[] = [
    {
        category: 'Facilities',
        items: [
            { name: 'Child friendly', included: true, icon: '👶' },
            { name: 'Caretaker Always On Site', included: true, icon: '🏠' }
        ]
    },
    {
        category: 'Food and Drinks',
        items: [
            { name: 'Breakfast Included In Tariff', included: true, icon: '☕' },
            { name: 'Meals Provided At Additional Charges', included: true, icon: '🍽️' },
            { name: 'Vegetarian and Non Vegetarian Meals', included: true, icon: '🥩' },
            { name: 'Jain and Vegetarian and Non Vegetarian Meals', included: true, icon: '🥗' }
        ]
    },
    {
        category: 'General',
        items: [
            { name: 'Ensuite Bathroom', included: true, icon: '🚿' },
            { name: 'Alcohol Allowed', included: true, icon: '🍷' },
            { name: 'Smoking Allowed', included: true, icon: '🚬' },
            { name: 'Genset', included: true, icon: '⚡' },
            { name: 'Towels and Toiletries', included: true, icon: '🧴' }
        ]
    },
    {
        category: 'Other',
        items: [
            { name: 'Equipped kitchen', included: true, icon: '🍳' },
            { name: 'Toiletries', included: true, icon: '🪥' },
            { name: 'Proposal or Anniversary or Babymoon', included: true, icon: '💍' },
            { name: 'Pre Wedding Shoots', included: true, icon: '📷' },
            { name: 'Anniversary Celebrations', included: true, icon: '🎉' },
            { name: 'Milestone Birthdays', included: true, icon: '🎂' },
            { name: 'Team Offsites', included: true, icon: '🏢' }
        ]
    },
    {
        category: 'Social',
        items: [
            { name: 'Unmarried Couples Allowed', included: true, icon: '👫' },
            { name: 'LGBTQ Friendly', included: true, icon: '🏳️‍🌈' }
        ]
    },
    {
        category: 'Not Included',
        items: [
            { name: 'WiFi Fibre Or WiFi Cable', included: false, icon: '📶' },
            { name: 'AC in living room', included: false, icon: '❄️' },
            { name: 'AC in Bedrooms', included: false, icon: '❄️' },
            { name: 'Elderly Friendly', included: false, icon: '👵' },
            { name: 'Pet Friendly', included: false, icon: '🐾' },
            { name: 'Parking Available', included: false, icon: '🅿️' },
            { name: 'Accommodation For Driver', included: false, icon: '🚗' },
            { name: 'Swimming Pool', included: false, icon: '🏊‍♂️' },
            { name: 'Meals Included In Tariff', included: false, icon: '🍱' },
            { name: 'Safe Deposit Box', included: false, icon: '🔒' },
            { name: 'Fire Extinguisher', included: false, icon: '🧯' },
            { name: 'Heater in Bedrooms', included: false, icon: '🔥' },
            { name: 'WiFi Dongle', included: false, icon: '📶' },
            { name: 'Massage At Additional Charges', included: false, icon: '💆' },
            { name: 'TV in Living Room', included: false, icon: '📺' },
            { name: 'TV in Bedrooms', included: false, icon: '📺' },
            { name: 'Heater in Living Room', included: false, icon: '🔥' },
            { name: 'TV in Games Room', included: false, icon: '🎮' },
            { name: 'CCTV', included: false, icon: '📹' },
            { name: 'Caretaker Available on Demand', included: false, icon: '👨‍💼' },
            { name: 'Library or Books', included: false, icon: '📚' },
            { name: 'Accommodation for Maid', included: false, icon: '🧹' },
            { name: 'Smart TV', included: false, icon: '📺' },
            { name: 'WiFi Available Across the Estate', included: false, icon: '📶' },
            { name: 'WiFi Available in Limited Spaces', included: false, icon: '📶' }
        ]
    }
];

// Flat list for the top 8 items displayed on page
const TOP_8_AMENITIES = [
    { name: 'Breakfast Included In Tariff', icon: '☕' },
    { name: 'Child friendly', icon: '👶' },
    { name: 'LGBTQ Friendly', icon: '🏳️‍🌈' },
    { name: 'Smoking Allowed', icon: '🚬' },
    { name: 'Alcohol Allowed', icon: '🍷' },
    { name: 'Caretaker Always On Site', icon: '🏠' },
    { name: 'Ensuite Bathroom', icon: '🚿' },
    { name: 'Genset', icon: '⚡' }
];

export const AmenitiesSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Calculate total included amenities count
    const totalIncludedCount = CATEGORIZED_AMENITIES.reduce((acc, cat) => {
        if (cat.category !== 'Not Included') {
            return acc + cat.items.filter(i => i.included).length;
        }
        return acc;
    }, 0);

    // Filter categories based on search query
    const filteredCategories = CATEGORIZED_AMENITIES.map(cat => {
        const matchingItems = cat.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return {
            ...cat,
            items: matchingItems
        };
    }).filter(cat => cat.items.length > 0);

    return (
        <section className="amenities-section" id="amenities" style={{ padding: '28px 0', borderTop: '1px solid #e2e8f0' }}>
            <h3 className="amenities-title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                Amenities
            </h3>

            {/* Top 8 Amenities Display arranged nicely in 2 columns with tight spacing */}
            <div 
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px 16px',
                    marginBottom: '20px',
                    maxWidth: '650px'
                }}
            >
                {TOP_8_AMENITIES.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '3px 0',
                            color: '#334155',
                            fontSize: '14px',
                            fontWeight: 500
                        }}
                    >
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1.5px solid #d4af37',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '15px',
                                flexShrink: 0,
                                background: '#fffdf9'
                            }}
                        >
                            {item.icon}
                        </div>
                        <span style={{ color: '#1e293b', lineHeight: 1.25 }}>{item.name}</span>
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                style={{
                    background: '#ffffff',
                    border: '1.5px solid #0f172a',
                    borderRadius: '24px',
                    padding: '10px 22px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0f172a',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
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
                View {totalIncludedCount}+ amenities
            </button>

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
                        backdropFilter: 'blur(4px)',
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
                            maxWidth: '560px',
                            maxHeight: '85vh',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            position: 'relative',
                            overflow: 'hidden',
                            animation: 'modalSlideUp 0.3s ease-out'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{ padding: '24px 28px 16px 28px', borderBottom: '1px solid #f1f5f9', position: 'relative' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
                                Amenities
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                style={{
                                    position: 'absolute',
                                    top: '24px',
                                    right: '24px',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '22px',
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
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                            >
                                ✕
                            </button>

                            {/* Search Bar */}
                            <div style={{ position: 'relative' }}>
                                <input
                                    type="text"
                                    placeholder="Search in Amenities"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 40px 12px 16px',
                                        borderRadius: '12px',
                                        border: '1px solid #cbd5e1',
                                        fontSize: '14px',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        color: '#0f172a'
                                    }}
                                />
                                <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '16px' }}>
                                    🔍
                                </span>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable List */}
                        <div style={{ padding: '20px 28px', overflowY: 'auto', flex: 1 }}>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((catGroup, cIdx) => (
                                    <div key={cIdx} style={{ marginBottom: '28px' }}>
                                        <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '14px', borderBottom: catGroup.category === 'Not Included' ? '1px dashed #cbd5e1' : 'none', paddingBottom: catGroup.category === 'Not Included' ? '8px' : '0' }}>
                                            {catGroup.category}
                                        </h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                            {catGroup.items.map((item, iIdx) => (
                                                <div
                                                    key={iIdx}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '14px',
                                                        padding: '2px 0'
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: '34px',
                                                            height: '34px',
                                                            borderRadius: '50%',
                                                            border: item.included ? '1.5px solid #d4af37' : '1.5px solid #cbd5e1',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '15px',
                                                            flexShrink: 0,
                                                            background: item.included ? '#fffdf9' : '#f8fafc'
                                                        }}
                                                    >
                                                        {item.icon || '✨'}
                                                    </div>
                                                    <span style={{ fontSize: '14px', fontWeight: 500, color: item.included ? '#1e293b' : '#475569' }}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b', fontSize: '14px' }}>
                                    No amenities found matching "{searchQuery}"
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div style={{ padding: '16px 28px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                            Have a questions about amenities?&nbsp;<a href="#reach" onClick={() => setIsModalOpen(false)} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Ask Us</a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
