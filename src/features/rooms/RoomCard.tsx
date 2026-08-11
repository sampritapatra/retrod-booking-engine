import React, { useState } from 'react';
import { RoomType, PromoCodeItem } from '../../types';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { AnimatedPrice } from '../../utils/AnimatedPrice';
import { Tooltip } from '../../components/ui/Tooltip';
import { calculatePlanPriceWithPromo } from '../../utils/promo';

interface RoomCardProps {
    room: RoomType;
}

/* ─── helpers ─────────────────────────────────────────────── */
function getPlanKey(title: string): 'EP' | 'CP' | 'MAP' | 'AP' {
    const t = title.toLowerCase();
    if (t.includes('map') || t.includes('modified american')) return 'MAP';
    if (t.includes('american plan') || (t.startsWith('ap') && !t.includes('map'))) return 'AP';
    if (t.includes('cp') || t.includes('continental') || t.includes('breakfast')) return 'CP';
    return 'EP';
}

const PLAN_LABELS: Record<string, { abbr: string; name: string; meal: string; included: boolean }> = {
    EP: { abbr: 'EP', name: 'Room Only', meal: 'Meals not included', included: false },
    CP: { abbr: 'CP', name: 'Room + Breakfast', meal: 'Breakfast included', included: true },
    MAP: { abbr: 'MAP', name: 'Room + Breakfast + 1 Meal', meal: 'Breakfast + Lunch or Dinner', included: true },
    AP: { abbr: 'AP', name: 'American Plan', meal: 'Breakfast, Lunch & Dinner', included: true },
};

const AMENITY_ICONS: Record<string, string> = {
    'wifi': '📶', 'wi-fi': '📶', 'free wi-fi': '📶',
    'air conditioning': '❄️', 'ac': '❄️',
    'bath': '🚿', 'ensuite bath': '🚿', 'bathroom': '🚿',
    'tv': '📺', 'television': '📺',
    'parking': '🅿️',
    'pool': '🏊', 'swimming': '🏊',
    'gym': '💪', 'fitness': '💪',
    'breakfast': '🍳',
    'spa': '💆',
    'balcony': '🏞️',
    'view': '🌅',
};

function amenityIcon(name: string): string {
    const key = name.toLowerCase();
    for (const k of Object.keys(AMENITY_ICONS)) {
        if (key.includes(k)) return AMENITY_ICONS[k];
    }
    return '✦';
}

