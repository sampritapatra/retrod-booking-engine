import React, { useState, useEffect, useRef } from 'react';
import { useBooking } from '../../context/BookingContext';

interface DateRangePickerProps {
    variant?: 'header' | 'inline';
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ variant = 'header' }) => {
    const { checkInDate, checkOutDate, setDateRange } = useBooking();
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(checkInDate ? new Date(checkInDate) : new Date());
    const [tempCheckIn, setTempCheckIn] = useState<Date | null>(checkInDate ? new Date(checkInDate) : null);
    const [tempCheckOut, setTempCheckOut] = useState<Date | null>(checkOutDate ? new Date(checkOutDate) : null);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const [isSelectingCheckout, setIsSelectingCheckout] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sync temp dates when context changes
    useEffect(() => {
        if (checkInDate) setTempCheckIn(new Date(checkInDate));
        if (checkOutDate) setTempCheckOut(new Date(checkOutDate));
    }, [checkInDate, checkOutDate]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsCalendarOpen(false);
                setIsSelectingCheckout(false);
                setHoverDate(null);
            }
        };

        if (isCalendarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCalendarOpen]);

    const formatDisplayDate = (d: Date | string | null | undefined): string => {
        if (!d) return '--';
        const date = new Date(d);
        if (isNaN(date.getTime())) return '--';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const calculateNights = (start: Date | null, end: Date | null): number => {
        if (!start || !end) return 1;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const totalNights = calculateNights(checkInDate, checkOutDate);

    const handleOpenCalendar = () => {
        if (checkInDate) {
            setViewDate(new Date(checkInDate));
            setTempCheckIn(new Date(checkInDate));
        }
        if (checkOutDate) {
            setTempCheckOut(new Date(checkOutDate));
        }
        setIsSelectingCheckout(false);
        setHoverDate(null);
        setIsCalendarOpen(!isCalendarOpen);
    };

    const handlePrevMonth = () => {
        setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleDateMouseEnter = (targetDate: Date) => {
        if (targetDate < today) return;
        if (isSelectingCheckout && tempCheckIn) {
            setHoverDate(new Date(targetDate));
        }
    };

    // Step 1: Click start date -> Calendar stays open & waits for checkout date
    // Step 2: Hover over range -> Shows light colour phase for the stay period
    // Step 3: Click end date -> Commits range & completes selection
    const handleDateClick = (clickedDate: Date) => {
        if (clickedDate < today) return;

        if (!isSelectingCheckout || !tempCheckIn) {
            // First click: select check-in date, reset checkout, and wait for checkout selection
            setTempCheckIn(new Date(clickedDate));
            setTempCheckOut(null);
            setHoverDate(new Date(clickedDate));
            setIsSelectingCheckout(true);
        } else {
            // Second click: select check-out date
            if (clickedDate.getTime() > tempCheckIn.getTime()) {
                const newCheckIn = new Date(tempCheckIn);
                const newCheckOut = new Date(clickedDate);
                setTempCheckIn(newCheckIn);
                setTempCheckOut(newCheckOut);
                setIsSelectingCheckout(false);
                setHoverDate(null);
                setDateRange(newCheckIn, newCheckOut);
                setIsCalendarOpen(false);
            } else if (clickedDate.getTime() < tempCheckIn.getTime()) {
                // Clicked an earlier date -> update check-in to this date and continue waiting for checkout
                setTempCheckIn(new Date(clickedDate));
                setTempCheckOut(null);
                setHoverDate(new Date(clickedDate));
                setIsSelectingCheckout(true);
            } else {
                // Clicked the same date -> keep waiting for a checkout date
                setTempCheckIn(new Date(clickedDate));
                setTempCheckOut(null);
                setHoverDate(null);
                setIsSelectingCheckout(true);
            }
        }
    };

    const handleQuickSelect = (nights: number, startDaysFromToday: number = 0) => {
        const start = new Date(today);
        start.setDate(start.getDate() + startDaysFromToday);
        const end = new Date(start);
        end.setDate(end.getDate() + nights);

        setTempCheckIn(start);
        setTempCheckOut(end);
        setIsSelectingCheckout(false);
        setHoverDate(null);
        setDateRange(start, end);
        setIsCalendarOpen(false);
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
            days.push(<div key={`empty-${i}`} className="cal-day empty" style={{ cursor: 'default' }} />);
        }

        // Determine animated effective range from hover or selected state
        let effectiveCheckIn: Date | null = tempCheckIn;
        let effectiveCheckOut: Date | null = tempCheckOut;

        if (isSelectingCheckout && tempCheckIn) {
            if (hoverDate && hoverDate >= today) {
                if (hoverDate.getTime() > tempCheckIn.getTime()) {
                    effectiveCheckIn = tempCheckIn;
                    effectiveCheckOut = hoverDate;
                } else if (hoverDate.getTime() < tempCheckIn.getTime()) {
                    effectiveCheckIn = hoverDate;
                    effectiveCheckOut = tempCheckIn;
                } else {
                    effectiveCheckIn = tempCheckIn;
                    effectiveCheckOut = null;
                }
            } else {
                effectiveCheckIn = tempCheckIn;
                effectiveCheckOut = null;
            }
        }

        const isRangeActive = Boolean(effectiveCheckIn && effectiveCheckOut && effectiveCheckOut > effectiveCheckIn);

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, monthIndex, d);
            dateObj.setHours(0, 0, 0, 0);

            const isPast = dateObj < today;
            const isStart = effectiveCheckIn ? dateObj.getTime() === effectiveCheckIn.getTime() : false;
            const isEnd = effectiveCheckOut ? dateObj.getTime() === effectiveCheckOut.getTime() : false;
            const isInRange = (effectiveCheckIn && effectiveCheckOut) ? (dateObj > effectiveCheckIn && dateObj < effectiveCheckOut) : false;
            const isSingleSelectedStart = isSelectingCheckout && isStart && !effectiveCheckOut;

            if (isPast) {
                // Past date: clean visible number, distinct red cut mark, non-selectable
                days.push(
                    <div
                        key={d}
                        title="Past date - not selectable"
                        style={{
                            position: 'relative',
                            cursor: 'not-allowed',
                            background: '#f8fafc',
                            color: '#94a3b8',
                            fontWeight: 600,
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '38px',
                            fontSize: '13px',
                            border: '1px solid #f1f5f9',
                            userSelect: 'none',
                            pointerEvents: 'none'
                        }}
                    >
                        <span>{d}</span>
                        {/* Red Diagonal Cut Mark */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '18%',
                                right: '18%',
                                height: '2px',
                                background: '#ef4444',
                                transform: 'rotate(-26deg)',
                                borderRadius: '2px',
                                pointerEvents: 'none',
                                opacity: 0.75
                            }}
                        />
                    </div>
                );
            } else {
                // Shape and connection pill borders
                let borderRadius = '8px';
                let borderStyle = '1px solid #e2e8f0';
                let bg = '#ffffff';
                let textColor = '#0f172a';
                let boxShadow: string | undefined = undefined;

                if (isStart && isEnd) {
                    borderRadius = '8px';
                    bg = 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';
                    textColor = '#ffffff';
                    borderStyle = '1.5px solid #fde047';
                    boxShadow = '0 3px 10px rgba(180, 83, 9, 0.4)';
                } else if (isStart) {
                    borderRadius = isRangeActive ? '8px 0 0 8px' : '8px';
                    bg = 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';
                    textColor = '#ffffff';
                    borderStyle = '1.5px solid #fde047';
                    boxShadow = '0 3px 10px rgba(180, 83, 9, 0.4)';
                } else if (isEnd) {
                    borderRadius = isRangeActive ? '0 8px 8px 0' : '8px';
                    bg = isSelectingCheckout ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #d97706 0%, #b45309 100%)';
                    textColor = '#ffffff';
                    borderStyle = '1.5px solid #fde047';
                    boxShadow = '0 3px 10px rgba(180, 83, 9, 0.4)';
                } else if (isInRange) {
                    // Light colour phase for in-between time period
                    borderRadius = '0px';
                    bg = '#fef3c7'; // soft light amber/gold phase
                    textColor = '#92400e'; // rich warm amber text
                    borderStyle = '1.5px solid #fde68a';
                }

                days.push(
                    <div
                        key={d}
                        className={`cal-day ${isStart ? 'range-start' : ''} ${isEnd ? 'range-end' : ''} ${isInRange ? 'in-range' : ''} ${isSingleSelectedStart ? 'single-start' : ''}`}
                        onClick={() => handleDateClick(dateObj)}
                        onMouseEnter={() => handleDateMouseEnter(dateObj)}
                        style={{
                            cursor: 'pointer',
                            background: bg,
                            color: textColor,
                            fontWeight: (isStart || isEnd || isInRange || isSingleSelectedStart) ? 800 : 600,
                            borderRadius: borderRadius,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '38px',
                            fontSize: '13px',
                            border: isInRange ? 'none' : borderStyle,
                            borderTop: isInRange ? '1.5px solid #fde68a' : undefined,
                            borderBottom: isInRange ? '1.5px solid #fde68a' : undefined,
                            boxShadow: boxShadow,
                            position: 'relative',
                            zIndex: (isStart || isEnd) ? 3 : (isInRange ? 1 : 2),
                            transition: 'background 0.12s ease, color 0.12s ease, transform 0.1s ease',
                            userSelect: 'none'
                        }}
                    >
                        {d}
                    </div>
                );
            }
        }

        return (
            <div className="cal-month-wrap" onMouseLeave={() => isSelectingCheckout && setHoverDate(null)}>
                {/* Month header & navigation */}
                <div className="cal-month-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handlePrevMonth}
                        title="Previous Month"
                        style={{
                            background: '#b45309',
                            color: '#ffffff',
                            border: '1.5px solid #fde047',
                            borderRadius: '8px',
                            width: '32px',
                            height: '32px',
                            fontSize: '14px',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(180, 83, 9, 0.35)'
                        }}
                    >
                        ❮
                    </button>

                    <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>
                        {monthNames[monthIndex]} {year}
                    </div>

                    <button
                        type="button"
                        className="cal-nav-btn"
                        onClick={handleNextMonth}
                        title="Next Month"
                        style={{
                            background: '#b45309',
                            color: '#ffffff',
                            border: '1.5px solid #fde047',
                            borderRadius: '8px',
                            width: '32px',
                            height: '32px',
                            fontSize: '14px',
                            fontWeight: 900,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(180, 83, 9, 0.35)'
                        }}
                    >
                        ❯
                    </button>
                </div>

                {/* Day names header */}
                <div className="cal-days-header" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontSize: '11.5px', fontWeight: 800, color: '#64748b', marginBottom: '8px' }}>
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                {/* 7-column Calendar Grid */}
                <div 
                    className="cal-days-grid" 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(7, 1fr)', 
                        rowGap: '4px',
                        columnGap: '0px', 
                        textAlign: 'center',
                        userSelect: 'none'
                    }}
                >
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="date-range-picker-container" style={{ position: 'relative', display: 'inline-block' }}>
            {/* Header Trigger Button with Bold Calendar Logo */}
            <button
                type="button"
                onClick={handleOpenCalendar}
                aria-label="Change Stay Dates"
                style={{
                    background: '#fffdf9',
                    border: '1.5px solid #d4af37',
                    borderRadius: '12px',
                    padding: variant === 'header' ? '6px 14px' : '8px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.18)',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                }}
            >
                {/* Bold Golden Vector SVG Calendar Logo */}
                <div
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        border: '1.5px solid #fde047',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(180, 83, 9, 0.35)'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>

                <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                        {formatDisplayDate(checkInDate)} – {formatDisplayDate(checkOutDate)}
                    </div>
                    <div style={{ fontSize: '11px', color: '#b45309', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>{totalNights} Night{totalNights > 1 ? 's' : ''}</span>
                        <span style={{ color: '#d4af37' }}>•</span>
                        <span style={{ color: '#b45309', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                            Change Dates <span style={{ fontSize: '10px', color: '#b45309' }}>▼</span>
                        </span>
                    </div>
                </div>
            </button>

            {/* Backdrop Overlay when calendar is open */}
            {isCalendarOpen && (
                <div
                    className="calendar-backdrop-overlay"
                    onClick={() => {
                        setIsCalendarOpen(false);
                        setIsSelectingCheckout(false);
                        setHoverDate(null);
                    }}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(15, 23, 42, 0.45)',
                        backdropFilter: 'blur(3px)',
                        zIndex: 2500,
                        animation: 'fadeIn 0.2s ease-out'
                    }}
                />
            )}

            {/* Calendar Popover / Modal Card */}
            {isCalendarOpen && (
                <div 
                    className="calendar-popover-card" 
                    style={{ 
                        position: isMobile ? 'fixed' : 'absolute', 
                        top: isMobile ? '50%' : 'calc(100% + 8px)', 
                        left: isMobile ? '50%' : 'auto',
                        right: isMobile ? 'auto' : 0, 
                        transform: isMobile ? 'translate(-50%, -50%)' : 'none',
                        background: '#ffffff', 
                        border: '2px solid #d4af37', 
                        borderRadius: '18px', 
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 25px rgba(212,175,55,0.25)', 
                        padding: '18px', 
                        zIndex: 2600, 
                        width: '340px', 
                        maxWidth: 'calc(100vw - 32px)',
                        animation: isMobile ? 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideDown 0.2s ease-out'
                    }}
                >
                    {/* Header with Close */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid #f1ece4' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#b45309' }}>🗓️</span>
                            {!isSelectingCheckout ? 'Select Stay Dates' : 'Select Check-Out Date'}
                        </div>
                        <button 
                            type="button"
                            style={{ background: '#f1ece4', border: '1px solid #d4af37', borderRadius: '50%', width: '26px', height: '26px', fontSize: '12px', fontWeight: 800, color: '#44403c', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                            onClick={() => {
                                setIsCalendarOpen(false);
                                setIsSelectingCheckout(false);
                                setHoverDate(null);
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Interactive Selection Guide Banner */}
                    <div style={{
                        background: isSelectingCheckout ? '#fffbeb' : '#f8fafc',
                        border: isSelectingCheckout ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '7px 10px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: isSelectingCheckout ? '#92400e' : '#475569'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span>{isSelectingCheckout ? '👉' : '📌'}</span>
                            <span>
                                {isSelectingCheckout && tempCheckIn ? (
                                    <>Check-In: <strong style={{ color: '#b45309' }}>{formatDisplayDate(tempCheckIn)}</strong></>
                                ) : (
                                    <>Check-In: <strong style={{ color: '#0f172a' }}>{formatDisplayDate(checkInDate)}</strong></>
                                )}
                            </span>
                        </div>
                        <div style={{ color: isSelectingCheckout ? '#b45309' : '#0f172a', fontWeight: 800 }}>
                            {isSelectingCheckout ? (
                                hoverDate && tempCheckIn && hoverDate.getTime() > tempCheckIn.getTime() ? (
                                    `${formatDisplayDate(hoverDate)} (${calculateNights(tempCheckIn, hoverDate)}N)`
                                ) : (
                                    'Select Check-Out →'
                                )
                            ) : (
                                `Check-Out: ${formatDisplayDate(checkOutDate)} (${totalNights}N)`
                            )}
                        </div>
                    </div>

                    {renderSingleMonthGrid()}

                    {/* Quick Select Buttons */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1ece4', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => handleQuickSelect(1, 0)}
                            style={{
                                flex: '1 1 auto',
                                background: '#fffdf9',
                                border: '1px solid #d4af37',
                                borderRadius: '8px',
                                padding: '5px 8px',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#b45309',
                                cursor: 'pointer'
                            }}
                        >
                            Tonight (1N)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleQuickSelect(1, 1)}
                            style={{
                                flex: '1 1 auto',
                                background: '#fffdf9',
                                border: '1px solid #d4af37',
                                borderRadius: '8px',
                                padding: '5px 8px',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#b45309',
                                cursor: 'pointer'
                            }}
                        >
                            Tomorrow (1N)
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const currentDay = today.getDay();
                                const daysUntilFriday = (5 - currentDay + 7) % 7 || 7;
                                handleQuickSelect(2, daysUntilFriday);
                            }}
                            style={{
                                flex: '1 1 auto',
                                background: '#fffdf9',
                                border: '1px solid #d4af37',
                                borderRadius: '8px',
                                padding: '5px 8px',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#b45309',
                                cursor: 'pointer'
                            }}
                        >
                            Weekend (2N)
                        </button>
                    </div>

                    {/* Footer instructions */}
                    <div style={{ marginTop: '8px', fontSize: '11px', color: '#64748b', textAlign: 'center', fontWeight: 600 }}>
                        {isSelectingCheckout && tempCheckIn ? (
                            <span style={{ color: '#b45309' }}>
                                Click on your <strong>Check-Out Date</strong> to finalize dates.
                            </span>
                        ) : (
                            <span>Click any start date to begin selecting your stay period.</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
