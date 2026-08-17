import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const GalleryModal: React.FC = () => {
    const { hotelData, closeModal } = useBooking();

    const images = (hotelData?.images && hotelData.images.length > 0)
        ? hotelData.images.filter(img => img.image_url && img.image_url.trim()).map(img => ({ url: img.image_url, caption: img.caption || hotelData.name }))
        : (hotelData?.gallery_images && hotelData.gallery_images.length > 0)
        ? hotelData.gallery_images.filter(img => img.url && img.url.trim())
        : (hotelData?.hero_banner_url && hotelData.hero_banner_url.trim())
        ? [{ url: hotelData.hero_banner_url, caption: hotelData.name || 'Property Photo' }]
        : [];

    return (
        <div className="gallery-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(8px)', zIndex: 1000, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>📷 Hotel Photo Gallery ({images.length})</h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '24px', fontWeight: 800, color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                {images.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
                        <span style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}>🖼️</span>
                        <p style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0', color: '#0f172a' }}>No Photos Uploaded Yet</p>
                        <p style={{ fontSize: '13px', margin: 0 }}>Photos added in the Hotel Images tab in PMS will appear here.</p>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};
