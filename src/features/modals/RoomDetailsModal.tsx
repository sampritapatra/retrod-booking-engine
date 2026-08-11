import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const RoomDetailsModal: React.FC = () => {
    const { hotelData, modalParams, closeModal } = useBooking();
    const room = hotelData?.room_types?.find(r => r.id === modalParams.roomId);

    if (!room) return null;

    return (
        <div className="room-details-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(6px)', zIndex: 1000, overflowY: 'auto', padding: '40px 20px' }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {room.name} Specifications
                    </h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '24px', fontWeight: 800, color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                    <img src={room.thumbnail_url} alt={room.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                </div>

                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                    <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Room Description:</p>
                    <p>{room.description || 'Spacious luxury room featuring modern interior decor, premium bedding, work desk, and ensuite bathroom.'}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <span>📐 {(room as any).room_size || '312'} sq ft</span>
                            <span style={{ color: '#cbd5e1' }}>|</span>
                            <span>🛏️ {room.bed_type}</span>
                        </div>
                        <div>👥 Max Capacity: {room.max_adults} Adults &amp; {room.max_children || 0} Children</div>
                    </div>

                    {room.amenities && room.amenities.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Room Amenities &amp; Inclusions:</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {room.amenities.map((am, i) => (
                                    <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                                        ✔ {am}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button type="button" onClick={closeModal} style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>
                    Close Details
                </button>
            </div>
        </div>
    );
};
