import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

interface FAQCategory {
    name: string;
    items: {
        q: string;
        a: string;
    }[];
}

const FAQ_DATA: FAQCategory[] = [
    {
        name: 'Accommodation',
        items: [
            {
                q: 'What type of accommodation is available?',
                a: 'We offer private luxury rooms, suites, and entire villa bookings equipped with comfortable bedding, ensuite bathrooms, and premium living amenities.'
            },
            {
                q: 'Are unmarried couples allowed?',
                a: 'Yes, unmarried couples are allowed with valid government photo IDs (above 18 years of age).'
            },
            {
                q: 'What are the standard check-in and check-out times?',
                a: 'Check-in is after 1:00 PM and Check-out is before 10:00 AM. Early check-in or late check-out is subject to availability.'
            }
        ]
    },
    {
        name: 'Food and Beverages',
        items: [
            {
                q: 'Are meals included in the tariff?',
                a: 'Breakfast is included in tariff. Additional meals (Lunch / Dinner) are freshly prepared and provided at nominal extra charges.'
            },
            {
                q: 'Is outside food allowed?',
                a: 'Yes, outside food is allowed at the property.'
            },
            {
                q: 'Can guests access the kitchen to cook?',
                a: 'Guests are not allowed to access the kitchen except for preparing food for infants with prior permission.'
            }
        ]
    },
    {
        name: 'House Rules',
        items: [
            {
                q: 'What are the check-in and check-out timings?',
                a: 'Check-in is after 1:00 PM and Check-out is before 10:00 AM.'
            },
            {
                q: 'Are parties or music allowed late at night?',
                a: 'We do not encourage loud parties or late-night revelry. Music volume must be lowered after 10:00 PM to respect all guests.'
            },
            {
                q: 'Is smoking and alcohol allowed?',
                a: 'Consumption of alcohol is permitted within moderate limits. Smoking and setting up hookahs inside rooms/villa is strictly prohibited.'
            }
        ]
    },
    {
        name: 'How to get there',
        items: [
            {
                q: 'How to reach the property?',
                a: 'The property is easily accessible by private cabs, personal vehicles, or public transit. Detailed GPS directions and landmark guidance are sent upon confirmation.'
            }
        ]
    },
    {
        name: 'Events & Functions',
        items: [
            {
                q: 'Are events, shoots, and banquet bookings permitted?',
                a: 'Special occasions, wedding/pre-wedding ceremonies, milestone celebrations, and banquet functions are welcomed with prior booking and explicit management approval.'
            }
        ]
    },
    {
        name: 'Payments & Deposits',
        items: [
            {
                q: 'What payment methods are accepted?',
                a: 'We accept all major Credit/Debit Cards, UPI, Net Banking, and NEFT. Direct online bookings receive instant instant confirmed vouchers.'
            },
            {
                q: 'How much is the Security Deposit?',
                a: 'Security Deposit is ₹3000 to ₹5000 per room, refundable at check-out upon standard room inspection.'
            }
        ]
    },
    {
        name: 'Safety & Facilities',
        items: [
            {
                q: 'Is there a lifeguard at the swimming pool?',
                a: 'The swimming pool is unguarded. Children must be accompanied by responsible adults at all times.'
            },
            {
                q: 'What safety measures and power back-up are in place?',
                a: 'We have 24/7 on-site caretaker assistance, CCTV surveillance in public areas, first-aid kits, and emergency power generator backup.'
            }
        ]
    },
    {
        name: 'Things To Do',
        items: [
            {
                q: 'What are the main attractions nearby?',
                a: 'Explore scenic viewpoints, nature trails, heritage temples, adventure sports (paragliding, zip-lining), and local shopping markets.'
            }
        ]
    }
];

