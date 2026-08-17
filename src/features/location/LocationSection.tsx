import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const LocationSection: React.FC = () => {
    const { hotelData } = useBooking();
    
    // Don't render if no location data exists
    if (!hotelData?.address && !hotelData?.city && !hotelData?.phone) return null;

    const locationParts = [hotelData?.address, hotelData?.city, hotelData?.state, hotelData?.pincode].filter(Boolean);
    const addressStr = locationParts.join(', ');
    const phone = (hotelData?.phone || '8118031833').replace(/\s+/g, '');
    const whatsappNumber = (hotelData?.whatsapp || phone || '8118031833').replace(/[^0-9]/g, '');
    const email = hotelData?.email || 'support@retrodtech.com';
    const mapEmbedUrl = hotelData?.map_embed_url;
    const mapsLink = mapEmbedUrl && mapEmbedUrl.includes('pb=') ? mapEmbedUrl : (mapEmbedUrl || `https://maps.google.com/?q=${encodeURIComponent(addressStr)}`);

    return (
        <section className="location-section container" id="reach" style={{ padding: '28px 0', borderTop: '1px solid #e2e8f0', scrollMarginTop: '80px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>
                Location &amp; How To Reach
            </h3>
            
            <div className="location-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
                    
                    {/* Property Address Card */}
                    {addressStr && (
                    <div style={{ background: '#fff', border: '1.5px solid #d4af37', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>📍 Property Address</h4>
                        <p style={{ fontSize: '13px', color: '#334155', fontWeight: 500, marginBottom: '14px', lineHeight: 1.5 }}>{addressStr}</p>
                        <a 
                            href={mapsLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px', 
                                border: '1.5px solid #0f172a', 
                                color: '#0f172a', 
                                background: '#ffffff',
                                borderRadius: '8px', 
                                padding: '10px 18px', 
                                fontSize: '13px', 
                                fontWeight: 700, 
                                textDecoration: 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Open Google Maps
                        </a>
                    </div>
                    )}

                    {/* Contact & Support Action Buttons Card */}
                    <div style={{ background: '#fff', border: '1.5px solid #d4af37', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '14px' }}>📞 Contact &amp; Support</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                            {/* Real WhatsApp Vector SVG Button */}
                            <a 
                                href={`https://wa.me/${whatsappNumber.startsWith('91') ? whatsappNumber : '91' + whatsappNumber}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                title="Chat on WhatsApp (+91 8118031833)"
                                aria-label="WhatsApp"
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: '#25D366', 
                                    color: '#fff', 
                                    borderRadius: '12px', 
                                    textDecoration: 'none',
                                    boxShadow: '0 3px 10px rgba(37,211,102,0.35)',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
                                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.35C9.33 7.35 9 7.42 8.74 7.71C8.47 8 7.74 8.69 7.74 10.1C7.74 11.5 8.77 12.87 8.91 13.06C9.06 13.26 10.94 16.14 13.82 17.39C14.5 17.69 15.04 17.86 15.45 18C16.13 18.21 16.76 18.18 17.24 18.11C17.79 18.03 18.91 17.43 19.14 16.78C19.38 16.13 19.38 15.58 19.31 15.46C19.24 15.34 19.04 15.28 18.75 15.13C18.45 15 17 14.29 16.74 14.19C16.48 14.1 16.3 14.05 16.1 14.34C15.91 14.64 15.36 15.28 15.2 15.46C15.03 15.65 14.86 15.68 14.57 15.53C14.28 15.39 13.33 15.08 12.21 14.08C11.34 13.3 10.75 12.34 10.58 12.05C10.42 11.76 10.56 11.6 10.71 11.45C10.84 11.32 11 11.13 11.15 10.96C11.3 10.79 11.35 10.66 11.45 10.46C11.55 10.27 11.5 10.1 11.42 9.96C11.35 9.81 10.76 8.37 10.51 7.79C10.28 7.22 10.04 7.3 9.87 7.29C9.7 7.29 9.53 7.35 9.53 7.35Z"/>
                                </svg>
                            </a>

                            {/* Real Call Phone Vector SVG Button (Just Logo, no number text) */}
                            <a 
                                href={`tel:${phone}`}
                                title="Call Support (+91 8118031833)"
                                aria-label="Phone Call"
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', 
                                    border: '1.5px solid #fde047',
                                    color: '#fff', 
                                    borderRadius: '12px', 
                                    textDecoration: 'none',
                                    boxShadow: '0 3px 10px rgba(180, 83, 9, 0.35)',
                                    transition: 'all 0.2s ease',
                                    flexShrink: 0
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </a>

                            {/* Email Link with Real Mail Vector SVG & support@retrodtech.com */}
                            <a 
                                href={`mailto:${email}`}
                                title="Email Support"
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    background: '#fffdf9', 
                                    border: '1.5px solid #EA4335',
                                    color: '#c5221f', 
                                    borderRadius: '12px', 
                                    padding: '9px 16px', 
                                    fontSize: '13px', 
                                    fontWeight: 700, 
                                    textDecoration: 'none',
                                    boxShadow: '0 2px 6px rgba(234,67,53,0.15)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect width="20" height="16" x="2" y="4" rx="2" fill="#EA4335" fillOpacity="0.2" stroke="#EA4335" strokeWidth="2"/>
                                    <path d="M22 6L12 13L2 6" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {email}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Google Map Embed */}
                {mapEmbedUrl && (
                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #d4af37', minHeight: '260px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                    <iframe 
                        title="Location Map"
                        src={mapEmbedUrl} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, minHeight: '260px' }} 
                        allowFullScreen={false} 
                        loading="lazy"
                    />
                </div>
                )}
            </div>
        </section>
    );
};
