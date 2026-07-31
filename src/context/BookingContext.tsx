import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelData, CartSlot, ThemeType, CurrencyType } from '../types';
import { fetchHotelDataFromApi } from '../services/api';
import { calculateNights } from '../utils/date';

interface BookingContextType {
    hotelSlug: string;
    hotelData: HotelData | null;
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
    currentView: 'main' | 'checkout' | 'payment' | 'event';
    setCurrentView: (v: 'main' | 'checkout' | 'payment' | 'event') => void;
    cartSlots: CartSlot[];
    unlockedPromos: Record<string, boolean>;
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
    const [currentView, setCurrentView] = useState<'main' | 'checkout' | 'payment' | 'event'>('main');
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
    const [unlockedPromos, setUnlockedPromos] = useState<Record<string, boolean>>({});
    const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

    // Initial Fetch
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('hSlug') || params.get('slug') || 'hotelxyz';
        setHotelSlug(slug);
        
        fetchHotelDataFromApi(slug).then(data => {
            setHotelData(data);
        });
    }, []);

    const togglePromoOffer = (roomId: number, planId: number) => {
        const key = `${roomId}_${planId}`;
        setUnlockedPromos(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const updateCartQuantity = (roomId: number, planId: number, delta: number) => {
        if (!hotelData || !hotelData.room_types) return;
        const room = hotelData.room_types.find(r => r.id === roomId);
        const plan = room?.rate_plans?.find(p => p.id === planId);
        if (!room || !plan) return;

        const currentMatching = cartSlots.filter(s => s.roomId === roomId && s.planId === planId);

        if (delta > 0) {
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
                basePricePerNight: plan.single_occupancy_price || room.starting_price || room.base_price || 2000,
                taxPerNight: plan.single_occupancy_tax || 100
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
                    extraAdultChargePerNight: extraAdultChargePerNight ?? 0,
                    extraChildChargePerNight: extraChildChargePerNight ?? 0,
                    totalExtraCharge: totalExtraCharge ?? 0
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
            const key = `${slot.roomId}_${slot.planId}`;
            const isUnlocked = unlockedPromos[key];
            let basePrice = (slot.basePricePerNight || 2000) * totalNights;
            if (isUnlocked) {
                basePrice = Math.round(basePrice * 0.86);
            }
            // Use stored extra charges if available (set via OccupancyModal)
            // Fall back to calculating from slot data for backward compat
            const extraFee = slot.totalExtraCharge != null
                ? slot.totalExtraCharge
                : (() => {
                    const extraAdults = Math.max(0, (slot.adults || 2) - 2);
                    return (extraAdults * 1000 + (slot.children || 0) * 500) * totalNights;
                })();
            const tax = (slot.taxPerNight || 100) * totalNights;
            total += (basePrice + extraFee + tax);
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
            cartSlots,
            unlockedPromos,
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
