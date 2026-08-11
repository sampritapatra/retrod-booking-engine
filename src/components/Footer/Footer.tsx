import React from 'react';

export const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ background: '#000000', color: '#ffffff', padding: '50px 0 20px 0', fontFamily: 'Plus Jakarta Sans, sans-serif', position: 'relative' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '40px', marginBottom: '40px' }}>
                
                {/* Col 1: Retrod Logo & Brand Text */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#ef4444' }}>🔴</span>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.5px' }}>Hotel XYZ</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7, maxWidth: '320px' }}>
                        With our tech and innovation, hotels reach new heights, establishing a strong digital presence. Get ready to time-travel your bookings with Retrod! Pioneers in Hotel Technology . Our Commitment to Driving Direct Bookings . Start saving your commission with us! . Explore Tailored Tech Solutions for Your Hotel .
                    </p>
                </div>

                {/* Col 2: Booking Info */}
                <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', position: 'relative' }}>
                        Booking info
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#cbd5e1' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>📅</span> <span>10:00 AM</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>📅</span> <span>08:00 AM</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>✉️</span> <a href="mailto:support@retrodtech.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>support@retrodtech.com</a>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>🎧</span> <a href="tel:+918118031833" style={{ color: '#cbd5e1', textDecoration: 'none' }}>+91 8118 031 833</a>
                        </div>
                    </div>
                </div>

                {/* Col 3: Follow Us */}
                <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                        Follow Us
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>f</a>
                        <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>📷</a>
                        <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ffffff', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '14px' }}>🐦</a>
                    </div>
                </div>

                {/* Col 4: Payments Acceptable */}
                <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                        Payments Acceptable
                        <div style={{ width: '24px', height: '2px', background: '#64748b', marginTop: '6px' }}></div>
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ background: '#1e293b', color: '#38bdf8', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>Maestro</span>
                        <span style={{ background: '#1e293b', color: '#4ade80', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>RuPay</span>
                        <span style={{ background: '#1e293b', color: '#60a5fa', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>VISA</span>
                        <span style={{ background: '#1e293b', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>G Pay</span>
                        <span style={{ background: '#581c87', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>पे PhonePe</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar & Floating Back to Top Button */}
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '16px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                    Powered By <strong style={{ color: '#ffffff' }}>Retrod.</strong>
                </p>
                <button 
                    type="button" 
                    onClick={scrollToTop} 
                    style={{ 
                        position: 'absolute', 
                        right: '20px', 
                        bottom: '10px', 
                        background: '#1e293b', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '36px', 
                        height: '36px', 
                        fontWeight: 800, 
                        fontSize: '16px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    ^
                </button>
            </div>
        </footer>
    );
};
