import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { RoomCard } from './RoomCard';
import { RoomType } from '../../types';

const isBanquetRoom = (room: RoomType) =>
    room.slug === 'banquet-hall' ||
    room.name.toLowerCase().includes('banquet') ||
    room.name.toLowerCase().includes('event hall') ||
    room.name.toLowerCase().includes('event venue');

const sortRooms = (rooms: RoomType[]): RoomType[] => {
    const regularRooms = rooms
        .filter(r => !isBanquetRoom(r))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    const banquetRooms = rooms
        .filter(r => isBanquetRoom(r))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    return [...regularRooms, ...banquetRooms];
};

export const RoomList: React.FC = () => {
    const { hotelData, loading } = useBooking() as any;

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                ⏳ Loading available rooms &amp; rate plans...
            </div>
        );
    }

    const rooms = hotelData?.room_types || [];

    if (rooms.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '14px', color: '#dc2626', fontWeight: 700 }}>
                No rooms available for the selected dates. Please select different check-in / check-out dates.
            </div>
        );
    }

    const sortedRooms = sortRooms(rooms);

    return (
        <section className="room-list-section" id="rooms" style={{ padding: '10px 0 40px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {sortedRooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </section>
    );
};