/* ─── Component ───────────────────────────────────────────── */
export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
    const {
        hotelData, currency, totalNights,
        cartSlots, applyPromoToPlan, getAppliedPromoForPlan,
        updateCartQuantity, removeCartSlot, openModal, setCurrentView,
    } = useBooking();

    const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
    const [promoOpen, setPromoOpen] = useState(false);
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    /* ── promo list ── */
    const activeHotelPromos: PromoCodeItem[] = (hotelData?.promo_codes || []).filter(
        p => p.isActive !== false && p.is_active !== false
    );
    const fallbackPromos: PromoCodeItem[] = [
        { code: 'DIRECT15', discountType: 'percentage', discountValue: 15, minNights: 2, description: '15% Off (Min 2 nights)' },
        { code: 'WELCOME10', discountType: 'percentage', discountValue: 10, minNights: 1, description: '10% Off welcome discount' },
        { code: 'WEEKENDSPA', discountType: 'flat', discountValue: 2000, minNights: 1, description: '₹2000 Off direct booking' },
    ];
    const displayPromos = activeHotelPromos.length > 0 ? activeHotelPromos : fallbackPromos;

    /* ── banquet card ── */
    const isBanquet =
        room.slug === 'banquet-hall' ||
        room.name.toLowerCase().includes('banquet') ||
        room.name.toLowerCase().includes('event hall');

    if (isBanquet) {
        const hallPrice = room.starting_price || room.base_price || 25000;
        return (
            <div className="banquet-card-container" style={{ background: 'var(--card-bg, #ffffff)', border: '1px solid var(--border-color, #e2e8f0)', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                {/* Left side: Info & Price */}
                <div className="banquet-info-side" style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark, #0f172a)', margin: '0 0 4px 0', lineHeight: 1.2 }}>{room.name}</h3>
                    <p className="banquet-desc-text" style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)', margin: '0 0 8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>Premium venue for weddings, corporate events &amp; celebrations.</p>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-dark, #334155)', marginBottom: '10px' }}>
                        <span>👥 Up to 500</span>
                        <span>🏢 {room.max_halls || 3} Halls</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <div>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted, #64748b)', display: 'block', lineHeight: 1 }}>From</span>
                            <span style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>
                                <AnimatedPrice value={hallPrice} currency={currency} />
                            </span>
                        </div>
                        <button onClick={() => setCurrentView('event')} style={{ background: '#15803d', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Book Event →</button>
                    </div>
                </div>

                {/* Right side: Photo */}
                <div className="banquet-photo-side" style={{ width: '130px', height: '100px', flexShrink: 0, overflow: 'hidden', borderRadius: '10px' }}>
                    <img src={room.thumbnail_url} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
            </div>
        );
    }

    /* ── selected plan data ── */
    const ratePlans = room.rate_plans || [];
    const plan = ratePlans[selectedPlanIdx] ?? ratePlans[0];
    const basePrice = plan
        ? (plan.single_occupancy_price || room.starting_price || room.base_price || 2000)
        : (room.starting_price || room.base_price || 2000);
    const appliedPromo = plan ? getAppliedPromoForPlan(room.id, plan.id) : null;
    const promoRes = calculatePlanPriceWithPromo(basePrice, totalNights, appliedPromo);
    const { finalTotal: displayTotal, origTotal, discountAmount, discountLabel, percentSaved } = promoRes;
    const taxAmount = Math.round(displayTotal * 0.05);
    const activeSlots = plan ? cartSlots.filter(s => s.roomId === room.id && s.planId === plan.id) : [];
    const selectedQty = activeSlots.length;
    const maxDiscountPct = Math.max(...displayPromos.map(p => {
        const val = Number(p.discountValue ?? p.discount_value ?? 10);
        const isP = (p.discountType || p.discount_type || 'percentage').toLowerCase().includes('percent');
        return isP ? val : Math.round((val / (basePrice || 2000)) * 100);
    }), 10);

    const amenities: string[] =
        room.amenities && room.amenities.length > 0
            ? room.amenities.slice(0, 5)
            : ['Free Wi-Fi', 'Air Conditioning', 'Ensuite Bath'];

    const [imgIdx, setImgIdx] = useState(0);

    const imagesList = (room.images && room.images.length > 0)
        ? room.images.map(img => img.image_url)
        : [room.thumbnail_url];

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImgIdx(prev => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImgIdx(prev => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };

    /* ── render ── */
    return (
        <div
            id={`room-${room.id}`}
            className={`room-card ${isBanquet ? 'banquet-room-card' : ''}`}
            style={{
                background: 'var(--card-bg, #ffffff)',
                border: '1px solid var(--border-color, #e2e8f0)',
                borderRadius: '16px',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                display: 'flex',
                flexDirection: isBanquet ? 'row-reverse' : 'row',
                overflow: 'hidden',
                position: 'relative',
                minHeight: '260px',
            }}
        >
            {/* ══ LEFT: Photo ═══════════════════════════════════════════ */}
            <div
                style={{ position: 'relative', width: '310px', flexShrink: 0, cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => openModal('room-details', room.id)}
            >
                <img
                    src={imagesList[imgIdx] || room.thumbnail_url}
                    alt={room.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '280px', transition: 'src 0.2s' }}
                />

                {/* Bold Bigger Arrow Buttons for photo navigation */}
                {imagesList.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={prevImage}
                            aria-label="Previous photo"
                            style={{
                                position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.65)', color: '#fff', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                fontSize: '22px', fontWeight: 900, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.4)', zIndex: 5,
                            }}
                        >
                            ❮
                        </button>
                        <button
                            type="button"
                            onClick={nextImage}
                            aria-label="Next photo"
                            style={{
                                position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.65)', color: '#fff', border: 'none',
                                borderRadius: '50%', width: '36px', height: '36px',
                                fontSize: '22px', fontWeight: 900, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.4)', zIndex: 5,
                            }}
                        >
                            ❯
                        </button>
                    </>
                )}

                {/* View All Photos pill */}
                <button
                    type="button"
                    onClick={e => { e.stopPropagation(); openModal('gallery'); }}
                    style={{
                        position: 'absolute', bottom: '14px', left: '14px',
                        background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)',
                        color: '#fff', border: 'none', borderRadius: '20px',
                        padding: '5px 14px', fontSize: '11px', fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                        letterSpacing: '0.01em', zIndex: 4,
                    }}
                >
                    📷 View All Photos
                </button>
            </div>

            {/* ══ MIDDLE: Details ════════════════════════════════════════ */}
            <div className="room-card-middle-details" style={{ flex: 1, padding: '22px 22px 20px', borderRight: '1px solid var(--border-color, #f0f4f8)', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0' }}>

                {/* Room name & Max Capacity */}
                <div className="room-title-capacity-header" style={{ marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: 'var(--text-dark, #000000)', margin: 0, lineHeight: 1.2 }}>
                        {room.name}
                    </h3>

                    {/* Max Capacity with Emojis */}
                    <div className="room-max-capacity-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#15803d', fontWeight: 600 }}>
                        <span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            Max Capacity: 👤-{room.max_adults}{room.max_children !== undefined ? `, 👶-${room.max_children}` : ''}
                        </span>
                    </div>
                </div>

                {/* Room Highlights - Aligned in single line */}
                <div style={{ marginBottom: '16px' }}>
                    <div className="section-dark-header" style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Room Highlights
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--text-dark, #444)', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <span>📐</span> {(room as any).room_size || '312'} sq ft
                        </span>
                        <span style={{ color: 'var(--border-color, #cbd5e1)' }}>|</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <span>🛏️</span> {room.bed_type || 'King Bed'}
                        </span>
                    </div>
                </div>

                {/* 30-Day Availability Calendar Strip (Collapsible) */}
                <div style={{ marginBottom: '16px' }}>
                    <button
                        type="button"
                        onClick={() => setIsCalendarOpen(prev => !prev)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            color: '#0f172a',
                            marginBottom: isCalendarOpen ? '8px' : '0'
                        }}
                    >
                        <span className="section-dark-header" style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Availability Calendar (Next 30 Days)
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: 900, transition: 'transform 0.2s', transform: isCalendarOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            ▼
                        </span>
                    </button>

                    {isCalendarOpen && (
                        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'thin', marginTop: '6px' }}>
                            {Array.from({ length: 30 }).map((_, i) => {
                                const dateObj = new Date();
                                dateObj.setDate(dateObj.getDate() + i);
                                const dayNum = dateObj.getDate();
                                const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' });
                                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                const availCount = (room.available_rooms !== undefined ? room.available_rooms : (room.id % 3 + 2)) + ((i % 4 === 0) ? 0 : 1);

                                return (
                                    <div
                                        key={i}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: '44px',
                                            padding: '5px 4px',
                                            borderRadius: '8px',
                                            background: availCount > 0 ? '#f0fdf4' : '#fef2f2',
                                            border: `1px solid ${availCount > 0 ? '#bbf7d0' : '#fecaca'}`,
                                            textAlign: 'center',
                                            flexShrink: 0
                                        }}
                                    >
                                        <span style={{ fontSize: '9px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{dayName}</span>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{dayNum} {monthStr}</span>
                                        <span style={{ fontSize: '10px', fontWeight: 700, color: availCount > 0 ? '#166534' : '#991b1b', marginTop: '2px' }}>
                                            {availCount > 0 ? `${availCount} left` : 'Sold out'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Container for Meal Plans & Amenities - Flex row in mobile view */}
                <div className="mobile-meal-amenities-container">
                    {/* Meal Plans */}
                    {ratePlans.length > 0 && (
                        <div className="meal-plans-block" style={{ marginBottom: '16px', position: 'relative' }}>
                            <div className="meal-plans-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div className="section-dark-header" style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Meal Plans
                                </div>
                                {plan && (
                                    <button
                                        type="button"
                                        className="rate-details-inline-btn"
                                        onClick={() => openModal('rate-details', room.id, plan.id)}
                                        style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                                    >
                                        Rate Details <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '15px', height: '15px', border: '1.5px solid #2563eb', borderRadius: '50%', fontSize: '10px', fontWeight: 800 }}>i</span>
                                    </button>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'thin' }}>
                                {ratePlans.map((p, idx) => {
                                    const key = getPlanKey(p.title);
                                    const label = PLAN_LABELS[key];
                                    const isSel = idx === selectedPlanIdx;
                                    return (
                                        <button
                                            key={p.id}
                                            type="button"
                                            onClick={() => setSelectedPlanIdx(idx)}
                                            style={{
                                                border: `1.5px solid ${isSel ? '#15803d' : 'var(--border-color, #e2e8f0)'}`,
                                                background: isSel ? 'var(--card-bg, #ffffff)' : 'var(--bg-main, #fafafa)',
                                                borderRadius: '8px',
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                minWidth: '110px',
                                                flexShrink: 0,
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark, #1a1a1a)', marginBottom: '2px' }}>
                                                {label.abbr}
                                            </div>
                                            <div style={{ fontSize: '10px', color: 'var(--text-muted, #64748b)', fontWeight: 500, marginBottom: isSel ? '5px' : '0', lineHeight: 1.3 }}>
                                                {label.name}
                                            </div>
                                            {isSel && (
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '3px',
                                                    background: label.included ? '#dcfce7' : '#fff0f0',
                                                    color: label.included ? '#15803d' : '#dc2626',
                                                    border: `1px solid ${label.included ? '#86efac' : '#fca5a5'}`,
                                                    borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                                                    padding: '2px 6px',
                                                }}>
                                                    {label.included ? (
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                                                    ) : (
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                    )}
                                                    {label.meal}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Top Amenities */}
                    <div className="amenities-block" style={{ marginBottom: '14px' }}>
                        <div className="section-dark-header" style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                            Top Amenities
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {amenities.map((am, i) => (
                                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--bg-main, #f0f9ff)', color: 'var(--text-dark, #0369a1)', border: '1px solid var(--border-color, #bae6fd)', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', fontWeight: 500 }}>
                                    {amenityIcon(am)} {am}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* View Room Details */}
                <button
                    type="button"
                    onClick={() => openModal('room-details', room.id)}
                    style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 700, fontSize: '13px', cursor: 'pointer', textDecoration: 'none', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: 'auto' }}
                >
                    View Room Details
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>

            {/* ══ RIGHT: Price & Booking ═════════════════════════════════ */}
            <div className="room-card-right-action" style={{ width: '230px', flexShrink: 0, padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>

                {/* Exclusive Offer badge row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                        background: '#fff8e6', color: '#b45309',
                        border: '1.5px solid #f59e0b', borderRadius: '6px',
                        padding: '4px 10px', fontSize: '11px', fontWeight: 800,
                        display: 'flex', alignItems: 'center', gap: '4px', letterSpacing: '0.02em',
                    }}>
                        🏷️ EXCLUSIVE OFFER
                    </span>
                    <button
                        type="button"
                        onClick={() => setPromoOpen(o => !o)}
                        style={{
                            background: appliedPromo ? '#15803d' : '#16a34a',
                            color: '#fff', border: 'none', borderRadius: '20px',
                            padding: '4px 12px', fontSize: '11px', fontWeight: 700,
                            cursor: 'pointer', whiteSpace: 'nowrap',
                        }}
                    >
                        {appliedPromo ? '✓ Applied' : 'OFFER'}
                    </button>
                </div>

                {/* Mobile Price & Action Side-by-Side Wrapper */}
                <div className="mobile-price-action-wrapper">
                    {/* Price section */}
                    <div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '2px', fontWeight: 500 }}>Starting from</div>
                        {discountAmount > 0 && (
                            <div style={{ textDecoration: 'line-through', color: '#9ca3af', fontSize: '14px', fontWeight: 600, lineHeight: 1 }}>
                                {formatCurrency(origTotal, currency)}
                            </div>
                        )}
                        <div style={{ fontSize: '32px', fontWeight: 900, color: '#000000', lineHeight: 1.05, letterSpacing: '-0.5px' }}>
                            <AnimatedPrice value={displayTotal} currency={currency} />
                        </div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px', fontWeight: 600 }}>
                            Per Night + Taxes
                        </div>
                        {discountAmount > 0 && (
                            <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginTop: '4px' }}>
                                You save {formatCurrency(discountAmount, currency)} ({percentSaved}% OFF)
                            </div>
                        )}
                        {appliedPromo && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 700, marginTop: '4px' }}>
                                🎟️ {appliedPromo.code}
                            </div>
                        )}

                        {/* Taxes note */}
                        <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                            + {formatCurrency(taxAmount, currency)} taxes &amp; fees
                            <Tooltip alignRight text={<>
                                <div style={{ fontWeight: 700, marginBottom: '4px', color: '#fbbf24' }}>Tax Breakdown</div>
                                <div style={{ fontSize: '11px' }}>SGST 2.5%: {formatCurrency(Math.round(taxAmount / 2), currency)}</div>
                                <div style={{ fontSize: '11px' }}>CGST 2.5%: {formatCurrency(Math.round(taxAmount / 2), currency)}</div>
                            </>} />
                        </div>
                    </div>

                    {/* Select This Room / stepper */}
                    <div className="booking-action-btn-wrapper">
                        {plan && (
                            selectedQty > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#15803d', borderRadius: '10px', padding: '9px 14px', gap: '8px' }}>
                                    <button
                                        type="button"
                                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.22)', color: '#fff', fontWeight: 800, fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                                        onClick={() => updateCartQuantity(room.id, plan.id, -1)}
                                    >−</button>
                                    <span style={{ fontWeight: 800, color: '#fff', fontSize: '15px' }}>
                                        {selectedQty}
                                    </span>
                                    <button
                                        type="button"
                                        style={{ width: '28px', height: '28px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.22)', color: '#fff', fontWeight: 800, fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                                        onClick={() => updateCartQuantity(room.id, plan.id, 1)}
                                    >+</button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => updateCartQuantity(room.id, plan.id, 1)}
                                    style={{
                                        background: '#15803d', color: '#fff', border: 'none',
                                        borderRadius: '10px', padding: '13px 18px',
                                        fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                        boxShadow: '0 4px 14px rgba(21,128,61,0.28)',
                                        transition: 'background 0.2s', width: '100%',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Select This Room
                                </button>
                            )
                        )}
                    </div>
                </div>

                {/* Active slot summary */}
                {activeSlots.length > 0 && (
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {activeSlots.map((slot, sIdx) => (
                            <div key={slot.slotId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#555' }}>
                                <span>Room {sIdx + 1}: 👤 {slot.adults}A {slot.children > 0 ? `👶 ${slot.children}C` : ''}</span>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    <button style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '11px', fontWeight: 700, cursor: 'pointer', padding: 0 }} onClick={() => openModal('edit-occupancy', room.id, plan?.id, slot.slotId)}>Edit</button>
                                    <button style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 800, fontSize: '13px', cursor: 'pointer', padding: 0 }} onClick={() => removeCartSlot(slot.slotId)}>&times;</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ── Promo popover ── */}
                {promoOpen && (
                    <div
                        className="promo-popover-box"
                        style={{
                            position: 'absolute', right: '20px', top: '70px',
                            zIndex: 30, background: '#fff',
                            border: '2px solid #22c55e', borderRadius: '14px',
                            padding: '16px', width: '290px',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                            <span style={{ fontWeight: 800, fontSize: '13px', color: '#0f172a' }}>🎟️ Available Offers ({displayPromos.length})</span>
                            <button type="button" onClick={() => setPromoOpen(false)} style={{ background: 'none', border: 'none', fontSize: '17px', cursor: 'pointer', color: '#64748b' }}>✕</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                            {displayPromos.map((p, idx) => {
                                if (!plan) return null;
                                const pRes = calculatePlanPriceWithPromo(basePrice, totalNights, p);
                                const isSel = appliedPromo?.code === p.code;
                                const minN = Number(p.minNights ?? p.min_nights ?? 1);
                                return (
                                    <div key={p.id || idx} style={{ background: isSel ? '#f0fdf4' : '#f8fafc', border: `1.5px solid ${isSel ? '#86efac' : '#e2e8f0'}`, borderRadius: '10px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '13px', color: '#4f46e5', background: '#eef2ff', padding: '1px 7px', borderRadius: '4px' }}>{p.code}</span>
                                                <span style={{ fontWeight: 700, fontSize: '12px', color: '#15803d' }}>{pRes.discountLabel}</span>
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{minN > 1 ? `Min ${minN} nights` : 'All stays eligible'}</div>
                                            {pRes.isValidForNights && pRes.discountAmount > 0 && (
                                                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 700, marginTop: '2px' }}>Saves {formatCurrency(pRes.discountAmount, currency)}</div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            disabled={!pRes.isValidForNights}
                                            onClick={() => { applyPromoToPlan(room.id, plan.id, isSel ? null : p); setPromoOpen(false); }}
                                            style={{ background: !pRes.isValidForNights ? '#e2e8f0' : (isSel ? '#ef4444' : '#15803d'), color: !pRes.isValidForNights ? '#94a3b8' : '#fff', border: 'none', borderRadius: '7px', padding: '6px 13px', fontSize: '12px', fontWeight: 700, cursor: !pRes.isValidForNights ? 'not-allowed' : 'pointer', flexShrink: 0 }}
                                        >
                                            {!pRes.isValidForNights ? `Min ${minN}N` : (isSel ? 'Remove' : 'Apply')}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
