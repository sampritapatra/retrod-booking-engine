import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelData, CartSlot, ThemeType, CurrencyType, PromoCodeItem } from '../types';
import { fetchHotelDataFromApi } from '../services/api';
import { calculateNights } from '../utils/date';
import { calculatePlanPriceWithPromo } from '../utils/promo';

export interface GuestInfo {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    purpose?: 'LEISURE' | 'BUSINESS';
    companyName?: string;
    gstNumber?: string;
}

interface BookingContextType {
    hotelSlug: string;
    hotelData: HotelData | null;
    guestInfo: GuestInfo | null;
    setGuestInfo: (info: GuestInfo) => void;
    theme: ThemeType;
    setTheme: (t: ThemeType) => void;

    currency: CurrencyType;
    setCurrency: (c: CurrencyType) => void;
    checkInDate: Date;
    checkOutDate: Date;
    totalNights: number;
    setCheckInDate: (d: Date) => void;
    setCheckOutDate: (d: Date) => void;
    setDateRange: (start: Date, end: Date) => void;
    totalAdults: number;
    totalChildren: number;
    updateGlobalOccupancy: (adults: number, children: number) => void;
    currentView: 'main' | 'checkout' | 'payment' | 'payment-success' | 'event';
    setCurrentView: (v: 'main' | 'checkout' | 'payment' | 'payment-success' | 'event') => void;
    lastBookingRef: string;
    setLastBookingRef: (ref: string) => void;
    cartSlots: CartSlot[];
    unlockedPromos: Record<string, boolean>;
    appliedPlanPromos: Record<string, PromoCodeItem | null>;
    applyPromoToPlan: (roomId: number, planId: number, promo: PromoCodeItem | null) => void;
    getAppliedPromoForPlan: (roomId: number, planId: number) => PromoCodeItem | null;
    togglePromoOffer: (roomId: number, planId: number) => void;
    updateCartQuantity: (roomId: number, planId: number, delta: number) => void;
    removeCartSlot: (slotId: string) => void;
    updateSlotOccupancy: (slotId: string, adults: number, children: number, extraAdults?: number, extraChildren?: number, extraAdultChargePerNight?: number, extraChildChargePerNight?: number, totalExtraCharge?: number) => void;
    clearCart: () => void;
    calculateGrandTotal: () => number;
    activeModal: string | null;
    modalParams: { roomId?: number; planId?: number; slotId?: string };
    openModal: (modalName: string, roomId?: number, planId?: number, slotId?: string) => void;
    closeModal: () => void;
    appliedDiscountPercent: number;
    setAppliedDiscountPercent: (pct: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hotelSlug, setHotelSlug] = useState<string>('hotelxyz');
    const [hotelData, setHotelData] = useState<HotelData | null>(null);
    const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

    // Theme state

    const [theme, setThemeState] = useState<ThemeType>(() => {
        const saved = localStorage.getItem('retrod_theme');
        return (saved as ThemeType) || 'light';
    });

