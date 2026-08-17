import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { RoomCard } from './RoomCard';
import { RoomType } from '../../types';

const isBanquetRoom = (room: RoomType) =>
    room.slug === 'banquet-hall' ||
    room.name.toLowerCase().includes('banquet') ||
    room.name.toLowerCase().includes('event hall') ||
    room.name.toLowerCase().includes('event venue');

export const RoomList: React.FC = () => {
    const { hotelData, loading } = useBooking() as any;

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '14px', color: '#64748b', fontWeight: 600 }}>
                ⏳ Loading available rooms &amp; rate plans...
            </div>
        );
    }

    const rooms: RoomType[] = hotelData?.room_types || [];

    if (rooms.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px 0', fontSize: '14px', color: '#dc2626', fontWeight: 700 }}>
                No rooms available for the selected dates. Please select different check-in / check-out dates.
            </div>
        );
    }

    const regularRooms = rooms
        .filter(r => !isBanquetRoom(r))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    const banquetRooms = rooms
        .filter(r => isBanquetRoom(r))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    return (
        <section className="room-list-section" id="rooms" style={{ padding: '0 0 30px 0' }}>
            {/* Section Header */}
            <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-dark, #0f172a)', margin: 0, letterSpacing: '-0.01em' }}>
                        Available Rooms &amp; Rates
                    </h2>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted, #64748b)', margin: '3px 0 0 0', fontWeight: 500 }}>
                        Showing {regularRooms.length} room type{regularRooms.length > 1 ? 's' : ''} for your stay
                    </p>
                </div>
            </div>

            {/* Render all regular rooms one by one in sequence */}
            {regularRooms.length > 0 && (
                <div className="room-cards-stack" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {regularRooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            )}

            {/* Banquet and Event Rooms Displayed Below */}
            {banquetRooms.length > 0 && (
                <div style={{ marginTop: '36px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-dark, #0f172a)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                        Event &amp; Banquet Venues
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {banquetRooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};
