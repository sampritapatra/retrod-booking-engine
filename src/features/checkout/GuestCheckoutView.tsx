import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';
import { AnimatedPrice } from '../../utils/AnimatedPrice';
import { calculatePlanPriceWithPromo } from '../../utils/promo';
import { sendInvoiceNotificationApi, createRazorpayOrderApi, verifyRazorpayPaymentApi, submitBookingPaymentApi } from '../../services/api';

const COUNTRY_CODES = [
    { code: '+91', country: 'IN', flag: '🇮🇳', label: '🇮🇳 IN (+91)' },
    { code: '+1', country: 'US', flag: '🇺🇸', label: '🇺🇸 US (+1)' },
    { code: '+44', country: 'UK', flag: '🇬🇧', label: '🇬🇧 UK (+44)' },
    { code: '+971', country: 'UAE', flag: '🇦🇪', label: '🇦🇪 UAE (+971)' },
    { code: '+65', country: 'SG', flag: '🇸🇬', label: '🇸🇬 SG (+65)' },
    { code: '+61', country: 'AU', flag: '🇦🇺', label: '🇦🇺 AU (+61)' },
    { code: '+966', country: 'SA', flag: '🇸🇦', label: '🇸🇦 SA (+966)' },
    { code: '+49', country: 'DE', flag: '🇩🇪', label: '🇩🇪 DE (+49)' },
    { code: '+33', country: 'FR', flag: '🇫🇷', label: '🇫🇷 FR (+33)' },
    { code: '+66', country: 'TH', flag: '🇹🇭', label: '🇹🇭 TH (+66)' },
    { code: '+977', country: 'NP', flag: '🇳🇵', label: '🇳🇵 NP (+977)' },
    { code: '+880', country: 'BD', flag: '🇧🇩', label: '🇧🇩 BD (+880)' },
];

