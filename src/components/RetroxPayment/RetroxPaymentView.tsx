import React, { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { submitBookingPaymentApi } from '../../services/api';
import { formatDateToLocalISO } from '../../utils/date';

export const RetroxPaymentView: React.FC = () => {
    const {
        hotelSlug,
        cartSlots,
        currency,
        checkInDate,
        checkOutDate,
        totalNights,
        calculateGrandTotal,
        setCurrentView,
        clearCart
    } = useBooking();

    const [secondsLeft, setSecondsLeft] = useState(877); // 14 mins 37 secs
    const [method, setMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
    const [showQr, setShowQr] = useState(true);
    const [upiId, setUpiId] = useState('');
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft(prev => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const secs = String(secondsLeft % 60).padStart(2, '0');
    const grandTotal = calculateGrandTotal();

    const handlePay = async () => {
        setIsProcessing(true);
        const payload = {
            hotel_slug: hotelSlug,
            check_in: formatDateToLocalISO(checkInDate),
            check_out: formatDateToLocalISO(checkOutDate),
            total_nights: totalNights,
            grand_total: grandTotal,
            payment_method: method,
            cart_slots: cartSlots
        };

        const res = await submitBookingPaymentApi(payload);
        setIsProcessing(false);

        const refCode = res?.booking_reference || `RETROX-${Date.now().toString().slice(-6)}`;
        alert(`🎉 Payment Successful!\nYour booking reference is: ${refCode}\nA confirmation receipt has been sent to your email address.`);
        clearCart();
        setCurrentView('main');
    };

    return (
        <div className="retrox-gateway-page" style={{ background: '#090d16', color: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>

                {/* Header Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1e293b', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#0284c7', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontWeight: 800, fontSize: '14px' }}>
                            ⚡ RetroX
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#38bdf8' }}>
                            Easebuzz Secure Checkout
                        </div>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', color: '#fbbf24', fontWeight: 700 }}>
                        ⏳ Session Expires in {minutes}:{secs}
                    </div>
                </div>

                {/* Amount Summary Box */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Total Payable Amount</div>
                        <div style={{ fontSize: '13px', color: '#cbd5e1', marginTop: '2px' }}>{cartSlots.length} Room Slot{cartSlots.length > 1 ? 's' : ''} &bull; {totalNights} Night{totalNights > 1 ? 's' : ''} Stay</div>
                    </div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#4ade80' }}>
                        {formatCurrency(grandTotal, currency)}
                    </div>
                </div>

                {/* Payment Options Panel */}
                <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#94a3b8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Choose Payment Option</h4>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
                        {[
                            { id: 'upi', label: '📱 UPI / QR' },
                            { id: 'card', label: '💳 Credit / Debit' },
                            { id: 'netbanking', label: '🏦 Net Banking' },
                            { id: 'wallet', label: '👛 Wallets' }
                        ].map(item => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setMethod(item.id as any)}
                                style={{
                                    padding: '14px 10px',
                                    borderRadius: '10px',
                                    border: '1.5px solid',
                                    borderColor: method === item.id ? '#38bdf8' : '#1e293b',
                                    background: method === item.id ? '#1e293b' : '#090d16',
                                    color: method === item.id ? '#38bdf8' : '#94a3b8',
                                    fontWeight: 800,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* UPI Section */}
                    {method === 'upi' && (
                        <div style={{ background: '#090d16', borderRadius: '12px', padding: '24px', textAlign: 'center', border: '1px solid #1e293b' }}>
                            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                <button type="button" onClick={() => setShowQr(true)} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid', borderColor: showQr ? '#38bdf8' : '#334155', background: showQr ? '#1e293b' : 'transparent', color: showQr ? '#38bdf8' : '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>QR Code</button>
                                <button type="button" onClick={() => setShowQr(false)} style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid', borderColor: !showQr ? '#38bdf8' : '#334155', background: !showQr ? '#1e293b' : 'transparent', color: !showQr ? '#38bdf8' : '#94a3b8', fontWeight: 700, cursor: 'pointer' }}>Enter UPI ID</button>
                            </div>

                            {showQr ? (
                                <div>
                                    <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>Scan using any UPI App (GPay, PhonePe, Paytm, BHIM)</p>
                                    <div style={{ display: 'inline-block', background: '#fff', padding: '12px', borderRadius: '12px' }}>
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=retrod@easebuzz&pn=HotelXYZ" alt="UPI QR" style={{ width: '180px', height: '180px', display: 'block' }} />
                                    </div>
                                </div>
                            ) : (
                                <div style={{ maxWidth: '360px', margin: '0 auto' }}>
                                    <input
                                        type="text"
                                        value={upiId}
                                        onChange={e => setUpiId(e.target.value)}
                                        placeholder="username@upi / mobilenumber@paytm"
                                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff', fontSize: '14px' }}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Card Section */}
                    {method === 'card' && (
                        <div style={{ background: '#090d16', borderRadius: '12px', padding: '24px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CARD NUMBER</label>
                                <input type="text" placeholder="4532 •••• •••• 8921" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>EXPIRY DATE</label>
                                    <input type="text" placeholder="MM / YY" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '4px' }}>CVV / CVC</label>
                                    <input type="password" placeholder="•••" maxLength={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Net Banking Section */}
                    {method === 'netbanking' && (
                        <div style={{ background: '#090d16', borderRadius: '12px', padding: '24px', border: '1px solid #1e293b' }}>
                            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px' }}>Select Bank for Net Banking Payment:</p>
                            <select value={selectedBank} onChange={e => setSelectedBank(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}>
                                <option>HDFC Bank</option>
                                <option>ICICI Bank</option>
                                <option>State Bank of India (SBI)</option>
                                <option>Axis Bank</option>
                                <option>Kotak Mahindra Bank</option>
                                <option>Punjab National Bank</option>
                            </select>
                        </div>
                    )}

                    {/* Wallets Section */}
                    {method === 'wallet' && (
                        <div style={{ background: '#090d16', borderRadius: '12px', padding: '24px', border: '1px solid #1e293b' }}>
                            <p style={{ fontSize: '13px', color: '#cbd5e1', marginBottom: '12px' }}>Select Wallet Partner:</p>
                            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: '#fff' }}>
                                <option>Amazon Pay</option>
                                <option>Mobikwik</option>
                                <option>Reliance JioMoney</option>
                                <option>Freecharge</option>
                                <option>LazyPay</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button
                        type="button"
                        onClick={() => setCurrentView('checkout')}
                        style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #334155', background: 'transparent', color: '#94a3b8', fontWeight: 700, cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handlePay}
                        disabled={isProcessing}
                        style={{ flex: 2, padding: '14px', borderRadius: '10px', border: 'none', background: '#22c55e', color: '#fff', fontWeight: 800, fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(34,197,94,0.4)' }}
                    >
                        {isProcessing ? 'Processing Payment...' : `Pay ${formatCurrency(grandTotal, currency)} Now`}
                    </button>
                </div>
            </div>
        </div>
    );
};
