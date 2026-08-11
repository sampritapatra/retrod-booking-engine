import React, { useState } from 'react';

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
                a: 'We offer private luxury rooms and entire villa bookings equipped with comfortable bedding, ensuite bathrooms, and premium living amenities.'
            },
            {
                q: 'Are unmarried couples allowed?',
                a: 'Yes, unmarried couples are allowed with valid government photo IDs (above 18 years of age).'
            }
        ]
    },
    {
        name: 'Food and Beverages',
        items: [
            {
                q: 'Are meals included in the tariff?',
                a: 'Breakfast is included in tariff. Additional meals (Lunch/Dinner) are provided at additional charges.'
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
                a: 'We do not encourage parties and late-night revelry. Loud music is not permitted beyond 10:00 PM.'
            },
            {
                q: 'Is smoking and alcohol allowed?',
                a: 'Consumption of alcohol is permitted only within limits. Smoking and setting up hookahs inside rooms/villa/lawns is strictly prohibited.'
            }
        ]
    },
    {
        name: 'How to get there',
        items: [
            {
                q: 'How to reach the property in Matheran?',
                a: 'Since vehicles are restricted in Matheran, guests can reach Dasturi Naka by taxi or car, and from there take a toy train, horseback ride, hand-pulled rickshaw, or enjoy a scenic walk to the villa.'
            }
        ]
    },
    {
        name: 'Others',
        items: [
            {
                q: 'Are events and shoots permitted?',
                a: 'Special occasions, wedding/pre-wedding shoots, and milestone celebrations require explicit prior permission and will incur additional venue charges and security deposits.'
            }
        ]
    },
    {
        name: 'Payments',
        items: [
            {
                q: 'What payment methods are accepted?',
                a: 'All payments for booking the villa including meals must be pre-paid online prior to check-in. Cash is not accepted on-site.'
            },
            {
                q: 'How much is the Security Deposit?',
                a: 'Security Deposit is ₹3000 to ₹5000 per room, payable online 48 hours prior to check-in or via online modes prior to check-in.'
            }
        ]
    },
    {
        name: 'Room specifics',
        items: [
            {
                q: 'Is AC available in the bedrooms or living room?',
                a: 'AC is not available at the property due to Matheran hill station climate regulations.'
            }
        ]
    },
    {
        name: 'Safety',
        items: [
            {
                q: 'Is there a lifeguard at the swimming pool?',
                a: 'The pool (if present) is unguarded. There is no lifeguard on site. Children must be accompanied by adults at all times.'
            },
            {
                q: 'What safety measures are in place?',
                a: 'We have 24/7 caretaker support on site and emergency power back-up (Genset).'
            }
        ]
    },
    {
        name: 'Stay and accessibility',
        items: [
            {
                q: 'Is the property elderly or wheelchair friendly?',
                a: 'Ground floor room access is available. Please reach out to our holiday advisor for specific accessibility requests.'
            }
        ]
    },
    {
        name: 'Things to do',
        items: [
            {
                q: 'What are the main attractions nearby?',
                a: 'Visit scenic points like Charlotte Lake, Louisa Point, One Tree Hill Point, Matheran Observatory, and Lord Nowroji Garden. Enjoy paragliding, zip-lining, trekking, and local bazaar shopping.'
            }
        ]
    }
];

