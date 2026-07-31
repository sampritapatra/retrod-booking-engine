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
    const t = title.toUpperCase();
    if (t.includes('AP') && !t.includes('MAP')) return 'AP';
    if (t.includes('MAP')) return 'MAP';
    if (t.includes('CP')) return 'CP';
    return 'EP';
};

export const RateDetailsModal: React.FC = () => {
    const { hotelData, modalParams, closeModal, currency } = useBooking() as any;

    const room = hotelData?.room_types?.find((r: any) => r.id === modalParams.roomId);
    const plan = room?.rate_plans?.find((p: any) => p.id === modalParams.planId);

    if (!room || !plan) return null;

    const planCode = getPlanCode(plan.title);
    const mealInfo = MEAL_PLAN_EXPLANATIONS[planCode] || MEAL_PLAN_EXPLANATIONS.EP;

    const basePrice = plan.single_occupancy_price || room.starting_price || room.base_price || 2000;
    const taxAmount = plan.single_occupancy_tax || 100;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.5)',
                backdropFilter: 'blur(3px)',
                zIndex: 1500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
            }}
            onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
            <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                width: '420px',
                maxWidth: '100%',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Rate Details
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: '2px 0 0 0' }}>
                            {room.name}
                        </h3>
                    </div>
                    <button
                        onClick={closeModal}
                        style={{
                            background: '#f1f5f9',
                            border: 'none',
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        &times;
                    </button>
                </div>

                {/* Pricing summary */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{plan.title}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>+ {formatCurrency(taxAmount, currency || 'INR')} taxes / night</div>
                    </div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>
                        {formatCurrency(basePrice, currency || 'INR')} <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748b' }}>/night</span>
                    </div>
                </div>

                {/* Meal Plan Explanation */}
                <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Meal Plan Explanation
                    </h4>
                    <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                        {mealInfo.explanation}
                    </p>
                </div>

                {/* Room Category & Benefits */}
                <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Key Benefits ({room.name})
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
                        {mealInfo.benefits.map((b, idx) => (
                            <li key={idx}>{b}</li>
                        ))}
                    </ul>
                </div>

                {/* Close Button */}
                <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                    <button
                        type="button"
                        onClick={closeModal}
                        style={{
                            width: '100%',
                            background: '#0f172a',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
