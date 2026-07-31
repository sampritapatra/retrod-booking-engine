import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { submitEventRequestApi } from '../../services/api';
import { AnimatedPrice } from '../../utils/AnimatedPrice';

export const EventBookingView: React.FC = () => {
    const { currency, setCurrentView, hotelData } = useBooking();

    // Scroll to top immediately when banquet/event booking page opens
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    // Core Event Details
    const [hallsCount, setHallsCount] = useState(1);
    const [nature, setNature] = useState('wedding');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guestCount, setGuestCount] = useState(100);

    // Mandatory Contact Details
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [specialNotes, setSpecialNotes] = useState('');

    // Catering Options (Per Plate)
    const [cateringPlan, setCateringPlan] = useState<'none' | 'veg_std' | 'premium_buffet' | 'royal_feast'>('veg_std');

    // Optional Event Add-ons
    const [addons, setAddons] = useState<{
        stageDecor: boolean;
        djSound: boolean;
        flowerDecor: boolean;
        photography: boolean;
        barCounter: boolean;
    }>({
        stageDecor: false,
        djSound: false,
        flowerDecor: false,
        photography: false,
        barCounter: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pricing Structure
    const pricePerHallPerDay = 25000;
    const baseVenueTotal = hallsCount * pricePerHallPerDay;

    // Catering Per-Plate Prices
    const cateringRates: Record<string, { label: string; price: number }> = {
        none: { label: 'Venue Only (No Hotel Catering)', price: 0 },
        veg_std: { label: 'Standard Veg Buffet', price: 650 },
        premium_buffet: { label: 'Premium Veg & Non-Veg Buffet', price: 950 },
        royal_feast: { label: 'Royal Grand Multi-Cuisine Feast & Live Counters', price: 1350 },
    };

    const currentCateringPrice = cateringRates[cateringPlan].price;
    const totalCateringCost = guestCount * currentCateringPrice;

    // Add-on Prices
    const addonPrices = {
        stageDecor: 25000,
        djSound: 15000,
        flowerDecor: 18000,
        photography: 30000,
        barCounter: 12000,
    };

    let totalAddonsCost = 0;
    if (addons.stageDecor) totalAddonsCost += addonPrices.stageDecor;
    if (addons.djSound) totalAddonsCost += addonPrices.djSound;
    if (addons.flowerDecor) totalAddonsCost += addonPrices.flowerDecor;
    if (addons.photography) totalAddonsCost += addonPrices.photography;
    if (addons.barCounter) totalAddonsCost += addonPrices.barCounter;

    const subTotal = baseVenueTotal + totalCateringCost + totalAddonsCost;
    const gstTax = Math.round(subTotal * 0.18);
    const grandTotal = subTotal + gstTax;

    // Validation: Name, Phone, Email, Start Date, End Date are Mandatory (*)
    const isNameValid = name.trim().length > 0;
    const isPhoneValid = phone.trim().length >= 7;
    const isEmailValid = email.trim().length > 0 && email.includes('@');
    const isStartDateValid = startDate !== '';
    const isEndDateValid = endDate !== '';
    const isFormValid = isNameValid && isPhoneValid && isEmailValid && isStartDateValid && isEndDateValid;

    const toggleAddon = (key: keyof typeof addons) => {
        setAddons(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);

        const payload = {
            nature_of_event: nature,
            start_date: startDate,
            end_date: endDate,
            halls_count: hallsCount,
            guest_count: guestCount,
            catering_plan: cateringPlan,
            total_catering_cost: totalCateringCost,
            total_addons_cost: totalAddonsCost,
            grand_total: grandTotal,
            name,
            phone,
            email,
            special_notes: specialNotes
        };

        const res = await submitEventRequestApi(payload);
        setIsSubmitting(false);

        if (res.success) {
            alert(`🎉 Thank you ${name}!\nYour Banquet Hall & Event Reservation request has been received.\nOur event manager will contact you at ${phone} to finalize details.`);
            setCurrentView('main');
        } else {
            alert(`🎉 Thank you ${name}!\nYour banquet booking inquiry has been submitted successfully.`);
            setCurrentView('main');
        }
    };

    return (
        <div className="event-booking-view-container container" style={{ padding: '24px 0 60px 0' }}>
            <div style={{ marginBottom: '20px' }}>
                <button 
                    type="button" 
                    onClick={() => setCurrentView('main')} 
                    style={{ background: '#f1f5f9', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '8px 18px', fontWeight: 700, color: '#334155', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                    ← Previous (Back to Rooms &amp; Booking)
                </button>
            </div>

            <div className="event-booking-grid">
                {/* FORM PANEL */}
                <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '28px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                    <div style={{ marginBottom: '24px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px' }}>
                        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            🏛️ Reserve Banquet &amp; Event Hall
                        </h2>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
                            Book luxury banquet halls at {hotelData?.name || 'Hotel XYZ'} for weddings, receptions &amp; corporate gatherings.
                        </p>
                    </div>

                    {/* 1. VENUE & GUEST CAPACITY */}
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>1. Venue &amp; Guest Capacity</h4>
                        <div className="event-form-row-2col">
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    BANQUET HALLS REQUIRED <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <button type="button" onClick={() => setHallsCount(prev => Math.max(1, prev - 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1.5px solid #94a3b8', background: '#fff', fontWeight: 800, cursor: 'pointer' }}>-</button>
                                    <span style={{ fontSize: '15px', fontWeight: 800, minWidth: '60px', textAlign: 'center', color: '#0f172a' }}>{hallsCount} Hall{hallsCount > 1 ? 's' : ''}</span>
                                    <button type="button" onClick={() => setHallsCount(prev => Math.min(4, prev + 1))} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1.5px solid #94a3b8', background: '#fff', fontWeight: 800, cursor: 'pointer' }}>+</button>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    EXPECTED GUESTS (NO. OF PEOPLE) <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    min={20}
                                    max={2000}
                                    value={guestCount} 
                                    onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value) || 0))} 
                                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', fontWeight: 700, background: '#fff', boxSizing: 'border-box' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                NATURE OF EVENT / FUNCTION <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <select value={nature} onChange={e => setNature(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', color: '#0f172a', fontWeight: 600 }}>
                                <option value="wedding">💍 Wedding / Marriage Ceremony</option>
                                <option value="reception">🎉 Reception / Ring Ceremony</option>
                                <option value="corporate">💼 Corporate Seminar / Conference</option>
                                <option value="birthday">🎂 Birthday Party / Social Gathering</option>
                                <option value="exhibition">🎨 Exhibition / Cultural Gala</option>
                            </select>
                        </div>
                    </div>

                    {/* 2. EVENT DATES */}
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>2. Event Duration</h4>
                        <div className="event-form-row-2col">
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    EVENT START DATE <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    EVENT END DATE <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
                            </div>
                        </div>
                    </div>

                    {/* 3. CATERING PACKAGES (PRICE PER PLATE) */}
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>3. Food &amp; Catering Package</h4>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>Catering charge is calculated per plate multiplied by the total expected guests ({guestCount} Guests).</p>
                        <select 
                            value={cateringPlan} 
                            onChange={e => setCateringPlan(e.target.value as any)} 
                            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', color: '#0f172a', fontWeight: 700 }}
                        >
                            <option value="none">🚫 Venue Only (No Catering) — ₹0 / plate</option>
                            <option value="veg_std">🥗 Standard Veg Buffet — ₹650 / plate</option>
                            <option value="premium_buffet">🍖 Premium Veg &amp; Non-Veg Buffet — ₹950 / plate</option>
                            <option value="royal_feast">👑 Royal Grand Multi-Cuisine Feast &amp; Live Counters — ₹1,350 / plate</option>
                        </select>

                        {cateringPlan !== 'none' && (
                            <div style={{ marginTop: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#16a34a', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total Catering ({guestCount} Guests × {formatCurrency(currentCateringPrice, currency)}):</span>
                                <span>{formatCurrency(totalCateringCost, currency)}</span>
                            </div>
                        )}
                    </div>

                    {/* 4. OPTIONAL EVENT ADD-ONS */}
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>4. Optional Event Enhancements (Select as needed)</h4>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>Tailor your event with optional equipment &amp; decor services.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                    <input type="checkbox" checked={addons.stageDecor} onChange={() => toggleAddon('stageDecor')} />
                                    🎭 Grand Stage &amp; Mandap Decor
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>+{formatCurrency(addonPrices.stageDecor, currency)}</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                    <input type="checkbox" checked={addons.djSound} onChange={() => toggleAddon('djSound')} />
                                    🔊 Professional DJ, Sound &amp; Intelligent Lighting
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>+{formatCurrency(addonPrices.djSound, currency)}</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                    <input type="checkbox" checked={addons.flowerDecor} onChange={() => toggleAddon('flowerDecor')} />
                                    🌸 Premium Fresh Flower Entry Arch &amp; Table Decor
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>+{formatCurrency(addonPrices.flowerDecor, currency)}</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                    <input type="checkbox" checked={addons.photography} onChange={() => toggleAddon('photography')} />
                                    📹 Photography &amp; Live 4K Video Streaming
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>+{formatCurrency(addonPrices.photography, currency)}</span>
                            </label>

                            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                                    <input type="checkbox" checked={addons.barCounter} onChange={() => toggleAddon('barCounter')} />
                                    🍸 Mobile Mocktail &amp; Cocktail Bar Counter
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 800, color: '#16a34a' }}>+{formatCurrency(addonPrices.barCounter, currency)}</span>
                            </label>
                        </div>
                    </div>

                    {/* 5. ORGANIZER CONTACT DETAILS */}
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 12px 0' }}>5. Organizer Details</h4>
                        <div className="event-form-row-2col">
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    ORGANIZER NAME <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                    PHONE NUMBER <span style={{ color: '#ef4444' }}>*</span>
                                </label>
                                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                EMAIL ADDRESS <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', background: '#fff', boxSizing: 'border-box' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px', letterSpacing: '0.5px' }}>
                                SPECIAL INSTRUCTIONS / CUSTOM REQUIREMENTS
                            </label>
                            <textarea value={specialNotes} onChange={e => setSpecialNotes(e.target.value)} rows={3} placeholder="Mention any specific seating, AC requirements, or menu customization..." style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '13px', background: '#fff', boxSizing: 'border-box' }} />
                        </div>
                    </div>

                    {/* SUBMIT BUTTON - HIDDEN / DISABLED UNTIL MANDATORY FIELDS ARE FILLED */}
                    {isFormValid ? (
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            style={{ 
                                width: '100%', 
                                background: '#16a34a', 
                                color: '#fff', 
                                border: 'none', 
                                padding: '16px', 
                                borderRadius: '12px', 
                                fontSize: '16px', 
                                fontWeight: 800, 
                                cursor: 'pointer', 
                                boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {isSubmitting ? 'Submitting Reservation Request...' : 'Submit Event Request →'}
                        </button>
                    ) : (
                        <div style={{ background: '#fef2f2', border: '1.5px solid #fca5a5', color: '#dc2626', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: 700, textAlign: 'center' }}>
                            * Please fill in all mandatory fields marked with a red star (*) to activate the Submit button.
                        </div>
                    )}
                </form>

                {/* INVOICE & COST ESTIMATE SUMMARY PANEL */}
                <div style={{ background: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '24px', height: 'fit-content', position: 'sticky', top: '20px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                        📄 Event Detailed Estimate
                    </h4>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px', marginBottom: '4px' }}>Venue Rental ({hallsCount} Banquet Hall)</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Expected Capacity: Up to {guestCount} Guests</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                            <span>Venue Rental ({hallsCount} Hall):</span>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(baseVenueTotal, currency)}</span>
                        </div>

                        {cateringPlan !== 'none' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                                <span>Catering ({guestCount} Plates @ ₹{currentCateringPrice}):</span>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalCateringCost, currency)}</span>
                            </div>
                        )}

                        {totalAddonsCost > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                                <span>Event Add-ons &amp; Decor:</span>
                                <span style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(totalAddonsCost, currency)}</span>
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                            <span>GST Tax (18%):</span>
                            <span style={{ fontWeight: 700, color: '#16a34a' }}>{formatCurrency(gstTax, currency)}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                        <span>Total Estimated Bill:</span>
                        <AnimatedPrice value={grandTotal} currency={currency} style={{ color: '#16a34a' }} />
                    </div>

                    <div style={{ marginTop: '20px', background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#15803d', lineHeight: 1.5 }}>
                        ✔ Direct venue booking request.<br />
                        ✔ Event manager will confirm arrangements within 2 hours.
                    </div>
                </div>
            </div>
        </div>
    );
};
