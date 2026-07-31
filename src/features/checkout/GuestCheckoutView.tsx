import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';
import { AnimatedPrice } from '../../utils/AnimatedPrice';

export const GuestCheckoutView: React.FC = () => {
    const { 
        hotelData, 
        cartSlots, 
        currency, 
        checkInDate, 
        checkOutDate, 
        totalNights, 
        calculateGrandTotal, 
        setCurrentView,
        unlockedPromos
    } = useBooking();

    // Automatically scroll to the top of the page when opening guest checkout page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [purpose, setPurpose] = useState<'LEISURE' | 'BUSINESS'>('LEISURE');
    const [companyName, setCompanyName] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPolicyAccordion, setShowPolicyAccordion] = useState(false);

    // Strict validation for all mandatory fields marked with red star (*)
    const isEmailValid = email.trim().length > 0 && email.includes('@');
    const isPhoneValid = phone.trim().length >= 7;
    const isFirstNameValid = firstName.trim().length > 0;
    const isLastNameValid = lastName.trim().length > 0;
    const isFormValid = isEmailValid && isPhoneValid && isFirstNameValid && isLastNameValid && policyAccepted;

    const grandTotal = calculateGrandTotal();

    let totalBaseCharges = 0;
    let totalExtraCharges = 0;
    let totalTaxes = 0;

    cartSlots.forEach((slot: any) => {
        const key = `${slot.roomId}_${slot.planId}`;
        const isUnlocked = unlockedPromos[key];
        let base = slot.basePricePerNight * totalNights;
        if (isUnlocked) base = Math.round(base * 0.86);

        const extraFee = slot.totalExtraCharge != null && slot.totalExtraCharge >= 0
            ? slot.totalExtraCharge
            : (() => {
                const extraAdults = Math.max(0, slot.adults - 2);
                return (extraAdults * 1000 + slot.children * 500) * totalNights;
            })();
        const tax = (slot.taxPerNight || 100) * totalNights;

        totalBaseCharges += base;
        totalExtraCharges += extraFee;
        totalTaxes += tax;
    });

    const sgstAmount = Math.round(totalTaxes / 2);
    const cgstAmount = Math.round(totalTaxes / 2);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            setErrorMsg('Please fill out all mandatory fields marked with * and accept booking policies to proceed.');
            return;
        }
        setErrorMsg('');
        setCurrentView('payment');
    };

    return (
        <div className="checkout-view-container container" style={{ padding: '30px 0' }}>
            <div style={{ marginBottom: '20px' }}>
                <button 
                    type="button" 
                    onClick={() => setCurrentView('main')} 
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 16px', fontWeight: 700, color: '#334155', cursor: 'pointer' }}
                >
                    ← Previous (Change Room / Dates)
                </button>
            </div>

            <div className="checkout-page-grid">
                <form onSubmit={handleSubmit} className="guest-details-form" style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>Guest Details</h3>

                    {errorMsg && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', fontWeight: 600 }}>
                            {errorMsg}
                        </div>
                    )}

                    <div className="guest-form-row">
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                EMAIL ID <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="email" 
                                required
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Enter Email Id" 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', boxSizing: 'border-box', background: '#ffffff', color: '#0f172a' }} 
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                PHONE NUMBER <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="tel" 
                                required
                                value={phone} 
                                onChange={e => setPhone(e.target.value)} 
                                placeholder="Enter Phone Number" 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', boxSizing: 'border-box', background: '#ffffff', color: '#0f172a' }} 
                            />
                        </div>
                    </div>

                    <div className="guest-form-row">
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                FIRST NAME <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="text" 
                                required
                                value={firstName} 
                                onChange={e => setFirstName(e.target.value)} 
                                placeholder="Enter First Name" 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', boxSizing: 'border-box', background: '#ffffff', color: '#0f172a' }} 
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                LAST NAME <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="text" 
                                required
                                value={lastName} 
                                onChange={e => setLastName(e.target.value)} 
                                placeholder="Enter Last Name" 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', boxSizing: 'border-box', background: '#ffffff', color: '#0f172a' }} 
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>PURPOSE OF TRAVEL</label>
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                            <button 
                                type="button" 
                                onClick={() => setPurpose('LEISURE')} 
                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid', borderColor: purpose === 'LEISURE' ? '#16a34a' : '#cbd5e1', background: purpose === 'LEISURE' ? '#f0fdf4' : '#fff', fontWeight: 700, color: purpose === 'LEISURE' ? '#16a34a' : '#475569', cursor: 'pointer' }}
                            >
                                🏖️ Leisure
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setPurpose('BUSINESS')} 
                                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid', borderColor: purpose === 'BUSINESS' ? '#16a34a' : '#cbd5e1', background: purpose === 'BUSINESS' ? '#f0fdf4' : '#fff', fontWeight: 700, color: purpose === 'BUSINESS' ? '#16a34a' : '#475569', cursor: 'pointer' }}
                            >
                                💼 Business
                            </button>
                        </div>

                        {purpose === 'BUSINESS' && (
                            <div className="guest-form-row" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '10px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>COMPANY NAME</label>
                                    <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder="Company Name" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>GSTIN NUMBER</label>
                                    <input type="text" value={gstNumber} onChange={e => setGstNumber(e.target.value)} placeholder="21AAAAA0000A1Z5" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={policyAccepted} 
                                onChange={e => setPolicyAccepted(e.target.checked)} 
                                style={{ marginTop: '3px' }} 
                            />
                            <span style={{ fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>
                                I acknowledge and accept all mandatory <span style={{ color: '#ef4444' }}>*</span> <strong>Booking Policies, Hotel Policies, and Cancellation Policies</strong> of {hotelData?.name || 'Hotel XYZ'}.
                            </span>
                        </label>
                    </div>

                    {/* CONFIRM TO PAY BUTTON - Disabled until all mandatory red star marked fields are filled */}
                    <button 
                        type="submit" 
                        disabled={!isFormValid}
                        style={{ 
                            width: '100%', 
                            background: isFormValid ? '#16a34a' : '#94a3b8', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '14px', 
                            borderRadius: '10px', 
                            fontSize: '16px', 
                            fontWeight: 800, 
                            cursor: isFormValid ? 'pointer' : 'not-allowed', 
                            opacity: isFormValid ? 1 : 0.65,
                            boxShadow: isFormValid ? '0 4px 14px rgba(22,163,74,0.3)' : 'none',
                            marginBottom: '20px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Confirm &amp; Pay &gt;
                    </button>

                    {!isFormValid && (
                        <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 700, textAlign: 'center', marginBottom: '20px' }}>
                            * Please fill in all mandatory details (Email, Phone, First &amp; Last Name) and check policy agreement to activate button.
                        </div>
                    )}

                    {/* CANCELLATION & PROPERTY POLICY BOX - Positioned DOWN of the Confirm & Pay button with GREY background */}
                    <div style={{ background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden' }}>
                        <button 
                            type="button" 
                            onClick={() => setShowPolicyAccordion(!showPolicyAccordion)} 
                            style={{ width: '100%', padding: '12px 16px', background: '#f1f5f9', border: 'none', textAlign: 'left', fontWeight: 700, fontSize: '13px', color: '#0f172a', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <span>📋 Cancellation &amp; Property Policy</span>
                            <span>{showPolicyAccordion ? '▲' : '▼'}</span>
                        </button>
                        {showPolicyAccordion && (
                            <div style={{ padding: '14px 16px', fontSize: '12px', color: '#334155', lineHeight: 1.6, borderTop: '1px solid #cbd5e1', background: '#f8fafc' }}>
                                <strong style={{ color: '#0f172a' }}>{hotelData?.name || 'Hotel XYZ'} Cancellation &amp; Property Policies:</strong>
                                <p style={{ marginTop: '4px', margin: 0 }}>Free cancellation up to 48 hours prior to check-in. Government ID required upon check-in. Primary guest must be at least 18 years old.</p>
                            </div>
                        )}
                    </div>
                </form>

                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', height: 'fit-content' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                        📄 Detailed Invoice Breakdown
                    </h4>
                    <div style={{ background: '#fef2f2', color: '#dc2626', fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '4px', marginBottom: '16px', display: 'inline-block' }}>
                        {formatDisplayDate(checkInDate, 'en-GB', { day: '2-digit', month: 'short' })} - {formatDisplayDate(checkOutDate, 'en-GB', { day: '2-digit', month: 'short' })} ({totalNights} Nights)
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                        {cartSlots.map((slot, idx) => {
                            const key = `${slot.roomId}_${slot.planId}`;
                            const isUnlocked = unlockedPromos[key];
                            let basePrice = slot.basePricePerNight * totalNights;
                            if (isUnlocked) basePrice = Math.round(basePrice * 0.86);

                            return (
                                <div key={slot.slotId} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 12px', borderRadius: '8px', fontSize: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                                        <span>Room {idx + 1}: {slot.roomName}</span>
                                        <span>{formatCurrency(basePrice, currency)}</span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                                        Meal Plan: {slot.planTitle}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                        👤 {slot.adults} Adults &bull; 👶 {slot.children} Children
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                            <span>Room Charges ({totalNights} Nights):</span>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalBaseCharges, currency)}</span>
                        </div>
                        {totalExtraCharges > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                                <span>Extra Guests / Children:</span>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalExtraCharges, currency)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                            <span>SGST (2.5%):</span>
                            <span style={{ fontWeight: 700, color: '#16a34a' }}>{formatCurrency(sgstAmount, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                            <span>CGST (2.5%):</span>
                            <span style={{ fontWeight: 700, color: '#16a34a' }}>{formatCurrency(cgstAmount, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: 700 }}>
                            <span>Total Taxes &amp; Fees (5%):</span>
                            <span style={{ color: '#16a34a' }}>{formatCurrency(totalTaxes, currency)}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0f172a', paddingTop: '4px' }}>
                        <span>Total Payable:</span>
                        <AnimatedPrice value={grandTotal} currency={currency} style={{ color: '#16a34a' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
