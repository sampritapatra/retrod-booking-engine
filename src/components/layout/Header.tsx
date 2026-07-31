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
        currentView, 
        setCurrentView, 
        openModal 
    } = useBooking();

    return (
        <header className="main-header site-header">
            <div className="header-wrapper-container container">
                {/* Left: Brand Logo */}
                <div className="brand-logo" style={{ cursor: 'pointer' }} onClick={() => setCurrentView('main')}>
                    <div className="logo-box">
                        <img 
                            src={hotelData?.logo_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop"} 
                            alt="Logo" 
                            className="logo-img"
                        />
                    </div>
                    <div className="brand-text">
                        <h1 className="hotel-title-text">
                            {hotelData?.name || 'Hotel XYZ'}
                        </h1>
                        <p className="hotel-tagline-text">Experience Luxury &amp; Comfort Redefined</p>
                    </div>
                </div>

                {/* Right: 3-line Navigation Layout */}
                <div className="top-right-3lines">
                    {/* Line 1: Contacts */}
                    <div className="top-line-1 top-contacts">
                        <a href={`tel:${hotelData?.phone || '+919876543210'}`} className="top-link">
                            📞 {hotelData?.phone || '+91 9876 543 210'}
                        </a>
                        <a href={`mailto:${hotelData?.email || 'stay@hotelxyz.com'}`} className="top-link">
                            ✉️ {hotelData?.email || 'stay@hotelxyz.com'}
                        </a>
                    </div>

                    {/* Line 2: Selectors */}
                    <div className="top-line-2 top-settings">
                        <select 
                            value={currency} 
                            onChange={(e) => setCurrency(e.target.value as CurrencyType)}
                            className="currency-selector"
                        >
                            <option value="INR">in INR (₹)</option>
                            <option value="USD">us USD ($)</option>
                        </select>

                        <select 
                            value={theme} 
                            onChange={(e) => setTheme(e.target.value as ThemeType)}
                            className="theme-selector"
                        >
                            <option value="light">⚪ Default White</option>
                            <option value="dark">🌙 Dark</option>
                            <option value="ocean">🌊 Ocean Sky</option>
                            <option value="forest">🌲 Forest Green</option>
                            <option value="peach">🍑 Peach</option>
                        </select>
                    </div>

                    {/* Line 3: Main Navigation Links */}
                    <nav className="top-line-3 nav-menu">
                        <a href="#rooms" onClick={() => setCurrentView('main')} className="nav-link">Rooms</a>
                        <a href="#amenities" onClick={() => setCurrentView('main')} className="nav-link">Amenities</a>
                        <a href="#reach" onClick={() => setCurrentView('main')} className="nav-link">Contact &amp; Map</a>
                        <a href="#policies" onClick={() => setCurrentView('main')} className="nav-link">Policies</a>
                        <button 
                            type="button" 
                            onClick={() => openModal('my-booking')} 
                            className="nav-link highlight-btn"
                        >
                            My Booking
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};