export const PoliciesSection: React.FC = () => {
    const [activePolicyModal, setActivePolicyModal] = useState<'house_rules' | 'cancellation' | 'quick_facts' | 'things_to_do' | 'faqs' | null>(null);

    // FAQ specific state
    const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
    const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');

    const renderHouseRulesModal = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Check-in / Check-out Header Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>Check-in</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>After 1:00 PM</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>Check-out</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>Before 10:00 AM</div>
                </div>
            </div>

            <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🍕</span>
                    <span>Outside food is allowed.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🍳</span>
                    <span>Guests are not allowed to access the kitchen except for infants with prior permission.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🚫</span>
                    <span>Guests cannot invite other guests and day visitors during their stay.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🎉</span>
                    <span>Bachelor groups &amp; stag parties are not allowed. We do not encourage parties and late-night revelry. Loud music is not permitted beyond 10 pm.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🍷</span>
                    <span>Consumption of alcohol is permitted only within limits.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>⚖️</span>
                    <span>Illegal activities including but not limited to carrying/consuming drugs/narcotics and carrying firearms/weapons are prohibited on the property. Management reserves the right to report any such activities to local authorities.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🚬</span>
                    <span>Guests are prohibited from smoking and setting up hookahs in the rooms/villa/lawns.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🏊‍♂️</span>
                    <span>The pool (if present) is unguarded. There is no lifeguard on site. Children in the pool must be accompanied by adults at all times.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🧳</span>
                    <span>Guests are requested to take care of all personal valuables. Management is not responsible for loss, theft or damage to any items.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🪪</span>
                    <span>As required by law, every guest above 4 years must carry government-approved photo ID proof, that shows address. We accept only Aadhar Cards, Driving Licenses and Passports.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>⚠️</span>
                    <span>Inappropriate behaviour or violation of any of the above House Rules will invite a polite refusal to accept a Booking. If already checked in, Management reserves the right to ask guests to leave.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🎆</span>
                    <span>No crackers or colours are permitted in this home.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>💳</span>
                    <span>All payments for booking the villa, including meals will have to be pre-paid prior to checkin. Security Deposit collected during booking will be returned during check-out or by NEFT within 5 business days after check-out, provided no damages are observed. To avoid inconvenience, we will not be accepting cash onsite for any reasons henceforth.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>🔒</span>
                    <span>Security deposit is to be paid two days prior to check-in. If no damages are observed, the deposit will be returned during check-out itself or by NEFT within 5 business days after check-out. Please Note: The Security Deposit is subject to change depending upon the number of nights and the group size. Please check with your holiday advisor at the time of booking.</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span>💒</span>
                    <span>In case of special occasions like wedding and pre wedding ceremonies, milestone celebrations and events, and similar such events that require the parts or entire estate, whether they require elaborate arrangements or not, are at the sole discretion and explicit permission of the management. These need to be informed at the time of booking, and additional venue charges, additional deposits and charges for time efforts and specialised skills needed for prior arrangements and post event cleanup will apply.</span>
                </div>
                <div style={{ background: '#fef3c7', border: '1.5px solid #d4af37', padding: '12px 16px', borderRadius: '10px', fontWeight: 700, color: '#92400e', marginTop: '6px' }}>
                    💰 Security Deposit: ₹ 3000 per room.
                </div>
            </div>
        </div>
    );

    const renderCancellationModal = () => (
        <div style={{ fontSize: '14px', color: '#334155', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '12px 16px', borderRadius: '10px', color: '#166534' }}>
                🟢 <strong>Full Refund (21+ Days):</strong> If booking is cancelled 21 days before checkin date, guests are entitled to a full refund.
            </div>
            <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '12px 16px', borderRadius: '10px', color: '#856404' }}>
                🟡 <strong>50% Refund (21–11 Days):</strong> 50% refund if cancelled between 21-11 days before checkin date.
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '10px', color: '#991b1b' }}>
                🔴 <strong>No Refund (&lt;11 Days):</strong> Any cancellations made less than 11 days before your checkin date, would not be refunded.
            </div>

            <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>A nominal cancellation fee (5%) is charged for processing the refund. While, refund in travel credits have no processing fee.</li>
                <li>Refunds for cancellations would only be processed in the form of travel credits if any amount of travel credits is utilised for booking.</li>
                <li>If any non cancellable coupon is used while booking, all cancellation policies are overridden. The guest is not entitled to any refund while rescheduling is possible*</li>
                <li>
                    <strong>Peak Dates Restriction:</strong> Cancellation for peak dates, including Independence Day (14th–15th August 2026), Diwali (6th–10th November 2026), Christmas &amp; New Year (24th December 2026–2nd January 2027), Republic Day (26th January 2027), and Holi (20th–22nd March 2027), will not be accepted.
                </li>
                <li>In case of extreme last-minute cancellations due to extenuating circumstances, Guests will be refunded 85% of booking amount if SaffronStays gets another booking for the same date(s). If not, Guests will not be given a refund, and the cancellation will be treated as a no-show.</li>
                <li>If the Guest has made a partial payment, they are entitled to no refund whatsoever.</li>
            </ul>
        </div>
    );

    const renderQuickFactsModal = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#334155' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                🪪 All the guests must provide a government approved ID proof before check-in.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                💵 Security deposit of INR 5000/- per room must be paid online, 48 hours before check-in or in cash to the caretaker before check-in.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                👨‍💼 The caretaker will be available at the villa from 8 AM to 10 PM. Any services needed beyond these hours are chargeable at INR 500/- per hour
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                ⚡ The home is in a rural area of Maharashtra, powered by MSEB. In case of disruption due to fluctuation, we have a genset which burns out beyond 6 hours of usage. So, it will be turned off after every 2 hours for 30 minutes in order for it to be used throughout the day.
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}>
                🌐 Considering the unique location of the villa, Internet connectivity can get affected due to falling of trees, heavy rains or other causes
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', borderRadius: '10px', color: '#991b1b', fontWeight: 600 }}>
                ❄️ AC is not available at the property.
            </div>
        </div>
    );

    const renderThingsToDoModal = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#334155' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🏞️</span>
                <span>Visit some of the popular scenic points like Charlotte Lake, Louisa Point, One Tree Hill Point, Matheran Observatory and Lord Nowroji Garden.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🪂</span>
                <span>For adventurous souls, there is paragliding and zip-lining.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🥾</span>
                <span>Since vehicles are banned, the pure air and verdant nature is perfect for some trekking.</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '24px' }}>🛍️</span>
                <span>Shop for leather products and chikkis at the local bazaar.</span>
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
                        placeholder="Search in FAQs"
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

    const policyItems = [
        { key: 'house_rules', title: 'House Rules', icon: '📄', render: renderHouseRulesModal },
        { key: 'cancellation', title: 'Cancellation Policy', icon: '⊗', render: renderCancellationModal },
        { key: 'quick_facts', title: 'Quick Facts', icon: 'ⓘ', render: renderQuickFactsModal },
        { key: 'things_to_do', title: 'Things To Do', icon: '🗺️', render: renderThingsToDoModal },
        { key: 'faqs', title: 'FAQs', icon: '❓', render: renderFaqsModal },
    ] as const;

    const currentActiveItem = policyItems.find(p => p.key === activePolicyModal);

    return (
        <section className="policies-section" id="policies" style={{ padding: '24px 0', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '18px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    Rules
                </h3>
            </div>

            {/* Grid of rounded rule card buttons with compact mobile responsive layout */}
            <div className="rules-cards-grid">
                {policyItems.map((item, idx) => (
                    <button
                        key={idx}
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
                                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
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
