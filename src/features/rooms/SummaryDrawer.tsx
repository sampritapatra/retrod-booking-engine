import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { AnimatedPrice } from '../../utils/AnimatedPrice';
import { calculatePlanPriceWithPromo } from '../../utils/promo';

export const SummaryDrawer: React.FC = () => {
    const {
        currentView,
        cartSlots,
        currency,
        totalNights,
        calculateGrandTotal,
        getAppliedPromoForPlan,
        setCurrentView,
        removeCartSlot,
        clearCart
    } = useBooking();

    const [isDrawerExpanded, setIsDrawerExpanded] = useState(false);

    if (currentView !== 'main' || cartSlots.length === 0) return null;

    const totalRooms = cartSlots.length;
    const grandTotal = calculateGrandTotal();

    let totalOrigBase = 0;
    let totalDiscount = 0;
    let totalNetBase = 0;
    let totalTax = 0;
    const appliedCodesList: string[] = [];

    cartSlots.forEach(slot => {
        const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
        const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);

        const extraFee = slot.totalExtraCharge != null && slot.totalExtraCharge >= 0
            ? slot.totalExtraCharge
            : (() => {
                const extraAdults = Math.max(0, slot.adults - 2);
                return (extraAdults * 1000 + slot.children * 500) * totalNights;
            })();

        const tax = Math.round(promoRes.finalTotal * 0.05);

        totalOrigBase += (promoRes.origTotal + extraFee);
        totalDiscount += promoRes.discountAmount;
        totalNetBase += (promoRes.finalTotal + extraFee);
        totalTax += tax;

        if (promo?.code && !appliedCodesList.includes(promo.code)) {
            appliedCodesList.push(promo.code);
        }
    });

    return (
        <>
            {isDrawerExpanded && (
                <div 
                    className="cart-drawer-overlay" 
                    onClick={() => setIsDrawerExpanded(false)}
                    style={{ 
                        position: 'fixed', inset: 0, 
                        background: 'rgba(15,23,42,0.6)', 
                        backdropFilter: 'blur(4px)', 
                        zIndex: 998,
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                />
            )}

            {/* Slide-Up Invoice Breakdown Panel (Centered, Matching Top Nav Dark Theme #140b07) */}
            <div 
                className="cart-drawer-panel"
                style={{
                    background: '#140b07',
                    color: '#ffffff',
                    padding: '20px 20px 16px',
                    zIndex: 999,
                    borderRadius: '20px',
                    border: '1.5px solid rgba(255, 255, 255, 0.1)',
                    borderTop: '2.5px solid #22c55e',
                    boxShadow: '0 -14px 45px rgba(0,0,0,0.6)',
                    maxHeight: isDrawerExpanded ? '75vh' : '0px',
                    opacity: isDrawerExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: isDrawerExpanded ? 'auto' : 'none'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🛒 Selected Rooms Invoice Breakdown
                    </h3>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <button type="button" style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }} onClick={clearCart}>Clear All</button>
                        <button type="button" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#cbd5e1', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsDrawerExpanded(false)}>✕</button>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', maxHeight: '35vh', overflowY: 'auto', paddingRight: '4px' }}>
                    {cartSlots.map((slot, idx) => {
                        const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
                        const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);
                        const slotFinalTotal = promoRes.finalTotal + Math.round(promoRes.finalTotal * 0.05);

                        return (
                            <div key={slot.slotId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '10px', flexWrap: 'wrap', gap: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div>
                                    <strong style={{ color: '#f8fafc', fontSize: '13px' }}>Room {idx + 1}: {slot.roomName}</strong>
                                    <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>({slot.planTitle})</span>
                                    {promo && (
                                        <span style={{ marginLeft: '8px', background: '#15803d', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                                            🎟️ {promo.code} ({promoRes.discountLabel})
                                        </span>
                                    )}
                                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                                        👤-{slot.adults}{slot.children > 0 ? `, 👶-${slot.children}` : ''} &bull; {totalNights} Night{totalNights > 1 ? 's' : ''}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ fontWeight: 800, color: '#4ade80', fontSize: '14px' }}>
                                        {formatCurrency(slotFinalTotal, currency)}
                                    </span>
                                    <button type="button" style={{ background: 'rgba(239,68,68,0.2)', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '15px', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => removeCartSlot(slot.slotId)}>&times;</button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Room Base Charges:</span>
                        <span style={{ textDecoration: totalDiscount > 0 ? 'line-through' : 'none', color: totalDiscount > 0 ? '#94a3b8' : '#fff' }}>
                            {formatCurrency(totalOrigBase, currency)}
                        </span>
                    </div>

                    {totalDiscount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80', fontWeight: 700, background: 'rgba(34, 197, 94, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                            <span>🎟️ Promo Savings ({appliedCodesList.join(', ')}):</span>
                            <span>-{formatCurrency(totalDiscount, currency)}</span>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Taxes &amp; Fees (5% GST):</span>
                        <span>{formatCurrency(totalTax, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#4ade80', marginTop: '4px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <span>Grand Total:</span>
                        <AnimatedPrice value={grandTotal} currency={currency} />
                    </div>
                </div>
            </div>

            {/* Bottom Floating Sticky Cart Bar - Centered with Top Nav Dark Color, Rounded Slopes & Emerald Contrast Arrow */}
            <div className="trapezoid-cart-wrapper">
                <div className="trapezoid-cart-bar">
                    {/* Left: Total price and breakdown trigger */}
                    <div 
                        style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', userSelect: 'none' }} 
                        onClick={() => setIsDrawerExpanded(!isDrawerExpanded)}
                    >
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(34,197,94,0.2)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900, transition: 'transform 0.2s', transform: isDrawerExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▲
                        </div>
                        <div>
                            <div style={{ fontSize: '19px', fontWeight: 800, color: '#4ade80', lineHeight: 1.1 }}>
                                <AnimatedPrice value={grandTotal} currency={currency} />
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                                {totalRooms} Room{totalRooms > 1 ? 's' : ''} Selected &bull; Tap for Invoice
                            </div>
                        </div>
                    </div>

                    {/* Right: Round Emerald Green Contrast Arrow Button */}
                    <button
                        type="button"
                        onClick={() => setCurrentView('checkout')}
                        aria-label="Proceed to checkout"
                        className="cart-checkout-arrow-btn"
                        style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                            color: '#ffffff',
                            border: '2.5px solid #ffffff',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px',
                            fontWeight: 900,
                            boxShadow: '0 4px 16px rgba(34, 197, 94, 0.5)',
                            transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        ❯
                    </button>
                </div>
            </div>
        </>
    );
};
