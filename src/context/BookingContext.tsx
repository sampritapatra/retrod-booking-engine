import React, { createContext, useContext, useState, useEffect } from 'react';
import { HotelData, GuestInfo, CartSlot } from '../types';
import { fetchHotelDataFromApi, SAMPLE_FALLBACK_HOTEL } from '../services/api';
import { calculatePlanPriceWithPromo } from '../utils/promo';

interface BookingContextType {
    hotelSlug: string;
    hotelData: HotelData | null;
    guestInfo: GuestInfo;
    setGuestInfo: React.Dispatch<React.SetStateAction<GuestInfo>>;
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;

    // Currency
    currency: string;
    setCurrency: (curr: string) => void;

    // Date Range
    checkInDate: Date;
    checkOutDate: Date;
    totalNights: number;
    setDateRange: (start: Date, end: Date) => void;

    // Occupancy
    totalRooms: number;
    totalAdults: number;
    totalChildren: number;
    updateGlobalOccupancy: (adults: number, children: number) => void;

    // Cart Management
    cartSlots: CartSlot[];
    addToCart: (roomId: string | number, planId: string | number, quantity?: number) => void;
    updateCartQuantity: (roomId: string | number, planId: string | number, delta: number) => void;
    removeCartSlot: (slotId: string) => void;
    updateSlotOccupancy: (
        slotId: string,
        adults: number,
        children: number,
        extraAdults?: number,
        extraChildren?: number,
        extraAdultUnitPrice?: number,
        extraChildUnitPrice?: number,
        totalExtraCharge?: number
    ) => void;
    clearCart: () => void;
    calculateGrandTotal: () => number;

    // Promos
    availablePromos: any[];
    getAppliedPromoForPlan: (roomId: string | number, planId: string | number) => any | null;
    setAppliedPromoForPlan: (roomId: string | number, planId: string | number, promo: any | null) => void;
    appliedDiscountPercent: number;
    setAppliedDiscountPercent: (pct: number) => void;

    // View Navigation
    currentView: 'main' | 'checkout' | 'payment' | 'payment-success' | 'event' | 'event-payment-success';
    setCurrentView: (view: 'main' | 'checkout' | 'payment' | 'payment-success' | 'event' | 'event-payment-success') => void;

    // Modals
    activeModal: string | null;
    modalData: any;
    modalParams: any;
    openModal: (modalName: string, roomId?: string | number, planId?: string | number, slotId?: string) => void;
    closeModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initial dates: Today -> Tomorrow
    const defaultCheckIn = new Date();
    defaultCheckIn.setHours(0, 0, 0, 0);
    const defaultCheckOut = new Date(defaultCheckIn);
    defaultCheckOut.setDate(defaultCheckOut.getDate() + 1);

    const [hotelSlug, setHotelSlug] = useState<string>('hotel-xyz');
    const [hotelData, setHotelData] = useState<HotelData | null>(SAMPLE_FALLBACK_HOTEL);
    const [currency, setCurrency] = useState<string>('INR');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const [checkInDate, setCheckInDate] = useState<Date>(defaultCheckIn);
    const [checkOutDate, setCheckOutDate] = useState<Date>(defaultCheckOut);
    const [totalNights, setTotalNights] = useState<number>(1);

    const [totalAdults, setTotalAdults] = useState<number>(2);
    const [totalChildren, setTotalChildren] = useState<number>(0);

