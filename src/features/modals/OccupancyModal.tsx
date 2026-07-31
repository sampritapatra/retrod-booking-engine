import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

// Extra charges per person per night (configurable)
const EXTRA_ADULT_CHARGE_PER_NIGHT = 1000;   // ₹1,000 per extra adult per night
const EXTRA_CHILD_CHARGE_PER_NIGHT = 500;    // ₹500 per extra child per night

export const OccupancyModal: React.FC = () => {
    const {
        totalAdults,
        totalChildren,
        totalNights,
        updateGlobalOccupancy,
        updateSlotOccupancy,
        cartSlots,
        hotelData,
        modalParams,
        closeModal
    } = useBooking() as any;

    const targetSlot = cartSlots.find((s: any) => s.slotId === modalParams.slotId);
    const isEditSlot = !!targetSlot;

    // Find the room definition from hotel data to get max_adults / max_children
    const roomDef = isEditSlot
        ? hotelData?.room_types?.find((r: any) => r.id === targetSlot.roomId)
        : null;

    // Default max capacity: 2 adults / 1 child if no room-specific info
    const maxAdults = roomDef?.max_adults ?? 2;
    const maxChildren = roomDef?.max_children ?? 1;

    const [adults, setAdults] = useState<number>(isEditSlot ? (targetSlot.adults ?? 2) : (totalAdults ?? 2));
    const [children, setChildren] = useState<number>(isEditSlot ? (targetSlot.children ?? 0) : (totalChildren ?? 0));

    // Derived extra counts
    const extraAdults = Math.max(0, adults - maxAdults);
    const extraChildren = Math.max(0, children - maxChildren);

    // Extra charges per night
    const extraAdultChargePerNight = extraAdults * EXTRA_ADULT_CHARGE_PER_NIGHT;
    const extraChildChargePerNight = extraChildren * EXTRA_CHILD_CHARGE_PER_NIGHT;
    const totalExtraPerNight = extraAdultChargePerNight + extraChildChargePerNight;

    // Total extra for entire stay (only relevant in slot edit context)
    const stayNights = totalNights ?? 1;
    const totalExtraCharge = totalExtraPerNight * stayNights;

    const hasExtraGuests = extraAdults > 0 || extraChildren > 0;

    const handleSave = () => {
        if (isEditSlot && targetSlot) {
            updateSlotOccupancy(
                targetSlot.slotId,
                adults,
                children,
                extraAdults,
                extraChildren,
                extraAdultChargePerNight,
                extraChildChargePerNight,
                totalExtraCharge
            );
        } else {
            updateGlobalOccupancy(adults, children);
        }
        closeModal();
    };

    const btnStyle: React.CSSProperties = {
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: '2px solid #e2e8f0',
        background: '#fff',
        fontWeight: 800,
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        color: '#0f172a',
        lineHeight: 1
    };

    return (
        <div
            className="occupancy-modal-overlay"
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(15,23,42,0.75)',
                backdropFilter: 'blur(6px)',
                zIndex: 2000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px'
            }}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '28px 28px 24px',
                width: '440px',
                maxWidth: '100%',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                animation: 'slideUpFade 0.25s ease'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
                            {isEditSlot ? `Modify Occupancy` : 'Select Guests & Occupancy'}
                        </h3>
                        {isEditSlot && (
                            <div style={{ marginTop: '4px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                                    {targetSlot.roomName}
                                </div>
                                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
                                    📋 {targetSlot.planTitle}
                                </div>
                            </div>
                        )}
                        {isEditSlot && roomDef && (
                            <div style={{ marginTop: '6px', padding: '4px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d' }}>
                                    Included: {maxAdults} Adults + {maxChildren} Children (Base Occupancy)
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={closeModal}
                        style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '8px', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}
                    >×</button>
                </div>

                {/* Adults Row */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: extraAdults > 0 ? '#fefce8' : '#f8fafc',
                        padding: '16px',
                        borderRadius: '12px',
                        border: `1.5px solid ${extraAdults > 0 ? '#fde68a' : '#e2e8f0'}`,
                        transition: 'all 0.2s'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                👤 Adults
                                {extraAdults > 0 && (
                                    <span style={{ background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                        +{extraAdults} extra
                                    </span>
                                )}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Ages 12+ years</div>
                            {isEditSlot && (
                                <div style={{ fontSize: '11px', color: extraAdults > 0 ? '#b45309' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                                    Base: {maxAdults} adult{maxAdults !== 1 ? 's' : ''} included
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                type="button"
                                style={{ ...btnStyle, background: adults <= 1 ? '#f8fafc' : '#fff', color: adults <= 1 ? '#cbd5e1' : '#0f172a' }}
                                onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                                disabled={adults <= 1}
                            >−</button>
                            <span style={{ fontSize: '20px', fontWeight: 900, minWidth: '28px', textAlign: 'center', color: '#0f172a' }}>{adults}</span>
                            <button
                                type="button"
                                style={{ ...btnStyle, background: adults >= 8 ? '#f8fafc' : '#fff', color: adults >= 8 ? '#cbd5e1' : '#0f172a' }}
                                onClick={() => setAdults(prev => Math.min(8, prev + 1))}
                                disabled={adults >= 8}
                            >+</button>
                        </div>
                    </div>

                    {/* Children Row */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: extraChildren > 0 ? '#fefce8' : '#f8fafc',
                        padding: '16px',
                        borderRadius: '12px',
                        border: `1.5px solid ${extraChildren > 0 ? '#fde68a' : '#e2e8f0'}`,
                        transition: 'all 0.2s'
                    }}>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                🧒 Children
                                {extraChildren > 0 && (
                                    <span style={{ background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                        +{extraChildren} extra
                                    </span>
                                )}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Ages 0 – 11 years</div>
                            {isEditSlot && (
                                <div style={{ fontSize: '11px', color: extraChildren > 0 ? '#b45309' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                                    Base: {maxChildren} child{maxChildren !== 1 ? 'ren' : ''} included
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <button
                                type="button"
                                style={{ ...btnStyle, background: children <= 0 ? '#f8fafc' : '#fff', color: children <= 0 ? '#cbd5e1' : '#0f172a' }}
                                onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                                disabled={children <= 0}
                            >−</button>
                            <span style={{ fontSize: '20px', fontWeight: 900, minWidth: '28px', textAlign: 'center', color: '#0f172a' }}>{children}</span>
                            <button
                                type="button"
                                style={{ ...btnStyle, background: children >= 5 ? '#f8fafc' : '#fff', color: children >= 5 ? '#cbd5e1' : '#0f172a' }}
                                onClick={() => setChildren(prev => Math.min(5, prev + 1))}
                                disabled={children >= 5}
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* ── Extra Charge Warning Banner ────────────── */}
                {hasExtraGuests && isEditSlot && (
                    <div style={{
                        background: 'linear-gradient(135deg, #fffbeb 0%, #fef9c3 100%)',
                        border: '2px solid #f59e0b',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        marginBottom: '18px'
                    }}>
                        <div style={{ fontWeight: 800, fontSize: '13px', color: '#92400e', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            ⚠️ Extra Guest Charges Apply (as per hotel policy)
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {extraAdults > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#78350f', fontWeight: 700 }}>
                                    <span>Extra Adults ({extraAdults} × ₹{EXTRA_ADULT_CHARGE_PER_NIGHT.toLocaleString('en-IN')}/night)</span>
                                    <span style={{ color: '#b45309' }}>₹{(extraAdults * EXTRA_ADULT_CHARGE_PER_NIGHT).toLocaleString('en-IN')}/night</span>
                                </div>
                            )}
                            {extraChildren > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#78350f', fontWeight: 700 }}>
                                    <span>Extra Children ({extraChildren} × ₹{EXTRA_CHILD_CHARGE_PER_NIGHT.toLocaleString('en-IN')}/night)</span>
                                    <span style={{ color: '#b45309' }}>₹{(extraChildren * EXTRA_CHILD_CHARGE_PER_NIGHT).toLocaleString('en-IN')}/night</span>
                                </div>
                            )}
                            {stayNights > 1 && (
                                <>
                                    <div style={{ borderTop: '1px dashed #f59e0b', margin: '4px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#78350f', fontWeight: 700 }}>
                                        <span>Extra per night × {stayNights} nights</span>
                                        <span style={{ color: '#92400e', fontWeight: 900 }}>₹{totalExtraCharge.toLocaleString('en-IN')} total</span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '10px', color: '#a16207', fontStyle: 'italic' }}>
                            Extra charges are added to your room bill. Final invoice shown at checkout.
                        </div>
                    </div>
                )}

                {/* Global mode info (no slot) */}
                {hasExtraGuests && !isEditSlot && (
                    <div style={{
                        background: '#fffbeb',
                        border: '1.5px solid #fde68a',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        marginBottom: '16px',
                        fontSize: '12px',
                        color: '#92400e',
                        fontWeight: 700
                    }}>
                        ℹ️ Extra guest charges may apply if occupancy exceeds each room's base capacity. Charges are shown in the checkout bill.
                    </div>
                )}

                {/* Save Button */}
                <button
                    type="button"
                    onClick={handleSave}
                    style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
                        color: '#fff',
                        border: 'none',
                        padding: '15px',
                        borderRadius: '12px',
                        fontWeight: 900,
                        fontSize: '15px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                        letterSpacing: '0.2px',
                        transition: 'transform 0.15s'
                    }}
                >
                    {isEditSlot
                        ? hasExtraGuests
                            ? `Save — Extra ₹${totalExtraCharge.toLocaleString('en-IN')} will be added`
                            : 'Save Occupancy'
                        : 'Apply Occupancy'}
                </button>
            </div>
        </div>
    );
};
