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
import { DateRangePicker } from './features/rooms/DateRangePicker';
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

import './css/styles.css';

const MainLayout: React.FC = () => {
    const { currentView } = useBooking();

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

            <main className="main-content container" style={{ minHeight: 'auto', paddingTop: '4px', paddingBottom: '0px' }}>
                {currentView === 'main' && (
                    <>
                        <HotelInfoSection />
                        <DateRangePicker />
                        <RoomList />
                        <AmenitiesSection />
                    </>
                )}

                {currentView === 'checkout' && (
                    <GuestCheckoutView />
                )}

                {currentView === 'event' && (
                    <EventBookingView />
                )}
            </main>

            {currentView === 'main' && (
                <div style={{ width: '100%', overflow: 'hidden', margin: '10px 0 0 0' }}>
                    <ReviewsSection />
                </div>
            )}

            <main className="main-content container" style={{ minHeight: 'auto', paddingTop: '4px' }}>
                {currentView === 'main' && (
                    <>
                        <LocationSection />
                        <PoliciesSection />
                    </>
                )}
            </main>

            <SummaryDrawer />
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
