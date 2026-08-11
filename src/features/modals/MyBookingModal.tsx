import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { fetchBookingByReferenceApi } from '../../services/api';
import { formatCurrency } from '../../utils/currency';

export const MyBookingModal: React.FC = () => {
    const { closeModal, guestInfo, currency } = useBooking();
    const [query, setQuery] = useState(guestInfo?.email || '');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [searched, setSearched] = useState(false);

    const executeLookup = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        const res = await fetchBookingByReferenceApi(searchQuery.trim());
        setLoading(false);
        setResult(res);
        setSearched(true);
    };

    useEffect(() => {
        if (guestInfo?.email) {
            executeLookup(guestInfo.email);
        }
    }, [guestInfo]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        executeLookup(query);
    };

    const upcomingList = result?.upcoming_bookings || (result?.booking ? [result.booking] : []);
    const pastList = result?.past_bookings || [];
    const hasAnyBookings = upcomingList.length > 0 || pastList.length > 0;

    return (
        <div className="my-booking-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', width: '560px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            🔍 Lookup My Bookings
                        </h3>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Enter your Email ID or Booking Reference</div>
                    </div>
                    <button style={{ background: 'none', border: 'none', fontSize: '24px', color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                            type="text" 
                            required 
                            value={query} 
                            onChange={e => setQuery(e.target.value)} 
                            placeholder="Enter Guest Email (e.g. guest@example.com)" 
                            style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }} 
                        />
                        <button type="submit" disabled={loading} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}>
                            {loading ? 'Searching...' : 'Find'}
                        </button>
                    </div>
                </form>

                {searched && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {!hasAnyBookings ? (
                            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '16px', borderRadius: '10px', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>
                                No booking record found for "{query}". Please check your email address or reference code.
                            </div>
                        ) : (
                            <>
                                {/* UPCOMING BOOKINGS */}
                                {upcomingList.length > 0 && (
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span>📅</span> UPCOMING RESERVATIONS ({upcomingList.length})
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {upcomingList.map((item: any, idx: number) => (
                                                <div key={idx} style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                        <div>
                                                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{item.hotel_name || 'Hotel Royal'}</div>
                                                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>Ref: {item.booking_reference}</div>
                                                        </div>
                                                        <div style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>
                                                            PAID - {formatCurrency(item.grand_total, currency)}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                                                        🛏️ <strong>Room:</strong> {item.room_name || 'Reserved Room'} ({item.rate_plan_title || 'Standard Plan'})<br/>
                                                        📅 <strong>Dates:</strong> {item.check_in} → {item.check_out} ({item.total_nights} Nights)<br/>
                                                        👤 <strong>Guest:</strong> {item.guest?.full_name || 'Guest'} ({item.guest?.phone})
                                                    </div>
                                                    <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #bbf7d0', fontSize: '11px', color: '#166534', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>📞 Reception Desk: {item.hotel_phone || '+91 9876 543 210'}</span>
                                                        <span>Status: <strong style={{ color: '#15803d' }}>Confirmed</strong></span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* PAST BOOKINGS */}
                                {pastList.length > 0 && (
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span>📜</span> PAST STAY HISTORY ({pastList.length})
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {pastList.map((item: any, idx: number) => (
                                                <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                        <strong style={{ fontSize: '14px', color: '#334155' }}>{item.hotel_name || 'Hotel Royal'} &bull; {item.booking_reference}</strong>
                                                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>
                                                            Paid: {formatCurrency(item.grand_total, currency)}
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                                                        🛏️ {item.room_name} &bull; Stayed: {item.check_in} → {item.check_out} ({item.total_nights} Nights)
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
