import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const OfferInfoModal: React.FC = () => {
    const { hotelData, modalParams, closeModal } = useBooking();
    const room = hotelData?.room_types?.find(r => r.id === modalParams.roomId);
    const plan = room?.rate_plans?.find(p => p.id === modalParams.planId);

    const isBanquet = room && (room.slug === 'banquet-hall' || room.name.toLowerCase().includes('banquet'));

    return (
        <div className="offer-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', width: '480px', maxWidth: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        {isBanquet ? '🏛️ Banquet Hall Capacity & Charges' : `👑 ${plan ? plan.title : 'Exclusive Web Offer'} (14% Off)`}
                    </h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <div style={{ marginBottom: '16px', fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                    {isBanquet ? (
                        <>
                            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Banquet Event Details:</p>
                            <p>Max Limit: 500 Guests. Extra charges apply for extra people beyond max limit. Please contact reception team at {hotelData?.phone || '+91 9876 543 210'}.</p>
                            <p style={{ marginTop: '8px', fontStyle: 'italic', color: '#64748b' }}>Advance booking recommended. Terms &amp; conditions apply.</p>
                        </>
                    ) : (
                        <>
                            <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>Direct Web Booking Guarantee:</p>
                            <p>Discount Percentage: <strong>14% Off Base Tariff</strong> for direct web engine bookings.</p>
                            <p style={{ marginTop: '8px', color: '#16a34a', fontWeight: 600 }}>Valid for stay dates till 31 Dec 2026. Non-transferable.</p>
                        </>
                    )}
                </div>

                <button type="button" onClick={closeModal} style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>
                    Close Offer Info
                </button>
            </div>
        </div>
    );
};