    const setTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem('retrod_theme', newTheme);
        document.body.className = '';
        if (newTheme === 'dark') document.body.classList.add('dark-theme');
        else if (newTheme === 'ocean') document.body.classList.add('theme-ocean');
        else if (newTheme === 'forest') document.body.classList.add('theme-forest');
        else if (newTheme === 'peach') document.body.classList.add('theme-peach');
        else if (newTheme === 'default-white') document.body.classList.add('theme-default-white');
    };

    useEffect(() => {
        setTheme(theme);
    }, []);

    // Currency state
    const [currency, setCurrency] = useState<CurrencyType>('INR');

    // Dates state
    const today = new Date();
    const tomorrow = new Date(Date.now() + 86400000);
    const [checkInDate, setCheckInDateState] = useState<Date>(today);
    const [checkOutDate, setCheckOutDateState] = useState<Date>(tomorrow);
    const [totalNights, setTotalNights] = useState<number>(1);

    const setCheckInDate = (d: Date) => {
        setCheckInDateState(d);
        setTotalNights(calculateNights(d, checkOutDate));
    };

    const setCheckOutDate = (d: Date) => {
        setCheckOutDateState(d);
        setTotalNights(calculateNights(checkInDate, d));
    };

    const setDateRange = (start: Date, end: Date) => {
        setCheckInDateState(start);
        setCheckOutDateState(end);
        setTotalNights(calculateNights(start, end));
    };

    // Occupancy global state
    const [totalAdults, setTotalAdults] = useState<number>(2);
    const [totalChildren, setTotalChildren] = useState<number>(0);

    const updateGlobalOccupancy = (adults: number, children: number) => {
        setTotalAdults(adults);
        setTotalChildren(children);
    };

    // Views & Modals state
    const [currentView, setCurrentView] = useState<'main' | 'checkout' | 'payment' | 'payment-success' | 'event'>('main');
    const [lastBookingRef, setLastBookingRef] = useState<string>('');
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalParams, setModalParams] = useState<{ roomId?: number; planId?: number; slotId?: string }>({});

    const openModal = (modalName: string, roomId?: number, planId?: number, slotId?: string) => {
        setActiveModal(modalName);
        setModalParams({ roomId, planId, slotId });
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalParams({});
    };

    // Cart & Promo state
    const [cartSlots, setCartSlots] = useState<CartSlot[]>([]);
    const [appliedPlanPromos, setAppliedPlanPromos] = useState<Record<string, PromoCodeItem | null>>({});
    const [unlockedPromos, setUnlockedPromos] = useState<Record<string, boolean>>({});
    const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

    // Initial Fetch with flexible URL path, query param, and subdomain slug resolution
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        let slug = params.get('hSlug') || params.get('slug');

        if (!slug) {
            const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
            if (pathname && pathname !== 'index.html') {
                slug = pathname;
            }
        }

        if (!slug) {
            const host = window.location.hostname;
            const parts = host.split('.');
            if (parts.length >= 3 && !['www', 'localhost', '127'].includes(parts[0].toLowerCase())) {
                slug = parts[0].toLowerCase();
            }
        }

        const resolvedSlug = (slug || 'retrod').toLowerCase().trim();
        setHotelSlug(resolvedSlug);

        fetchHotelDataFromApi(resolvedSlug).then(data => {
            setHotelData(data);
            if (data && data.name) {
                document.title = `${data.name} - Official Booking Engine`;
            }
        });
    }, []);

    useEffect(() => {
        if (hotelData) {
            document.title = hotelData.page_title || `${hotelData.name} - Official Booking Engine`;
            if (hotelData.theme_color) {
                document.documentElement.style.setProperty('--primary-color', hotelData.theme_color);
                document.documentElement.style.setProperty('--brand-color', hotelData.theme_color);
            }
        }
    }, [hotelData]);

    const applyPromoToPlan = (roomId: number, planId: number, promo: PromoCodeItem | null) => {
        const key = `${roomId}_${planId}`;
        const newPromo = (appliedPlanPromos[key] && appliedPlanPromos[key]?.code === promo?.code) ? null : promo;

        setAppliedPlanPromos(prev => {
            if (newPromo === null) {
                const next = { ...prev };
                delete next[key];
                return next;
            }
            return {
                ...prev,
                [key]: newPromo
            };
        });

        setUnlockedPromos(prev => {
            if (newPromo === null) {
                const next = { ...prev };
                delete next[key];
                return next;
            }
            return {
                ...prev,
                [key]: true
            };
        });

        // Update active cart slots for this room & plan
        setCartSlots(prev => prev.map(s => {
            if (s.roomId === roomId && s.planId === planId) {
                const promoRes = calculatePlanPriceWithPromo(s.basePricePerNight, totalNights, newPromo);
                const discountPerNight = totalNights > 0 ? Math.round(promoRes.discountAmount / totalNights) : 0;
                return {
                    ...s,
                    appliedPromoCode: newPromo?.code,
                    discountAmountPerNight: discountPerNight,
                    totalDiscountAmount: promoRes.discountAmount
                };
            }
            return s;
        }));
    };

    const getAppliedPromoForPlan = (roomId: number, planId: number): PromoCodeItem | null => {
        const key = `${roomId}_${planId}`;
        return appliedPlanPromos[key] || null;
    };

    const togglePromoOffer = (roomId: number, planId: number) => {
        const key = `${roomId}_${planId}`;
        const existing = appliedPlanPromos[key];
        if (existing) {
            applyPromoToPlan(roomId, planId, null);
        } else {
            // Find hotel's first active promo code
            const hotelPromos = (hotelData?.promo_codes || []).filter(p => p.isActive !== false && p.is_active !== false);
            const defaultPromo = hotelPromos[0] || { code: 'EXCLUSIVE14', discountType: 'percentage', discountValue: 14, minNights: 1 };
            applyPromoToPlan(roomId, planId, defaultPromo);
        }
    };

    const updateCartQuantity = (roomId: number, planId: number, delta: number) => {
        if (!hotelData || !hotelData.room_types) return;
        const room = hotelData.room_types.find(r => r.id === roomId);
        const plan = room?.rate_plans?.find(p => p.id === planId);
        if (!room || !plan) return;

        const currentMatching = cartSlots.filter(s => s.roomId === roomId && s.planId === planId);

        if (delta > 0) {
            const promo = getAppliedPromoForPlan(roomId, planId);
            const basePrice = plan.single_occupancy_price || room.starting_price || room.base_price || 2000;
            const promoRes = calculatePlanPriceWithPromo(basePrice, totalNights, promo);
            const discountPerNight = totalNights > 0 ? Math.round(promoRes.discountAmount / totalNights) : 0;

            const newSlotId = `slot_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
            const newSlot: CartSlot = {
                slotId: newSlotId,
                roomId,
                roomName: room.name,
                planId,
                planTitle: plan.title,
                adults: totalAdults || room.max_adults || 2,
                children: totalChildren || 0,
                childAges: [],
                basePricePerNight: basePrice,
                taxPerNight: plan.single_occupancy_tax || Math.round((promoRes.finalTotal / totalNights) * 0.05),
                appliedPromoCode: promo?.code,
                discountAmountPerNight: discountPerNight,
                totalDiscountAmount: promoRes.discountAmount,
                extraAdultPrice: plan.extra_adult_price ?? 700,
                extraChildPrice: plan.extra_child_price ?? 500,
            };
            setCartSlots(prev => [...prev, newSlot]);
        } else if (delta < 0 && currentMatching.length > 0) {
            const slotToRemove = currentMatching[currentMatching.length - 1];
            setCartSlots(prev => prev.filter(s => s.slotId !== slotToRemove.slotId));
        }
    };

    const removeCartSlot = (slotId: string) => {
        setCartSlots(prev => prev.filter(s => s.slotId !== slotId));
    };

    const updateSlotOccupancy = (
        slotId: string,
        adults: number,
        children: number,
        extraAdults?: number,
        extraChildren?: number,
        extraAdultChargePerNight?: number,
        extraChildChargePerNight?: number,
        totalExtraCharge?: number
    ) => {
        setCartSlots(prev => prev.map(s => {
            if (s.slotId === slotId) {
                return {
                    ...s,
                    adults,
                    children,
                    extraAdults: extraAdults ?? 0,
                    extraChildren: extraChildren ?? 0,
                    extraAdultChargePerNight: extraAdultChargePerNight ?? s.extraAdultPrice ?? 700,
                    extraChildChargePerNight: extraChildChargePerNight ?? s.extraChildPrice ?? 500,
                    totalExtraCharge
                };
            }
            return s;
        }));
    };

    const clearCart = () => {
        setCartSlots([]);
    };

    const calculateGrandTotal = () => {
        let total = 0;
        cartSlots.forEach((slot: any) => {
            const promo = getAppliedPromoForPlan(slot.roomId, slot.planId);
            const basePrice = slot.basePricePerNight || 2000;
            const promoRes = calculatePlanPriceWithPromo(basePrice, totalNights, promo);

            const extraFee = slot.totalExtraCharge != null
                ? slot.totalExtraCharge
                : (() => {
                    const extraAdults = Math.max(0, (slot.adults || 2) - 2);
                    const adultRate = slot.extraAdultPrice ?? 700;
                    const childRate = slot.extraChildPrice ?? 500;
                    return (extraAdults * adultRate + (slot.children || 0) * childRate) * totalNights;
                })();
            const tax = Math.round(promoRes.finalTotal * 0.05);
            total += (promoRes.finalTotal + extraFee + tax);
        });

        if (appliedDiscountPercent > 0) {
            total = Math.round(total * (1 - appliedDiscountPercent / 100));
        }
        return total;
    };

    return (
        <BookingContext.Provider value={{
            hotelSlug,
            hotelData,
            guestInfo,
            setGuestInfo,
            theme,
            setTheme,

            currency,
            setCurrency,
            checkInDate,
            checkOutDate,
            totalNights,
            setCheckInDate,
            setCheckOutDate,
            setDateRange,
            totalAdults,
            totalChildren,
            updateGlobalOccupancy,
            currentView,
            setCurrentView,
            lastBookingRef,
            setLastBookingRef,
            cartSlots,
            unlockedPromos,
            appliedPlanPromos,
            applyPromoToPlan,
            getAppliedPromoForPlan,
            togglePromoOffer,
            updateCartQuantity,
            removeCartSlot,
            updateSlotOccupancy,
            clearCart,
            calculateGrandTotal,
            activeModal,
            modalParams,
            openModal,
            closeModal,
            appliedDiscountPercent,
            setAppliedDiscountPercent
        }}>
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};
