import { HotelData } from '../types';

export const SAMPLE_FALLBACK_HOTEL: HotelData = {
    id: 1,
    name: 'Hotel XYZ',
    slug: 'hotelxyz',
    tagline: 'Experience Luxury & Comfort Redefined',
    description: 'Welcome to Hotel XYZ – a premier luxury business & resort hotel offering state-of-the-art accommodation, modern guest facilities, fine dining experiences, and personalized hospitality.',
    address: 'Plot No. 102, Retrod Tech Avenue, Business District, City Centre, Bhubaneswar, Odisha, 751001',
    phone: '+91 9876 543 210',
    email: 'stay@hotelxyz.com',
    whatsapp: '+919876543210',
    google_rating: 4.5,
    logo_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&auto=format&fit=crop',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1462410885145!2d85.82453987593674!3d20.29424751257404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d0b1b511%3A0x8e8eb496924d5218!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    facebook_url: '#',
    instagram_url: '#',
    twitter_url: '#',
    linkedin_url: '#',
    youtube_url: '#',
    images: [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&auto=format&fit=crop', caption: 'Hotel XYZ Main Exterior & Entrance' },
        { id: 2, image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&auto=format&fit=crop', caption: 'Grand Executive Lobby Lounge' },
        { id: 3, image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&auto=format&fit=crop', caption: 'Rooftop Swimming Pool & Spa' },
        { id: 4, image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1400&auto=format&fit=crop', caption: 'Deluxe Room Luxury Suite' }
    ],
    amenities: [
        { name: 'Free High Speed Wi-Fi', icon_name: 'wifi' },
        { name: 'Air Conditioning', icon_name: 'wind' },
        { name: 'Swimming Pool & Spa', icon_name: 'droplet' },
        { name: 'Multi-cuisine Restaurant', icon_name: 'utensils' },
        { name: '24/7 Room Service', icon_name: 'clock' },
        { name: 'Fitness Center / Gym', icon_name: 'activity' },
        { name: 'Hot & Cold Water', icon_name: 'thermometer' },
        { name: 'Smart Television', icon_name: 'tv' },
        { name: 'Airport Shuttle', icon_name: 'truck' },
        { name: 'EV Charging Station', icon_name: 'zap' }
    ],
    nearby: [
        { place_name: 'Bhubaneswar Railway Station', distance: '3.2 km' },
        { place_name: 'Biju Patnaik International Airport', distance: '5.8 km' },
        { place_name: 'Lingaraj Temple', distance: '6.5 km' },
        { place_name: 'Esplanade One Mall', distance: '2.1 km' }
    ],
    room_types: [
        {
            id: 1,
            name: 'Standard Room',
            slug: 'standard-room',
            max_adults: 2,
            max_children: 1,
            bed_type: 'Queen / Twin Bed',
            base_price: 2000,
            starting_price: 2000,
            description: 'Comfortable Standard Room accommodation ideal for solo travelers or couples. Features Queen/Twin Bed, complimentary high-speed Wi-Fi, daily housekeeping, tea/coffee maker, complimentary bottled water, LED TV, and air conditioning.',
            thumbnail_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 101,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Comfortable Standard Room accommodation|Queen/Twin Bed|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|LED TV & Air Conditioning||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 2000,
                    single_occupancy_tax: 100.00
                },
                {
                    id: 102,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Standard Room accommodation|Complimentary Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|LED TV & Air Conditioning||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 2400,
                    single_occupancy_tax: 120.00
                },
                {
                    id: 103,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Standard Room accommodation|Breakfast Included|One Meal (Lunch or Dinner)|Complimentary Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 3100,
                    single_occupancy_tax: 155.00
                },
                {
                    id: 104,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Standard Room accommodation|Breakfast Included|Lunch Included|Dinner Included|Complimentary Wi-Fi|Daily Housekeeping|Tea/Coffee Maker||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 3800,
                    single_occupancy_tax: 190.00
                }
            ]
        },
        {
            id: 2,
            name: 'Superior Room',
            slug: 'superior-room',
            max_adults: 2,
            max_children: 1,
            bed_type: 'King Bed',
            base_price: 2800,
            starting_price: 2800,
            description: 'Spacious Superior Room featuring a premium King Bed, enhanced room size, city/garden view (subject to availability), mini fridge, complimentary high-speed Wi-Fi, daily housekeeping, and tea/coffee maker.',
            thumbnail_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 201,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Spacious Superior Room|Premium Queen/King Bed|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|City/Garden View (subject to availability)||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 2800,
                    single_occupancy_tax: 140.00
                },
                {
                    id: 202,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Spacious Superior Room|Premium Queen/King Bed|Complimentary Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|City/Garden View (subject to availability)||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 3300,
                    single_occupancy_tax: 165.00
                },
                {
                    id: 203,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Spacious Superior Room|Premium Queen/King Bed|Breakfast Included|One Meal (Lunch or Dinner)|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|City/Garden View (subject to availability)||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 4000,
                    single_occupancy_tax: 200.00
                },
                {
                    id: 204,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Spacious Superior Room|Premium Queen/King Bed|Breakfast Included|Lunch Included|Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|City/Garden View (subject to availability)||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 4700,
                    single_occupancy_tax: 235.00
                }
            ]
        },
        {
            id: 3,
            name: 'Deluxe Room',
            slug: 'deluxe-room',
            max_adults: 3,
            max_children: 2,
            bed_type: 'King Bed',
            base_price: 3200,
            starting_price: 3200,
            description: 'Elegant Deluxe Room featuring a King Bed, comfortable seating area, premium bathroom amenities, and complimentary high-speed Wi-Fi. Perfect for guests seeking enhanced comfort with premium interiors and daily housekeeping.',
            thumbnail_url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 301,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Elegant Deluxe Room|King Bed|Comfortable Seating Area|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Premium Bathroom Amenities|Tea/Coffee Maker|Complimentary Bottled Water||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 3200,
                    single_occupancy_tax: 160.00
                },
                {
                    id: 302,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Elegant Deluxe Room|King Bed|Comfortable Seating Area|Complimentary Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Premium Bathroom Amenities|Tea/Coffee Maker|Complimentary Bottled Water||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 3700,
                    single_occupancy_tax: 185.00
                },
                {
                    id: 303,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Elegant Deluxe Room|King Bed|Comfortable Seating Area|Breakfast Included|Lunch or Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Premium Bathroom Amenities|Tea/Coffee Maker||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 4500,
                    single_occupancy_tax: 225.00
                },
                {
                    id: 304,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Elegant Deluxe Room|King Bed|Comfortable Seating Area|Breakfast Included|Lunch Included|Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Premium Bathroom Amenities|Tea/Coffee Maker||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 5200,
                    single_occupancy_tax: 260.00
                }
            ]
        },
        {
            id: 4,
            name: 'Junior Suite',
            slug: 'junior-suite',
            max_adults: 3,
            max_children: 2,
            bed_type: 'King Bed + Sitting Area',
            base_price: 4200,
            starting_price: 4200,
            description: 'Spacious Junior Suite with a separate sitting area, King Bed, premium toiletries, Smart TV, complimentary high-speed Wi-Fi, daily housekeeping, and tea/coffee maker. Ideal for families and guests seeking additional space and comfort.',
            thumbnail_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 401,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Spacious Junior Suite|Separate Sitting Area|King Bed|Premium Toiletries|Smart TV|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 4200,
                    single_occupancy_tax: 210.00
                },
                {
                    id: 402,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Spacious Junior Suite|Separate Sitting Area|King Bed|Premium Toiletries|Smart TV|Complimentary Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 4800,
                    single_occupancy_tax: 240.00
                },
                {
                    id: 403,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Spacious Junior Suite|Separate Sitting Area|King Bed|Premium Toiletries|Smart TV|Breakfast Included|Lunch or Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 5600,
                    single_occupancy_tax: 280.00
                },
                {
                    id: 404,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Spacious Junior Suite|Separate Sitting Area|King Bed|Premium Toiletries|Smart TV|Breakfast Included|Lunch Included|Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 6400,
                    single_occupancy_tax: 320.00
                }
            ]
        },
        {
            id: 5,
            name: 'Executive Suite',
            slug: 'executive-suite',
            max_adults: 4,
            max_children: 2,
            bed_type: 'King Bed + Sofa Bed',
            base_price: 5500,
            starting_price: 5500,
            description: 'Luxurious Executive Suite featuring a separate living room, King Bed, premium bathroom amenities, work desk, Smart TV, complimentary high-speed Wi-Fi, daily housekeeping, tea/coffee maker, and a complimentary welcome drink on arrival.',
            thumbnail_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 501,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Luxurious Executive Suite|Separate Living Room|King Bed|Premium Bathroom Amenities|Work Desk|Smart TV|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|Welcome Drink on Arrival||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 5500,
                    single_occupancy_tax: 275.00
                },
                {
                    id: 502,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Luxurious Executive Suite|Separate Living Room|King Bed|Premium Bathroom Amenities|Work Desk|Smart TV|Complimentary Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Complimentary Bottled Water|Welcome Drink on Arrival||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 6100,
                    single_occupancy_tax: 305.00
                },
                {
                    id: 503,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Luxurious Executive Suite|Separate Living Room|King Bed|Premium Bathroom Amenities|Work Desk|Smart TV|Breakfast Included|Lunch or Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Welcome Drink on Arrival||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 7000,
                    single_occupancy_tax: 350.00
                },
                {
                    id: 504,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Luxurious Executive Suite|Separate Living Room|King Bed|Premium Bathroom Amenities|Work Desk|Smart TV|Breakfast Included|Lunch Included|Dinner Included|Complimentary High-Speed Wi-Fi|Daily Housekeeping|Tea/Coffee Maker|Welcome Drink on Arrival||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 7800,
                    single_occupancy_tax: 390.00
                }
            ]
        },
        {
            id: 6,
            name: 'Banquet Hall / Event Hall',
            slug: 'banquet-hall',
            max_adults: 500,
            max_children: 0,
            bed_type: 'Custom Setup',
            base_price: 25000,
            starting_price: 25000,
            max_halls: 3,
            description: 'A grand hall ideal for weddings, conferences, and large social events. Accommodates up to 500 guests with state-of-the-art audio-visual equipment, central air conditioning, and customizable seating.',
            thumbnail_url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 601,
                    title: 'Banquet Venue Rental Only',
                    description: 'INCLUSIONS|Grand Banquet Hall / Event Venue|Capacity: Up to 500 Guests|State-of-the-Art Audio-Visual Equipment|Central Air Conditioning|Customizable Seating Arrangement|Dedicated Event Manager|Basic Stage & Podium Setup||MEALS|Catering & Meals: Not Included (Available on Request)||CANCELLATION|Free cancellation up to 72 hours before the event date.',
                    single_occupancy_price: 25000,
                    single_occupancy_tax: 4500.00
                }
            ]
        }
    ]
};

export async function fetchHotelDataFromApi(slug: string): Promise<HotelData> {
    try {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? `http://localhost:8000/api/v1/hotels/${slug}/`
            : `/api/v1/hotels/${slug}/`;

        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.success && data.hotel) {
            return data.hotel;
        }
    } catch (err) {
        console.warn('API connection notice (using stored/fallback sample room data):', err);
    }
    return SAMPLE_FALLBACK_HOTEL;
}

export async function submitEventRequestApi(payload: any) {
    try {
        const res = await fetch('/api/v1/event-requests/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export const submitMeetingWeddingRequestApi = submitEventRequestApi;


export async function submitRestaurantRequestApi(payload: any) {
    try {
        const res = await fetch('/api/v1/restaurant-requests/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function lookupBookingsApi(emailOrRef: string) {
    try {
        const res = await fetch(`/api/v1/bookings/${emailOrRef}/`);
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export const fetchBookingByReferenceApi = lookupBookingsApi;

export async function submitBookingPaymentApi(payload: any) {
    try {
        const res = await fetch('/api/v1/bookings/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
