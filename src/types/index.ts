export type ThemeType = 'light' | 'default-white' | 'dark' | 'ocean' | 'forest' | 'peach';
export type CurrencyType = 'INR' | 'USD';
export type ViewType = 'main' | 'checkout' | 'payment' | 'payment-success' | 'event';

export interface HotelImage {
    id?: number;
    image_url: string;
    caption: string;
}

export interface Amenity {
    id?: number;
    name: string;
    icon_name: string;
}

export interface NearbyPlace {
    place_name: string;
    distance: string;
}

export interface RatePlan {
    id: number;
    title: string;
    description: string;
    single_occupancy_price: number;
    single_occupancy_tax: number;
    double_occupancy_price?: number;
    double_occupancy_tax?: number;
    extra_adult_price?: number;
    extra_child_price?: number;
}

export interface RoomType {
    id: number;
    name: string;
    slug?: string;
    base_included_adults?: number;
    base_included_children?: number;
    max_adults: number;
    max_children: number;
    bed_type: string;
    base_price: number;
    starting_price?: number;
    current_discount_percent?: number;
    is_active?: boolean;
    description: string;
    thumbnail_url: string;
    images?: { id?: number; image_url: string; caption?: string }[];
    amenities?: string[];
    rate_plans?: RatePlan[];
    max_halls?: number;
    available_rooms?: number;
}

export interface PromoCodeItem {
    id?: number;
    code: string;
    discount_type?: string;
    discountType?: string;
    discount_value?: number | string;
    discountValue?: number | string;
    min_nights?: number;
    minNights?: number;
    description?: string;
    is_active?: boolean;
    isActive?: boolean;
    valid_from?: string;
    valid_to?: string;
}

export interface PolicyItem {
    id?: number;
    policy_type: string;
    title: string;
    content: string;
    sort_order?: number;
}

export interface AddonPackage {
    id?: number | string;
    name: string;
    category?: string;
    charge_type?: string;
    chargeType?: string;
    price: number;
    tax_pct?: number;
    taxPct?: number;
    is_active?: boolean;
    isActive?: boolean;
}

export interface PaymentGatewayItem {
    id?: number | string;
    provider: string;
    key_id?: string;
    keyId?: string;
    key_secret?: string;
    keySecret?: string;
    sandbox?: boolean;
    enabled?: boolean;
    pay_at_hotel?: boolean;
    payAtHotel?: boolean;
    deposit_pct?: number;
    depositPct?: number;
}

export interface HotelData {
    id?: number;
    name: string;
    slug?: string;
    page_title?: string;
    theme_color?: string;
    what_makes_special?: string;
    backstory?: string;
    tagline?: string;
    description?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    check_in_time?: string;
    check_out_time?: string;
    google_rating?: number;
    rating?: number;
    review_count?: number;
    logo_url?: string;
    hero_banner_url?: string;
    map_embed_url?: string;
    images?: HotelImage[];
    gallery_images?: { url: string; caption: string }[];
    amenities?: Amenity[];
    nearby?: NearbyPlace[];
    room_types?: RoomType[];
    promo_codes?: PromoCodeItem[];
    addons?: AddonPackage[];
    payment_gateways?: PaymentGatewayItem[];
    policies?: PolicyItem[];
    reviews?: Array<{
        id?: number;
        author: string;
        avatar_letter?: string;
        avatar_url?: string;
        rating: number;
        date: string;
        comment: string;
        source: string;
    }>;
    enable_google_reviews?: boolean;
    short_description?: string;
    booking_engine_settings?: Record<string, any>;
    facebook_url?: string;
    instagram_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
    youtube_url?: string;
}

export interface CartSlot {
    slotId: string;
    roomId: number;
    roomName: string;
    planId: number;
    planTitle: string;
    adults: number;
    children: number;
    childAges: number[];
    basePricePerNight: number;
    taxPerNight: number;
    appliedPromoCode?: string;
    discountAmountPerNight?: number;
    totalDiscountAmount?: number;
    // Extra occupancy charges (set when occupancy exceeds room base capacity)
    extraAdults?: number;
    extraChildren?: number;
    extraAdultChargePerNight?: number;
    extraChildChargePerNight?: number;
    extraAdultPrice?: number;
    extraChildPrice?: number;
    totalExtraCharge?: number;
}

export interface BookingLookupItem {
    booking_reference: string;
    guest: {
        full_name: string;
        phone: string;
        email: string;
    };
    room_name: string;
    rate_plan_title: string;
    check_in: string;
    check_out: string;
    total_nights: number;
    grand_total: number;
}
