import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';

export const PaymentSuccessView: React.FC = () => {
    const { 
        hotelData, 
        cartSlots, 
        currency, 
        checkInDate, 
        checkOutDate, 
        totalNights, 
        calculateGrandTotal, 
        setCurrentView, 
        clearCart,
        guestInfo,
        lastBookingRef,
        openModal
    } = useBooking();

    const grandTotal = calculateGrandTotal();
    const guestName = `${guestInfo?.firstName || ''} ${guestInfo?.lastName || ''}`.trim() || 'Valued Guest';

    const handleReturnHome = () => {
        clearCart();
        setCurrentView('main');
    };

    const handleOpenMyBookings = () => {
        openModal('my-booking');
    };

    return (
        <div className="payment-success-page" style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a', padding: '40px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
                
                {/* White Card Container */}
                <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '36px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                    
                    {/* Header Green Badge */}
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '72px', height: '72px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', fontSize: '36px', marginBottom: '16px', border: '2px solid #bbf7d0' }}>
                            ✓
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                            PAYMENT SUCCESSFUL
                        </div>
                        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            Your Hotel Room is Confirmed!
                        </h1>
                        <p style={{ fontSize: '14px', color: '#64748b', marginTop: '6px' }}>
                            Thank you for booking with <strong>{hotelData?.name || 'Hotel Royal'}</strong>. A simple confirmation receipt &amp; itemized bill have been sent to <strong>{guestInfo?.email || 'your email'}</strong>.
                        </p>
                    </div>

                    {/* Paid Amount Tag & Ref Code */}
                    <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Booking Reference</div>
                            <div style={{ fontSize: '20px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                                {lastBookingRef || 'RETROD-CONFIRMED'}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#166534', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Status</div>
                            <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d', marginTop: '2px', background: '#dcfce7', padding: '4px 12px', borderRadius: '20px', display: 'inline-block' }}>
                                PAID - {formatCurrency(grandTotal, currency)}
                            </div>
                        </div>
                    </div>

                    {/* Reservation Summary */}
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                            🏨 Reservation Summary
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>GUEST NAME</div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{guestName}</div>
                                <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>📧 {guestInfo?.email || 'N/A'}</div>
                                <div style={{ fontSize: '12px', color: '#475569' }}>📱 {guestInfo?.phone || 'N/A'}</div>
                            </div>
                            <div style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>STAY DATES</div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                                    📅 {formatDisplayDate(checkInDate)} → {formatDisplayDate(checkOutDate)}
                                </div>
                                <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
                                    🌙 {totalNights} Night(s) Stay
                                </div>
                            </div>
                        </div>

                        {/* Room list */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#475569', marginBottom: '8px', textTransform: 'uppercase' }}>BOOKED ROOM(S)</div>
                            {cartSlots.map((slot, idx) => (
                                <div key={slot.slotId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: idx < cartSlots.length - 1 ? '1px solid #e2e8f0' : 'none', paddingBottom: '6px', marginBottom: '6px' }}>
                                    <div>
                                        <strong style={{ color: '#0f172a' }}>Slot {idx + 1}: {slot.roomName}</strong>
                                        <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>{slot.planTitle}</div>
                                    </div>
                                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                                        {formatCurrency((slot.basePricePerNight * totalNights) + (slot.taxPerNight * totalNights), currency)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hotel Reception Contacts Box */}
                    <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '18px' }}>📞</span>
                            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
                                {hotelData?.name || 'Hotel Royal'} Reception Contacts
                            </h4>
                        </div>
                        <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                            If you have any questions, early check-in requests, or special arrangements, please call or email the hotel front desk directly:
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#1e293b' }}>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 700, display: 'block' }}>RECEPTION PHONE</span>
                                <strong>{hotelData?.phone || '+91 9876 543 210'}</strong>
                            </div>
                            <div>
                                <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 700, display: 'block' }}>RECEPTION EMAIL</span>
                                <strong>{hotelData?.email || 'stay@hotel.com'}</strong>
                            </div>
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '12px', color: '#475569' }}>
                            📍 <strong>Address:</strong> {hotelData?.address || 'City Centre'}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#334155', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
                        >
                            🖨️ Print Confirmation
                        </button>

                        <button
                            type="button"
                            onClick={handleOpenMyBookings}
                            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #0284c7', background: '#e0f2fe', color: '#0369a1', fontWeight: 800, cursor: 'pointer', fontSize: '13px' }}
                        >
                            🔍 My Bookings
                        </button>

                        <button
                            type="button"
                            onClick={handleReturnHome}
                            style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', background: '#16a34a', color: '#ffffff', fontWeight: 800, cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(22,163,74,0.3)' }}
                        >
                            🏠 Back to Hotel Home Page
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};
