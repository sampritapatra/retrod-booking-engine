import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export const OccupancyModal: React.FC = () => {
    const {
        totalAdults,
        totalChildren,
        totalNights,
        updateGlobalOccupancy,
        updateSlotOccupancy,
        cartSlots,
        hotelData,
        modalData,
        modalParams,
        closeModal
    } = useBooking() as any;

    const params = modalData || modalParams || {};
    const targetSlot = cartSlots.find((s: any) => s.slotId === params.slotId) 
        || (params.roomId ? cartSlots.find((s: any) => s.roomId?.toString() === params.roomId?.toString()) : null);
    const isEditSlot = !!targetSlot;

    // Find the room definition and rate plan from hotel data
    const roomsList = hotelData?.rooms || hotelData?.room_types || [];
    const roomDef = isEditSlot
        ? roomsList.find((r: any) => r.id?.toString() === targetSlot.roomId?.toString())
        : (params.roomId ? roomsList.find((r: any) => r.id?.toString() === params.roomId?.toString()) : null);

    const ratePlans = roomDef?.rate_plans || [];
    const planDef = (isEditSlot && roomDef)
        ? ratePlans.find((p: any) => p.id?.toString() === targetSlot.planId?.toString())
        : (params.planId ? ratePlans.find((p: any) => p.id?.toString() === params.planId?.toString()) : null);

    // Dynamic Extra Charges per person per night configured for this specific hotel / rate plan
    const extraAdultRate = targetSlot?.extraAdultPrice 
        ?? planDef?.extra_adult_price 
        ?? (roomDef as any)?.extra_adult_price 
        ?? 700;

    const extraChildRate = targetSlot?.extraChildPrice 
        ?? planDef?.extra_child_price 
        ?? (roomDef as any)?.extra_child_price 
        ?? 500;

    // Base included capacity for this specific room category
    const baseIncludedAdults = roomDef?.base_included_adults ?? (targetSlot as any)?.baseIncludedAdults ?? 2;
    const baseIncludedChildren = roomDef?.base_included_children ?? (targetSlot as any)?.baseIncludedChildren ?? 1;

    const maxAdults = roomDef?.max_adults ?? 4;
    const maxChildren = roomDef?.max_children ?? 4;

    const [adults, setAdults] = useState<number>(isEditSlot ? (targetSlot.adults ?? 2) : (totalAdults ?? 2));
    const [children, setChildren] = useState<number>(isEditSlot ? (targetSlot.children ?? 0) : (totalChildren ?? 0));

    // Derived extra counts based on room's base included capacity
    const extraAdults = Math.max(0, adults - baseIncludedAdults);
    const extraChildren = Math.max(0, children - baseIncludedChildren);

    // Extra charges per night using unit pricing
    const extraAdultChargePerNight = extraAdults * extraAdultRate;
    const extraChildChargePerNight = extraChildren * extraChildRate;
    const totalExtraPerNight = extraAdultChargePerNight + extraChildChargePerNight;

    // Total extra for entire stay
    const stayNights = totalNights ?? 1;
    const totalExtraCharge = totalExtraPerNight * stayNights;

    const handleSave = () => {
        if (isEditSlot && targetSlot) {
            const extraAdultFee = extraAdults * extraAdultRate * stayNights;
            const extraChildFee = extraChildren * extraChildRate * stayNights;
            const calculatedTotalExtra = extraAdultFee + extraChildFee;

            updateSlotOccupancy(
                targetSlot.slotId,
                adults,
                children,
                extraAdults,
                extraChildren,
                extraAdultRate, // unit rate per adult (700)
                extraChildRate, // unit rate per child (500)
                calculatedTotalExtra
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
                padding: '20px',
                animation: 'fadeIn 0.2s ease-out'
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
                border: '1.5px solid #d4af37',
                animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.3px' }}>
                            {isEditSlot ? `Modify Room Occupancy` : 'Select Guests & Occupancy'}
                        </h3>
                        {isEditSlot && targetSlot && (
                            <div style={{ marginTop: '4px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
                                    {targetSlot.roomName}
                                </div>
                                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
                                    📋 {targetSlot.planTitle}
                                </div>
                            </div>
                        )}
                        {roomDef && (
                            <div style={{ marginTop: '6px', padding: '4px 10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d' }}>
                                    Base Included: {baseIncludedAdults} Adults + {baseIncludedChildren} Child
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
                        padding: '16px 18px',
                        borderRadius: '12px',
                        border: `1.5px solid ${extraAdults > 0 ? '#fde68a' : '#e2e8f0'}`,
                        transition: 'all 0.2s'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    Adults
                                    {extraAdults > 0 && (
                                        <span style={{ background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                            +{extraAdults} extra
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '1px' }}>Ages 12+ years</div>
                                <div style={{ fontSize: '11px', color: extraAdults > 0 ? '#b45309' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                                    Base: {baseIncludedAdults} adult{baseIncludedAdults !== 1 ? 's' : ''} included
                                </div>
                            </div>
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
                        padding: '16px 18px',
                        borderRadius: '12px',
                        border: `1.5px solid ${extraChildren > 0 ? '#fde68a' : '#e2e8f0'}`,
                        transition: 'all 0.2s'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
                                    <path d="M10 4.5C11 3.5 13 3.5 14 4.5" />
                                </svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    Children
                                    {extraChildren > 0 && (
                                        <span style={{ background: '#f59e0b', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '1px 6px', borderRadius: '4px' }}>
                                            +{extraChildren} extra
                                        </span>
                                    )}
                                </div>
                                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '1px' }}>Ages 0 - 11 years</div>
                                <div style={{ fontSize: '11px', color: extraChildren > 0 ? '#b45309' : '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                                    Base: {baseIncludedChildren} child included free
                                </div>
                            </div>
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
                                style={{ ...btnStyle, background: children >= 6 ? '#f8fafc' : '#fff', color: children >= 6 ? '#cbd5e1' : '#0f172a' }}
                                onClick={() => setChildren(prev => Math.min(6, prev + 1))}
                                disabled={children >= 6}
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* Extra Charges Live Notice */}
                {(extraAdults > 0 || extraChildren > 0) && (
                    <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '12px', padding: '12px 14px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#92400e', marginBottom: '6px' }}>
                            <span>ℹ️ Extra Guest Surcharge:</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#78350f' }}>
                            {extraAdults > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Extra Adult ({extraAdults} × ₹{extraAdultRate.toLocaleString('en-IN')}/night)</span>
                                    <span style={{ fontWeight: 700 }}>+₹{(extraAdults * extraAdultRate * stayNights).toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            {extraChildren > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Extra Child ({extraChildren} × ₹{extraChildRate.toLocaleString('en-IN')}/night)</span>
                                    <span style={{ fontWeight: 700 }}>+₹{(extraChildren * extraChildRate * stayNights).toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            <div style={{ borderTop: '1px dashed #fde68a', paddingTop: '4px', marginTop: '2px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#92400e' }}>
                                <span>Total Extra Charge ({stayNights} Night{stayNights > 1 ? 's' : ''}):</span>
                                <span>+₹{totalExtraCharge.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="button"
                        onClick={closeModal}
                        style={{
                            flex: 1,
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1.5px solid #cbd5e1',
                            background: '#fff',
                            color: '#475569',
                            fontSize: '13.5px',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        style={{
                            flex: 2,
                            padding: '12px',
                            borderRadius: '10px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                            color: '#fff',
                            fontSize: '13.5px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)'
                        }}
                    >
                        {isEditSlot ? 'Update Room Occupancy' : 'Apply Guests'}
                    </button>
                </div>
            </div>
        </div>
    );
};
