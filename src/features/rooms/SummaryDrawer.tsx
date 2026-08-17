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

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    if (currentView !== 'main' && currentView !== 'checkout' && currentView !== 'event') return null;
    if (cartSlots.length === 0) return null;

    const totalRooms = cartSlots.length;
    const grandTotal = calculateGrandTotal();

    let totalRoomBase = 0;
    let totalDiscount = 0;
    let totalExtraAdultCharges = 0;
    let totalExtraChildCharges = 0;
    let totalExtraAdultsCount = 0;
    let totalExtraChildrenCount = 0;
    let totalTax = 0;
    const appliedCodesList: string[] = [];

    cartSlots.forEach(slot => {
        const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
        const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);

        const extraAdults = slot.extraAdults ?? Math.max(0, (slot.adults || 2) - 2);
        const extraChildren = slot.extraChildren ?? Math.max(0, (slot.children || 0) - 1);
        const adultRate = slot.extraAdultPrice ?? 700;
        const childRate = slot.extraChildPrice ?? 500;

        const extraAdultFee = extraAdults * adultRate * totalNights;
        const extraChildFee = extraChildren * childRate * totalNights;
        const slotExtraFee = extraAdultFee + extraChildFee;

        const tax = Math.round((promoRes.finalTotal + slotExtraFee) * 0.05);

        totalRoomBase += promoRes.origTotal;
        totalDiscount += promoRes.discountAmount;
        totalExtraAdultCharges += extraAdultFee;
        totalExtraChildCharges += extraChildFee;
        totalExtraAdultsCount += extraAdults;
        totalExtraChildrenCount += extraChildren;
        totalTax += tax;

        if (promo?.code && !appliedCodesList.includes(promo.code)) {
            appliedCodesList.push(promo.code);
        }
    });

    const handleProceedToCheckout = () => {
        setIsDrawerOpen(false);
        setCurrentView('checkout');
    };

    return (
        <>
            {/* Top-Right Floating E-Commerce Cart Button (Dark Luxury Footer Theme with Bold White SVG Cart Icon) */}
            <div 
                className="top-right-floating-cart"
                style={{
                    position: 'fixed',
                    top: '16px',
                    right: '22px',
                    zIndex: 1100,
                    animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            >
                <button
                    type="button"
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    aria-label={`Open Cart (${totalRooms} Room${totalRooms > 1 ? 's' : ''})`}
                    title={`View Cart (${totalRooms} Room${totalRooms > 1 ? 's' : ''})`}
                    className="cart-float-btn"
                    style={{
                        position: 'relative',
                        background: '#14120f',
                        border: '2.5px solid #d4af37',
                        borderRadius: '50%',
                        width: '54px',
                        height: '54px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.45), 0 3px 12px rgba(0,0,0,0.5)',
                        transition: 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        padding: 0,
                    }}
                >
                    {/* Bold White Vector Shopping Cart Icon */}
                    <svg 
                        width="26" 
                        height="26" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="2.4" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                    >
                        <circle cx="9" cy="21" r="1.2" fill="#ffffff"></circle>
                        <circle cx="20" cy="21" r="1.2" fill="#ffffff"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>

                    {/* Golden Room Quantity Badge */}
                    <span 
                        style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                            color: '#ffffff',
                            border: '2px solid #14120f',
                            borderRadius: '50%',
                            minWidth: '22px',
                            height: '22px',
                            padding: '0 4px',
                            fontSize: '12px',
                            fontWeight: 900,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(180,83,9,0.6)'
                        }}
                    >
                        {totalRooms}
                    </span>
                </button>
            </div>

            {/* Modal / Slide-Over Overlay */}
            {isDrawerOpen && (
                <div
                    className="cart-drawer-overlay"
                    onClick={() => setIsDrawerOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.5)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 1150,
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                />
            )}

            {/* Top-Right Slide-Over Cart & Bill Summary Panel */}
            <div
                className="top-right-cart-panel"
                style={{
                    position: 'fixed',
                    top: isDrawerOpen ? '78px' : '60px',
                    right: '22px',
                    width: '410px',
                    maxWidth: 'calc(100vw - 32px)',
                    maxHeight: 'calc(88vh - 40px)',
                    background: '#fdfbf7',
                    border: '2px solid #d4af37',
                    borderRadius: '20px',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.22), 0 0 25px rgba(212,175,55,0.25)',
                    zIndex: 1200,
                    opacity: isDrawerOpen ? 1 : 0,
                    visibility: isDrawerOpen ? 'visible' : 'hidden',
                    transform: isDrawerOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-10px)',
                    transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{ padding: '16px 18px', borderBottom: '1.5px solid #e7e0d3', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#faf6ee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14120f', border: '1.5px solid #d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                                Your Booking Cart
                            </h3>
                            <span style={{ fontSize: '11px', color: '#78716c', fontWeight: 600 }}>
                                {totalRooms} Room{totalRooms > 1 ? 's' : ''} &bull; {totalNights} Night{totalNights > 1 ? 's' : ''} Stay
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                            type="button" 
                            onClick={clearCart} 
                            style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, fontSize: '11.5px', cursor: 'pointer', padding: 0 }}
                        >
                            Clear All
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setIsDrawerOpen(false)}
                            style={{ background: '#f1ece4', border: '1px solid #d4af37', color: '#44403c', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800 }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Selected Rooms List */}
                <div style={{ padding: '14px 18px', overflowY: 'auto', maxHeight: '35vh', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {cartSlots.map((slot, idx) => {
                        const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
                        const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);

                        const extraAdultsCount = slot.extraAdults ?? Math.max(0, (slot.adults || 2) - 2);
                        const extraChildrenCount = slot.extraChildren ?? Math.max(0, (slot.children || 0) - 1);
                        const adultRate = slot.extraAdultPrice ?? 700;
                        const childRate = slot.extraChildPrice ?? 500;

                        const extraAdultFee = extraAdultsCount * adultRate * totalNights;
                        const extraChildFee = extraChildrenCount * childRate * totalNights;
                        const slotExtraFee = extraAdultFee + extraChildFee;

                        const slotTax = Math.round((promoRes.finalTotal + slotExtraFee) * 0.05);
                        const slotFinalTotal = promoRes.finalTotal + slotExtraFee + slotTax;

                        return (
                            <div 
                                key={slot.slotId} 
                                style={{ 
                                    background: '#ffffff', 
                                    border: '1px solid #e7e0d3', 
                                    borderRadius: '12px', 
                                    padding: '12px 14px', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    gap: '8px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                                }}
                            >
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        Room {idx + 1}: {slot.roomName}
                                    </div>
                                    
                                    {/* Guests Breakdown */}
                                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        <span>{slot.planTitle}</span>
                                        <span>&bull;</span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#0f172a', fontWeight: 700 }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {slot.adults} Adult{slot.adults > 1 ? 's' : ''}
                                        </span>
                                        {slot.children > 0 && (
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#b45309', fontWeight: 700 }}>
                                                &bull;
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="8" r="4" />
                                                    <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
                                                    <path d="M10 4.5C11 3.5 13 3.5 14 4.5" />
                                                </svg>
                                                {slot.children} Child{slot.children > 1 ? 'ren' : ''}
                                            </span>
                                        )}
                                    </div>

                                    {/* Extra Adult & Child Charges Callout */}
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                                        {extraAdultsCount > 0 && (
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#fefce8', color: '#b45309', border: '1px solid #fde047', borderRadius: '4px', padding: '1px 6px', fontSize: '10px', fontWeight: 800 }}>
                                                <span>+{extraAdultsCount} Extra Adult: +{formatCurrency(extraAdultFee, currency)}</span>
                                            </div>
                                        )}
                                        {extraChildrenCount > 0 && (
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#fefce8', color: '#b45309', border: '1px solid #fde047', borderRadius: '4px', padding: '1px 6px', fontSize: '10px', fontWeight: 800 }}>
                                                <span>+{extraChildrenCount} Extra Child: +{formatCurrency(extraChildFee, currency)}</span>
                                            </div>
                                        )}
                                        {promo && (
                                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: '4px', padding: '1px 6px', fontSize: '10px', fontWeight: 800 }}>
                                                🎟️ {promo.code} ({promoRes.discountLabel})
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#15803d' }}>
                                        {formatCurrency(slotFinalTotal, currency)}
                                    </span>
                                    <button 
                                        type="button" 
                                        onClick={() => removeCartSlot(slot.slotId)}
                                        style={{ background: '#fee2e2', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '14px', width: '22px', height: '22px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        title="Remove room"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Price & GST Breakdown Footer with Explicit Extra Adult Line */}
                <div style={{ padding: '14px 18px', borderTop: '1.5px solid #e7e0d3', background: '#faf6ee', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px' }}>
                    {/* Room Base Price */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Room Base Price ({totalNights} Night{totalNights > 1 ? 's' : ''}):</span>
                        <span style={{ textDecoration: totalDiscount > 0 ? 'line-through' : 'none', color: totalDiscount > 0 ? '#94a3b8' : '#0f172a', fontWeight: 700 }}>
                            {formatCurrency(totalRoomBase, currency)}
                        </span>
                    </div>

                    {/* Promo Discount */}
                    {totalDiscount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: 700, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '3px 7px', borderRadius: '5px' }}>
                            <span>🎟️ Promo Savings ({appliedCodesList.join(', ')}):</span>
                            <span>-{formatCurrency(totalDiscount, currency)}</span>
                        </div>
                    )}

                    {/* Extra Adult Money Breakdown */}
                    {totalExtraAdultCharges > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b45309', fontWeight: 700, background: '#fefce8', border: '1px solid #fde68a', padding: '3px 7px', borderRadius: '5px' }}>
                            <span>Extra Adult Charges ({totalExtraAdultsCount} Extra Adult{totalExtraAdultsCount > 1 ? 's' : ''}):</span>
                            <span>+{formatCurrency(totalExtraAdultCharges, currency)}</span>
                        </div>
                    )}

                    {/* Extra Child Money Breakdown */}
                    {totalExtraChildCharges > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#b45309', fontWeight: 700, background: '#fefce8', border: '1px solid #fde68a', padding: '3px 7px', borderRadius: '5px' }}>
                            <span>Extra Child Charges ({totalExtraChildrenCount} Extra Child{totalExtraChildrenCount > 1 ? 'ren' : ''}):</span>
                            <span>+{formatCurrency(totalExtraChildCharges, currency)}</span>
                        </div>
                    )}

                    {/* Taxes & GST */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                        <span>Taxes &amp; Fees (5% GST):</span>
                        <span style={{ color: '#0f172a', fontWeight: 700 }}>{formatCurrency(totalTax, currency)}</span>
                    </div>

                    {/* Grand Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 900, color: '#0f172a', borderTop: '1.5px solid #e7e0d3', paddingTop: '8px', marginTop: '2px' }}>
                        <span>Grand Total:</span>
                        <span style={{ color: '#15803d' }}>
                            <AnimatedPrice value={grandTotal} currency={currency} />
                        </span>
                    </div>

                    {/* Proceed to Checkout Action */}
                    <button
                        type="button"
                        onClick={handleProceedToCheckout}
                        style={{
                            marginTop: '8px',
                            background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                            color: '#ffffff',
                            border: '1.5px solid #fde047',
                            borderRadius: '10px',
                            padding: '11px 16px',
                            fontWeight: 800,
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(180, 83, 9, 0.4)',
                            transition: 'all 0.2s ease',
                            width: '100%'
                        }}
                    >
                        <span>Proceed to Checkout</span>
                        <span>➔</span>
                    </button>
                </div>
            </div>
        </>
    );
};
