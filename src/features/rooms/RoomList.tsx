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
    const [currentRoomIdx, setCurrentRoomIdx] = React.useState(0);

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
        .filter(r => !isBanquetRoom(r) && !r.name.toLowerCase().includes('ocean view'))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    const banquetRooms = rooms
        .filter(r => isBanquetRoom(r))
        .sort((a, b) => (a.starting_price || a.base_price || 0) - (b.starting_price || b.base_price || 0));

    const safeRoomIdx = Math.min(currentRoomIdx, Math.max(0, regularRooms.length - 1));
    const activeRoom = regularRooms[safeRoomIdx];

    const prevRoom = () => {
        setCurrentRoomIdx(prev => (prev === 0 ? regularRooms.length - 1 : prev - 1));
    };

    const nextRoom = () => {
        setCurrentRoomIdx(prev => (prev === regularRooms.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="room-list-section" id="rooms" style={{ padding: '0 0 30px 0' }}>
            {regularRooms.length > 0 && activeRoom && (
                <div style={{ position: 'relative' }}>
                    {/* Room card wrapper with bold side arrows placed near room image & name */}
                    <div className="single-room-card-wrapper" style={{ position: 'relative' }}>
                        {regularRooms.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prevRoom}
                                    aria-label="Previous Room Type"
                                    className="room-type-nav-arrow prev-room-arrow"
                                    style={{
                                        position: 'absolute', left: '-20px', top: '140px', transform: 'translateY(-50%)',
                                        background: '#0f172a', color: '#ffffff',
                                        border: '2.5px solid #ffffff', borderRadius: '50%',
                                        width: '44px', height: '44px',
                                        fontSize: '22px', fontWeight: 900, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 35, transition: 'all 0.2s ease', padding: '0',
                                        lineHeight: 1, userSelect: 'none',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.45)'
                                    }}
                                >
                                    ❮
                                </button>
                                <button
                                    type="button"
                                    onClick={nextRoom}
                                    aria-label="Next Room Type"
                                    className="room-type-nav-arrow next-room-arrow"
                                    style={{
                                        position: 'absolute', right: '-20px', top: '140px', transform: 'translateY(-50%)',
                                        background: '#0f172a', color: '#ffffff',
                                        border: '2.5px solid #ffffff', borderRadius: '50%',
                                        width: '44px', height: '44px',
                                        fontSize: '22px', fontWeight: 900, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        zIndex: 35, transition: 'all 0.2s ease', padding: '0',
                                        lineHeight: 1, userSelect: 'none',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.45)'
                                    }}
                                >
                                    ❯
                                </button>
                            </>
                        )}

                        <RoomCard room={activeRoom} />
                    </div>

                    {/* Dot pagination indicators */}
                    {regularRooms.length > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                            {regularRooms.map((r, idx) => (
                                <button
                                    key={r.id}
                                    type="button"
                                    onClick={() => setCurrentRoomIdx(idx)}
                                    aria-label={`Go to room ${r.name}`}
                                    style={{
                                        width: idx === safeRoomIdx ? '28px' : '10px',
                                        height: '10px',
                                        borderRadius: '5px',
                                        background: idx === safeRoomIdx ? '#16a34a' : '#cbd5e1',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'all 0.25s ease',
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Banquet rooms displayed below */}
            {banquetRooms.length > 0 && (
                <div style={{ marginTop: '32px' }}>
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
