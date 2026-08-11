import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

export const StickyNavBar: React.FC = () => {
    const { currentView, setCurrentView, openModal } = useBooking();
    const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'amenities' | 'reach' | 'policies'>('overview');
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Scroll Spy for auto-detecting active section
    useEffect(() => {
        if (currentView !== 'main') return;

        const handleScroll = () => {
            const currentY = window.scrollY;
            const sections = [
                { id: 'about-home', key: 'overview' },
                { id: 'rooms', key: 'rooms' },
                { id: 'amenities', key: 'amenities' },
                { id: 'reach', key: 'reach' },
                { id: 'policies', key: 'policies' },
            ];

            const scrollPos = currentY + 110;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el && el.offsetTop <= scrollPos) {
                    setActiveTab(sections[i].key as any);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentView]);

    const scrollToSection = (tabKey: 'overview' | 'rooms' | 'amenities' | 'reach' | 'policies', sectionId: string) => {
        setActiveTab(tabKey);
        const doScroll = () => {
            const el = document.getElementById(sectionId);
            if (el) {
                const yOffset = -55;
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
            }
        };

        if (currentView !== 'main') {
            setCurrentView('main');
            setTimeout(doScroll, 100);
        } else {
            doScroll();
        }
    };

    const tabs = [
        { key: 'overview', label: isMobile ? 'About' : 'Overview', sectionId: 'about-home' },
        { key: 'rooms', label: isMobile ? 'Rooms' : 'Rooms & Rates', sectionId: 'rooms' },
        { key: 'amenities', label: 'Amenities', sectionId: 'amenities' },
        { key: 'reach', label: isMobile ? 'Location' : 'Location & Map', sectionId: 'reach' },
        { key: 'policies', label: 'Rules', sectionId: 'policies' },
    ] as const;

    return (
        <nav
            className="sticky-navigation-bar"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 999,
                background: 'var(--card-bg, #ffffff)',
                borderBottom: '1.5px solid var(--border-color, #eae5db)',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                width: '100%',
                margin: 0,
            }}
        >
            <div
                className="container"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: isMobile ? '0 12px' : '4px 16px'
                }}
            >
                {/* Horizontal tabs layout - perfectly aligned & 100% visible */}
                <div style={{ display: 'flex', gap: isMobile ? '20px' : '36px', alignItems: 'center', flexWrap: 'nowrap', width: '100%', justifyContent: isMobile ? 'space-between' : 'flex-start', overflowX: 'auto', scrollbarWidth: 'none' }}>
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.key;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => scrollToSection(tab.key as any, tab.sectionId)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: isMobile ? '12px 2px' : '10px 4px',
                                    fontSize: isMobile ? '14px' : '15px',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    fontWeight: 800,
                                    color: isActive ? '#16a34a' : 'var(--text-dark, #0f172a)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap',
                                    flexShrink: 0
                                }}
                            >
                                {tab.label}
                                {isActive && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)',
                                            borderRadius: '2px 2px 0 0',
                                            boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right side My Booking Action - Desktop only */}
                {!isMobile && (
                    <button
                        type="button"
                        onClick={() => openModal('my-booking')}
                        style={{
                            background: '#2c221e',
                            color: '#ffffff',
                            border: '1px solid #d4af37',
                            padding: '8px 20px',
                            borderRadius: '20px',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                        }}
                    >
                        My Booking
                    </button>
                )}
            </div>
        </nav>
    );
};
