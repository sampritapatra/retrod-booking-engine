import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const Footer: React.FC = () => {
    const { hotelData } = useBooking();

    return (
        <footer
            className="luxury-royal-footer"
            style={{
                position: 'relative',
                width: '100%',
                marginTop: '50px',
                background: 'transparent',
                overflow: 'hidden'
            }}
        >
            {/* Top Organic S-Curve SVG with Dual Golden Contour Border Lines */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden', lineHeight: 0, marginBottom: '-1px' }}>
                <svg
                    viewBox="0 0 1440 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.002)' }}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="goldenWaveMain" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#92400e" stopOpacity="0.8" />
                            <stop offset="20%" stopColor="#d4af37" stopOpacity="1" />
                            <stop offset="45%" stopColor="#fde047" stopOpacity="1" />
                            <stop offset="70%" stopColor="#d4af37" stopOpacity="1" />
                            <stop offset="90%" stopColor="#f59e0b" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="goldenWaveSub" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#78350f" stopOpacity="0.4" />
                            <stop offset="30%" stopColor="#d4af37" stopOpacity="0.7" />
                            <stop offset="70%" stopColor="#fef08a" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#b45309" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>

                    {/* Dark Footer Body Base Fill */}
                    <path
                        d="M 0,65 C 260,110 460,95 720,70 C 980,45 1200,10 1440,0 L 1440,120 L 0,120 Z"
                        fill="#14120f"
                    />

                    {/* Secondary Inner Thin Gold Stroke Line */}
                    <path
                        d="M 0,69 C 260,114 460,99 720,74 C 980,49 1200,14 1440,4"
                        stroke="url(#goldenWaveSub)"
                        strokeWidth="1.2"
                        strokeOpacity="0.7"
                        fill="none"
                    />

                    {/* Primary Outer Bold Glowing Gold Contour Line */}
                    <path
                        d="M 0,65 C 260,110 460,95 720,70 C 980,45 1200,10 1440,0"
                        stroke="url(#goldenWaveMain)"
                        strokeWidth="2.8"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Main Footer Container Spanning Edge-to-Edge with Real Brand Logos */}
            <div
                style={{
                    background: 'linear-gradient(180deg, #14120f 0%, #0d0c0a 100%)',
                    position: 'relative',
                    padding: '20px 0 28px 0',
                    color: '#f5f5f4',
                    width: '100%'
                }}
            >
                {/* Clearly Visible Illuminated Luxury Hotel Background on the Right */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-60px',
                        right: '0',
                        bottom: '0',
                        width: '560px',
                        maxWidth: '55%',
                        backgroundImage: `url(${hotelData?.hero_banner_url || '/luxury-hotel-night.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center right',
                        opacity: 0.38,
                        maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0) 100%)',
                        WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0) 100%)',
                        pointerEvents: 'none',
                        zIndex: 1,
                        filter: 'contrast(1.1) brightness(1.05)'
                    }}
                />

                {/* Full Width Edge-to-Edge Content Container */}
                <div 
                    style={{ 
                        width: '100%', 
                        maxWidth: '100%', 
                        padding: '0 clamp(24px, 4vw, 60px)', 
                        boxSizing: 'border-box', 
                        position: 'relative', 
                        zIndex: 2 
                    }}
                >
                    {/* 4 Evenly Spaced Columns with Real Brand Logos */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1.25fr 1.35fr 1fr 1.15fr',
                            gap: 'clamp(24px, 3.5vw, 48px)',
                            alignItems: 'start',
                            paddingBottom: '26px',
                            width: '100%'
                        }}
                        className="luxury-footer-grid"
                    >
                        {/* ── COL 1: Hotel Brand Logo, Title & Timings ── */}
                        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            {/* Retrod Top Nav Brand Logo */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <img
                                    src={hotelData?.logo_url || "/retrod-logo.png"}
                                    alt={`${hotelData?.name || 'Retrod'} Logo`}
                                    style={{
                                        width: '46px',
                                        height: '46px',
                                        objectFit: 'contain',
                                        borderRadius: '10px',
                                        background: '#ffffff',
                                        padding: '3px',
                                        border: '1.5px solid #d4af37',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                    }}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = "/retrod-logo.png";
                                    }}
                                />
                                <div>
                                    <h3
                                        style={{
                                            fontFamily: "'Playfair Display', Georgia, serif",
                                            fontSize: '22px',
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            margin: 0,
                                            letterSpacing: '0.2px',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {hotelData?.name || 'Hotel Retrod'}
                                    </h3>
                                    <p style={{ fontSize: '11.5px', color: '#d4af37', margin: '2px 0 0 0', fontWeight: 600 }}>
                                        Official Booking Engine
                                    </p>
                                </div>
                            </div>

                            <p style={{ fontSize: '13px', color: '#a8a29e', margin: '0 0 12px 0', fontWeight: 500, letterSpacing: '0.2px', lineHeight: 1.4 }}>
                                {hotelData?.tagline || 'Experience Luxury & Comfort Redefined'}
                            </p>

                            {/* Ornate Gold Leaf Divider */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', maxWidth: '260px', marginBottom: '12px' }}>
                                <div style={{ height: '1.2px', flex: 1, background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.7), transparent)' }}></div>
                                <span style={{ color: '#d4af37', fontSize: '13px' }}>❖</span>
                                <div style={{ height: '1.2px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.7))' }}></div>
                            </div>

                            {/* Check-In / Check-Out Timings */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#d6d3d1', fontWeight: 600 }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    In: <strong style={{ color: '#ffffff' }}>{hotelData?.check_in_time || '12:00 PM'}</strong>
                                </span>
                                <span style={{ color: '#78716c' }}>|</span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    Out: <strong style={{ color: '#ffffff' }}>{hotelData?.check_out_time || '11:00 AM'}</strong>
                                </span>
                            </div>
                        </div>

                        {/* ── COL 2: Contact & Support (with Real WhatsApp, Call, Email, Location SVGs) ── */}
                        <div style={{ borderLeft: '1px solid rgba(212, 175, 55, 0.18)', paddingLeft: 'clamp(16px, 2.2vw, 28px)' }}>
                            <h4
                                style={{
                                    fontSize: '13.5px',
                                    fontWeight: 800,
                                    color: '#d4af37',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.09em',
                                    margin: '0 0 14px 0'
                                }}
                            >
                                Contact &amp; Support
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#d6d3d1' }}>
                                {/* Row of Quick Action Buttons: WhatsApp & Call (just logo) */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                    {/* Real WhatsApp Vector SVG Button */}
                                    <a
                                        href="https://wa.me/918118031833"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Chat on WhatsApp (+91 8118031833)"
                                        aria-label="WhatsApp"
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '10px',
                                            background: '#25D366',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
                                            transition: 'all 0.2s ease',
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff">
                                            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.33 7.35 9 7.42 8.74 7.71C8.47 8 7.74 8.69 7.74 10.1C7.74 11.5 8.77 12.87 8.91 13.06C9.06 13.26 10.94 16.14 13.82 17.39C14.5 17.69 15.04 17.86 15.45 18C16.13 18.21 16.76 18.18 17.24 18.11C17.79 18.03 18.91 17.43 19.14 16.78C19.38 16.13 19.38 15.58 19.31 15.46C19.24 15.34 19.04 15.28 18.75 15.13C18.45 15 17 14.29 16.74 14.19C16.48 14.1 16.3 14.05 16.1 14.34C15.91 14.64 15.36 15.28 15.2 15.46C15.03 15.65 14.86 15.68 14.57 15.53C14.28 15.39 13.33 15.08 12.21 14.08C11.34 13.3 10.75 12.34 10.58 12.05C10.42 11.76 10.56 11.6 10.71 11.45C10.84 11.32 11 11.13 11.15 10.96C11.3 10.79 11.35 10.66 11.45 10.46C11.55 10.27 11.5 10.1 11.42 9.96C11.35 9.81 10.76 8.37 10.51 7.79C10.28 7.22 10.04 7.3 9.87 7.29C9.7 7.29 9.53 7.35 9.53 7.35Z"/>
                                        </svg>
                                    </a>

                                    {/* Real Call Phone Vector SVG Button (Just Logo, no number text) */}
                                    <a
                                        href="tel:8118031833"
                                        title="Call Support (+91 8118031833)"
                                        aria-label="Phone Call"
                                        style={{
                                            width: '42px',
                                            height: '42px',
                                            borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                                            border: '1.5px solid #fde047',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            boxShadow: '0 4px 12px rgba(180, 83, 9, 0.35)',
                                            transition: 'all 0.2s ease',
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                    </a>
                                </div>

                                {/* Email Link with Real Mail Vector SVG & support@retrodtech.com */}
                                <a
                                    href="mailto:support@retrodtech.com"
                                    style={{ color: '#f5f5f4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, wordBreak: 'break-all' }}
                                >
                                    <div
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: 'rgba(234, 67, 53, 0.15)',
                                            border: '1px solid #EA4335',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <rect width="20" height="16" x="2" y="4" rx="2" fill="#EA4335" fillOpacity="0.2" stroke="#EA4335" strokeWidth="1.8"/>
                                            <path d="M22 6L12 13L2 6" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span style={{ fontSize: '13px' }}>support@retrodtech.com</span>
                                </a>

                                {/* Real Location Vector SVG */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#a8a29e', lineHeight: 1.45, marginTop: '2px' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#d4af37" fillOpacity="0.2" stroke="#d4af37" strokeWidth="1.8"/>
                                        <circle cx="12" cy="9" r="2.5" fill="#d4af37"/>
                                    </svg>
                                    <span style={{ fontSize: '12.5px' }}>
                                        {[hotelData?.address, hotelData?.city, hotelData?.state].filter(Boolean).join(', ') || 'Plot No. 102, Retrod Tech Avenue, Business District, Bhubaneswar, Odisha 751001'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ── COL 3: Connect With Us (with Real Facebook, Instagram, Twitter/X, LinkedIn Brand SVGs) ── */}
                        <div style={{ borderLeft: '1px solid rgba(212, 175, 55, 0.18)', paddingLeft: 'clamp(16px, 2.2vw, 28px)' }}>
                            <h4
                                style={{
                                    fontSize: '13.5px',
                                    fontWeight: 800,
                                    color: '#d4af37',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.09em',
                                    margin: '0 0 14px 0'
                                }}
                            >
                                Connect With Us
                            </h4>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                {/* Real Facebook SVG Logo */}
                                <a
                                    href={hotelData?.facebook_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        background: '#1a1714',
                                        border: '1.2px solid rgba(212, 175, 55, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>

                                {/* Real Instagram Vector SVG Logo */}
                                <a
                                    href={hotelData?.instagram_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        background: '#1a1714',
                                        border: '1.2px solid rgba(212, 175, 55, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <defs>
                                            <radialGradient id="igGrad" cx="0.2" cy="1" r="1">
                                                <stop offset="0%" stopColor="#ffd521"/>
                                                <stop offset="50%" stopColor="#f50000"/>
                                                <stop offset="100%" stopColor="#b900b4"/>
                                            </radialGradient>
                                        </defs>
                                        <rect width="20" height="20" x="2" y="2" rx="5" fill="url(#igGrad)"/>
                                        <rect width="14" height="14" x="5" y="5" rx="3.5" fill="none" stroke="#ffffff" strokeWidth="1.8"/>
                                        <circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" strokeWidth="1.8"/>
                                        <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff"/>
                                    </svg>
                                </a>

                                {/* Real X / Twitter Vector SVG Logo */}
                                <a
                                    href={hotelData?.twitter_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter / X"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        background: '#1a1714',
                                        border: '1.2px solid rgba(212, 175, 55, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)'
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>

                                {/* Real LinkedIn Vector SVG Logo */}
                                <a
                                    href={hotelData?.linkedin_url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        borderRadius: '50%',
                                        background: '#1a1714',
                                        border: '1.2px solid rgba(212, 175, 55, 0.45)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)'
                                    }}
                                >
                                    <svg width="19" height="19" viewBox="0 0 24 24" fill="#0A66C2">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* ── COL 4: Accepted Payments (with Real Official Payment Logos) ── */}
                        <div style={{ borderLeft: '1px solid rgba(212, 175, 55, 0.18)', paddingLeft: 'clamp(16px, 2.2vw, 28px)' }}>
                            <h4
                                style={{
                                    fontSize: '13.5px',
                                    fontWeight: 800,
                                    color: '#d4af37',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.09em',
                                    margin: '0 0 14px 0'
                                }}
                            >
                                Accepted Payments
                            </h4>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                {/* Official VISA Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        padding: '4px 10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="Visa"
                                >
                                    <svg width="40" height="15" viewBox="0 0 48 16" fill="none">
                                        <path d="M18.8 1.2L12.5 15.2H8.3L5.1 4C4.9 3.2 4.7 2.9 4.1 2.5C3.1 2 1.4 1.5 0 1.2L0.1 0.7H7.1C8 0.7 8.8 1.3 9 2.3L10.7 11.2L14.7 0.7H18.8ZM35.4 10.4C35.4 6.4 29.8 6.2 29.8 4.4C29.8 3.8 30.4 3.2 31.6 3C32.2 2.9 33.8 2.8 35.5 3.6L36.2 0.8C35.2 0.4 33.9 0 32.3 0C28.3 0 25.6 2.1 25.6 5.1C25.5 7.3 27.5 8.6 29 9.3C30.5 10 31.1 10.5 31.1 11.2C31.1 12.2 29.8 12.6 28.6 12.6C26.6 12.6 25.4 12.1 24.5 11.6L23.7 14.6C24.7 15.1 26.5 15.5 28.3 15.5C32.6 15.5 35.4 13.4 35.4 10.4ZM46 15.2H49.6L46.5 0.7H43.2C42.4 0.7 41.8 1.1 41.5 1.8L35.4 15.2H39.6L40.4 12.9H45.4L46 15.2ZM41.6 9.8L43.7 4.1L44.9 9.8H41.6ZM24.6 0.7L21.3 15.2H17.3L20.6 0.7H24.6Z" fill="#1A1F71"/>
                                    </svg>
                                </div>

                                {/* Official Mastercard Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        padding: '3px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="Mastercard"
                                >
                                    <svg width="34" height="20" viewBox="0 0 36 22" fill="none">
                                        <circle cx="12" cy="11" r="10" fill="#EB001B"/>
                                        <circle cx="24" cy="11" r="10" fill="#F79E1B"/>
                                        <path d="M18 3.5C20.2 5.3 21.6 8 21.6 11C21.6 14 20.2 16.7 18 18.5C15.8 16.7 14.4 14 14.4 11C14.4 8 15.8 5.3 18 3.5Z" fill="#FF5F00"/>
                                    </svg>
                                </div>

                                {/* Official RuPay Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '2px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="RuPay"
                                >
                                    <span style={{ fontSize: '12px', fontWeight: 900, color: '#0971B8', letterSpacing: '-0.5px' }}>RuPay</span>
                                    <svg width="12" height="12" viewBox="0 0 16 16">
                                        <polygon points="0,16 6,0 10,0 4,16" fill="#F37021"/>
                                        <polygon points="6,16 12,0 16,0 10,16" fill="#00A651"/>
                                    </svg>
                                </div>

                                {/* Official UPI Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '3px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="UPI (Unified Payments Interface)"
                                >
                                    <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#000000', letterSpacing: '-0.3px' }}>UPI</span>
                                    <svg width="10" height="12" viewBox="0 0 16 20">
                                        <polygon points="8,0 16,10 8,20" fill="#0971B8"/>
                                        <polygon points="0,0 8,10 0,20" fill="#72B844"/>
                                    </svg>
                                </div>

                                {/* Official Google Pay (GPay) Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#ffffff',
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '3px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="Google Pay"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                    </svg>
                                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#3c4043' }}>Pay</span>
                                </div>

                                {/* Official PhonePe Vector Logo Card */}
                                <div
                                    style={{
                                        background: '#5f259f',
                                        border: '1px solid #5f259f',
                                        borderRadius: '6px',
                                        padding: '4px 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '3px',
                                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                        height: '28px'
                                    }}
                                    title="PhonePe"
                                >
                                    <span style={{ fontSize: '11.5px', fontWeight: 900, color: '#ffffff' }}>पे</span>
                                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#ffffff' }}>PhonePe</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ornate Center Divider Line with Lotus / Floral Emblem Across Full Width */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', width: '100%', margin: '10px 0 16px 0' }}>
                        <div style={{ height: '1.2px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.45))' }}></div>
                        <span style={{ color: '#d4af37', fontSize: '16px', lineHeight: 1 }}>⚜</span>
                        <div style={{ height: '1.2px', flex: 1, background: 'linear-gradient(90deg, rgba(212, 175, 55, 0.45), transparent)' }}></div>
                    </div>

                    {/* Bottom Attribution & Small Footer */}
                    <div className="small_foter" style={{ width: '100%' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px 0px',
                                color: '#ffffff',
                                fontSize: '15px',
                                backgroundColor: '#000000',
                                borderRadius: '5px',
                                width: '100%',
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                &copy; {new Date().getFullYear()} All Rights Reserved Powered by
                                <a
                                    href="https://retrodtech.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        textDecoration: 'none',
                                        color: '#fff',
                                        display: 'inline-flex',
                                        flexDirection: 'column',
                                        verticalAlign: 'middle',
                                        marginLeft: '5px',
                                        textAlign: 'left',
                                    }}
                                >
                                    <strong style={{ fontSize: '18px', lineHeight: 1 }}>Retrod.</strong>
                                    <small
                                        style={{
                                            fontSize: '8px',
                                            color: '#ffffff',
                                            fontFamily: 'arial',
                                            letterSpacing: '1px',
                                            paddingLeft: '17px',
                                        }}
                                    >
                                        Travel Tech
                                    </small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
