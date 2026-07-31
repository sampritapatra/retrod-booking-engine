import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { fetchBookingByReferenceApi } from '../../services/api';

export const MyBookingModal: React.FC = () => {
    const { closeModal } = useBooking();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        const res = await fetchBookingByReferenceApi(query);
        setLoading(false);
        setResult(res);
        setSearched(true);
    };

    return (
        <div className="my-booking-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', width: '480px', maxWidth: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                        🔍 Lookup My Booking
                    </h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>BOOKING REFERENCE / EMAIL</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="text" 
                            required 
                            value={query} 
                            onChange={e => setQuery(e.target.value)} 
                            placeholder="RETROD-123456 or guest@email.com" 
                            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }} 
                        />
                        <button type="submit" disabled={loading} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
                            {loading ? 'Searching...' : 'Find'}
                        </button>
                    </div>
                </form>

                {searched && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '10px', fontSize: '13px' }}>
                        {result && result.reference ? (
                            <div>
                                <div style={{ fontWeight: 800, color: '#16a34a', marginBottom: '4px' }}>✓ Booking Confirmed</div>
                                <div>Ref: <strong>{result.reference}</strong></div>
                                <div>Guest: {result.guest_name}</div>
                                <div>Status: <span style={{ color: '#16a34a', fontWeight: 700 }}>Active</span></div>
                            </div>
                        ) : (
                            <div style={{ color: '#dc2626', fontWeight: 600 }}>
                                No booking found for "{query}". Please check your booking code.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
