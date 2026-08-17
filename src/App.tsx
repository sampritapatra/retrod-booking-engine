import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Feature modules
import { HeroSlideshow } from './features/hero/HeroSlideshow';
import { StickyNavBar } from './components/layout/StickyNavBar';
import { ExclusiveOffersSection } from './features/hero/ExclusiveOffersSection';
import { HotelInfoSection } from './features/info/HotelInfoSection';
import { RoomList } from './features/rooms/RoomList';
import { AmenitiesSection } from './features/amenities/AmenitiesSection';
import { ReviewsSection } from './features/reviews/ReviewsSection';
import { LocationSection } from './features/location/LocationSection';
import { PoliciesSection } from './features/policies/PoliciesSection';
import { SummaryDrawer } from './features/rooms/SummaryDrawer';
import { GuestCheckoutView } from './features/checkout/GuestCheckoutView';
import { EventBookingView } from './features/events/EventBookingView';
import { RetrodPaymentView } from './features/payment/RetrodPaymentView';
import { PaymentSuccessView } from './features/payment/PaymentSuccessView';
import { ModalManager } from './features/modals/ModalManager';
import { ScrollToTopButton } from './components/layout/ScrollToTopButton';

import './css/styles.css';

const MainLayout: React.FC = () => {
    const { currentView, hotelData, isLoadingHotelData } = useBooking();

    // Show a premium loading spinner while fetching configuration
    if (isLoadingHotelData) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <div style={{ border: '3px solid #e2e8f0', borderTop: '3px solid #0ea5e9', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ marginTop: '16px', color: '#64748b', fontSize: '14px', fontWeight: 600 }}>Loading hotel configuration...</p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Show clean "Hotel Not Found" screen if slug does not exist and was not synced
    if (!hotelData) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '24px', textAlign: 'center' }}>
                <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', maxWidth: '440px', width: '100%' }}>
                    <span style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>🏨</span>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>Hotel Not Setup</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0', lineHeight: 1.5 }}>
                        This hotel has not been configured in the Property Management System yet, or is currently offline.
                    </p>
                    <div style={{ fontSize: '12px', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                        Please run the PMS backend and save the property details to activate this Booking Engine.
                    </div>
                </div>
            </div>
        );
    }

    // Full-bleed payment view
    if (currentView === 'payment') {
        return (
            <div className="app-root">
                <RetrodPaymentView />
                <ModalManager />
            </div>
        );
    }

    // Full white screen payment success view
    if (currentView === 'payment-success') {
        return (
            <div className="app-root" style={{ background: '#ffffff', minHeight: '100vh' }}>
                <PaymentSuccessView />
                <ModalManager />
            </div>
        );
    }

    return (
        <div className="app-root">
            {currentView !== 'checkout' && currentView !== 'event' && <Header />}

            {currentView === 'main' && (
                <>
                    <div className="hero-slideshow-fullbleed" style={{ width: '100%', margin: 0, padding: 0 }}>
                        <HeroSlideshow />
                    </div>
                    <StickyNavBar />
                </>
            )}

            <main className="main-content container" style={{ minHeight: 'auto', paddingTop: '4px', paddingBottom: '20px' }}>
                {currentView === 'main' && (
                    <>
                        <HotelInfoSection />
                        <RoomList />
                        <AmenitiesSection />
                        <ReviewsSection />
                        <LocationSection />
                        <PoliciesSection />
                    </>
                )}

                {currentView === 'checkout' && (
                    <GuestCheckoutView />
                )}

                {currentView === 'event' && (
                    <EventBookingView />
                )}
            </main>

            <SummaryDrawer />
            <ScrollToTopButton />
            <Footer />
            <ModalManager />
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BookingProvider>
            <MainLayout />
        </BookingProvider>
    );
};
