import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';

// Layout components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// Feature modules
import { HeroSlideshow } from './features/hero/HeroSlideshow';
import { HotelInfoSection } from './features/info/HotelInfoSection';
import { DateRangePicker } from './features/rooms/DateRangePicker';
import { RoomList } from './features/rooms/RoomList';
import { AmenitiesSection } from './features/amenities/AmenitiesSection';
import { LocationSection } from './features/location/LocationSection';
import { PoliciesSection } from './features/policies/PoliciesSection';
import { SummaryDrawer } from './features/rooms/SummaryDrawer';
import { GuestCheckoutView } from './features/checkout/GuestCheckoutView';
import { EventBookingView } from './features/events/EventBookingView';
import { RetrodPaymentView } from './features/payment/RetrodPaymentView';
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

    return (
        <div className="app-root">
            {currentView !== 'checkout' && <Header />}

            <main className="main-content container" style={{ minHeight: 'calc(100vh - 350px)' }}>
                {currentView === 'main' && (
                    <>
                        <HeroSlideshow />
                        <HotelInfoSection />
                        <DateRangePicker />
                        <RoomList />
                        <AmenitiesSection />
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
