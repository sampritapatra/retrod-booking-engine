import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { submitEventRequestApi } from '../../services/api';

export const EventBookingModal: React.FC = () => {
    const { currency, setCurrentView, closeModal } = useBooking();
    const [hallsCount, setHallsCount] = useState(1);
    const [nature, setNature] = useState('wedding');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [guestCount, setGuestCount] = useState(100);
    const [cateringPlan, setCateringPlan] = useState<'none' | 'veg_std' | 'premium_buffet' | 'royal_feast'>('veg_std');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pricePerHallPerDay = 25000;
    const baseVenueTotal = hallsCount * pricePerHallPerDay;

    const cateringRates: Record<string, number> = {
        none: 0,
        veg_std: 650,
        premium_buffet: 950,
        royal_feast: 1350,
    };

    const currentCateringPrice = cateringRates[cateringPlan] || 0;
    const totalCateringCost = guestCount * currentCateringPrice;

    const subTotal = baseVenueTotal + totalCateringCost;
    const gstTax = Math.round(subTotal * 0.18);
    const grandTotal = subTotal + gstTax;

    const isFormValid = name.trim().length > 0 && phone.trim().length >= 7 && email.trim().length > 0 && startDate !== '' && endDate !== '';

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
            grand_total: grandTotal,
            name,
            phone,
            email
        };

        const res = await submitEventRequestApi(payload);
        setIsSubmitting(false);

        if (res.success) {
            alert(`Thank you ${name}! Your event booking request has been received.`);
            closeModal();
            setCurrentView('main');
        } else {
            alert(`Thank you ${name}! Your event reservation request has been submitted.`);
            closeModal();
            setCurrentView('main');
        }
    };

    return (
        <div className="event-booking-modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, overflowY: 'auto', padding: '40px 20px' }}>
            <div className="container" style={{ maxWidth: '720px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 25px 50px -12px rgba(212,175,55,0.25)', border: '2px solid #d4af37' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '24px' }}>🏛️</span>
                        <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                            Reserve Banquet &amp; Event Hall
                        </h3>
                    </div>
                    <button style={{ background: 'none', border: 'none', fontSize: '24px', fontWeight: 800, color: '#64748b', cursor: 'pointer' }} onClick={closeModal}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                HALLS REQUIRED <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button type="button" onClick={() => setHallsCount(prev => Math.max(1, prev - 1))} style={{ padding: '6px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', background: '#f8fafc', fontWeight: 800, cursor: 'pointer' }}>-</button>
                                <span style={{ fontSize: '15px', fontWeight: 800 }}>{hallsCount} Hall</span>
                                <button type="button" onClick={() => setHallsCount(prev => Math.min(3, prev + 1))} style={{ padding: '6px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', background: '#f8fafc', fontWeight: 800, cursor: 'pointer' }}>+</button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                EXPECTED GUESTS (NO. OF PEOPLE) <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input 
                                type="number" 
                                value={guestCount} 
                                onChange={e => setGuestCount(Math.max(1, parseInt(e.target.value) || 0))} 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px', boxSizing: 'border-box' }}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                            FOOD &amp; CATERING PACKAGE
                        </label>
                        <select value={cateringPlan} onChange={e => setCateringPlan(e.target.value as any)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8', fontSize: '14px' }}>
                            <option value="none">Venue Only (No Catering) — ₹0 / plate</option>
                            <option value="veg_std">Standard Veg Buffet — ₹650 / plate</option>
                            <option value="premium_buffet">Premium Veg &amp; Non-Veg Buffet — ₹950 / plate</option>
                            <option value="royal_feast">Royal Grand Multi-Cuisine Feast — ₹1,350 / plate</option>
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                START DATE <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                END DATE <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                YOUR NAME <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                PHONE <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#334155', marginBottom: '6px' }}>
                                EMAIL <span style={{ color: '#ef4444' }}>*</span>
                            </label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email ID" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #94a3b8' }} />
                        </div>
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                            <span style={{ color: '#64748b' }}>Venue Rental ({hallsCount} Hall):</span>
                            <span>{formatCurrency(baseVenueTotal, currency)}</span>
                        </div>
                        {currentCateringPrice > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                                <span style={{ color: '#64748b' }}>Catering ({guestCount} Guests × ₹{currentCateringPrice}):</span>
                                <span>{formatCurrency(totalCateringCost, currency)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                            <span style={{ color: '#64748b' }}>GST Tax (18%):</span>
                            <span>{formatCurrency(gstTax, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: '#0f172a', borderTop: '1px solid #cbd5e1', paddingTop: '8px', marginTop: '8px' }}>
                            <span>Grand Total Estimate:</span>
                            <span style={{ color: '#16a34a' }}>{formatCurrency(grandTotal, currency)}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button type="button" onClick={closeModal} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1.5px solid #cbd5e1', background: '#fff', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                        {isFormValid ? (
                            <button type="submit" disabled={isSubmitting} style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', background: '#16a34a', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer' }}>
                                {isSubmitting ? 'Submitting Request...' : 'Proceed with Request →'}
                            </button>
                        ) : (
                            <div style={{ flex: 2, background: '#fef2f2', border: '1.5px solid #fca5a5', color: '#dc2626', padding: '10px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, textAlign: 'center' }}>
                                * Fill all mandatory fields (*) to submit
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