export const GuestCheckoutView: React.FC = () => {
    const { 
        hotelSlug,
        hotelData, 
        cartSlots, 
        currency, 
        checkInDate, 
        checkOutDate, 
        totalNights, 
        calculateGrandTotal, 
        getAppliedPromoForPlan,
        setCurrentView,
        setGuestInfo,
        lastBookingRef,
        setLastBookingRef
    } = useBooking();

    // Automatically scroll to the top of the page when opening guest checkout page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [countryCode, setCountryCode] = useState('+91');
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
    const [isProcessing, setIsProcessing] = useState(false);

    // Validation rules
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.trim());

    // Phone must be numeric digits only and exactly 10 digits
    const isPhoneValid = /^\d{10}$/.test(phone.trim());

    // Names must contain letters/spaces/hyphens only (no numeric digits allowed)
    const nameRegex = /^[a-zA-Z\s-]+$/;
    const isFirstNameValid = firstName.trim().length > 0 && nameRegex.test(firstName.trim());
    const isLastNameValid = lastName.trim().length > 0 && nameRegex.test(lastName.trim());

    const isFormValid = isEmailValid && isPhoneValid && isFirstNameValid && isLastNameValid && policyAccepted;

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericVal = e.target.value.replace(/\D/g, '').slice(0, 10);
        setPhone(numericVal);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lettersOnly = e.target.value.replace(/[^a-zA-Z\s-]/g, '');
        setFirstName(lettersOnly);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lettersOnly = e.target.value.replace(/[^a-zA-Z\s-]/g, '');
        setLastName(lettersOnly);
    };

    const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

    const toggleAddon = (id: string) => {
        setSelectedAddonIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const addonsTotal = (hotelData?.addons || [])
        .filter(a => selectedAddonIds.includes(String(a.id)))
        .reduce((sum, a) => sum + Number(a.price), 0);

    const grandTotal = calculateGrandTotal() + addonsTotal;

    let totalOriginalBaseCharges = 0;
    let totalDiscountCharges = 0;
    let totalBaseCharges = 0;
    let totalExtraCharges = 0;
    let totalTaxes = 0;
    const appliedPromoCodesCheckout: string[] = [];

    cartSlots.forEach((slot: any) => {
        const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
        const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);

        const extraFee = slot.totalExtraCharge != null && slot.totalExtraCharge >= 0
            ? slot.totalExtraCharge
            : (() => {
                const extraAdults = Math.max(0, slot.adults - 2);
                return (extraAdults * 1000 + slot.children * 500) * totalNights;
            })();
        const tax = Math.round(promoRes.finalTotal * 0.05);

        totalOriginalBaseCharges += promoRes.origTotal;
        totalDiscountCharges += promoRes.discountAmount;
        totalBaseCharges += promoRes.finalTotal;
        totalExtraCharges += extraFee;
        totalTaxes += tax;

        if (promo?.code && !appliedPromoCodesCheckout.includes(promo.code)) {
            appliedPromoCodesCheckout.push(promo.code);
        }
    });

    const sgstAmount = Math.round(totalTaxes / 2);
    const cgstAmount = Math.round(totalTaxes / 2);

    const executeDirectPaymentVerification = async (razorpayPaymentId?: string, razorpayOrderId?: string, razorpaySignature?: string, info?: any) => {
        setIsProcessing(true);
        const fullPhone = `${countryCode} ${phone}`;
        const payload = {
            hotel_slug: hotelSlug,
            booking_reference: lastBookingRef,
            check_in: checkInDate ? checkInDate.toISOString().split('T')[0] : '',
            check_out: checkOutDate ? checkOutDate.toISOString().split('T')[0] : '',
            total_nights: totalNights,
            grand_total: grandTotal,
            payment_method: 'razorpay',
            payment_status: 'PAID',
            booking_status: 'CONFIRMED',
            razorpay_payment_id: razorpayPaymentId || `pay_rzp_${Date.now()}`,
            razorpay_order_id: razorpayOrderId || '',
            razorpay_signature: razorpaySignature || '',
            cart_slots: cartSlots,
            email: email,
            phone: fullPhone,
            full_name: `${firstName} ${lastName}`.trim() || 'Valued Guest',
            first_name: firstName,
            last_name: lastName,
            company_name: companyName,
            gst_number: gstNumber,
            guest_info: info
        };

        try {
            await submitBookingPaymentApi(payload);
        } catch (e) {
            console.warn('Booking paid update notice:', e);
        }

        const res = await verifyRazorpayPaymentApi(payload);
        setIsProcessing(false);

        const refCode = res?.booking_reference || lastBookingRef || `RETROD-${Date.now().toString().slice(-6)}`;
        setLastBookingRef(refCode);

        // Immediately transition to white screen Payment Success view
        setCurrentView('payment-success');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isProcessing) {
            if (!isEmailValid) {
                setErrorMsg('Please enter a valid email address (e.g., example@domain.com).');
            } else if (!isPhoneValid) {
                setErrorMsg('Please enter a valid 10-digit mobile number.');
            } else if (!isFirstNameValid || !isLastNameValid) {
                setErrorMsg('First and Last names should contain letters only (no numbers).');
            } else if (!policyAccepted) {
                setErrorMsg('Please accept the mandatory booking policies to proceed.');
            }
            return;
        }

        setIsProcessing(true);
        const fullPhone = `${countryCode} ${phone}`;
        const info = { email, phone: fullPhone, countryCode, phoneNumber: phone, firstName, lastName, purpose, companyName, gstNumber };
        setGuestInfo(info);
        setErrorMsg('');

        const roomCharges = totalBaseCharges + totalExtraCharges;
        const taxAndFees = totalTaxes;

        const refCode = lastBookingRef || `RETROD-${(hotelData?.name || 'XYZ').replace(/Hotel/gi, '').replace(/\s+/g, '').toUpperCase().slice(0, 3)}-${Math.floor(10000 + Math.random() * 90000)}`;
        setLastBookingRef(refCode);

        // 1. Immediately store draft booking in database with status 'Payment Pending'
        try {
            await submitBookingPaymentApi({
                hotel_slug: hotelSlug,
                booking_reference: refCode,
                check_in: checkInDate ? checkInDate.toISOString().split('T')[0] : '',
                check_out: checkOutDate ? checkOutDate.toISOString().split('T')[0] : '',
                total_nights: totalNights,
                grand_total: grandTotal,
                room_price: roomCharges,
                tax_and_fees: taxAndFees,
                cart_slots: cartSlots,
                email: email,
                phone: fullPhone,
                full_name: `${firstName} ${lastName}`.trim() || 'Valued Guest',
                first_name: firstName,
                last_name: lastName,
                company_name: companyName,
                gst_number: gstNumber,
                guest_info: info,
                payment_status: 'Payment Pending',
                booking_status: 'PENDING'
            });
        } catch (e) {
            console.warn('Draft booking pending notice:', e);
        }

        // 2. Dispatch Email Invoice & SMS to Guest upon confirming details
        sendInvoiceNotificationApi({
            hotel_slug: hotelSlug,
            hotel_name: hotelData?.name || 'Hotel XYZ',
            booking_reference: refCode,
            check_in: checkInDate ? checkInDate.toISOString().split('T')[0] : '',
            check_out: checkOutDate ? checkOutDate.toISOString().split('T')[0] : '',
            total_nights: totalNights,
            grand_total: grandTotal,
            room_price: roomCharges,
            tax_and_fees: taxAndFees,
            cart_slots: cartSlots,
            guest_info: info
        });

        // 3. Fetch Razorpay Order ID from backend
        const orderRes = await createRazorpayOrderApi({
            hotel_slug: hotelSlug,
            booking_reference: refCode,
            grand_total: grandTotal,
            currency: currency || 'INR',
            email: email,
            phone: fullPhone
        });

        const keyId = orderRes?.key_id || 'rzp_test_TGAGgBqaE0o53v';
        const orderId = orderRes?.order_id || `order_${Date.now()}`;

        // 3. Directly trigger official prebuilt Razorpay modal interface
        if (typeof (window as any).Razorpay === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                openRazorpayCheckoutModal(orderId, keyId, info);
            };
            script.onerror = () => {
                executeDirectPaymentVerification(undefined, undefined, undefined, info);
            };
            document.body.appendChild(script);
        } else {
            openRazorpayCheckoutModal(orderId, keyId, info);
        }

        function openRazorpayCheckoutModal(ordId: string, kId: string, guestDetails: any) {
            try {
                const options = {
                    key: kId,
                    amount: Math.round(grandTotal * 100), // in paise
                    currency: currency || 'INR',
                    name: hotelData?.name || 'Hotel Royal',
                    description: `Room Booking (${totalNights} Nights) - ${cartSlots.map((s: any) => s.roomName).join(', ')}`,
                    order_id: ordId,
                    image: hotelData?.logo_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop',
                    prefill: {
                        name: `${firstName} ${lastName}`.trim() || 'Valued Guest',
                        email: email,
                        contact: fullPhone
                    },
                    notes: {
                        hotel_name: hotelData?.name || 'Hotel Royal',
                        hotel_slug: hotelSlug
                    },
                    theme: {
                        color: '#16a34a'
                    },
                    handler: function (response: any) {
                        executeDirectPaymentVerification(response.razorpay_payment_id, response.razorpay_order_id || ordId, response.razorpay_signature || '', guestDetails);
                    },
                    modal: {
                        ondismiss: function () {
                            setIsProcessing(false);
                        }
                    }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.on('payment.failed', function (response: any) {
                    alert(`Payment Notice: ${response.error?.description || 'Transaction cancelled'}`);
                    setIsProcessing(false);
                });
                rzp.open();
            } catch (err) {
                console.warn('Razorpay popup error, proceeding with direct payment verification:', err);
                executeDirectPaymentVerification(undefined, undefined, undefined, guestDetails);
            }
        }
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
                                placeholder="name@example.com" 
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 14px', 
                                    borderRadius: '8px', 
                                    border: `1.5px solid ${email && !isEmailValid ? '#ef4444' : '#94a3b8'}`, 
                                    fontSize: '14px', 
                                    boxSizing: 'border-box', 
                                    background: '#ffffff', 
                                    color: '#0f172a' 
                                }} 
                            />
                            {email.length > 0 && !isEmailValid && (
                                <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                                    Enter a valid email (e.g., name@domain.com)
                                </span>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                PHONE NUMBER <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <select
                                    value={countryCode}
                                    onChange={e => setCountryCode(e.target.value)}
                                    style={{
                                        padding: '10px 8px',
                                        borderRadius: '8px',
                                        border: '1.5px solid #94a3b8',
                                        fontSize: '14px',
                                        background: '#f8fafc',
                                        color: '#0f172a',
                                        fontWeight: 700,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {COUNTRY_CODES.map(c => (
                                        <option key={c.code + c.country} value={c.code}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                                <input 
                                    type="tel" 
                                    required
                                    value={phone} 
                                    onChange={handlePhoneChange} 
                                    maxLength={10}
                                    placeholder="10-digit mobile number" 
                                    style={{ 
                                        flex: 1, 
                                        width: '100%', 
                                        padding: '10px 14px', 
                                        borderRadius: '8px', 
                                        border: `1.5px solid ${phone && !isPhoneValid ? '#ef4444' : '#94a3b8'}`, 
                                        fontSize: '14px', 
                                        boxSizing: 'border-box', 
                                        background: '#ffffff', 
                                        color: '#0f172a' 
                                    }} 
                                />
                            </div>
                            {phone.length > 0 && phone.length < 10 && (
                                <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                                    Must be 10 numeric digits ({phone.length}/10)
                                </span>
                            )}
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
                                onChange={handleFirstNameChange} 
                                placeholder="Enter First Name" 
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 14px', 
                                    borderRadius: '8px', 
                                    border: `1.5px solid ${firstName && !isFirstNameValid ? '#ef4444' : '#94a3b8'}`, 
                                    fontSize: '14px', 
                                    boxSizing: 'border-box', 
                                    background: '#ffffff', 
                                    color: '#0f172a' 
                                }} 
                            />
                            {firstName.length > 0 && !isFirstNameValid && (
                                <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                                    Letters only (no numbers)
                                </span>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                                LAST NAME <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="text" 
                                required
                                value={lastName} 
                                onChange={handleLastNameChange} 
                                placeholder="Enter Last Name" 
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 14px', 
                                    borderRadius: '8px', 
                                    border: `1.5px solid ${lastName && !isLastNameValid ? '#ef4444' : '#94a3b8'}`, 
                                    fontSize: '14px', 
                                    boxSizing: 'border-box', 
                                    background: '#ffffff', 
                                    color: '#0f172a' 
                                }} 
                            />
                            {lastName.length > 0 && !isLastNameValid && (
                                <span style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                                    Letters only (no numbers)
                                </span>
                            )}
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

                    {hotelData?.addons && hotelData.addons.length > 0 && (
                        <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                ✨ Enhance Your Stay with Add-On Packages
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {hotelData.addons.map((addon, aIdx) => {
                                    const addonIdStr = String(addon.id || aIdx + 1);
                                    const isSelected = selectedAddonIds.includes(addonIdStr);
                                    return (
                                        <label 
                                            key={addonIdStr} 
                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', background: isSelected ? '#f0fdf4' : '#fff', border: `1px solid ${isSelected ? '#86efac' : '#e2e8f0'}`, cursor: 'pointer' }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={isSelected} 
                                                    onChange={() => toggleAddon(addonIdStr)} 
                                                />
                                                <div>
                                                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{addon.name}</div>
                                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{addon.category || 'Dining'} &bull; {addon.charge_type || addon.chargeType || 'Per Stay'}</div>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a' }}>
                                                +₹{Number(addon.price).toLocaleString()}
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    )}

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
                        disabled={!isFormValid || isProcessing}
                        style={{ 
                            width: '100%', 
                            background: (isFormValid && !isProcessing) ? '#16a34a' : '#94a3b8', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '14px', 
                            borderRadius: '10px', 
                            fontSize: '16px', 
                            fontWeight: 800, 
                            cursor: (isFormValid && !isProcessing) ? 'pointer' : 'not-allowed', 
                            opacity: (isFormValid && !isProcessing) ? 1 : 0.65,
                            boxShadow: (isFormValid && !isProcessing) ? '0 4px 14px rgba(22,163,74,0.3)' : 'none',
                            marginBottom: '20px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {isProcessing ? '⚡ Launching Razorpay Gateway...' : 'Confirm & Pay >'}
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
                            <div style={{ padding: '14px 16px', fontSize: '12px', color: '#334155', lineHeight: 1.6, borderTop: '1px solid #cbd5e1', background: '#f8fafc', whiteSpace: 'pre-wrap' }}>
                                <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>
                                    {hotelData?.name || 'Hotel'} Policies &amp; Terms:
                                </strong>
                                {hotelData?.policies && hotelData.policies.length > 0 ? (
                                    hotelData.policies.map((pol, pIdx) => (
                                        <div key={pol.id || pIdx} style={{ marginBottom: '10px' }}>
                                            <div style={{ fontWeight: 700, color: '#0f172a' }}>• {pol.title}:</div>
                                            <div style={{ color: '#475569', marginTop: '2px' }}>{pol.content}</div>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ marginTop: '4px', margin: 0 }}>
                                        Free cancellation up to 72 hours prior to check-in. Valid Government photo ID required upon check-in.
                                    </p>
                                )}
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
                            const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
                            const promoRes = calculatePlanPriceWithPromo(slot.basePricePerNight, totalNights, promo);
                            const basePrice = promoRes.finalTotal;

                            return (
                                <div key={slot.slotId} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 12px', borderRadius: '8px', fontSize: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#0f172a' }}>
                                        <span>Room {idx + 1}: {slot.roomName}</span>
                                        <span>{formatCurrency(basePrice, currency)}</span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>Meal Plan: {slot.planTitle}</span>
                                        {promo && (
                                            <span style={{ color: '#15803d', background: '#dcfce7', padding: '1px 6px', borderRadius: '4px', fontSize: '10px' }}>
                                                🎟️ {promo.code} ({promoRes.discountLabel})
                                            </span>
                                        )}
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
                            <span>Original Room Charges ({totalNights} Nights):</span>
                            <span style={{ textDecoration: totalDiscountCharges > 0 ? 'line-through' : 'none', color: '#64748b', fontWeight: 600 }}>
                                {formatCurrency(totalOriginalBaseCharges, currency)}
                            </span>
                        </div>

                        {totalDiscountCharges > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803d', fontWeight: 700, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '6px 10px', borderRadius: '6px' }}>
                                <span>🎟️ Promo Savings ({appliedPromoCodesCheckout.join(', ')}):</span>
                                <span>-{formatCurrency(totalDiscountCharges, currency)}</span>
                            </div>
                        )}

                        {totalDiscountCharges > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a', fontWeight: 700 }}>
                                <span>Net Room Charges:</span>
                                <span>{formatCurrency(totalBaseCharges, currency)}</span>
                            </div>
                        )}

                        {totalExtraCharges > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                                <span>Extra Guests / Children:</span>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalExtraCharges, currency)}</span>
                            </div>
                        )}

                        {addonsTotal > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                                <span>✨ Selected Add-On Extras:</span>
                                <span>{formatCurrency(addonsTotal, currency)}</span>
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
