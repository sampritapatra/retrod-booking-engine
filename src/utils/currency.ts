import { CurrencyType } from '../types';

export const USD_EXCHANGE_RATE = 83.5;

export function formatCurrency(amountINR: number, currency: CurrencyType = 'INR'): string {
    const num = Number(amountINR) || 0;
    if (currency === 'USD') {
        const usdVal = (num / USD_EXCHANGE_RATE).toFixed(2);
        return `$ ${usdVal}`;
    }
    return `₹ ${Math.round(num).toLocaleString('en-IN')}`;
}
