import React, { useState } from 'react';
import { RoomType } from '../../types';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { AnimatedPrice } from '../../utils/AnimatedPrice';
import { Tooltip } from '../../components/ui/Tooltip';

interface RoomCardProps {
    room: RoomType;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const {
        currency,
        totalNights,
        cartSlots,
        unlockedPromos,
        togglePromoOffer,
        updateCartQuantity,
        removeCartSlot,
        openModal,
        setCurrentView
    } = useBooking();

    const [showAvailCal, setShowAvailCal] = useState(false);
    const [expandedPlans, setExpandedPlans] = useState<Record<number, boolean>>({});

    const togglePlanExpand = (planId: number) => {
        setExpandedPlans(prev => ({
            ...prev,
            [planId]: !prev[planId]
        }));
    };
    const isBanquet = room.slug === 'banquet-hall' || room.name.toLowerCase().includes('banquet') || room.name.toLowerCase().includes('event hall');

    const render30DayGrid = () => {
        const today = new Date();
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const basePrice = room.starting_price || room.base_price || 2000;

        const cards = [];
        for (let i = 0; i < 30; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            const dayNum = String(d.getDate()).padStart(2, '0');
            const monthStr = months[d.getMonth()];
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const dayPrice = isWeekend ? Math.round(basePrice * 1.1) : basePrice;

            cards.push(
                <div key={i} style={{ minWidth: '96px', maxWidth: '96px', border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden', textAlign: 'center', flexShrink: 0, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div style={{ background: '#15803d', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '4px 0', textTransform: 'uppercase' }}>{`${dayNum}-${monthStr}`}</div>
                    <div style={{ padding: '6px 2px', background: '#f8fafc' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{formatCurrency(dayPrice, currency)}</div>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: '#15803d', marginTop: '2px' }}>{isWeekend ? '3 Available' : '5 Available'}</div>
                    </div>
                </div>
            );
        }
        return cards;
    };

    const getMealsLine = (title: string) => {
        const tLower = title.toLowerCase();
        if (tLower.includes('map')) {
            return (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Breakfast Included</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Choice of Lunch / Dinner</span>
                </div>
            );
        } else if (tLower.includes('ap') || tLower.includes('american plan')) {
            return (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Breakfast</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Lunch</span>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Dinner (Full Board)</span>
                </div>
            );
        } else if (tLower.includes('cp') || tLower.includes('breakfast')) {
            return (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>✔ Breakfast Included</span>
                    <span style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>❌ Lunch</span>
                    <span style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>❌ Dinner</span>
                </div>
            );
        }
        return (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>✔ Room stay only (Meals not included)</span>
            </div>
        );
    };

    if (isBanquet) {
        const maxHalls = room.max_halls || 3;
        const hallPrice = room.starting_price || room.base_price || 25000;
        return (
            <div className="room-card-split" style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ width: '240px', maxWidth: '100%', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={room.thumbnail_url} alt={room.name} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: '260px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>{room.name}</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 10px 0' }}>Premium venue for weddings, corporate meetings, and celebrations.</p>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
                            <span>👥 Capacity: Up to 500 Guests</span>
                            <span>🏢 Halls: {maxHalls} Available</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '180px', flexShrink: 0 }}>
                        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Starting from</div>
                        <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                            <AnimatedPrice value={hallPrice} currency={currency} /> <span style={{ fontSize: '12px', fontWeight: 400, color: '#64748b' }}>/ day</span>
                        </div>
                        <button
                            type="button"
                            className="btn-book-event"
                            onClick={() => setCurrentView('event')}
                            style={{ background: '#111827', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                        >
                            Book Now →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="room-card-split" id={`room-${room.id}`}>
            <div className="room-left-summary">
                <h3 className="room-title-heading" style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0' }}>{room.name}</h3>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '14px', cursor: 'pointer' }} onClick={() => openModal('room-details', room.id)}>
                    <img src={room.thumbnail_url} alt={room.name} loading="lazy" style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
                    <button type="button" style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.75)', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '14px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); openModal('gallery'); }}>📷 See All Photos</button>
                </div>

                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    MAX OCCUPANCY
                    <Tooltip text="Capacity for accommodating number of guests vary by banquet/meeting venues, hotel or time of day." />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>
                    👥 {room.max_adults} Adults &amp; {room.max_children || 0} Children
                </div>

                <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Room Highlights</div>
                    <div style={{ fontSize: '13px', color: '#475569', marginBottom: '4px' }}>📐 312 sq ft</div>
                    <div style={{ fontSize: '13px', color: '#475569' }}>🛏️ {room.bed_type}</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Top Amenities</div>
                    <span style={{ display: 'inline-block', background: '#f1f5f9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>🛁 Bathroom</span>
                </div>

                <button type="button" style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }} onClick={() => openModal('room-details', room.id)}>
                    View Room Details &gt;
                </button>

                <div style={{ marginTop: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    <button type="button" className="btn-toggle-avail-cal" onClick={() => setShowAvailCal(!showAvailCal)} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                        Availability calendar <span>{showAvailCal ? '˄' : '˅'}</span>
                    </button>
                    {showAvailCal && (
                        <div className="avail-cal-scroll-wrap" style={{ marginTop: '10px', overflowX: 'auto', display: 'flex', gap: '8px', paddingBottom: '8px' }}>
                            {render30DayGrid()}
                        </div>
                    )}
                </div>
            </div>

            <div className="room-right-plans" style={{ flex: 1, minWidth: '320px' }}>
                {room.rate_plans?.map((plan, planIdx) => {
                    const planKey = `${room.id}_${plan.id}`;
                    const isUnlocked = !!unlockedPromos[planKey];
                    const basePrice = plan.single_occupancy_price || room.starting_price || room.base_price || 2000;
                    const origTotal = basePrice * totalNights;
                    const displayTotal = isUnlocked ? Math.round(origTotal * 0.86) : origTotal;
                    const taxAmount = Math.round(displayTotal * 0.05);

                    const activeSlots = cartSlots.filter(s => s.roomId === room.id && s.planId === plan.id);
                    const selectedQty = activeSlots.length;
                    const priceMult = selectedQty > 0 ? selectedQty : 1;

                    // By default, the first meal plan is open; clicking arrow toggles details
                    const isExpanded = expandedPlans[plan.id] !== undefined ? expandedPlans[plan.id] : planIdx === 0;

                    return (
                        <div key={plan.id} className="rate-plan-card" style={{ border: '1px solid #cbd5e1', borderRadius: '12px', marginBottom: '12px', background: '#fff', overflow: 'visible', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', position: 'relative' }}>
                            {/* Accordion Meal Plan Header Row (ONLY VISIBLE ON MOBILE) */}
                            <div 
                                onClick={() => togglePlanExpand(plan.id)}
                                className={`mobile-only-accordion-header ${isExpanded ? 'header-expanded' : 'header-collapsed'}`}
                            >
                                <div className="accordion-title-wrap">
                                    <button 
                                        type="button" 
                                        aria-label="Toggle meal plan details"
                                        className="accordion-arrow-btn"
                                    >
                                        {isExpanded ? '▼' : '▶'}
                                    </button>
                                    <h4 className="accordion-plan-title">
                                        {plan.title}
                                    </h4>
                                </div>

                                <div className="accordion-price-wrap">
                                    <div className="accordion-price-text">
                                        <div className="accordion-price-val">
                                            <AnimatedPrice value={displayTotal * priceMult} currency={currency} />
                                        </div>
                                        <div className="accordion-price-sub">
                                            {selectedQty > 1 ? `${selectedQty} Rooms` : `Total for ${totalNights} Night${totalNights > 1 ? 's' : ''}`}
                                        </div>
                                    </div>
                                    {!isExpanded && (
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); togglePlanExpand(plan.id); }}
                                            className="btn-accordion-details"
                                        >
                                            Details ▾
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Details Body (ALWAYS VISIBLE ON DESKTOP AS PREVIOUS, COLLAPSIBLE ON MOBILE) */}
                            <div className={`rate-plan-card-body ${isExpanded ? 'is-expanded-mobile' : 'is-collapsed-mobile'}`}>
                                <div className="rate-plan-top-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
                                    <div className="plan-info-col" style={{ flex: 1, minWidth: '200px' }}>
                                        <h4 className="plan-title-text desktop-only-plan-title">{plan.title}</h4>
                                        <div className="plan-inclusions-row" style={{ fontSize: '13px', marginBottom: '10px', lineHeight: 1.8 }}>
                                            {getMealsLine(plan.title)}
                                        </div>
                                        <button type="button" className="btn-rate-details-link" style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '13px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', padding: 0 }} onClick={() => openModal('rate-details', room.id, plan.id)}>
                                            Rate Details &gt;
                                        </button>
                                    </div>

                                    <div className="plan-pricing-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: '220px' }}>
                                        <div className={`exclusive-offer-tag ${isUnlocked ? 'unlocked' : ''}`} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 10px', borderRadius: '8px', marginBottom: '8px' }}>
                                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                👑 EXCLUSIVE OFFER <span style={{ background: '#16a34a', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontSize: '10px' }}>14% Off</span>
                                                <Tooltip
                                                    onClick={() => openModal('offer-info', room.id, plan.id)}
                                                    text={<>
                                                        <strong style={{ display: 'block', color: '#fbbf24', fontSize: '12px', marginBottom: '4px' }}>👑 14% Off — Direct Web Offer</strong>
                                                        Valid till 31 Dec 2026. For direct web bookings only. Non-transferable.
                                                    </>}
                                                />
                                            </div>
                                            <button type="button" style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }} onClick={() => togglePromoOffer(room.id, plan.id)}>
                                                {isUnlocked ? '✓ Offer Applied' : 'Get Offer'}
                                            </button>
                                        </div>

                                            <div style={{ textAlign: 'right', marginTop: '2px', width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 12px', borderRadius: '8px' }}>
                                                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                                                    <AnimatedPrice value={displayTotal * priceMult} currency={currency} />
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#64748b' }}>
                                                    {selectedQty > 1 ? `${selectedQty} Rooms Total for ` : 'Total for '}{totalNights} Night{totalNights > 1 ? 's' : ''}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                                                    + {formatCurrency(taxAmount * priceMult, currency)} Taxes &amp; fees
                                                    <Tooltip
                                                        alignRight
                                                        text={<>
                                                            <div style={{ fontWeight: 700, marginBottom: '6px', textAlign: 'center', color: '#fbbf24' }}>Tax Breakdown</div>
                                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', color: '#fff' }}>
                                                                <thead>
                                                                    <tr style={{ color: '#a1a1aa', borderBottom: '1px solid #3f3f46' }}>
                                                                        <th style={{ textAlign: 'left', paddingBottom: '4px' }}>Charge</th>
                                                                        <th style={{ paddingBottom: '4px' }}>Rate</th>
                                                                        <th style={{ textAlign: 'right', paddingBottom: '4px' }}>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr style={{ borderTop: '1px solid #27272a' }}>
                                                                        <td style={{ padding: '4px 0', fontWeight: 600 }}>SGST</td>
                                                                        <td style={{ textAlign: 'center', color: '#d4d4d8' }}>2.5%</td>
                                                                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#4ade80' }}>{formatCurrency(Math.round((taxAmount * priceMult) / 2), currency)}</td>
                                                                    </tr>
                                                                    <tr style={{ borderTop: '1px solid #27272a' }}>
                                                                        <td style={{ padding: '4px 0', fontWeight: 600 }}>CGST</td>
                                                                        <td style={{ textAlign: 'center', color: '#d4d4d8' }}>2.5%</td>
                                                                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#4ade80' }}>{formatCurrency(Math.round((taxAmount * priceMult) / 2), currency)}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </>}
                                                    />
                                                </div>

                                                <div style={{ marginTop: '3px' }}>
                                                    {selectedQty > 0 ? (
                                                        <div className="cart-qty-stepper" style={{ background: '#0e331cff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                            <button className="cart-qty-btn" onClick={() => updateCartQuantity(room.id, plan.id, -1)} style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#0e331cff', fontWeight: 1000, cursor: 'pointer' }}>-</button>
                                                            <span style={{ fontWeight: 800, fontSize: '13px' }}>{selectedQty} Room{selectedQty > 1 ? 's' : ''}</span>
                                                            <button className="cart-qty-btn" onClick={() => updateCartQuantity(room.id, plan.id, 1)} style={{ padding: '2px 10px', borderRadius: '4px', border: '1px solid #cbd5e1', background: '#0e331cff', fontWeight: 1000, cursor: 'pointer' }}>+</button>
                                                        </div>
                                                    ) : (
                                                        <button className="btn-book-room" style={{ background: '#0e331cff', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 24px', fontWeight: 700, cursor: 'pointer' }} onClick={() => updateCartQuantity(room.id, plan.id, 1)}>Select Room</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {activeSlots.length > 0 && (
                                        <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
                                            {activeSlots.map((slot, sIdx) => (
                                                <div key={slot.slotId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 14px', borderRadius: '8px', marginBottom: '6px' }}>
                                                    <div>
                                                        <strong style={{ color: '#0f172a' }}>Room {sIdx + 1}</strong>: 👤 {slot.adults} Adults &bull; 👶 {slot.children} Children
                                                        <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 700, cursor: 'pointer', marginLeft: '8px' }} onClick={() => openModal('edit-occupancy', room.id, plan.id, slot.slotId)}>Modify Occupancy ∨</button>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                        <span style={{ fontWeight: 800, color: '#15803d' }}>
                                                            <AnimatedPrice value={displayTotal} currency={currency} />
                                                        </span>
                                                        <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, cursor: 'pointer' }} onClick={() => removeCartSlot(slot.slotId)}>&times;</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                })}
            </div>
        </div>
    );
};
