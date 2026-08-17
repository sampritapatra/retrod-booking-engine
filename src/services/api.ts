import { HotelData } from '../types';

export const SAMPLE_FALLBACK_HOTEL: HotelData = {
    id: 1,
    name: 'Retrod',
    slug: 'retrod',
    tagline: 'Experience Luxury & Comfort Redefined',
    description: 'Welcome to Retrod – a premier luxury business & resort hotel offering state-of-the-art accommodation, modern guest facilities, fine dining experiences, and personalized hospitality.',
    address: 'Plot No. 512, Retrod, Bomikhal, Bhubaneswar, Odisha, 751001',
    phone: '9999999999',
    email: 'support@retrod.in',
    whatsapp: '9999999999',
    google_rating: 4.8,
    logo_url: '/retrod-logo.png',
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1462410885145!2d85.82453987593674!3d20.29424751257404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d0b1b511%3A0x8e8eb496924d5218!2sBhubaneswar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    facebook_url: '#',
    instagram_url: '#',
    twitter_url: '#',
    linkedin_url: '#',
    youtube_url: '#',
    images: [
        { id: 1, image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&auto=format&fit=crop', caption: 'Retrod Main Exterior & Entrance' },
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
            id: 5,
            name: 'Executive Suite',
            slug: 'executive-suite-luxury',
            max_adults: 4,
            max_children: 2,
            bed_type: 'King Bed + Private Lounge',
            base_price: 7500,
            starting_price: 7500,
            description: 'Ultra-luxurious Executive Suite featuring a grand master bedroom, separate living area, work space, luxury bathroom, personal butler service, and premium amenities.',
            thumbnail_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500&auto=format&fit=crop',
            rate_plans: [
                {
                    id: 551,
                    title: 'EP (Room Only)',
                    description: 'INCLUSIONS|Ultra-luxurious Executive Suite|Grand Master Bedroom|Separate Living Area|Personal Butler Service|Complimentary High-Speed Wi-Fi|Daily Housekeeping||MEALS|Breakfast: Not Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 7500,
                    single_occupancy_tax: 375.00
                },
                {
                    id: 552,
                    title: 'CP (Room + Breakfast)',
                    description: 'INCLUSIONS|Ultra-luxurious Executive Suite|Grand Master Bedroom|Separate Living Area|Personal Butler Service|Complimentary Gourmet Breakfast|Complimentary High-Speed Wi-Fi|Daily Housekeeping||MEALS|Breakfast: Included|Lunch: Not Included|Dinner: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 8300,
                    single_occupancy_tax: 415.00
                },
                {
                    id: 553,
                    title: 'MAP (Breakfast + Lunch / Dinner)',
                    description: 'INCLUSIONS|Ultra-luxurious Executive Suite|Grand Master Bedroom|Separate Living Area|Personal Butler Service|Gourmet Breakfast Included|One Fine Dining Meal (Lunch or Dinner)|Complimentary High-Speed Wi-Fi||MEALS|Breakfast: Included|Lunch or Dinner: Included|Remaining Meal: Not Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 9400,
                    single_occupancy_tax: 470.00
                },
                {
                    id: 554,
                    title: 'AP (American Plan - 3 Meals)',
                    description: 'INCLUSIONS|Ultra-luxurious Executive Suite|Grand Master Bedroom|Separate Living Area|Personal Butler Service|Gourmet Breakfast Included|Lunch Included|Dinner Included|Complimentary High-Speed Wi-Fi||MEALS|Breakfast: Included|Lunch: Included|Dinner: Included||CANCELLATION|Free cancellation up to 48 hours before check-in.',
                    single_occupancy_price: 10500,
                    single_occupancy_tax: 525.00
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
    ],
    addons: [
        { id: 1, name: 'Airport Pickup & Drop (Sedan)', category: 'Transfer', charge_type: 'Per Stay', price: 1200, tax_pct: 18, is_active: true },
        { id: 2, name: 'Candlelight Dinner & Wine Setup', category: 'Dining', charge_type: 'Per Stay', price: 2500, tax_pct: 18, is_active: true },
        { id: 3, name: 'Full Body Ayurvedic Spa Treatment (60 Min)', category: 'Wellness', charge_type: 'Per Person', price: 1800, tax_pct: 18, is_active: true },
        { id: 4, name: 'Guaranteed Early Check-In (from 9:00 AM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
        { id: 5, name: 'Relaxed Late Check-Out (up to 4:00 PM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
        { id: 6, name: 'Guided City Sightseeing & Heritage Tour', category: 'Activity', charge_type: 'Per Group', price: 2200, tax_pct: 18, is_active: true }
    ]
};


export async function fetchHotelDataFromApi(slug: string): Promise<HotelData> {
    const targetSlug = (slug || 'retrod').toLowerCase().trim();

    try {
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? `http://localhost:8001/api/v1/hotels/${targetSlug}/`
            : `/api/v1/hotels/${targetSlug}/`;

        const res = await fetch(apiUrl);
        if (res.ok) {
            const data = await res.json();
            if (data.success && data.hotel) {
                const hotel = data.hotel;
                if (targetSlug === 'retrod') {
                    hotel.name = hotel.name || 'Retrod';
                    hotel.slug = 'retrod';
                }
                return hotel;
            }
        }
    } catch (err) {
        console.warn('Booking Engine Backend fetch notice (trying direct PMS backend fallback):', err);
    }

    // Direct fallback: Fetch property from PMS backend (port 8000)
    try {
        const pmsRes = await fetch('http://localhost:8000/api/superadmin-properties/');
        if (pmsRes.ok) {
            const props = await pmsRes.json();
            const matchingProp = props.find((p: any) => {
                const settings = p.booking_engine_settings || {};
                const pSlug = (settings.slug || p.slug || p.name || '').toLowerCase();
                const pName = (p.name || '').toLowerCase();

                const targetClean = targetSlug.toLowerCase().replace(/[^a-z0-9]/g, '');
                const pslugClean = pSlug.replace(/[^a-z0-9]/g, '');
                const pnameClean = pName.replace(/[^a-z0-9]/g, '');

                if (targetClean === pslugClean || targetClean === pnameClean) return true;
                if (targetClean.length >= 3 && (pslugClean.includes(targetClean) || pnameClean.includes(targetClean) || targetClean.includes(pslugClean) || targetClean.includes(pnameClean))) {
                    return true;
                }
                return false;
            });

            if (matchingProp) {
                const settings = matchingProp.booking_engine_settings || {};
                let roomTypes = (settings.custom_room_types || [])
                    .map((rt: any, idx: number) => {
                        const matrixRates = (settings.rates_matrix || {})[rt.id] || [];
                        const defaultPlans = [
                            { id: (idx + 1) * 100 + 1, title: 'EP (Room Only)', description: 'Room accommodation only', single_occupancy_price: rt.basePrice || 3500, single_occupancy_tax: Math.round((rt.basePrice || 3500) * 0.05), extra_adult_price: rt.extraAdultPrice || rt.extra_adult_price || 700, extra_child_price: rt.extraChildPrice || rt.extra_child_price || 500 },
                            { id: (idx + 1) * 100 + 2, title: 'CP (Room + Breakfast)', description: 'Room accommodation with breakfast', single_occupancy_price: (rt.basePrice || 3500) + 500, single_occupancy_tax: Math.round(((rt.basePrice || 3500) + 500) * 0.05), extra_adult_price: rt.extraAdultPrice || rt.extra_adult_price || 700, extra_child_price: rt.extraChildPrice || rt.extra_child_price || 500 },
                            { id: (idx + 1) * 100 + 3, title: 'MAP (Breakfast + Lunch / Dinner)', description: 'Room accommodation with breakfast & 1 meal', single_occupancy_price: (rt.basePrice || 3500) + 1200, single_occupancy_tax: Math.round(((rt.basePrice || 3500) + 1200) * 0.05), extra_adult_price: rt.extraAdultPrice || rt.extra_adult_price || 700, extra_child_price: rt.extraChildPrice || rt.extra_child_price || 500 },
                            { id: (idx + 1) * 100 + 4, title: 'AP (American Plan - 3 Meals)', description: 'Room accommodation with all 3 meals', single_occupancy_price: (rt.basePrice || 3500) + 2000, single_occupancy_tax: Math.round(((rt.basePrice || 3500) + 2000) * 0.05), extra_adult_price: rt.extraAdultPrice || rt.extra_adult_price || 700, extra_child_price: rt.extraChildPrice || rt.extra_child_price || 500 },
                        ];
                        const ratePlans = matrixRates.length > 0
                            ? matrixRates.map((mp: any, pIdx: number) => ({
                                id: (idx + 1) * 100 + (pIdx + 1),
                                title: mp.title || `${mp.planCode} Rate Plan`,
                                description: mp.description || '',
                                single_occupancy_price: mp.singlePrice || rt.basePrice,
                                single_occupancy_tax: Math.round((mp.singlePrice || rt.basePrice) * ((mp.taxPct || 12) / 100)),
                                extra_adult_price: mp.extraAdultPrice || mp.extra_adult_price || rt.extraAdultPrice || rt.extra_adult_price || 700,
                                extra_child_price: mp.extraChildPrice || mp.extra_child_price || rt.extraChildPrice || rt.extra_child_price || 500
                            }))
                            : defaultPlans;

                        const roomImages = (rt.images && rt.images.length > 0)
                            ? rt.images.map((img: any, i: number) => ({ id: i + 1, image_url: typeof img === 'string' ? img : (img.url || img.image_url), caption: rt.name }))
                            : rt.photos && rt.photos.length > 0
                                ? rt.photos.map((url: string, i: number) => ({ id: i + 1, image_url: url, caption: rt.name }))
                                : rt.thumbnailUrl
                                ? [{ id: 1, image_url: rt.thumbnailUrl, caption: `${rt.name} View` }]
                                : [];

                        return {
                            id: idx + 1,
                            name: rt.name,
                            slug: rt.slug || rt.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            max_adults: rt.maxAdults || 2,
                            max_children: rt.maxChildren || 1,
                            bed_type: rt.bedType || 'King Bed',
                            base_price: rt.basePrice || 3500,
                            starting_price: rt.basePrice || 3500,
                            description: rt.description || `${rt.name} at ${matchingProp.name}`,
                            thumbnail_url: rt.thumbnailUrl || (roomImages.length > 0 ? roomImages[0].image_url : ''),
                            images: roomImages,
                            rate_plans: ratePlans
                        };
                    });

                if (roomTypes.length === 0) {
                    roomTypes = [
                        {
                            id: 1,
                            name: 'Deluxe King Room',
                            slug: 'deluxe-king-room',
                            max_adults: 2,
                            max_children: 1,
                            bed_type: 'King Bed',
                            base_price: 3500,
                            starting_price: 3500,
                            description: `Elegantly designed Deluxe Room at ${matchingProp.name} with premium comfort and amenities.`,
                            thumbnail_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop',
                            images: [{ id: 1, image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop', caption: 'Deluxe King Room' }],
                            rate_plans: [
                                { id: 101, title: 'EP (Room Only)', description: 'Room accommodation only', single_occupancy_price: 3500, single_occupancy_tax: 175, extra_adult_price: 700, extra_child_price: 500 },
                                { id: 102, title: 'CP (Room + Breakfast)', description: 'Room accommodation with complimentary breakfast', single_occupancy_price: 4000, single_occupancy_tax: 200, extra_adult_price: 700, extra_child_price: 500 },
                                { id: 103, title: 'MAP (Breakfast + 1 Meal)', description: 'Room accommodation with breakfast & 1 meal', single_occupancy_price: 4700, single_occupancy_tax: 235, extra_adult_price: 700, extra_child_price: 500 }
                            ]
                        },
                        {
                            id: 2,
                            name: 'Executive Luxury Suite',
                            slug: 'executive-luxury-suite',
                            max_adults: 3,
                            max_children: 2,
                            bed_type: 'King Bed',
                            base_price: 5200,
                            starting_price: 5200,
                            description: `Spacious Executive Suite at ${matchingProp.name} with panoramic views, living lounge, and luxury privileges.`,
                            thumbnail_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop',
                            images: [{ id: 2, image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop', caption: 'Executive Suite' }],
                            rate_plans: [
                                { id: 201, title: 'EP (Room Only)', description: 'Room accommodation only', single_occupancy_price: 5200, single_occupancy_tax: 260, extra_adult_price: 700, extra_child_price: 500 },
                                { id: 202, title: 'CP (Room + Breakfast)', description: 'Room accommodation with complimentary breakfast', single_occupancy_price: 5700, single_occupancy_tax: 285, extra_adult_price: 700, extra_child_price: 500 }
                            ]
                        }
                    ];
                }

                let propertyAmenities = (settings.amenities || []).map((am: any, idx: number) => ({
                    id: idx + 1,
                    name: typeof am === 'string' ? am : am.name,
                    icon_name: typeof am === 'string' ? 'sparkles' : (am.icon_name || 'sparkles')
                }));

                if (propertyAmenities.length === 0) {
                    propertyAmenities = [
                        { id: 1, name: 'Free High-Speed Wi-Fi', icon_name: 'wifi' },
                        { id: 2, name: 'Air Conditioning', icon_name: 'wind' },
                        { id: 3, name: 'Multi-Cuisine Restaurant', icon_name: 'utensils' },
                        { id: 4, name: 'Swimming Pool', icon_name: 'droplet' },
                        { id: 5, name: 'Fitness Center', icon_name: 'activity' },
                        { id: 6, name: '24/7 Front Desk & Room Service', icon_name: 'clock' },
                        { id: 7, name: 'Complimentary Luggage Assistance', icon_name: 'luggage' },
                        { id: 8, name: 'Smart Television', icon_name: 'tv' }
                    ];
                }

                let addons = (settings.addons || []).map((ad: any, idx: number) => ({
                    id: idx + 1,
                    name: ad.name,
                    category: ad.category || 'Dining',
                    charge_type: ad.chargeType || ad.charge_type || 'Per Stay',
                    price: Number(ad.price) || 1000,
                    tax_pct: Number(ad.taxPct || ad.tax_pct) || 18,
                    is_active: ad.isActive !== false
                }));

                if (addons.length === 0) {
                    addons = [
                        { id: 1, name: 'Airport Pickup & Drop (Sedan)', category: 'Transfer', charge_type: 'Per Stay', price: 1200, tax_pct: 18, is_active: true },
                        { id: 2, name: 'Candlelight Dinner & Wine Setup', category: 'Dining', charge_type: 'Per Stay', price: 2500, tax_pct: 18, is_active: true },
                        { id: 3, name: 'Full Body Ayurvedic Spa Treatment (60 Min)', category: 'Wellness', charge_type: 'Per Person', price: 1800, tax_pct: 18, is_active: true },
                        { id: 4, name: 'Guaranteed Early Check-In (from 9:00 AM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
                        { id: 5, name: 'Relaxed Late Check-Out (up to 4:00 PM)', category: 'Service', charge_type: 'Per Stay', price: 800, tax_pct: 18, is_active: true },
                        { id: 6, name: 'Guided City Sightseeing & Heritage Tour', category: 'Activity', charge_type: 'Per Group', price: 2200, tax_pct: 18, is_active: true }
                    ];
                }

                // Build policies strictly from settings.policies (empty if not configured)
                const policies = (settings.policies && settings.policies.length > 0)
                    ? settings.policies.map((pol: any, idx: number) => ({
                        id: idx + 1,
                        policy_type: pol.policy_type || 'general',
                        title: pol.title,
                        content: pol.content || ''
                      }))
                    : [];

                return {
                    id: matchingProp.id || 1,
                    name: matchingProp.name,
                    slug: settings.slug || targetSlug,
                    page_title: settings.page_title || `Welcome to ${matchingProp.name}`,
                    theme_color: settings.theme_color || '#ffc107',
                    what_makes_special: settings.what_makes_special || '',
                    backstory: settings.backstory || '',
                    tagline: settings.tagline || '',
                    description: settings.about_description || matchingProp.description || '',
                    short_description: settings.google_editorial_summary || matchingProp.short_description || settings.about_description || '',
                    address: matchingProp.address_line_1 || settings.address || '',
                    city: matchingProp.city || settings.city || '',
                    state: matchingProp.state || settings.state || '',
                    pincode: matchingProp.postal_code || settings.pincode || '',
                    phone: matchingProp.contact_phone || settings.phone || '',
                    email: matchingProp.contact_email || settings.email || '',
                    whatsapp: settings.whatsapp || matchingProp.contact_phone || settings.phone || '',
                    check_in_time: matchingProp.check_in_time || settings.check_in_time || '12:00 PM',
                    check_out_time: matchingProp.check_out_time || settings.check_out_time || '10:00 AM',
                    google_rating: settings.google_rating || matchingProp.google_rating || null,
                    review_count: settings.google_review_count || matchingProp.total_reviews || null,
                    logo_url: settings.logo_url || matchingProp.logo_url || settings.hero_slides?.[0] || matchingProp.image_url || '',
                    hero_banner_url: settings.hero_slides?.[0] || matchingProp.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop',
                    map_embed_url: settings.google_map_url || matchingProp.google_map_url || '',
                    facebook_url: settings.facebook_url || settings.facebook || '',
                    instagram_url: settings.instagram_url || settings.instagram || '',
                    twitter_url: settings.twitter_url || settings.twitter || '',
                    linkedin_url: settings.linkedin_url || settings.linkedin || '',
                    enable_google_reviews: settings.enable_google_reviews ?? true,
                    // Gallery: merge hero slides + settings.images + property image_url
                    images: (() => {
                        const list = [
                            ...(settings.hero_slides || []).map((url: string, i: number) => ({
                                id: i + 1,
                                image_url: url,
                                caption: `${matchingProp.name} Banner ${i + 1}`
                            })),
                            ...(settings.images || []).map((img: any, i: number) => ({
                                id: (settings.hero_slides?.length || 0) + i + 1,
                                image_url: typeof img === 'string' ? img : (img.image_url || img.imageUrl || img.url || ''),
                                caption: (typeof img === 'object' && img.caption) ? img.caption : `${matchingProp.name} Gallery ${i + 1}`
                            })).filter((img: any) => img.image_url),
                        ];
                        if (list.length === 0) {
                            const defaultImgs = [
                                matchingProp.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop',
                                'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&auto=format&fit=crop'
                            ];
                            return defaultImgs.map((url, i) => ({ id: i + 1, image_url: url, caption: `${matchingProp.name} View ${i + 1}` }));
                        }
                        return list;
                    })(),
                    amenities: propertyAmenities,
                    promo_codes: settings.promos || matchingProp.promo_codes || [],
                    room_types: roomTypes,
                    addons: addons,
                    payment_gateways: settings.gateways || settings.payment_gateways || [],
                    policies: policies,
                    booking_engine_settings: settings
                } as HotelData;
            }
        }
    } catch (err2) {
        console.warn('PMS direct fallback notice:', err2);
    }

    const whitelist = ['retrod', 'demo', 'hotelxyz', 'hotel-xyz', 'hotel', 'frontend-beige-theta-65'];
    const isWhitelisted = whitelist.some(w => targetSlug === w || targetSlug.includes(w));

    if (isWhitelisted) {
        return SAMPLE_FALLBACK_HOTEL;
    }

    // Return null to signify that this hotel is not set up
    return null;
}

export async function submitEventRequestApi(payload: any) {
    try {
        const res = await fetch(getApiEndpointUrl('/api/v1/event-requests/'), {
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
        const res = await fetch(getApiEndpointUrl('/api/v1/restaurant-requests/'), {
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
        const res = await fetch(getApiEndpointUrl(`/api/v1/bookings/${emailOrRef}/`));
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export const fetchBookingByReferenceApi = lookupBookingsApi;

const getApiEndpointUrl = (path: string) => {
    return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? `http://localhost:8001${path}`
        : path;
};

export async function submitBookingPaymentApi(payload: any) {
    try {
        const res = await fetch(getApiEndpointUrl('/api/v1/bookings/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function sendInvoiceNotificationApi(payload: any) {
    try {
        const res = await fetch(getApiEndpointUrl('/api/v1/bookings/send-invoice-notification/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function createRazorpayOrderApi(payload: any) {
    try {
        const res = await fetch(getApiEndpointUrl('/api/v1/payments/create-order/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}

export async function verifyRazorpayPaymentApi(payload: any) {
    try {
        const res = await fetch(getApiEndpointUrl('/api/v1/payments/verify/'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await res.json();
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
