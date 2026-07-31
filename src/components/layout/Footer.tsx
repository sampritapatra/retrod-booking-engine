import React from 'react';

export const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="main-footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444' }}>🔴</span>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>Hotel XYZ</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '320px', margin: 0 }}>
                        With our tech and innovation, hotels reach new heights, establishing a strong digital presence. Get ready to time-travel your bookings with Retrod! Pioneers in Hotel Technology . Our Commitment to Driving Direct Bookings . Start saving your commission with us! . Explore Tailored Tech Solutions for Your Hotel .
                    </p>
                </div>

                <div className="footer-col">
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', position: 'relative' }}>
                        Booking Info
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🕒 Check-In:</span> <span>10:00 AM</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🕒 Check-Out:</span> <span>08:00 AM</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>✉️</span> <a href="mailto:support@retrodtech.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>support@retrodtech.com</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🎧</span> <a href="tel:+918118031833" style={{ color: '#cbd5e1', textDecoration: 'none' }}>+91 8118 031 833</a>
                        </div>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                        Follow Us
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <a href="#" aria-label="Facebook" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>f</a>
                        <a href="#" aria-label="Instagram" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>📷</a>
                        <a href="#" aria-label="Twitter" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>🐦</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                        Payments Acceptable
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div className="payment-logos-grid">
                        <span style={{ background: '#1e293b', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>Maestro</span>
                        <span style={{ background: '#1e293b', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>RuPay</span>
                        <span style={{ background: '#1e293b', color: '#60a5fa', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>VISA</span>
                        <span style={{ background: '#1e293b', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>G Pay</span>
                        <span style={{ background: '#581c87', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>पे PhonePe</span>
                    </div>
                </div>
            </div>

            <div className="container footer-bottom">
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                    Powered By <strong style={{ color: '#ffffff' }}>Retrod.</strong>
                </p>
                <button 
                    type="button" 
                    onClick={scrollToTop} 
                    className="scroll-top-btn"
                    title="Scroll to top"
                    aria-label="Scroll to top"
                >
                    ▲
                </button>
            </div>
        </footer>
    );
};
