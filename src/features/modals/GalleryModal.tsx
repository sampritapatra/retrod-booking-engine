import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const GalleryModal: React.FC = () => {
    const { hotelData, closeModal } = useBooking();

    const images = hotelData?.gallery_images || [
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop", caption: "Grand Executive Lobby" },
        { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop", caption: "Luxury Suite Bed" },
        { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop", caption: "Infinity Pool" },
        { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop", caption: "Restaurant Dining" }
    ];

    return (
        <div className="gallery-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', zIndex: 1000, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>📷 Hotel Photo Gallery</h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '24px', fontWeight: 800, color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {images.map((img, idx) => (
                        <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <img src={img.url} alt={img.caption} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
                            <div style={{ padding: '8px 12px', background: '#f8fafc', fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                                {img.caption}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
