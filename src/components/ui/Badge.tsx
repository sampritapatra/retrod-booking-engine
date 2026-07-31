import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info';
    style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info', style }) => {
    let bg = '#e0f2fe';
    let color = '#0369a1';

    if (variant === 'success') {
        bg = '#dcfce7';
        color = '#15803d';
    } else if (variant === 'warning') {
        bg = '#fef3c7';
        color = '#b45309';
    } else if (variant === 'danger') {
        bg = '#fee2e2';
        color = '#b91c1c';
    }

    return (
        <span style={{ background: bg, color: color, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, display: 'inline-block', ...style }}>
            {children}
        </span>
    );
};
