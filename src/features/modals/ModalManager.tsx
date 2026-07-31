import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { OccupancyModal } from './OccupancyModal';
import { GalleryModal } from './GalleryModal';
import { RateDetailsModal } from './RateDetailsModal';
import { RoomDetailsModal } from './RoomDetailsModal';
import { MyBookingModal } from './MyBookingModal';
import { ReservationRequestsModal } from './ReservationRequestsModal';
import { EventBookingModal } from '../events/EventBookingModal';

export const ModalManager: React.FC = () => {
    const { activeModal } = useBooking();

    if (!activeModal) return null;

    switch (activeModal) {
        case 'occupancy':
        case 'edit-occupancy':
            return <OccupancyModal />;
        case 'gallery':
            return <GalleryModal />;
        case 'rate-details':
            return <RateDetailsModal />;
        case 'room-details':
            return <RoomDetailsModal />;
        case 'my-booking':
            return <MyBookingModal />;
        case 'reservation-requests':
            return <ReservationRequestsModal />;
        case 'event-booking':
            return <EventBookingModal />;
        default:
            return null;
    }
};
