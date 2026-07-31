import React from 'react';
import { useBooking } from '../../context/BookingContext';

export const ReservationRequestsModal: React.FC = () => {
    const { closeModal } = useBooking();

    return (
        <div className="reservation-requests-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', width: '440px', maxWidth: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        Special Requests
                    </h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
                    Have any special preferences (Early check-in, Airport transfer, High floor room)? You can add your requests during guest checkout.
                </p>

                <button type="button" onClick={closeModal} style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>
                    Close
                </button>
            </div>
        </div>
    );
};
