import { PromoCodeItem } from '../types';

export interface PromoCalculationResult {
    origTotal: number;
    discountAmount: number;
    finalTotal: number;
    percentSaved: number;
    isValidForNights: boolean;
    minNightsRequired: number;
    discountLabel: string;
}

export function calculatePlanPriceWithPromo(
    basePricePerNight: number,
    totalNights: number,
    promo: PromoCodeItem | null | undefined
): PromoCalculationResult {
    const origTotal = Math.max(0, basePricePerNight * totalNights);
    if (!promo || !promo.code) {
        return {
            origTotal,
            discountAmount: 0,
            finalTotal: origTotal,
            percentSaved: 0,
            isValidForNights: true,
            minNightsRequired: 1,
            discountLabel: ''
        };
    }

    const minN = Number(promo.minNights ?? promo.min_nights ?? 1);
    const isValidForNights = totalNights >= minN;

    const dType = (promo.discountType || promo.discount_type || 'percentage').toLowerCase();
    const dVal = Number(promo.discountValue ?? promo.discount_value ?? 0);

    let discountLabel = '';
    let discountAmount = 0;

    if (dType === 'percentage' || dType === 'percent' || dType === 'pct') {
        discountLabel = `${dVal}% OFF`;
        if (isValidForNights) {
            discountAmount = Math.round(origTotal * (dVal / 100));
        }
    } else {
        // Flat amount discount
        discountLabel = `₹${dVal} OFF`;
        if (isValidForNights) {
            discountAmount = Math.min(origTotal, Math.round(dVal));
        }
    }

    const finalTotal = Math.max(0, origTotal - discountAmount);
    const percentSaved = origTotal > 0 ? Math.round((discountAmount / origTotal) * 100) : 0;

    return {
        origTotal,
        discountAmount,
        finalTotal,
        percentSaved,
        isValidForNights,
        minNightsRequired: minN,
        discountLabel
    };
}
