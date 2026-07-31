import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Accordion } from '../../components/ui/Accordion';

export const LocationSection: React.FC = () => {
    const { hotelData } = useBooking();
    const address = hotelData?.address || 'Nexus Esplanade, Rasulgarh, Bhubaneswar, Odisha, 751010';
    const phone = hotelData?.phone || '+91 8118 031 833';

    return (
        <section className="location-section" id="reach" style={{ padding: '30px 0', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>How To Reach</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>Address</h4>
                        <p style={{ fontSize: '13px', color: '#334155', fontWeight: 600, marginBottom: '12px' }}>{address}</p>
                        <a 
                            href="https://maps.google.com/?q=Nexus+Esplanade+Rasulgarh+Bhubaneswar" 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px', 
                                border: '1.5px solid #6366f1', 
                                color: '#4f46e5', 
                                borderRadius: '6px', 
                                padding: '10px 16px', 
                                fontSize: '13px', 
                                fontWeight: 700, 
                                textDecoration: 'none' 
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            Tap To Open Maps
                        </a>
                    </div>

                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Contact Us</h4>
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
                                padding: '8px 20px', 
                                fontSize: '13px', 
                                fontWeight: 700, 
                                textDecoration: 'none',
                                marginBottom: '10px'
                            }}
                        >
                            💬 Whatsapp us
                        </a>
                        <div style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
                            Unable to Whatsapp? <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>Call directly</a>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                            {phone}
                        </div>
                    </div>
                </div>

                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', height: '260px' }}>
                    <iframe 
                        title="Location Map"
                        src={hotelData?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1462410885145!2d85.82453987593674!3d20.29424751257404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d0b1b511%3A0x8e8eb496924d5218!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy"
                    />
                </div>
            </div>

            <Accordion title="What's NearBy?" defaultOpen={true}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px', color: '#334155' }}>
                    <div>
                        <div style={{ margin: '4px 0' }}>Shri Ram Temple : <strong>11min</strong></div>
                        <div style={{ margin: '4px 0' }}>Lingaraj Temple : <strong>15min</strong></div>
                        <div style={{ margin: '4px 0' }}>Nandankanan Zoological Park : <strong>45min</strong></div>
                        <div style={{ margin: '4px 0' }}>Shree Jagannatha Temple : <strong>1 hr 23 min</strong></div>
                    </div>
                    <div>
                        <div style={{ margin: '4px 0' }}>🚆 Railway Station : <strong>5 min</strong></div>
                        <div style={{ margin: '4px 0' }}>✈️ Airport : <strong>17 min</strong></div>
                        <div style={{ margin: '4px 0' }}>🛍️ Esplanade : <strong>17 min</strong></div>
                        <div style={{ margin: '4px 0' }}>🎬 Sriya Talkies : <strong>11 min</strong></div>
                    </div>
                </div>
            </Accordion>
        </section>
    );
};
