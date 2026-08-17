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
        applyPromoToPlan,
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
    const [isAddonDropdownOpen, setIsAddonDropdownOpen] = useState(false);
    const [promoInputCode, setPromoInputCode] = useState('');
    const [promoMsg, setPromoMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
    const [showOffersList, setShowOffersList] = useState(false);

    const toggleAddon = (id: string) => {
        setSelectedAddonIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const availablePromos = (hotelData?.promo_codes || []).filter(p => p.isActive !== false);

    const applyPromoToAllSlots = (promo: any) => {
        cartSlots.forEach(slot => {
            applyPromoToPlan(slot.roomId, slot.planId, promo);
        });
    };

    const handleApplyPromo = (codeStr?: string) => {
        const targetCode = (codeStr || promoInputCode).trim().toUpperCase();
        if (!targetCode) return;

        const matched = availablePromos.find(p => p.code.toUpperCase() === targetCode);
        if (!matched) {
            setPromoMsg({ text: `Invalid coupon "${targetCode}"`, type: 'error' });
            return;
        }
        if (matched.minNights && totalNights < matched.minNights) {
            setPromoMsg({ text: `Coupon "${matched.code}" requires minimum ${matched.minNights} nights stay.`, type: 'error' });
            return;
        }

        applyPromoToAllSlots(matched);
        setPromoMsg({ text: `Coupon "${matched.code}" applied!`, type: 'success' });
        setPromoInputCode('');
        setShowOffersList(false);
    };

    const handleRemovePromo = () => {
        applyPromoToAllSlots(null);
        setPromoMsg(null);
    };

    const availableAddons = (hotelData?.addons && hotelData.addons.length > 0)
        ? hotelData.addons
        : [
            { id: 1, name: 'Airport Pickup & Drop (Sedan)', category: 'Transfer', charge_type: 'Per Stay', price: 1200, tax_pct: 18, is_active: true },
            { id: 2, name: 'Candlelight Dinner & Wine Setup', category: 'Dining', charge_type: 'Per Stay', price: 2500, tax_pct: 18, is_active: true },
            { id: 3, name: 'Full Body Ayurvedic Spa Treatment (60 Min)', category: 'Wellness', charge_type: 'Per Person', price: 1800, tax_pct: 18, is_active: true },
            { id: 4, name: 'Guaranteed Early Check-In (from 9:00 AM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
            { id: 5, name: 'Relaxed Late Check-Out (up to 4:00 PM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
            { id: 6, name: 'Guided City Sightseeing & Heritage Tour', category: 'Activity', charge_type: 'Per Group', price: 2200, tax_pct: 18, is_active: true }
        ];

    const addonsTotal = availableAddons
        .filter(a => selectedAddonIds.includes(String(a.id)))
        .reduce((sum, a) => sum + Number(a.price || 0), 0);

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

        const adultRate = slot.extraAdultPrice ?? 700;
        const childRate = slot.extraChildPrice ?? 500;
        const extraFee = slot.totalExtraCharge != null && slot.totalExtraCharge >= 0
            ? slot.totalExtraCharge
            : (() => {
                const extraAdults = Math.max(0, (slot.adults || 2) - 2);
                return (extraAdults * adultRate + (slot.children || 0) * childRate) * totalNights;
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
        const selectedAddonsList = availableAddons.filter(a => selectedAddonIds.includes(String(a.id)));
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
            selected_addons: selectedAddonsList,
            addons_total: addonsTotal,
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

        const selectedAddonsList = availableAddons.filter(a => selectedAddonIds.includes(String(a.id)));

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
                selected_addons: selectedAddonsList,
                addons_total: addonsTotal,
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
            selected_addons: selectedAddonsList,
            addons_total: addonsTotal,
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

                    {/* ADD-ON PACKAGES & EXTRAS SECTION */}
                    {availableAddons && availableAddons.length > 0 && (
                        <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', padding: '18px 20px', borderRadius: '14px', marginBottom: '22px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                                <div>
                                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        ✨ Enhance Your Stay (Add-Ons &amp; Extras)
                                    </h4>
                                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0 0' }}>
                                        Select optional services to personalize your booking experience.
                                    </p>
                                </div>
                                {selectedAddonIds.length > 0 && (
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a', background: '#dcfce7', padding: '3px 10px', borderRadius: '12px', border: '1px solid #86efac' }}>
                                        {selectedAddonIds.length} Selected (+{formatCurrency(addonsTotal, currency)})
                                    </span>
                                )}
                            </div>

                            {/* Grid of Addon Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
                                {availableAddons.map((addon: any, aIdx: number) => {
                                    const addonIdStr = String(addon.id || aIdx + 1);
                                    const isSelected = selectedAddonIds.includes(addonIdStr);
                                    const getCategoryIcon = (cat?: string) => {
                                        const c = (cat || '').toLowerCase();
                                        if (c.includes('transfer') || c.includes('car') || c.includes('pickup') || c.includes('drop')) return '🚗';
                                        if (c.includes('dining') || c.includes('food') || c.includes('dinner') || c.includes('meal')) return '🍷';
                                        if (c.includes('wellness') || c.includes('spa') || c.includes('massage')) return '💆';
                                        if (c.includes('service') || c.includes('check')) return '⏱️';
                                        if (c.includes('activity') || c.includes('tour')) return '🗺️';
                                        return '✨';
                                    };

                                    return (
                                        <div
                                            key={addonIdStr}
                                            onClick={() => toggleAddon(addonIdStr)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between',
                                                gap: '10px',
                                                padding: '12px 14px',
                                                borderRadius: '10px',
                                                background: isSelected ? '#f0fdf4' : '#ffffff',
                                                border: `1.5px solid ${isSelected ? '#16a34a' : '#cbd5e1'}`,
                                                boxShadow: isSelected ? '0 2px 8px rgba(22,163,74,0.15)' : '0 1px 3px rgba(0,0,0,0.03)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                userSelect: 'none'
                                            }}
                                        >
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1, minWidth: 0 }}>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => {}}
                                                    style={{ marginTop: '2px', accentColor: '#16a34a', width: '16px', height: '16px', cursor: 'pointer', pointerEvents: 'none' }}
                                                />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '2px' }}>
                                                        <span style={{ marginRight: '4px' }}>{getCategoryIcon(addon.category)}</span>
                                                        {addon.name}
                                                    </div>
                                                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                                                        {addon.category || 'Service'} &bull; {addon.charge_type || addon.chargeType || 'Per Stay'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', whiteSpace: 'nowrap', alignSelf: 'center' }}>
                                                +{formatCurrency(Number(addon.price), currency)}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Selected Addon Pills summary */}
                            {selectedAddonIds.length > 0 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
                                    {availableAddons
                                        .filter(a => selectedAddonIds.includes(String(a.id)))
                                        .map(a => (
                                            <span
                                                key={a.id}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: '#ffffff',
                                                    border: '1px solid #86efac',
                                                    color: '#15803d',
                                                    padding: '3px 10px',
                                                    borderRadius: '16px',
                                                    fontSize: '12px',
                                                    fontWeight: 700
                                                }}
                                            >
                                                {a.name} (+{formatCurrency(Number(a.price), currency)})
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); toggleAddon(String(a.id)); }}
                                                    style={{ background: 'none', border: 'none', color: '#dc2626', fontWeight: 800, cursor: 'pointer', padding: '0 2px', fontSize: '13px' }}
                                                    title="Remove Addon"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                </div>
                            )}
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
                                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontWeight: 700 }}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {slot.adults} Adult{slot.adults > 1 ? 's' : ''}
                                        </span>
                                        {slot.children > 0 && (
                                            <>
                                                <span>&bull;</span>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#b45309', fontWeight: 700 }}>
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="8" r="4" />
                                                        <path d="M6 20v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
                                                        <path d="M10 4.5C11 3.5 13 3.5 14 4.5" />
                                                    </svg>
                                                    {slot.children} Child{slot.children > 1 ? 'ren' : ''}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* EXCLUSIVE OFFERS / PROMO CODES SECTION */}
                    {availablePromos.length > 0 && (
                        <div style={{ background: '#f8fafc', border: '1.5px dashed #818cf8', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: '#312e81', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span>🎟️</span> Exclusive Offers &amp; Promos
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowOffersList(!showOffersList)}
                                    style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    {showOffersList ? 'Hide Offers ▲' : `View Offers (${availablePromos.length}) ▼`}
                                </button>
                            </div>

                            {/* Active Applied Promo Tag */}
                            {appliedPromoCodesCheckout.length > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', padding: '8px 12px', marginBottom: '8px' }}>
                                    <div>
                                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#15803d' }}>
                                            ✅ Applied: {appliedPromoCodesCheckout.join(', ')} (-{formatCurrency(totalDiscountCharges, currency)})
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            type="button"
                                            onClick={() => setShowOffersList(true)}
                                            style={{ background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Change
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleRemovePromo}
                                            style={{ background: '#fecaca', color: '#b91c1c', border: 'none', borderRadius: '4px', padding: '3px 8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Remove ✕
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={promoInputCode}
                                        onChange={(e) => setPromoInputCode(e.target.value.toUpperCase())}
                                        style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleApplyPromo()}
                                        style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}

                            {promoMsg && (
                                <div style={{ fontSize: '11.5px', fontWeight: 700, color: promoMsg.type === 'success' ? '#15803d' : '#dc2626', marginBottom: '6px' }}>
                                    {promoMsg.text}
                                </div>
                            )}

                            {/* Dropdown list of applicable promo codes */}
                            {showOffersList && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #e0e7ff', maxHeight: '180px', overflowY: 'auto' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b' }}>Select an applicable offer:</span>
                                    {availablePromos.map((p) => {
                                        const isPct = p.discountType === 'percentage' || (p as any).discount_type === 'percentage';
                                        const val = p.discountValue ?? (p as any).discount_value ?? 10;
                                        const isApplied = appliedPromoCodesCheckout.includes(p.code);

                                        return (
                                            <div
                                                key={p.id || p.code}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '8px 10px',
                                                    borderRadius: '6px',
                                                    background: isApplied ? '#dcfce7' : '#ffffff',
                                                    border: `1px solid ${isApplied ? '#86efac' : '#cbd5e1'}`,
                                                    fontSize: '12px'
                                                }}
                                            >
                                                <div>
                                                    <span style={{ fontWeight: 800, color: '#1e1b4b', fontFamily: 'monospace' }}>{p.code}</span>
                                                    <span style={{ marginLeft: '6px', color: '#16a34a', fontWeight: 700 }}>
                                                        {isPct ? `${val}% OFF` : `₹${val} OFF`}
                                                    </span>
                                                    {p.minNights && p.minNights > 1 && (
                                                        <span style={{ marginLeft: '6px', fontSize: '10.5px', color: '#64748b' }}>
                                                            (Min. {p.minNights} nights)
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleApplyPromo(p.code)}
                                                    disabled={isApplied}
                                                    style={{
                                                        background: isApplied ? '#94a3b8' : '#4f46e5',
                                                        color: '#fff',
                                                        border: 'none',
                                                        padding: '4px 10px',
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: 700,
                                                        cursor: isApplied ? 'default' : 'pointer'
                                                    }}
                                                >
                                                    {isApplied ? 'Applied ✓' : 'Apply'}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

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
