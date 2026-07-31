import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
            <button 
                type="button" 
                onClick={() => setIsOpen(!isOpen)} 
                style={{ 
                    width: '100%', 
                    padding: '14px 18px', 
                    background: '#f8fafc', 
                    border: 'none', 
                    textAlign: 'left', 
                    fontWeight: 800, 
                    fontSize: '14px', 
                    color: '#0f172a', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    justify: 'space-between', 
                    alignItems: 'center' 
                }}
            >
                <span>{title}</span>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div style={{ padding: '16px 18px', fontSize: '13px', color: '#475569', lineHeight: 1.7, borderTop: '1px solid #e2e8f0' }}>
                    {children}
                </div>
            )}
        </div>
    );
};
