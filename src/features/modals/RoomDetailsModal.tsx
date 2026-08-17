import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { renderAmenityIcon, cleanAmenityName } from '../amenities/AmenitiesSection';

export const RoomDetailsModal: React.FC = () => {
    const { hotelData, modalData, modalParams, closeModal } = useBooking() as any;
    const params = modalData || modalParams || {};

    const roomsList = hotelData?.rooms || hotelData?.room_types || [];
    const room = roomsList.find((r: any) => r.id?.toString() === params.roomId?.toString()) || roomsList[0];

    if (!room) return null;

    const amenitiesList: string[] = (room.amenities && room.amenities.length > 0)
        ? room.amenities
        : ['Free High Speed Wi-Fi', 'Air Conditioning', 'Ensuite Bathroom', 'Smart TV', 'Daily Housekeeping', 'Tea/Coffee Maker'];

    return (
        <div 
            className="room-details-modal-overlay" 
            style={{ 
                position: 'fixed', 
                inset: 0, 
                background: 'rgba(15,23,42,0.85)', 
                backdropFilter: 'blur(6px)', 
                zIndex: 1500, 
                overflowY: 'auto', 
                padding: '40px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={closeModal}
        >
            <div 
                style={{ 
                    maxWidth: '640px', 
                    width: '100%',
                    background: '#fff', 
                    borderRadius: '16px', 
                    padding: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    border: '1.5px solid #d4af37',
                    animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Room Specifications
                        </span>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                            {room.name}
                        </h3>
                    </div>
                    <button 
                        style={{ 
                            background: '#f1ece4', 
                            border: '1px solid #d4af37', 
                            borderRadius: '50%', 
                            width: '30px', 
                            height: '30px', 
                            fontSize: '14px', 
                            fontWeight: 800, 
                            color: '#44403c', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} 
                        onClick={closeModal}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                    <img 
                        src={room.thumbnail_url || (room.images && room.images[0]?.image_url) || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop'} 
                        alt={room.name} 
                        style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
                    />
                </div>

                <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                    <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Room Description:</p>
                    <p>{room.description || 'Spacious luxury room featuring modern interior decor, premium bedding, work desk, high-speed Wi-Fi, and ensuite bathroom.'}</p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginTop: '14px', background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontWeight: 600, color: '#0f172a' }}>
                            <span>📐 {(room as any).room_size || '312'} sq ft</span>
                            <span style={{ color: '#cbd5e1' }}>|</span>
                            <span>🛏️ {room.bed_type || 'King Bed'}</span>
                        </div>
                        <div style={{ fontWeight: 600, color: '#15803d' }}>
                            👥 Max Capacity: {room.max_adults} Adults &amp; {room.max_children || 0} Children
                        </div>
                    </div>

                    <div style={{ marginTop: '16px' }}>
                        <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Room Amenities &amp; Inclusions:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {amenitiesList.map((am: any, i: number) => {
                                const rawName = typeof am === 'string' ? am : (am?.name || '');
                                const cleanName = cleanAmenityName(rawName);
                                return (
                                    <span
                                        key={i}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: '#f8fafc',
                                            color: '#1e293b',
                                            border: '1px solid #e2e8f0',
                                            padding: '5px 12px',
                                            borderRadius: '8px',
                                            fontSize: '12.5px',
                                            fontWeight: 600
                                        }}
                                    >
                                        <span style={{ color: '#b48a1c', display: 'flex', alignItems: 'center' }}>
                                            {renderAmenityIcon(cleanName)}
                                        </span>
                                        {cleanName}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
