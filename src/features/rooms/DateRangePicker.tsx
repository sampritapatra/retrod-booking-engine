import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { formatDisplayDate } from '../../utils/date';

export const DateRangePicker: React.FC = () => {
    const { 
        checkInDate, 
        checkOutDate, 
        totalNights, 
        setDateRange
    } = useBooking();

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    
    // View date tracks the month/year currently displayed in the 1-month calendar grid
    const [viewDate, setViewDate] = useState<Date>(() => new Date(checkInDate.getFullYear(), checkInDate.getMonth(), 1));
    
    // Internal selection state
    const [tempCheckIn, setTempCheckIn] = useState<Date | null>(checkInDate);
    const [tempCheckOut, setTempCheckOut] = useState<Date | null>(checkOutDate);
    const [isSelectingCheckout, setIsSelectingCheckout] = useState<boolean>(false);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleOpenCalendar = () => {
        setTempCheckIn(checkInDate);
        setTempCheckOut(checkOutDate);
        setViewDate(new Date(checkInDate.getFullYear(), checkInDate.getMonth(), 1));
        setIsSelectingCheckout(false);
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
        setViewDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
        setViewDate(nextMonth);
    };

    const handleDateClick = (clickedDate: Date) => {
        if (clickedDate < today) return; // Cannot select past date

        if (!tempCheckIn || !isSelectingCheckout) {
            // First click: select check-in date
            setTempCheckIn(clickedDate);
            setTempCheckOut(null);
            setIsSelectingCheckout(true);
        } else {
            // Second click: select check-out date or swap
            let newCheckIn: Date;
            let newCheckOut: Date;

            if (clickedDate.getTime() > tempCheckIn.getTime()) {
                // Clicked date is after check-in -> set as check-out
                newCheckIn = new Date(tempCheckIn);
                newCheckOut = new Date(clickedDate);
            } else if (clickedDate.getTime() < tempCheckIn.getTime()) {
                // Clicked date is before check-in -> clicked date becomes check-in, previous check-in becomes check-out!
                newCheckIn = new Date(clickedDate);
                newCheckOut = new Date(tempCheckIn);
            } else {
                // Clicked date is equal to check-in -> set 1 night stay
                newCheckIn = new Date(clickedDate);
                newCheckOut = new Date(clickedDate);
                newCheckOut.setDate(newCheckOut.getDate() + 1);
            }

            setTempCheckIn(newCheckIn);
            setTempCheckOut(newCheckOut);
            setIsSelectingCheckout(false);

            // Auto apply date & price changes immediately to all rooms!
            setDateRange(newCheckIn, newCheckOut);
            setIsCalendarOpen(false);
        }
    };

    const renderSingleMonthGrid = () => {
        const year = viewDate.getFullYear();
        const monthIndex = viewDate.getMonth();
        const firstDay = new Date(year, monthIndex, 1);
        const startingDayOfWeek = firstDay.getDay();
        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="cal-day empty" />);
        }

        // Determine effective start and end for rendering range preview
        let effectiveCheckIn: Date | null = tempCheckIn;
        let effectiveCheckOut: Date | null = tempCheckOut;

        if (isSelectingCheckout && tempCheckIn && hoverDate && hoverDate >= today) {
            if (hoverDate < tempCheckIn) {
                effectiveCheckIn = hoverDate;
                effectiveCheckOut = tempCheckIn;
            } else {
                effectiveCheckIn = tempCheckIn;
                effectiveCheckOut = hoverDate;
            }
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, monthIndex, d);
            dateObj.setHours(0, 0, 0, 0);

            const isPast = dateObj < today;
            const isStart = effectiveCheckIn ? dateObj.getTime() === effectiveCheckIn.getTime() : false;
            const isEnd = effectiveCheckOut ? dateObj.getTime() === effectiveCheckOut.getTime() : false;
            const isInRange = (effectiveCheckIn && effectiveCheckOut) ? (dateObj > effectiveCheckIn && dateObj < effectiveCheckOut) : false;

            let dayClass = 'cal-day';
            if (isPast) dayClass += ' disabled';
            if (isStart) dayClass += ' check-in range-start';
            if (isEnd) dayClass += ' check-out range-end';
            if (isInRange) dayClass += ' in-range';

            days.push(
                <div
                    key={d}
                    className={dayClass}
                    onClick={() => !isPast && handleDateClick(dateObj)}
                    onMouseEnter={() => !isPast && isSelectingCheckout && setHoverDate(dateObj)}
                    style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
                >
                    {d}
                </div>
            );
        }

        return (
            <div className="cal-month-wrap">
                <div className="cal-month-nav">
                    <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handlePrevMonth}
                        title="Previous Month"
                    >
                        &lt;
                    </button>

                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>
                        {monthNames[monthIndex]} {year}
                    </div>

                    <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handleNextMonth}
                        title="Next Month"
                    >
                        &gt;
                    </button>
                </div>

                <div className="cal-days-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                <div className="cal-days-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div className="booking-bar-wrapper" style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', position: 'relative' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Book your room now</h3>
                    <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: 600, margin: '2px 0 0 0' }}>Select stay dates</p>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        onClick={handleOpenCalendar}
                        style={{
                            background: '#fff',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '10px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#0f172a',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                            textAlign: 'left'
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>📅</span>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                                {formatDisplayDate(checkInDate)} – {formatDisplayDate(checkOutDate)}
                            </div>
                            <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>{totalNights} Night{totalNights > 1 ? 's' : ''}</span>
                                <span style={{ color: '#94a3b8' }}>•</span>
                                <span>Change Dates v</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {isCalendarOpen && (
                <div className="calendar-popover-card" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '8px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px', boxShadow: '0 20px 30px -5px rgba(0,0,0,0.15)', padding: '20px', zIndex: 2000, width: '360px', maxWidth: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>
                            {!isSelectingCheckout ? '👉 Select Check-In Date' : '👉 Select Check-Out Date'}
                        </div>
                        <button style={{ background: 'none', border: 'none', fontSize: '20px', color: '#64748b', cursor: 'pointer', lineHeight: 1 }} onClick={() => setIsCalendarOpen(false)}>&times;</button>
                    </div>

                    {renderSingleMonthGrid()}

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 600 }}>
                        {isSelectingCheckout && tempCheckIn ? (
                            <span style={{ color: '#16a34a' }}>Check-In: <strong>{formatDisplayDate(tempCheckIn)}</strong>. Now click check-out date!</span>
                        ) : (
                            <span>Click any future date to select Check-In.</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