    const [cartSlots, setCartSlots] = useState<CartSlot[]>([]);
    const [appliedPromosMap, setAppliedPromosMap] = useState<{ [key: string]: any }>({});
    const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);

    const [currentView, setCurrentView] = useState<'main' | 'checkout' | 'payment' | 'payment-success' | 'event' | 'event-payment-success'>('main');

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalData, setModalData] = useState<any>(null);

    const [guestInfo, setGuestInfo] = useState<GuestInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: '',
        estimatedArrivalTime: '14:00'
    });

    // Detect slug from URL query params or path
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const slugParam = params.get('hotel') || params.get('slug');
        if (slugParam) {
            setHotelSlug(slugParam);
        }
    }, []);

    // Load hotel details
    useEffect(() => {
        let isMounted = true;
        fetchHotelDataFromApi(hotelSlug)
            .then(data => {
                if (isMounted && data) {
                    setHotelData(data);
                }
            })
            .catch(err => {
                console.warn('Error fetching hotel data, using mock fallback', err);
            });
        return () => { isMounted = false; };
    }, [hotelSlug]);

    // Recalculate nights whenever dates change
    const setDateRange = (start: Date, end: Date) => {
        const s = new Date(start);
        s.setHours(0, 0, 0, 0);
        const e = new Date(end);
        e.setHours(0, 0, 0, 0);

        let diffTime = e.getTime() - s.getTime();
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) {
            diffDays = 1;
            e.setDate(s.getDate() + 1);
        }

        setCheckInDate(s);
        setCheckOutDate(e);
        setTotalNights(diffDays);
    };

    const updateGlobalOccupancy = (adults: number, children: number) => {
        setTotalAdults(adults);
        setTotalChildren(children);
    };

    // Promo helper
    const availablePromos = hotelData?.promos || [
        { code: 'LUXURY10', discount_type: 'percentage', discount_value: 10, title: 'Luxury 10% Off', description: 'Get 10% instant off on direct bookings' },
        { code: 'RETROD500', discount_type: 'fixed', discount_value: 500, title: 'Direct ₹500 Savings', description: 'Flat ₹500 off on any room plan' }
    ];

    const getAppliedPromoForPlan = (roomId: string | number, planId: string | number) => {
        const key = `${roomId}_${planId}`;
        return appliedPromosMap[key] || null;
    };

    const setAppliedPromoForPlan = (roomId: string | number, planId: string | number, promo: any | null) => {
        const key = `${roomId}_${planId}`;
        setAppliedPromosMap(prev => {
            if (!promo) {
                const next = { ...prev };
                delete next[key];
                return next;
            }
            return { ...prev, [key]: promo };
        });
    };

    // Cart slot helpers
    const addToCart = (roomId: string | number, planId: string | number, quantity: number = 1) => {
        const roomsList = hotelData?.rooms || (hotelData as any)?.room_types || [];
        const room = roomsList.find((r: any) => r.id.toString() === roomId.toString());
        if (!room) return;

        const ratePlans = room.rate_plans || [];
        const plan = ratePlans.find((p: any) => p.id.toString() === planId.toString()) || ratePlans[0];
        if (!plan) return;

        const basePrice = plan.single_occupancy_price || plan.price_per_night || room.base_price || room.starting_price || 2500;
        const promo = getAppliedPromoForPlan(roomId, plan.id);
        const promoRes = calculatePlanPriceWithPromo(basePrice, totalNights, promo);
        const discountPerNight = totalNights > 0 ? Math.round(promoRes.discountAmount / totalNights) : 0;

        const slotAdults = totalAdults || room.max_adults || 2;
        const slotChildren = totalChildren || 0;
        const baseIncAdults = room.base_included_adults ?? 2;
        const baseIncChildren = room.base_included_children ?? 1;
        const eAdults = Math.max(0, slotAdults - baseIncAdults);
        const eChildren = Math.max(0, slotChildren - baseIncChildren);
        const adultRate = plan.extra_adult_price ?? 700;
        const childRate = plan.extra_child_price ?? 500;
        const totalExtra = (eAdults * adultRate + eChildren * childRate) * totalNights;

        const newSlots: CartSlot[] = [];
        for (let i = 0; i < quantity; i++) {
            newSlots.push({
                slotId: `slot_${roomId}_${plan.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}_${i}`,
                roomId,
                roomName: room.name,
                planId: plan.id,
                planTitle: plan.title || plan.name || 'EP (Room Only)',
                adults: slotAdults,
                children: slotChildren,
                childAges: [],
                basePricePerNight: basePrice,
                taxPerNight: Math.round((promoRes.finalTotal / totalNights) * 0.05),
                appliedPromoCode: promo?.code,
                discountAmountPerNight: discountPerNight,
                totalDiscountAmount: promoRes.discountAmount,
                extraAdults: eAdults,
                extraChildren: eChildren,
                extraAdultPrice: adultRate,
                extraChildPrice: childRate,
                extraAdultChargePerNight: adultRate,
                extraChildChargePerNight: childRate,
                totalExtraCharge: totalExtra
            });
        }
        setCartSlots(prev => [...prev, ...newSlots]);
    };

    const updateCartQuantity = (roomId: string | number, planId: string | number, delta: number) => {
        const currentMatching = cartSlots.filter(s => s.roomId.toString() === roomId.toString() && s.planId.toString() === planId.toString());
        if (delta > 0) {
            const roomsList = hotelData?.rooms || (hotelData as any)?.room_types || [];
            const room = roomsList.find((r: any) => r.id.toString() === roomId.toString());
            if (!room) return;
            const ratePlans = room.rate_plans || [];
            const plan = ratePlans.find((p: any) => p.id.toString() === planId.toString()) || ratePlans[0];
            if (!plan) return;

            const basePrice = plan.single_occupancy_price || plan.price_per_night || room.base_price || room.starting_price || 2500;
            const promo = getAppliedPromoForPlan(roomId, plan.id);
            const promoRes = calculatePlanPriceWithPromo(basePrice, totalNights, promo);
            const discountPerNight = totalNights > 0 ? Math.round(promoRes.discountAmount / totalNights) : 0;

            const slotAdults = totalAdults || room.max_adults || 2;
            const slotChildren = totalChildren || 0;
            const baseIncAdults = room.base_included_adults ?? 2;
            const baseIncChildren = room.base_included_children ?? 1;
            const eAdults = Math.max(0, slotAdults - baseIncAdults);
            const eChildren = Math.max(0, slotChildren - baseIncChildren);
            const adultRate = plan.extra_adult_price ?? 700;
            const childRate = plan.extra_child_price ?? 500;
            const totalExtra = (eAdults * adultRate + eChildren * childRate) * totalNights;

            const newSlotId = `slot_${roomId}_${plan.id}_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
            const newSlot: CartSlot = {
                slotId: newSlotId,
                roomId,
                roomName: room.name,
                planId: plan.id,
                planTitle: plan.title || plan.name || 'EP (Room Only)',
                adults: slotAdults,
                children: slotChildren,
                childAges: [],
                basePricePerNight: basePrice,
                taxPerNight: Math.round((promoRes.finalTotal / totalNights) * 0.05),
                appliedPromoCode: promo?.code,
                discountAmountPerNight: discountPerNight,
                totalDiscountAmount: promoRes.discountAmount,
                extraAdults: eAdults,
                extraChildren: eChildren,
                extraAdultPrice: adultRate,
                extraChildPrice: childRate,
                extraAdultChargePerNight: adultRate,
                extraChildChargePerNight: childRate,
                totalExtraCharge: totalExtra
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
        extraAdultUnitPrice?: number,
        extraChildUnitPrice?: number,
        totalExtraCharge?: number
    ) => {
        setCartSlots(prev => prev.map(s => {
            if (s.slotId === slotId) {
                const adultRate = extraAdultUnitPrice ?? s.extraAdultPrice ?? 700;
                const childRate = extraChildUnitPrice ?? s.extraChildPrice ?? 500;
                const eAdults = extraAdults ?? Math.max(0, adults - 2);
                const eChildren = extraChildren ?? Math.max(0, children - 1);
                const calculatedExtra = (eAdults * adultRate + eChildren * childRate) * totalNights;

                return {
                    ...s,
                    adults,
                    children,
                    extraAdults: eAdults,
                    extraChildren: eChildren,
                    extraAdultPrice: adultRate,
                    extraChildPrice: childRate,
                    extraAdultChargePerNight: adultRate,
                    extraChildChargePerNight: childRate,
                    totalExtraCharge: totalExtraCharge ?? calculatedExtra
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

            const extraAdults = slot.extraAdults ?? Math.max(0, (slot.adults || 2) - 2);
            const extraChildren = slot.extraChildren ?? Math.max(0, (slot.children || 0) - 1);
            const adultRate = slot.extraAdultPrice ?? 700;
            const childRate = slot.extraChildPrice ?? 500;

            const extraAdultFee = extraAdults * adultRate * totalNights;
            const extraChildFee = extraChildren * childRate * totalNights;
            const extraFee = extraAdultFee + extraChildFee;

            const tax = Math.round((promoRes.finalTotal + extraFee) * 0.05);
            total += (promoRes.finalTotal + extraFee + tax);
        });

        if (appliedDiscountPercent > 0) {
            total = Math.round(total * (1 - appliedDiscountPercent / 100));
        }
        return total;
    };

    const openModal = (modalName: string, roomId?: string | number, planId?: string | number, slotId?: string) => {
        setActiveModal(modalName);
        setModalData({ roomId, planId, slotId });
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
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
            setDateRange,

            totalRooms: cartSlots.length,
            totalAdults,
            totalChildren,
            updateGlobalOccupancy,

            cartSlots,
            addToCart,
            updateCartQuantity,
            removeCartSlot,
            updateSlotOccupancy,
            clearCart,
            calculateGrandTotal,

            availablePromos,
            getAppliedPromoForPlan,
            setAppliedPromoForPlan,
            appliedDiscountPercent,
            setAppliedDiscountPercent,

            currentView,
            setCurrentView,

            activeModal,
            modalData,
            modalParams: modalData,
            openModal,
            closeModal
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
