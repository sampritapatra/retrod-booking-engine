import React, { useState } from 'react';

interface TooltipProps {
    text: React.ReactNode;
    onClick?: (e: React.MouseEvent) => void;
    alignRight?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, onClick, alignRight = false }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <span 
            className="info-tip-wrap"
            style={{ 
                position: 'relative', 
                display: 'inline-flex', 
                alignItems: 'center', 
                cursor: 'pointer', 
                marginLeft: '4px',
                verticalAlign: 'middle',
                zIndex: hovered ? 99999 : 1
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={(e) => {
                if (onClick) {
                    e.stopPropagation();
                    onClick(e);
                } else {
                    setHovered(prev => !prev);
                }
            }}
        >
            <span 
                className="info-tip-icon" 
                style={{ 
                    fontSize: '11px', 
                    fontWeight: 800,
                    width: '16px', 
                    height: '16px', 
                    borderRadius: '50%', 
                    background: '#f1f5f9', 
                    color: '#2563eb', 
                    border: '1px solid #94a3b8',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    lineHeight: 1
                }}
            >
                ℹ
            </span>

            {hovered && (
                <div 
                    className={`info-tip-box ${alignRight ? 'align-right' : ''}`}
                    style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 10px)',
                        left: alignRight ? 'auto' : '50%',
                        right: alignRight ? 0 : 'auto',
                        transform: alignRight ? 'none' : 'translateX(-50%)',
                        zIndex: 99999,
                        background: '#18181b',
                        color: '#ffffff',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        fontSize: '12px',
                        fontWeight: 500,
                        lineHeight: 1.45,
                        width: 'max-content',
                        maxWidth: '280px',
                        minWidth: '180px',
                        boxShadow: '0 12px 28px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.2)',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        pointerEvents: 'none'
                    }}
                >
                    {text}
                    {/* Caret Arrow pointing down to (i) icon */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: alignRight ? 'auto' : '50%',
                        right: alignRight ? '12px' : 'auto',
                        transform: alignRight ? 'none' : 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid #18181b'
                    }} />
                </div>
            )}
        </span>
    );
};