export const PoliciesSection: React.FC = () => {
    const { hotelData } = useBooking();
    const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

    // FAQ specific state
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
    const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

    // Dynamic times from PMS/hotel data with fallback
    const ciTime = hotelData?.check_in_time || '1:00 PM';
    const coTime = hotelData?.check_out_time || '10:00 AM';

    // Check if custom policies exist from API
    const apiPolicies = hotelData?.policies || [];
    const customHouseRules = apiPolicies.find(p => p.policy_type === 'house_rules' || p.policy_type === 'terms')?.content;
    const customCancellation = apiPolicies.find(p => p.policy_type === 'refund_cancellation' || p.policy_type === 'cancellation')?.content;

    const renderHouseRulesModal = () => {
        const customLines = customHouseRules ? customHouseRules.split('\n').filter((l: string) => l.trim().length > 0) : [];

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Check-in / Check-out Header Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>Check-in</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>After {ciTime}</div>
                    </div>
                    <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>Check-out</div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>Before {coTime}</div>
                    </div>
                </div>

                {customLines.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#334155', lineHeight: 1.7 }}>
                        {customLines.map((line: string, idx: number) => (
                            <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f8fafc', padding: '11px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ marginTop: '1px', flexShrink: 0 }}>📄</span>
                                <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🍕</span>
                            <span>Outside food is allowed at the property.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🍳</span>
                            <span>Guests are not allowed to access the kitchen except for preparing infant food with prior permission.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🚫</span>
                            <span>Unregistered day visitors are not permitted in guest rooms without management registration.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🎉</span>
                            <span>Loud music and late-night revelry are not permitted beyond 10:00 PM to ensure quiet hours.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🍷</span>
                            <span>Consumption of alcohol is permitted within reasonable limits inside private rooms.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🚬</span>
                            <span>Smoking and hookahs are strictly prohibited inside all indoor rooms and enclosed areas.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🏊‍♂️</span>
                            <span>The swimming pool is unguarded. Children must be supervised by adult guardians at all times.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>🪪</span>
                            <span>All adult guests must carry valid government-approved photo ID proofs (Aadhaar, Passport, Driving License) for check-in.</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <span>💒</span>
                            <span>Special events, weddings, shoots, and banquets require prior booking and explicit management approval.</span>
                        </div>
                        <div style={{ background: '#fef3c7', border: '1.5px solid #d4af37', padding: '12px 16px', borderRadius: '10px', fontWeight: 700, color: '#92400e', marginTop: '6px' }}>
                            💰 Security Deposit: ₹ 3,000 per room (refundable upon checkout).
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderCancellationModal = () => {
        const customLines = customCancellation ? customCancellation.split('\n').filter((l: string) => l.trim().length > 0) : [];

        return (
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '10px', color: '#166534' }}>
                    🟢 <strong>Full Refund (21+ Days):</strong> If booking is cancelled 21 days before check-in date, guests are entitled to a full refund.
                </div>
                <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '12px 16px', borderRadius: '10px', color: '#856404' }}>
                    🟡 <strong>50% Refund (21–11 Days):</strong> 50% refund if cancelled between 21-11 days before check-in date.
                </div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '10px', color: '#991b1b' }}>
                    🔴 <strong>No Refund (&lt;11 Days):</strong> Cancellations made less than 11 days before check-in date are non-refundable.
                </div>

                {customLines.length > 0 && (
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px', marginTop: '4px' }}>
                        <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Property Specific Terms:</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {customLines.map((l: string, idx: number) => (
                                <div key={idx}>• {l.replace(/^[•\-\*]\s*/, '')}</div>
                            ))}
                        </div>
                    </div>
                )}

                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li>A nominal cancellation fee (5%) applies for online bank refund processing. Travel credits carry zero fee.</li>
                    <li>If non-cancellable or promotional coupons are applied, standard cancellation terms are overridden by the coupon conditions.</li>
                    <li>
                        <strong>Peak Holiday Restrictions:</strong> Cancellations for peak holiday dates (Independence Day, Diwali, Christmas &amp; New Year, Republic Day, and Holi) are non-refundable.
                    </li>
                    <li>In case of extenuating emergencies, management review may provide credit vouchers for future rescheduled dates.</li>
                </ul>
            </div>
        );
    };

    const renderQuickFactsModal = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#334155' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                🪪 All guests must present valid government photo identification before check-in.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                💵 Refundable security deposit of ₹ 3,000 per room is payable prior to or during check-in.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                👨‍💼 Caretaker and front desk assistance is available from 8:00 AM to 10:00 PM.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                ⚡ 24/7 backup power generator is installed to support continuous lighting, Wi-Fi, and essential points.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                🌐 High-speed Wi-Fi broadband is available across guest rooms and common areas.
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '10px', color: '#166534', fontWeight: 600 }}>
                🌿 Located in a serene, nature-friendly locale with pure fresh air and panoramic views.
            </div>
        </div>
    );

    const renderThingsToDoModal = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🏞️</span>
                <span>Visit breathtaking scenic viewpoints, lakes, nature trails, and sunset viewpoints nearby.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🪂</span>
                <span>Experience outdoor thrill activities such as paragliding, zip-lining, and trekking.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🥾</span>
                <span>Explore scenic heritage walking trails and photography hotspots right around the property.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🛍️</span>
                <span>Discover traditional local markets, handmade souvenirs, and local delicacies.</span>
            </div>
        </div>
    );

    const renderFaqsModal = () => {
        const categoriesList = ['All', ...FAQ_DATA.map(c => c.name)];

        const filteredFaqs = FAQ_DATA.map(cat => {
            if (selectedFaqCategory !== 'All' && cat.name !== selectedFaqCategory) {
                return null;
            }
            const matchingItems = cat.items.filter(item =>
                item.q.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                item.a.toLowerCase().includes(faqSearchQuery.toLowerCase())
            );
            if (matchingItems.length === 0) return null;
            return {
                ...cat,
                items: matchingItems
            };
        }).filter(Boolean);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search in FAQs..."
                        value={faqSearchQuery}
                        onChange={(e) => setFaqSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 40px 12px 16px',
                            borderRadius: '10px',
                            border: '1px solid #cbd5e1',
                            fontSize: '14px',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                    <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                        🔍
                    </span>
                </div>

                {/* Category Pills */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none' }}>
                    {categoriesList.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedFaqCategory(cat)}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: selectedFaqCategory === cat ? 700 : 500,
                                background: selectedFaqCategory === cat ? '#0f172a' : '#f1f5f9',
                                color: selectedFaqCategory === cat ? '#ffffff' : '#475569',
                                border: 'none',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((catGroup, cIdx) => (
                            <div key={cIdx}>
                                <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                                    {catGroup!.name}
                                </h5>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {catGroup!.items.map((item, iIdx) => (
                                        <div key={iIdx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                                                {item.q}
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>
                                                {item.a}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b', fontSize: '14px' }}>
                            No FAQs found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Build the list of policy items
    const basePolicyItems = [
        { key: 'house_rules', title: 'House Rules', icon: '📄', render: renderHouseRulesModal },
        { key: 'cancellation', title: 'Cancellation Policy', icon: '⊗', render: renderCancellationModal },
        { key: 'quick_facts', title: 'Quick Facts', icon: 'ⓘ', render: renderQuickFactsModal },
        { key: 'things_to_do', title: 'Things To Do', icon: '🗺️', render: renderThingsToDoModal },
        { key: 'faqs', title: 'FAQs', icon: '❓', render: renderFaqsModal },
    ];

    // Add any custom API policies that aren't already represented
    const extraCustomPolicies = apiPolicies.filter(p => !['house_rules', 'terms', 'refund_cancellation', 'cancellation'].includes(p.policy_type));
    const extraItems = extraCustomPolicies.map((p, idx) => ({
        key: `custom_${p.id || idx}`,
        title: p.title || 'Policy',
        icon: '📌',
        render: () => (
            <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', whiteSpace: 'pre-line' }}>
                {p.content || 'Details available upon request.'}
            </div>
        )
    }));

    const allPolicyItems = [...basePolicyItems, ...extraItems];
    const currentActiveItem = allPolicyItems.find(p => p.key === activePolicyModal);

    return (
        <section className="policies-section" id="policies" style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '18px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    Rules &amp; Policies
                </h3>
            </div>

            {/* Grid of rounded rule card buttons with compact mobile responsive layout */}
            <div className="rules-cards-grid">
                {allPolicyItems.map((item) => (
                    <button
                        key={item.key}
                        type="button"
                        className="rule-card-btn"
                        onClick={() => setActivePolicyModal(item.key)}
                    >
                        <span className="rule-card-icon">
                            {item.icon}
                        </span>
                        <span className="rule-card-title">
                            {item.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Overlap Pop-up Modal */}
            {currentActiveItem && (
                <div
                    onClick={() => setActivePolicyModal(null)}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(4px)',
                        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '16px'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: '640px', width: '100%',
                            maxHeight: '85vh',
                            background: '#ffffff',
                            borderRadius: '20px',
                            border: '1.5px solid #d4af37',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            position: 'relative',
                            animation: 'modalSlideUp 0.3s ease-out'
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ padding: '24px 28px 18px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '24px' }}>{currentActiveItem.icon}</span>
                                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                                    {currentActiveItem.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActivePolicyModal(null)}
                                style={{
                                    background: 'none', border: 'none',
                                    fontSize: '22px', color: '#64748b', cursor: 'pointer',
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
                            {currentActiveItem.render()}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};
