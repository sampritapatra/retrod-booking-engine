import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { AnimatedPrice } from '../AnimatedPrice/AnimatedPrice';

export const SummaryDrawer: React.FC = () => {
    const {
        cartSlots,
        currency,
        totalNights,
        calculateGrandTotal,
        setCurrentView,
        removeCartSlot,
        clearCart,
        unlockedPromos
    } = useBooking();

    const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

    if (cartSlots.length === 0) return null;

    const totalRooms = cartSlots.length;
    const grandTotal = calculateGrandTotal();

    let totalBase = 0;
    let totalTax = 0;

    cartSlots.forEach(slot => {
        const key = `${slot.roomId}_${slot.planId}`;
        const isUnlocked = unlockedPromos[key];
        let base = (slot.basePricePerNight || 2000) * totalNights;
        if (isUnlocked) base = Math.round(base * 0.86);
        const extraAdults = Math.max(0, slot.adults - 2);
        const extraFee = (extraAdults * 1000 + slot.children * 500) * totalNights;
        totalBase += (base + extraFee);
        totalTax += (slot.taxPerNight || 100) * totalNights;
    });

    return (
        <>
            {/* Expandable Cart Drawer Invoice */}
            {isDrawerExpanded && (
                <div className="cart-drawer-overlay" style={{ position: 'fixed', bottom: '70px', left: 0, right: 0, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(10px)', color: '#fff', padding: '24px', zIndex: 998, borderTop: '2px solid #22c55e', maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', margin: 0 }}>🛒 Selected Rooms Invoice Breakdown</h3>
                            <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer' }} onClick={clearCart}>Clear All</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                            {cartSlots.map((slot, idx) => (
                                <div key={slot.slotId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '12px 16px', borderRadius: '8px' }}>
                                    <div>
                                        <strong style={{ color: '#f8fafc' }}>Room {idx + 1}: {slot.roomName}</strong> ({slot.planTitle})
                                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                                            👤 {slot.adults} Adults &bull; 👶 {slot.children} Children &bull; {totalNights} Night{totalNights > 1 ? 's' : ''}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span style={{ fontWeight: 800, color: '#4ade80' }}>
                                            {formatCurrency((slot.basePricePerNight * totalNights) + (slot.taxPerNight * totalNights), currency)}
                                        </span>
                                        <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '18px', cursor: 'pointer' }} onClick={() => removeCartSlot(slot.slotId)}>&times;</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Room Base Charges:</span>
                                <span>{formatCurrency(totalBase, currency)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Taxes &amp; Fees (5% GST):</span>
                                <span>{formatCurrency(totalTax, currency)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#4ade80', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #334155' }}>
                                <span>Grand Total:</span>
                                <AnimatedPrice value={grandTotal} currency={currency} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STICKY BOTTOM CART BAR */}
            <div className="sticky-cart-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0f172a', color: '#fff', padding: '12px 24px', zIndex: 999, boxShadow: '0 -4px 20px rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}>
                    <button style={{ background: 'none', border: 'none', color: '#4ade80', fontSize: '18px', cursor: 'pointer', padding: 0 }}>
                        {isDrawerExpanded ? '▼' : '▲'}
                    </button>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#4ade80' }}>
                            <AnimatedPrice value={grandTotal} currency={currency} />
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                            {totalRooms} Room{totalRooms > 1 ? 's' : ''} Selected &bull; Click {isDrawerExpanded ? '▼ to Hide' : '▲ for Invoice'}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setCurrentView('checkout')}
                    style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '24px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,0.4)' }}
                >
                    Continue &gt;
                </button>
            </div>
        </>
    );
};
