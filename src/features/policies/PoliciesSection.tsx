import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Accordion } from '../../components/ui/Accordion';

export const PoliciesSection: React.FC = () => {
    const { hotelData } = useBooking();
    const hotelName = hotelData?.name || 'Hotel New Horizons';

    return (
        <section className="policies-section" id="policies" style={{ padding: '30px 0', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Our policies</h3>
                <div style={{ width: '40px', height: '3px', background: '#ef4444', marginTop: '6px' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Accordion title="Privacy Policy">
                    <p style={{ marginBottom: '16px', color: '#64748b' }}>
                        {hotelName} ("the Hotel," "we," "us," or "our") is committed to protecting the privacy and security of its guests and website users. This Privacy Policy explains how we collect, use, store, and safeguard personal information when you make a booking, stay at the hotel, or use our services.
                    </p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>1. Information We Collect</h4>
                    <p>We may collect personal information such as name, contact details (email, phone), government-issued ID, address, and payment information during check-in or booking.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>2. How We Use Your Information</h4>
                    <p>We use personal information to process bookings and payments, verify guest identity during check-in, provide personalized services, and ensure security.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>3. Sharing of Information</h4>
                    <p>We do not sell or rent personal information. Information may be shared with third-party service providers assisting with reservations or hotel operations.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>4. Data Retention</h4>
                    <p>Personal information is retained only as long as necessary to fulfill the purposes outlined above or as required by law.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>5. Data Security</h4>
                    <p>We implement appropriate technical and organizational measures to protect personal information against unauthorized access, misuse, or disclosure.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>6. Your Rights</h4>
                    <p>Guests have the right to access personal information held by the Hotel, request correction of inaccurate data, or request deletion of data subject to legal obligations.</p>

                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '16px 0 8px 0' }}>7. Cookies and Tracking</h4>
                    <p>Our website may use cookies or similar tracking technologies to enhance user experience and analyze traffic.</p>
                </Accordion>

                <Accordion title="Refund And Cancellation Policy">
                    <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Standard Cancellation Rules:</p>
                    <p>Free cancellation up to 48 hours before check-in date. Cancellations made within 48 hours of arrival will incur a 1-night room tariff cancellation fee.</p>
                    <p style={{ marginTop: '8px' }}>Refunds for eligible cancellations will be processed to the original payment source within 5 to 7 business days.</p>
                </Accordion>

                <Accordion title="Terms And Conditions">
                    <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>General Terms &amp; Conditions:</p>
                    <p>1. Check-in time: 10:00 AM | Check-out time: 08:00 AM.</p>
                    <p>2. Guests must present valid government photo ID upon check-in (Aadhaar, Passport, Driving License).</p>
                    <p>3. Right of admission is reserved by hotel management.</p>
                </Accordion>
            </div>
        </section>
    );
};
