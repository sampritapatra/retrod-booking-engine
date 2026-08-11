import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Accordion } from '../../components/ui/Accordion';

export const LocationSection: React.FC = () => {
    const { hotelData } = useBooking();
    const address = hotelData?.address || 'Nexus Esplanade, Rasulgarh, Bhubaneswar, Odisha, 751010';
    const phone = hotelData?.phone || '+91 8118 031 833';

    return (
        <section className="location-section" id="reach" style={{ padding: '28px 0', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Location &amp; How To Reach</h3>
            
            <div className="location-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
                    <div style={{ background: '#fff', border: '1.5px solid #d4af37', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>📍 Property Address</h4>
                        <p style={{ fontSize: '13px', color: '#334155', fontWeight: 500, marginBottom: '14px', lineHeight: 1.5 }}>{address}</p>
                        <a 
                            href="https://maps.google.com/?q=Nexus+Esplanade+Rasulgarh+Bhubaneswar" 
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

                    <div style={{ background: '#fff', border: '1.5px solid #d4af37', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>📞 Contact &amp; Support</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            <a 
                                href={`https://wa.me/${(hotelData?.whatsapp || phone).replace(/\+/g, '').replace(/\s+/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer" 
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    background: '#22c55e', 
                                    color: '#fff', 
                                    borderRadius: '20px', 
                                    padding: '8px 18px', 
                                    fontSize: '13px', 
                                    fontWeight: 700, 
                                    textDecoration: 'none'
                                }}
                            >
                                💬 WhatsApp
                            </a>
                            <a 
                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '6px', 
                                    background: '#0f172a', 
                                    color: '#fff', 
                                    borderRadius: '20px', 
                                    padding: '8px 18px', 
                                    fontSize: '13px', 
                                    fontWeight: 700, 
                                    textDecoration: 'none'
                                }}
                            >
                                📞 {phone}
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #d4af37', minHeight: '260px', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                    <iframe 
                        title="Location Map"
                        src={hotelData?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1462410885145!2d85.82453987593674!3d20.29424751257404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d0b1b511%3A0x8e8eb496924d5218!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, minHeight: '260px' }} 
                        allowFullScreen={false} 
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};
