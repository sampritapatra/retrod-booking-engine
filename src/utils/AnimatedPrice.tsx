import React, { useEffect, useState, useRef } from 'react';
import { formatCurrency } from './currency';
import { CurrencyType } from '../types';

interface AnimatedPriceProps {
    value: number;
    currency?: CurrencyType;
    durationMs?: number;
    className?: string;
    style?: React.CSSProperties;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
    value,
    currency = 'INR',
    durationMs = 600,
    className,
    style
}) => {
    const [displayVal, setDisplayVal] = useState(value);
    const prevValRef = useRef(value);

    useEffect(() => {
        const startVal = prevValRef.current;
        const endVal = value;
        if (startVal === endVal) {
            setDisplayVal(endVal);
            return;
        }

        const startTime = performance.now();
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / durationMs);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startVal + (endVal - startVal) * easeProgress);
            setDisplayVal(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                prevValRef.current = endVal;
            }
        };

        requestAnimationFrame(step);
    }, [value, durationMs]);

    return (
        <span className={className} style={style}>
            {formatCurrency(displayVal, currency)}
        </span>
    );
};
