import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

export const ExclusiveOffersSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const promos = (hotelData?.promo_codes || []).filter(p => p.isActive !== false);

    // Don't render anything if the hotel has not configured any promo codes!
    if (!promos || promos.length === 0) {
        return null;
    }

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 3000);
    };

    return (
        <section 
            className="exclusive-offers-section"
            style={{
                margin: '24px 0',
                padding: '20px 24px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(238, 242, 255, 0.7) 0%, rgba(243, 244, 246, 0.8) 100%)',
                border: '1px solid #e0e7ff',
                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.06)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '22px' }}>🎟️</span>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 800, color: '#1e1b4b' }}>
                            Exclusive Hotel Offers &amp; Promo Discounts ({promos.length})
                        </h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#4338ca', fontWeight: 500 }}>
                            Direct booking privileges for {hotelData.name}
                        </p>
                    </div>
                </div>
                <span style={{ background: '#4f46e5', color: '#ffffff', fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', letterSpacing: '0.4px' }}>
                    OFFICIAL RATE GUARANTEE
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
                {promos.map((p, idx) => {
                    const isPct = p.discountType === 'percentage' || p.discount_type === 'percentage';
                    const val = p.discountValue ?? p.discount_value ?? 10;
                    const codeStr = (p.code || `OFFER${idx+1}`).toUpperCase();
                    const minN = p.minNights ?? p.min_nights ?? 1;
                    const isCopied = copiedCode === codeStr;

                    return (
                        <div 
                            key={p.id || idx}
                            style={{
                                position: 'relative',
                                background: '#ffffff',
                                border: '1px border-dashed #a5b4fc',
                                borderRadius: '12px',
                                padding: '14px 16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                borderLeft: '4px solid #4f46e5'
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '15px', color: '#4f46e5', background: '#eef2ff', padding: '2px 8px', borderRadius: '6px', border: '1px border-dashed #818cf8' }}>
                                        {codeStr}
                                    </span>
                                    <span style={{ fontWeight: 800, fontSize: '14px', color: '#16a34a', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px' }}>
                                        {isPct ? `${val}% OFF` : `₹${val} OFF`}
                                    </span>
                                </div>

                                <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 8px 0', lineHeight: 1.4 }}>
                                    {minN > 1 ? `Valid on minimum stay of ${minN} nights.` : `Applicable on all room types for direct bookings.`}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleCopyCode(codeStr)}
                                style={{
                                    width: '100%',
                                    marginTop: '8px',
                                    background: isCopied ? '#16a34a' : '#4f46e5',
                                    color: '#ffffff',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px'
                                }}
                            >
                                {isCopied ? '✓ Promo Code Copied!' : '📋 Copy Promo Code'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
