import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';

const MEAL_PLAN_EXPLANATIONS: Record<string, { label: string; explanation: string; benefits: string[] }> = {
    EP: {
        label: 'EP (Room Only)',
        explanation: 'Room stay only. Meals (Breakfast, Lunch, Dinner) are not included in this rate plan.',
        benefits: ['Comfortable Room Accommodation', 'Complimentary High-Speed Wi-Fi', 'Daily Housekeeping', 'Tea/Coffee Maker in room', 'Complimentary Bottled Water']
    },
    CP: {
        label: 'CP (Room + Breakfast)',
        explanation: 'Includes room stay with complimentary daily breakfast buffet at the restaurant.',
        benefits: ['Complimentary Daily Breakfast', 'Comfortable Room Accommodation', 'Complimentary High-Speed Wi-Fi', 'Daily Housekeeping', 'Tea/Coffee Maker in room']
    },
    MAP: {
        label: 'MAP (Room + Breakfast & Lunch/Dinner)',
        explanation: 'Includes room stay, daily breakfast, plus your choice of daily Lunch OR Dinner.',
        benefits: ['Daily Breakfast Included', 'Choice of Daily Lunch or Dinner', 'Comfortable Room Accommodation', 'Complimentary High-Speed Wi-Fi', 'Daily Housekeeping']
    },
    AP: {
        label: 'AP (Full Board - All Meals)',
        explanation: 'Includes room stay with all meals included: Daily Breakfast, Lunch, and Dinner.',
        benefits: ['Full Board: Breakfast, Lunch & Dinner', 'Comfortable Room Accommodation', 'Complimentary High-Speed Wi-Fi', 'Daily Housekeeping', 'Tea/Coffee Maker in room']
    }
};

const getPlanCode = (title: string): 'EP' | 'CP' | 'MAP' | 'AP' => {
    const t = (title || '').toUpperCase();
    if (t.includes('AP') && !t.includes('MAP')) return 'AP';
    if (t.includes('MAP')) return 'MAP';
    if (t.includes('CP')) return 'CP';
    return 'EP';
};

export const RateDetailsModal: React.FC = () => {
    const { hotelData, modalData, modalParams, closeModal, currency } = useBooking() as any;
    const params = modalData || modalParams || {};

    const roomsList = hotelData?.rooms || hotelData?.room_types || [];
    const room = roomsList.find((r: any) => r.id?.toString() === params.roomId?.toString()) || roomsList[0];
    const ratePlans = room?.rate_plans || [];
    const plan = ratePlans.find((p: any) => p.id?.toString() === params.planId?.toString()) || ratePlans[0];

    if (!room || !plan) return null;

    const planTitle = plan.title || plan.name || 'EP (Room Only)';
    const planCode = getPlanCode(planTitle);
    const mealInfo = MEAL_PLAN_EXPLANATIONS[planCode] || MEAL_PLAN_EXPLANATIONS.EP;

    const basePrice = plan.single_occupancy_price || plan.price_per_night || room.starting_price || room.base_price || 2000;
    const taxAmount = plan.single_occupancy_tax || Math.round(basePrice * 0.05);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.65)',
                backdropFilter: 'blur(4px)',
                zIndex: 1500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={closeModal}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '520px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                    border: '1.5px solid #d4af37',
                    animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#faf6ee' }}>
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Rate Plan Breakdown
                        </span>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                            {planTitle}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        style={{
                            background: '#f1ece4',
                            border: '1px solid #d4af37',
                            color: '#44403c',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontWeight: 800,
                            fontSize: '14px'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '22px' }}>
                    <div style={{ marginBottom: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Applicable Room</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{room.name}</div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Meal Plan Inclusions
                        </h4>
                        <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                            {mealInfo.explanation}
                        </p>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            Included Amenities &amp; Services
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {mealInfo.benefits.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Pricing info */}
                    <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: '10px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: '#854d0e', fontWeight: 700 }}>Base Rate per night</div>
                            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a' }}>
                                {formatCurrency(basePrice, currency)}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '11px', color: '#854d0e', fontWeight: 700 }}>Taxes (5% GST)</div>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
                                + {formatCurrency(taxAmount, currency)}
                            </div>
                        </div>
                    </div>

                    {/* Cancellation policy */}
                    <div style={{ marginTop: '16px', fontSize: '11.5px', color: '#64748b', lineHeight: 1.4 }}>
                        <strong>Cancellation Policy:</strong> Free cancellation up to 48 hours prior to scheduled check-in time.
                    </div>
                </div>
            </div>
        </div>
    );
};
