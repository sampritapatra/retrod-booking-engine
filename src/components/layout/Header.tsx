import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { CurrencyType, ThemeType } from '../../types';

export const Header: React.FC = () => {
    const {
        hotelData,
        currency,
        setCurrency,
        theme,
        setTheme,
        setCurrentView
    } = useBooking();

    const [isMobile, setIsMobile] = React.useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="main-header site-header" style={{ width: '100%', background: '#ffffff' }}>
            {/* Top Royal Contact Bar */}
            <div style={{ background: '#2c221e', color: '#f5f2eb', padding: '6px 0', borderBottom: '1px solid #3d3029' }}>
                <div
                    className="container top-contact-container"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: isMobile ? 'nowrap' : 'wrap',
                        gap: '8px',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        scrollbarWidth: 'none'
                    }}
                >

                    {/* Left: Royal Contact Boxes */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '12px', flexShrink: 1, minWidth: 0, overflow: 'hidden' }}>
                        <a
                            href={`tel:${hotelData?.phone || '+919876543210'}`}
                            style={{
                                background: '#3d3029',
                                border: '1px solid #54443b',
                                color: '#f5f2eb',
                                padding: isMobile ? '3px 8px' : '4px 14px',
                                borderRadius: '20px',
                                fontSize: isMobile ? '10px' : '11px',
                                fontWeight: 600,
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <span style={{ color: '#d97706' }}>📞</span> {hotelData?.phone || '9999999999'}
                        </a>

                        {!isMobile && (
                            <a
                                href={`mailto:${hotelData?.email || 'support@retrod.in'}`}
                                style={{
                                    background: '#3d3029',
                                    border: '1px solid #54443b',
                                    color: '#f5f2eb',
                                    padding: '4px 14px',
                                    borderRadius: '20px',
                                    fontSize: '11px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <span style={{ color: '#d97706' }}>✉️</span> {hotelData?.email || 'support@retrod.in'}
                            </a>
                        )}
                    </div>

                    {/* Right: Currency & Theme Selectors */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value as CurrencyType)}
                            style={{
                                background: '#3d3029',
                                color: '#f5f2eb',
                                border: '1px solid #54443b',
                                borderRadius: '6px',
                                padding: isMobile ? '2px 4px' : '4px 10px',
                                fontSize: isMobile ? '10px' : '11px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <option value="INR" style={{ background: '#2c221e', color: '#fff' }}>INR (₹)</option>
                            <option value="USD" style={{ background: '#2c221e', color: '#fff' }}>USD ($)</option>
                        </select>

                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value as ThemeType)}
                            title="Choose Theme"
                            style={{
                                background: '#3d3029',
                                color: '#f5f2eb',
                                border: '1px solid #54443b',
                                borderRadius: '6px',
                                padding: isMobile ? '2px 4px' : '4px 10px',
                                fontSize: isMobile ? '11px' : '12px',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            <option value="light" style={{ background: '#2c221e', color: '#fff' }}>
                                {isMobile ? '⚪' : '⚪ Default White'}
                            </option>
                            <option value="dark" style={{ background: '#2c221e', color: '#fff' }}>
                                {isMobile ? '🌙' : '🌙 Dark'}
                            </option>
                            <option value="ocean" style={{ background: '#2c221e', color: '#fff' }}>
                                {isMobile ? '🌊' : '🌊 Ocean Sky'}
                            </option>
                            <option value="forest" style={{ background: '#2c221e', color: '#fff' }}>
                                {isMobile ? '🌲' : '🌲 Forest Green'}
                            </option>
                            <option value="peach" style={{ background: '#2c221e', color: '#fff' }}>
                                {isMobile ? '🍑' : '🍑 Peach'}
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Mobile Logo Brand Header Row (Visible ONLY on mobile devices, hidden on desktop) */}
            {isMobile && (
                <div
                    className="mobile-brand-logo-bar"
                    style={{
                        background: 'var(--card-bg, #ffffff)',
                        borderBottom: '1px solid var(--border-color, #e2e8f0)',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                        onClick={() => setCurrentView('main')}
                    >
                        <img
                            src={hotelData?.logo_url || "/retrod-logo.png"}
                            alt={`${hotelData?.name || 'Retrod'} Logo`}
                            style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '8px' }}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src = "/retrod-logo.png";
                            }}
                        />
                        <div>
                            <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-dark, #0f172a)', lineHeight: 1.1 }}>
                                {hotelData?.name || 'Retrod'}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)', fontWeight: 500 }}>
                                Official Booking Engine
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
