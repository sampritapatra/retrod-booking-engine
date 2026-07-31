export type ThemeType = 'light' | 'default-white' | 'dark' | 'ocean' | 'forest' | 'peach';
export type CurrencyType = 'INR' | 'USD';
export type ViewType = 'main' | 'checkout' | 'payment' | 'event';

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
}

export interface RoomType {
    id: number;
    name: string;
    slug?: string;
    max_adults: number;
    max_children: number;
    bed_type: string;
    base_price: number;
    starting_price?: number;
    current_discount_percent?: number;
    is_active?: boolean;
    description: string;
    thumbnail_url: string;
    rate_plans?: RatePlan[];
    max_halls?: number;
}

export interface HotelData {
    id?: number;
    name: string;
    slug?: string;
    tagline?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    google_rating?: number;
    rating?: number;
    review_count?: number;
    logo_url?: string;
    map_embed_url?: string;
    images?: HotelImage[];
    gallery_images?: { url: string; caption: string }[];
    amenities?: Amenity[];
    nearby?: NearbyPlace[];
    room_types?: RoomType[];
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
    // Extra occupancy charges (set when occupancy exceeds room base capacity)
    extraAdults?: number;
    extraChildren?: number;
    extraAdultChargePerNight?: number;
    extraChildChargePerNight?: number;
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
