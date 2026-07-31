export function formatDateToLocalISO(d: Date): string {
    if (!(d instanceof Date) || isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateObj: Date, locale = 'en-US', options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }): string {
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) return '';
    return dateObj.toLocaleDateString(locale, options);
}

export function calculateNights(startDate: Date | string, endDate: Date | string): number {
    const dIn = typeof startDate === 'string' ? new Date(startDate + 'T00:00:00') : new Date(startDate);
    const dOut = typeof endDate === 'string' ? new Date(endDate + 'T00:00:00') : new Date(endDate);
    const diffTime = Math.abs(dOut.getTime() - dIn.getTime());
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
