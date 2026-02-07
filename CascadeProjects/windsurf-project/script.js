// Global Variables
let currentUser = null;
let selectedTourGuide = null;

// Country and City Data
const countryCityData = {
    france: {
        name: "France",
        cities: [
            { id: "paris", name: "Paris", attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Arc de Triomphe"] },
            { id: "nice", name: "Nice", attractions: ["Promenade des Anglais", "Old Town", "Castle Hill", "Russian Orthodox Cathedral"] },
            { id: "lyon", name: "Lyon", attractions: ["Basilica of Notre-Dame", "Parc de la Tête d'Or", "Old Lyon", "Musée des Confluences"] }
        ]
    },
    japan: {
        name: "Japan",
        cities: [
            { id: "tokyo", name: "Tokyo", attractions: ["Tokyo Tower", "Senso-ji Temple", "Shibuya Crossing", "Meiji Shrine"] },
            { id: "kyoto", name: "Kyoto", attractions: ["Fushimi Inari", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Gion District"] },
            { id: "osaka", name: "Osaka", attractions: ["Osaka Castle", "Dotonbori", "Universal Studios Japan", "Shitenno-ji Temple"] }
        ]
    },
    uae: {
        name: "UAE",
        cities: [
            { id: "dubai", name: "Dubai", attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Marina"] },
            { id: "abu-dhabi", name: "Abu Dhabi", attractions: ["Sheikh Zayed Grand Mosque", "Louvre Abu Dhabi", "Yas Island", "Emirates Palace"] },
            { id: "sharjah", name: "Sharjah", attractions: ["Sharjah Museum of Islamic Civilization", "Al Noor Mosque", "Blue Souk", "Al Qasba"] }
        ]
    },
    india: {
        name: "India",
        cities: [
            { id: "jaipur", name: "Jaipur", attractions: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar"] },
            { id: "delhi", name: "Delhi", attractions: ["Red Fort", "Qutub Minar", "India Gate", "Lotus Temple"] },
            { id: "agra", name: "Agra", attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"] },
            { id: "mumbai", name: "Mumbai", attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Siddhivinayak Temple"] },
            { id: "varanasi", name: "Varanasi", attractions: ["Kashi Vishwanath Temple", "Ghats", "Sarnath", "Banaras Hindu University"] }
        ]
    }
};

// Tour Guide Data - Expanded with 10-20 guides per city
const tourGuides = {
    paris: [
        {
            id: 1,
            name: "Marie Dubois",
            rating: 4.8,
            languages: ["English", "French", "Spanish", "Italian"],
            specialties: ["Art History", "Architecture", "Local Cuisine"],
            price: "$50/hour",
            experience: "5 years",
            education: "Master's in Art History - Sorbonne University",
            tripsCompleted: 1247,
            verification: "Verified",
            avatar: "MD",
            location: { lat: 48.8566, lng: 2.3522, address: "Near Louvre Museum" },
            description: "Expert art historian who brings Paris's museums to life. Specializes in Renaissance and Impressionist eras with engaging storytelling."
        },
        {
            id: 2,
            name: "Pierre Bernard",
            rating: 4.9,
            languages: ["English", "French", "German", "Dutch"],
            specialties: ["History", "Photography", "Hidden Gems"],
            price: "$60/hour",
            experience: "7 years",
            education: "PhD in European History - University of Paris",
            tripsCompleted: 1892,
            verification: "Premium",
            avatar: "PB",
            location: { lat: 48.8606, lng: 2.3376, address: "Eiffel Tower Area" },
            description: "Seasoned historian with passion for capturing Paris through photography. Reveals hidden gems and untold stories of the City of Light."
        }
    ],
    jaipur: [
        {
            id: 7,
            name: "Rajesh Sharma",
            rating: 4.9,
            languages: ["English", "Hindi", "French", "German"],
            specialties: ["Rajasthan History", "Architecture", "Local Culture"],
            price: "$35/hour",
            experience: "10 years",
            education: "MA in History - University of Rajasthan",
            tripsCompleted: 2156,
            verification: "Premium",
            avatar: "RS",
            location: { lat: 26.9124, lng: 75.7873, address: "Hawa Mahal" },
            description: "Born and raised in Jaipur. Deep knowledge of Rajasthani heritage, architecture, and culture. Makes history come alive with personal anecdotes."
        },
        {
            id: 8,
            name: "Priya Meena",
            rating: 4.8,
            languages: ["English", "Hindi", "German", "Japanese"],
            specialties: ["Heritage Walks", "Photography", "Traditional Arts"],
            price: "$30/hour",
            experience: "6 years",
            education: "BA in Tourism - Rajasthan University",
            tripsCompleted: 1432,
            verification: "Verified",
            avatar: "PM",
            location: { lat: 26.9238, lng: 75.8267, address: "City Palace" },
            description: "Passionate photographer and cultural enthusiast. Guides visitors through Jaipur's heritage while capturing stunning photographic moments."
        }
    ]
};

// Fresh Delhi Famous Monuments Data
const delhiMonuments = [
    {
        id: 1,
        name: "India Gate",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
        description: "War memorial arch dedicated to Indian soldiers who died in World War I",
        entryFee: "Free",
        timing: "Open 24 hours",
        rushHours: "5:00 PM - 9:00 PM (Evening)",
        bestTime: "October to March (Evening for illumination)"
    },
    {
        id: 2,
        name: "Red Fort",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop",
        description: "Historic fort that served as main residence of Mughal emperors",
        entryFee: "₹35 (Indians), ₹500 (Foreigners)",
        timing: "9:30 AM - 4:30 PM (Closed Mondays)",
        rushHours: "10:00 AM - 12:00 PM",
        bestTime: "October to March (Morning hours)"
    },
    {
        id: 3,
        name: "Qutub Minar",
        image: "https://images.unsplash.com/photo-1566492030073-2c6c3e8c9c6c?w=400&h=300&fit=crop",
        description: "73-meter tall minaret and UNESCO World Heritage Site",
        entryFee: "₹40 (Indians), ₹600 (Foreigners)",
        timing: "7:00 AM - 5:00 PM",
        rushHours: "9:00 AM - 11:00 AM",
        bestTime: "October to March (Early morning)"
    },
    {
        id: 4,
        name: "Lotus Temple",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "Baháʼí House of Worship with stunning lotus-shaped architecture",
        entryFee: "Free",
        timing: "9:00 AM - 5:30 PM (Closed Mondays)",
        rushHours: "10:00 AM - 12:00 PM",
        bestTime: "October to March (Weekdays)"
    },
    {
        id: 5,
        name: "Humayun's Tomb",
        image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400&h=300&fit=crop",
        description: "Garden tomb of Mughal emperor Humayun, UNESCO World Heritage Site",
        entryFee: "₹40 (Indians), ₹600 (Foreigners)",
        timing: "6:00 AM - 6:00 PM",
        rushHours: "9:00 AM - 11:00 AM",
        bestTime: "October to March (Morning or late afternoon)"
    },
    {
        id: 6,
        name: "Akshardham Temple",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "Hindu temple complex with intricate carvings and cultural exhibitions",
        entryFee: "₹170 (Indians), ₹500 (Foreigners)",
        timing: "9:30 AM - 6:30 PM (Closed Mondays)",
        rushHours: "10:00 AM - 1:00 PM, 4:00 PM - 6:00 PM",
        bestTime: "October to March (Weekdays)"
    },
    {
        id: 7,
        name: "Jama Masjid",
        image: "https://images.unsplash.com/photo-1566492030073-2c6c3e8c9c6c?w=400&h=300&fit=crop",
        description: "One of India's largest mosques, built by Mughal emperor Shah Jahan",
        entryFee: "Free (₹300 for camera)",
        timing: "7:00 AM - 12:00 PM, 1:30 PM - 6:30 PM",
        rushHours: "12:00 PM - 2:00 PM (Prayer time)",
        bestTime: "October to March (Morning hours)"
    },
    {
        id: 8,
        name: "Rashtrapati Bhavan",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
        description: "Official residence of the President of India, architectural marvel",
        entryFee: "₹50 (Indians), ₹230 (Foreigners)",
        timing: "9:00 AM - 4:00 PM (Closed Mondays)",
        rushHours: "10:00 AM - 12:00 PM",
        bestTime: "October to March (Weekday mornings)"
    }
];

// Fresh Jaipur Famous Monuments Data - Enhanced with 20 Places
const jaipurMonuments = [
    {
        id: 1,
        name: "Hawa Mahal",
        location: "Badi Choupad, Pink City",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "The Palace of Winds, a stunning five-story pink palace with 953 small windows",
        entryFee: "₹50 (Indians), ₹200 (Foreigners)",
        timing: "9:00 AM - 4:30 PM",
        rushHours: "10:00 AM - 12:00 PM, 2:00 PM - 4:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Early morning or late afternoon)"
    },
    {
        id: 2,
        name: "Amber Fort",
        location: "11 km from Pink City, Amber Hill",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "A magnificent fort-palace complex known for artistic Hindu style elements and breathtaking views, built in 1592 by Raja Man Singh",
        entryFee: "₹100 (Indians), ₹500 (Foreigners)",
        timing: "8:00 AM - 5:30 PM",
        rushHours: "9:00 AM - 11:00 AM, 3:00 PM - 5:00 PM",
        rushHoursCharges: "No additional charge, expect longer queues",
        bestTime: "October to March (Morning for cool weather)"
    },
    {
        id: 3,
        name: "City Palace",
        location: "Ramniwas Bagh, Pink City Center",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "The royal residence of Maharaja of Jaipur since 1729, featuring beautiful courtyards, gardens and museums with royal artifacts",
        entryFee: "₹200 (Indians), ₹700 (Foreigners)",
        timing: "9:30 AM - 5:00 PM",
        rushHours: "10:00 AM - 1:00 PM, 3:00 PM - 4:30 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Weekday mornings preferred)"
    },
    {
        id: 4,
        name: "Jantar Mantar",
        location: "City Palace Complex, Pink City",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "UNESCO World Heritage Site - An astronomical observation site with world's largest stone sundial (27 meters). Built by Maharaja Sawai Jai Singh II",
        entryFee: "₹50 (Indians), ₹200 (Foreigners)",
        timing: "9:00 AM - 4:30 PM",
        rushHours: "10:00 AM - 12:00 PM",
        rushHoursCharges: "No additional charge, guided tours available",
        bestTime: "October to March (Mid-day for best sun position)"
    },
    {
        id: 5,
        name: "Nahargarh Fort",
        location: "Sudarshangarh, 7 km from city center",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "A historic hilltop fort offering panoramic views of Pink City and Aravalli Hills, built in 1734",
        entryFee: "₹50 (Indians), ₹200 (Foreigners)",
        timing: "10:00 AM - 5:30 PM",
        rushHours: "5:00 PM - 6:30 PM (Peak Sunset)",
        rushHoursCharges: "No additional charge, arrive early for sunset",
        bestTime: "October to March (Sunset time for best views)"
    },
    {
        id: 6,
        name: "Jaigarh Fort",
        location: "Chil Khana, near Amber Fort",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Home to the world's largest cannon on wheels - Jaivana (100-ton cannon). Built in 1726 with stunning architecture",
        entryFee: "₹50 (Indians), ₹200 (Foreigners)",
        timing: "9:00 AM - 4:30 PM",
        rushHours: "10:00 AM - 12:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Morning hours recommended)"
    },
    {
        id: 7,
        name: "Albert Hall Museum",
        location: "Ram Niwas Garden, Pink City",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Rajasthan's oldest museum with Indo-Saracenic architecture, housing weapons, paintings, sculptures and historical artifacts",
        entryFee: "₹40 (Indians), ₹300 (Foreigners)",
        timing: "9:00 AM - 5:00 PM",
        rushHours: "11:00 AM - 2:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Weekday mornings less crowded)"
    },
    {
        id: 8,
        name: "Birla Mandir",
        location: "Tilak Nagar, South Jaipur",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "A breathtaking white marble temple dedicated to Lord Vishnu and Goddess Lakshmi, built in 1988",
        entryFee: "Free",
        timing: "6:00 AM - 12:00 PM, 3:00 PM - 9:00 PM",
        rushHours: "6:00 PM - 8:00 PM (Aarti time)",
        rushHoursCharges: "No charge, crowded during prayer hours",
        bestTime: "Year-round (Evening for aarti celebrations)"
    },
    {
        id: 9,
        name: "Govind Dev Ji Temple",
        location: "City Palace Complex, Pink City",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Ancient temple dedicated to Lord Krishna, located within City Palace premises with daily aarti",
        entryFee: "Free",
        timing: "6:00 AM - 12:30 PM, 4:00 PM - 10:00 PM",
        rushHours: "7:00 AM - 9:00 AM, 6:00 PM - 7:00 PM (Aarti)",
        rushHoursCharges: "No charge, very crowded during aarti",
        bestTime: "Year-round (Avoid festival times for less crowd)"
    },
    {
        id: 10,
        name: "Galtaji Temple",
        location: "Galta, East Jaipur (5 km)",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Temple complex with sacred hot springs, natural pools and monkey population. Historic pilgrimage site",
        entryFee: "Free",
        timing: "6:00 AM - 6:00 PM",
        rushHours: "10:00 AM - 1:00 PM",
        rushHoursCharges: "No charge",
        bestTime: "October to February (Cool mornings best)"
    },
    {
        id: 11,
        name: "Maharaja School Museum",
        location: "M.I. Road, Pink City",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Historic royal school building with interactive museum exhibits on Jaipur's history and heritage",
        entryFee: "₹25 (Indians), ₹100 (Foreigners)",
        timing: "10:00 AM - 5:00 PM (Closed Mondays)",
        rushHours: "12:00 PM - 3:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Weekday visits)"
    },
    {
        id: 12,
        name: "Ram Niwas Garden",
        location: "Central Jaipur, near Albert Hall",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Beautiful public garden with zoo, museum, and play areas. Built by Maharaja Sawai Ram Singh II",
        entryFee: "₹20, Zoo: ₹70 (Indians), ₹300 (Foreigners)",
        timing: "8:00 AM - 6:00 PM",
        rushHours: "10:00 AM - 1:00 PM, 4:00 PM - 6:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Early morning walks)"
    },
    {
        id: 13,
        name: "Chaugan Stadium",
        location: "City Palace Area, Pink City",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Historic polo ground and venue for royal celebrations, cultural events and traditional polo matches",
        entryFee: "₹50 (Event dependent)",
        timing: "9:00 AM - 5:00 PM",
        rushHours: "During events and weekends",
        rushHoursCharges: "Varies during special events",
        bestTime: "Check for polo matches (Oct-March)"
    },
    {
        id: 14,
        name: "Garh Ganesh Temple",
        location: "Old City, Pink City",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Ancient temple dedicated to Lord Ganesha, believed to be protected Jaipur from invaders",
        entryFee: "Free",
        timing: "5:00 AM - 10:00 PM",
        rushHours: "6:00 AM - 8:00 AM, 7:00 PM - 9:00 PM",
        rushHoursCharges: "No charge, prayer times",
        bestTime: "Year-round (Early mornings peaceful)"
    },
    {
        id: 15,
        name: "Rambagh Palace Hotel",
        location: "Mount Road, South Jaipur",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Former royal palace turned luxury hotel (1835). Stunning architecture with manicured gardens and heritage tours available",
        entryFee: "₹300 (Heritage tour) or Complimentary with meal",
        timing: "9:00 AM - 5:00 PM (Tours)",
        rushHours: "11:00 AM - 2:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Garden tours)"
    },
    {
        id: 16,
        name: "Central Museum",
        location: "Albert Hall, Ram Niwas Garden",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Collections of pottery, stone sculptures, weapons, manuscripts and royal belongings showcasing Rajasthan's heritage",
        entryFee: "₹40 (Indians), ₹250 (Foreigners)",
        timing: "10:00 AM - 5:30 PM (Closed Mondays)",
        rushHours: "1:00 PM - 3:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Weekday mornings)"
    },
    {
        id: 17,
        name: "Anokhi Museum",
        location: "KD Nagar, Nahargarh Road",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Museum of hand-printed textiles and traditional crafts in a restored haveli with café",
        entryFee: "₹400 (Indians), ₹500 (Foreigners)",
        timing: "10:00 AM - 5:00 PM (Closed Mondays)",
        rushHours: "12:00 PM - 2:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "Tuesday to Saturday (Weekday visits)"
    },
    {
        id: 18,
        name: "Laksmi Narayan Temple",
        location: "City Palace Approach Road",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Ornate marble and stone temple dedicated to Goddess Lakshmi and Lord Narayan with intricate carvings",
        entryFee: "Free",
        timing: "6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM",
        rushHours: "7:00 AM - 9:00 AM",
        rushHoursCharges: "No charge, peak prayer time",
        bestTime: "Year-round (Morning hours peaceful)"
    },
    {
        id: 19,
        name: "Stepwell (Baoli) of Noria",
        location: "Near Garh Ganesh, Pink City",
        image: "https://images.unsplash.com/photo-1599707368072-0e475518150d?w=400&h=300&fit=crop",
        description: "Ancient architectural marvel with intricate stepwell design, historical water management system of Jaipur",
        entryFee: "Free",
        timing: "9:00 AM - 5:00 PM",
        rushHours: "11:00 AM - 1:00 PM",
        rushHoursCharges: "No charge",
        bestTime: "October to March (Photography friendly)"
    },
    {
        id: 20,
        name: "Jaipur Wax Museum",
        location: "C-Scheme Circular Road",
        image: "https://images.unsplash.com/photo-1599707368924-d9e13f989c9c?w=400&h=300&fit=crop",
        description: "Museum featuring wax figures of historical and contemporary personalities, cultural exhibits and interactive displays",
        entryFee: "₹350 (Indians), ₹500 (Foreigners)",
        timing: "10:00 AM - 6:00 PM",
        rushHours: "2:00 PM - 4:00 PM",
        rushHoursCharges: "No additional charge",
        bestTime: "October to March (Weekday afternoons)"
    }
];

// Backward compatibility - make jaipurPlaces reference jaipurMonuments
let jaipurPlaces = jaipurMonuments;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    // Initialize video background
    initializeVideoBackground();
    // Initialize video contrast watcher to adapt font colors
    initVideoContrastWatcher();

    // Hide loading screen after 2 seconds
    setTimeout(() => {
        hideLoadingScreen();
        showPage('loginPage');
    }, 2000);

    // Setup form listeners
    setupFormListeners();

    // Setup country change listener
    document.getElementById('countrySelect').addEventListener('change', updateCities);
});

// Video Background Initialization
function initializeVideoBackground() {
    const ytubeBackground = document.querySelector('.youtube-background');
    const slideshow = document.getElementById('imageSlideshow');

    // YouTube iframe is automatically handling autoplay and looping
    // Fallback to slideshow if needed
    console.log('YouTube background video loaded');

    // Monitor if YouTube background loads properly with a timeout
    setTimeout(function () {
        // If needed, slideshow is ready as backup
        console.log('Video background initialized successfully');
    }, 2000);
}

/* Video contrast watcher: samples video frame and toggles body classes */
function initVideoContrastWatcher() {
    const video = document.getElementById('bgVideo');
    if (!video) return;

    // Configurable threshold and sampling (can be overridden via window.contrastThreshold / window.contrastSampleInterval)
    const LUMINANCE_THRESHOLD = window.contrastThreshold || 140; // 0-255; lower = more dark, higher = more bright
    const SAMPLE_INTERVAL = window.contrastSampleInterval || 800; // milliseconds between samples

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let running = false;

    function sampleAndApply() {
        try {
            const w = Math.min(200, video.videoWidth || 200);
            const h = Math.min(120, video.videoHeight || 120);
            if (!w || !h) return;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(video, 0, 0, w, h);
            const data = ctx.getImageData(0, 0, w, h).data;
            let r = 0, g = 0, b = 0, count = 0;
            // sample every 4th pixel to be faster
            for (let i = 0; i < data.length; i += 16) {
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
            r = r / count; g = g / count; b = b / count;
            // convert to perceived luminance
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            const body = document.body;
            if (luminance > LUMINANCE_THRESHOLD) {
                body.classList.add('video-bright');
                body.classList.remove('video-dark');
            } else {
                body.classList.add('video-dark');
                body.classList.remove('video-bright');
            }
        } catch (err) {
            // cross-origin or not ready — stop sampling permanently
            console.warn('video contrast sampling failed due to cross-origin restrictions, disabling sampling');
            stop(); // Stop the sampling interval
        }
    }

    function start() {
        if (running) return; running = true;
        // sample periodically while video is playing
        sampleAndApply();
        video.__contrastInterval = setInterval(sampleAndApply, SAMPLE_INTERVAL);
    }

    function stop() {
        running = false;
        if (video.__contrastInterval) clearInterval(video.__contrastInterval);
    }

    // Start when video plays, stop when paused
    video.addEventListener('play', start);
    video.addEventListener('playing', start);
    video.addEventListener('pause', stop);
    video.addEventListener('ended', stop);

    // Try once now if already playing
    if (!video.paused) start();
}

// Image Slideshow Fallback
let currentSlideIndex = 0;
let slideshowInterval;

function startImageSlideshow() {
    const slides = document.querySelectorAll('.slide');

    function showNextSlide() {
        // Hide current slide
        slides[currentSlideIndex].classList.remove('active');

        // Move to next slide
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;

        // Show next slide
        slides[currentSlideIndex].classList.add('active');
    }

    // Change slide every 4 seconds
    slideshowInterval = setInterval(showNextSlide, 4000);

    // Show first slide
    slides[0].classList.add('active');
}

function stopImageSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

// Loading Screen Functions
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
    loadingScreen.classList.remove('hidden');
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        // Show loading screen briefly
        showLoadingScreen();

        setTimeout(() => {
            targetPage.classList.add('active');
            hideLoadingScreen();

            // Initialize specific page content
            if (pageId === 'jaipurPlacesPage') {
                console.log('Loading Jaipur Places page...');
                setTimeout(() => {
                    displayJaipurMonuments();
                }, 100);
            } else if (pageId === 'delhiMonumentsPage') {
                console.log('Loading Delhi Monuments page...');
                setTimeout(() => {
                    displayDelhiMonuments();
                }, 100);
            }
        }, 500);
    }
}

// Form Setup
function setupFormListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleSignup();
        });
    }
}

// Authentication Functions
function handleLogin() {
    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        currentUser = { email: email };

        // Extract name from email
        const nameFromEmail = email.split('@')[0].replace(/[0-9]/g, '').replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        // Save user data to localStorage
        const userData = {
            name: nameFromEmail || 'Traveler',
            email: email,
            phone: '+91-9876543210',
            country: 'India',
            joinDate: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userLoggedIn', 'true');

        showPage('dashboardPage');
        showNotification('Login successful! Welcome to Nookmate.', 'success');
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleSignup() {
    const name = document.querySelector('#signupForm input[type="text"]').value;
    const email = document.querySelector('#signupForm input[type="email"]').value;
    const password = document.querySelector('#signupForm input[type="password"]').value;
    const confirmPassword = document.querySelectorAll('#signupForm input[type="password"]')[1].value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }

    // Create user account
    currentUser = { name: name, email: email };

    // Save user data to localStorage
    const userData = {
        name: name,
        email: email,
        phone: '',
        country: '',
        joinDate: new Date().toLocaleString('en-US', { month: 'short', year: 'numeric' })
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userLoggedIn', 'true');

    showPage('dashboardPage');
    showNotification('Account created successfully! Welcome to Nookmate.', 'success');
}

// Booking Section Navigation


// Set default dates for booking forms
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);

    const dateStr = tomorrow.toISOString().split('T')[0];
    const returnDateStr = dayAfter.toISOString().split('T')[0];

    // Set flight dates
    const flightDeparture = document.getElementById('flightDeparture');
    const flightReturn = document.getElementById('flightReturn');
    if (flightDeparture) flightDeparture.value = dateStr;
    if (flightReturn) flightReturn.value = returnDateStr;

    // Set hotel dates
    const hotelCheckIn = document.getElementById('hotelCheckIn');
    const hotelCheckOut = document.getElementById('hotelCheckOut');
    if (hotelCheckIn) hotelCheckIn.value = dateStr;
    if (hotelCheckOut) hotelCheckOut.value = returnDateStr;

    // Set train date
    const trainDate = document.getElementById('trainDate');
    if (trainDate) trainDate.value = dateStr;

    // Set bus date
    const busDate = document.getElementById('busDate');
    if (busDate) busDate.value = dateStr;

    // Set cab date and time
    const cabDate = document.getElementById('cabDate');
    if (cabDate) cabDate.value = dateStr;
    const cabTime = document.getElementById('cabTime');
    if (cabTime) cabTime.value = '10:00';
}

// Trip type selection for flights
function setTripType(type) {
    const tabs = document.querySelectorAll('.trip-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    const returnDateGroup = document.getElementById('returnDateGroup');
    if (type === 'roundtrip') {
        returnDateGroup.style.display = 'block';
    } else {
        returnDateGroup.style.display = 'none';
    }
}

// Sample flight data
const flightData = [
    {
        id: 1,
        airline: "Air India",
        flightNumber: "AI-620",
        departure: "06:30",
        arrival: "08:45",
        from: "Delhi",
        to: "Mumbai",
        duration: "2h 15m",
        price: 4500,
        class: "Economy",
        stops: "Non-stop",
        baggage: "15kg",
        description: "Experience the comfort of Air India's modern fleet. Enjoy complimentary meals, entertainment, and priority baggage handling on this direct flight."
    },
    {
        id: 2,
        airline: "IndiGo",
        flightNumber: "6E-2341",
        departure: "09:15",
        arrival: "11:40",
        from: "Delhi",
        to: "Mumbai",
        duration: "2h 25m",
        price: 3800,
        class: "Economy",
        stops: "Non-stop",
        baggage: "15kg",
        description: "Budget-friendly with premium service. IndiGo offers reliable connectivity, on-time performance, and comfortable seating on all economy flights."
    },
    {
        id: 3,
        airline: "Vistara",
        flightNumber: "UK-981",
        departure: "14:20",
        arrival: "16:35",
        from: "Delhi",
        to: "Mumbai",
        duration: "2h 15m",
        price: 6500,
        class: "Business",
        stops: "Non-stop",
        baggage: "25kg",
        description: "Premium business experience with spacious seats, gourmet meals, and dedicated cabin crew. Access to airport lounges and accelerated check-in included."
    }
];

// Sample train data
const trainData = [
    {
        id: 1,
        name: "Rajdhani Express",
        number: "12952",
        departure: "16:55",
        arrival: "08:15",
        from: "New Delhi",
        to: "Mumbai Central",
        duration: "15h 20m",
        classes: ["1A", "2A", "3A"],
        description: "Premium express service connecting India's major metros. Features modern coaches, WiFi, and on-board dining. One of the fastest trains on this route.",
        availability: {
            "1A": "Limited",
            "2A": "Available",
            "3A": "Available"
        },
        prices: {
            "1A": 4500,
            "2A": 2600,
            "3A": 1800
        },
        schedule: {
            "1A": 28,
            "2A": 72,
            "3A": 96
        },
        amenities: ["WiFi", "Meals Included", "Charging", "Reading Light", "Bedding Included"]
    },
    {
        id: 2,
        name: "August Kranti Rajdhani",
        number: "12954",
        departure: "17:40",
        arrival: "10:35",
        from: "New Delhi",
        to: "Mumbai Central",
        duration: "16h 55m",
        classes: ["1A", "2A", "3A"],
        description: "Overnight Rajdhani with comfortable journey. Modern facilities including AC compartments, restaurant car, and water supply throughout the journey.",
        availability: {
            "1A": "Waitlist",
            "2A": "Limited",
            "3A": "Available"
        },
        prices: {
            "1A": 4300,
            "2A": 2500,
            "3A": 1700
        },
        schedule: {
            "1A": 18,
            "2A": 54,
            "3A": 72
        },
        amenities: ["WiFi", "Meals Included", "AC Compartment", "Charging", "Attendant Service"]
    },
    {
        id: 3,
        name: "Golden Temple Mail",
        number: "12904",
        departure: "21:45",
        arrival: "16:35",
        from: "New Delhi",
        to: "Mumbai Central",
        duration: "18h 50m",
        classes: ["1A", "2A", "3A", "SL"],
        description: "Budget-friendly overnight train with reliable service. Makes select stops at important stations. Great for budget travelers seeking comfort.",
        availability: {
            "1A": "Available",
            "2A": "Available",
            "3A": "Available",
            "SL": "Available"
        },
        prices: {
            "1A": 4200,
            "2A": 2400,
            "3A": 1600,
            "SL": 600
        },
        schedule: {
            "1A": 26,
            "2A": 68,
            "3A": 90,
            "SL": 120
        },
        amenities: ["Charging Points", "Water Supply", "Bedding Available", "Catering Service"]
    }
];

// Sample hotel data
const hotelData = [
    {
        id: 1,
        name: "The Grand Plaza Hotel",
        city: "Delhi",
        rating: 4.8,
        reviews: 2340,
        category: "5-Star",
        price: 8500,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1566195992271-6f6ed051eb5e?w=400&h=300&fit=crop",
        location: "Connaught Place, Delhi",
        amenities: ["Free WiFi", "Spa", "Fitness Center", "Restaurant", "24-hour Service", "Concierge"],
        roomTypes: "Deluxe, Executive, Suite",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "2 km from airport",
        featured: true,
        description: "Experience luxury at its finest in the heart of Delhi. The Grand Plaza offers world-class amenities, award-winning cuisine, and personalized service."
    },
    {
        id: 2,
        name: "Hotel Indigo Delhi",
        city: "Delhi",
        rating: 4.6,
        reviews: 1870,
        category: "4-Star",
        price: 5200,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1559599810-46d1d26dad12?w=400&h=300&fit=crop",
        location: "Aerocity, Delhi",
        amenities: ["Free WiFi", "Gym", "Restaurant", "Bar", "Business Center", "Room Service"],
        roomTypes: "Superior, Deluxe, Suite",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "5 km from airport",
        featured: false,
        description: "Modern boutique hotel with stylish rooms and contemporary amenities. Perfect for business and leisure travelers seeking comfort and convenience."
    },
    {
        id: 3,
        name: "Comfort Inn Delhi Central",
        city: "Delhi",
        rating: 4.4,
        reviews: 1520,
        category: "3-Star",
        price: 3200,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        location: "Karol Bagh, Delhi",
        amenities: ["Free WiFi", "Gym", "Coffee Shop", "Room Service", "Parking"],
        roomTypes: "Standard, Deluxe",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "8 km from airport",
        featured: false,
        description: "Budget-friendly accommodation with essential amenities. Great for budget travelers and backpackers looking for clean, comfortable rooms."
    },
    {
        id: 4,
        name: "Taj Palace Agra",
        city: "Agra",
        rating: 4.9,
        reviews: 3200,
        category: "5-Star",
        price: 9200,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1606402985489-a1cda70d1c03?w=400&h=300&fit=crop",
        location: "Taj View, Agra",
        amenities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Bar", "Taj View", "Concierge"],
        roomTypes: "Deluxe, Premier, Suite",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "3 km from Taj Mahal",
        featured: true,
        description: "Iconic luxury palace with breathtaking views of the Taj Mahal. Premium service, exquisite dining, and royal treatment await every guest."
    },
    {
        id: 5,
        name: "Hotel Jaipur Grand",
        city: "Jaipur",
        rating: 4.5,
        reviews: 1640,
        category: "4-Star",
        price: 4800,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1585399781429-f28b18ed504d?w=400&h=300&fit=crop",
        location: "C-Scheme, Jaipur",
        amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Bar", "Parking"],
        roomTypes: "Deluxe, Executive, Suite",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "12 km from airport",
        featured: false,
        description: "Elegant pink city hotel with authentic Rajasthani hospitality. Features a pristine pool, multi-cuisine restaurant, and cultural experiences."
    },
    {
        id: 6,
        name: "Regal Inn Mumbai",
        city: "Mumbai",
        rating: 4.3,
        reviews: 1280,
        category: "3-Star",
        price: 4200,
        priceDetails: "per night",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
        location: "Colaba, Mumbai",
        amenities: ["Free WiFi", "Gym", "Restaurant", "Bar", "Room Service"],
        roomTypes: "Standard, Deluxe",
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        distance: "25 km from airport",
        featured: false,
        description: "Well-located hotel in upscale Colaba neighborhood. Close to shopping, dining, and entertainment. Ideal for first-time visitors to Mumbai."
    }
];

// Sample bus data
const busData = [
    {
        id: 1,
        operator: "Volvo Multi-Axle",
        type: "Volvo AC",
        departure: "22:00",
        arrival: "06:00",
        from: "Delhi",
        to: "Jaipur",
        duration: "8h 00m",
        price: 1200,
        amenities: ["WiFi", "Charging Point", "Water Bottle", "Blanket"],
        rating: 4.2,
        seatsAvailable: 23,
        description: "Premium AC bus with comfortable seating. Features individual reading lights, power outlets at each seat, and complimentary water and blankets."
    },
    {
        id: 2,
        operator: "RS Travels",
        type: "Mercedes Benz",
        departure: "23:30",
        arrival: "07:30",
        from: "Delhi",
        to: "Jaipur",
        duration: "8h 00m",
        price: 1500,
        amenities: ["WiFi", "Charging Point", "Snacks", "Reading Light"],
        rating: 4.5,
        seatsAvailable: 12,
        description: "Luxury Mercedes coach with spacious reclined seats. Includes premium snacks, WiFi, phone charging, and experienced professional drivers."
    },
    {
        id: 3,
        operator: "Shreenath Travels",
        type: "AC Sleeper",
        departure: "21:00",
        arrival: "05:30",
        from: "Delhi",
        to: "Jaipur",
        duration: "8h 30m",
        price: 900,
        amenities: ["Charging Point", "Water Bottle", "Blanket"],
        rating: 3.8,
        seatsAvailable: 8,
        description: "Budget AC sleeper bus for long journeys. Offers convertible beds, sturdy construction, and reliable service. Perfect for budget-conscious travelers."
    }
];

// Cab Data
const cabData = [
    {
        id: 1,
        company: "Uber",
        type: "UberX",
        driver: "Rajesh Kumar",
        rating: 4.8,
        reviews: 342,
        price: 450,
        distance: "240 km",
        eta: "4h 30m",
        carModel: "Hyundai i20",
        carNumber: "DL01AB1234",
        amenities: ["Water Bottle", "Phone Charger", "WiFi Hotspot"],
        description: "Professional driver with excellent ratings. Clean and comfortable vehicle. Perfect for long distance travel."
    },
    {
        id: 2,
        company: "Ola",
        type: "OLA Premium",
        driver: "Amit Singh",
        rating: 4.9,
        reviews: 567,
        price: 520,
        distance: "240 km",
        eta: "4h 15m",
        carModel: "Maruti Swift",
        carNumber: "DL02CD5678",
        amenities: ["AC", "Phone Charger", "Blanket", "Water Bottle"],
        description: "Premium OLA service with top-rated driver. Air-conditioned vehicle with excellent comfort features."
    },
    {
        id: 3,
        company: "Rapido",
        type: "Premium",
        driver: "Vikram Patel",
        rating: 4.7,
        reviews: 289,
        price: 480,
        distance: "240 km",
        eta: "4h 45m",
        carModel: "Honda City",
        carNumber: "DL03EF9101",
        amenities: ["Comfortable Seating", "Phone Charger", "WiFi"],
        description: "Experienced driver in premium car. Smooth ride with modern amenities for a comfortable journey."
    },
    {
        id: 4,
        company: "BluSmart",
        type: "Economy",
        driver: "Priya Sharma",
        rating: 4.6,
        reviews: 156,
        price: 400,
        distance: "240 km",
        eta: "5h",
        carModel: "Nissan Datsun",
        carNumber: "DL04GH1121",
        amenities: ["AC", "Water Bottle", "Reading Light"],
        description: "Eco-friendly electric cab. Budget-friendly option without compromising on comfort and safety."
    },
    {
        id: 5,
        company: "Uber",
        type: "Uber Comfort",
        driver: "Suresh Verma",
        rating: 4.9,
        reviews: 421,
        price: 580,
        distance: "240 km",
        eta: "4h 20m",
        carModel: "Toyota Fortuner",
        carNumber: "DL05IJ1314",
        amenities: ["Extra Legroom", "Premium Water", "Phone Charger", "WiFi"],
        description: "Uber Comfort with spacious SUV. Professional driver ensuring premium experience throughout the journey."
    }
];

// Search Flights
function searchFlights() {
    const from = document.getElementById('flightFrom').value;
    const to = document.getElementById('flightTo').value;
    const departure = document.getElementById('flightDeparture').value;

    if (!from || !to || !departure) {
        showNotification('Please fill in all flight search details', 'error');
        return;
    }

    displayFlightResults(flightData);
    showNotification(`Found ${flightData.length} flights from ${from} to ${to}`, 'success');
}

// Display Flight Results
function displayFlightResults(flights) {
    const resultsContainer = document.getElementById('flightsResults');

    const flightsHTML = flights.map(flight => `
        <div class="flight-card">
            <div class="booking-header">
                <div class="booking-info">
                    <h4>${flight.airline} - ${flight.flightNumber}</h4>
                    <p>${flight.class} • ${flight.stops}</p>
                </div>
                <div class="booking-price">
                    <div class="price-amount">₹${flight.price}</div>
                    <div class="price-details">per person</div>
                </div>
            </div>
            
            <div class="booking-route">
                <div class="route-point">
                    <div class="route-time">${flight.departure}</div>
                    <div class="route-city">${flight.from}</div>
                </div>
                <div class="route-line"></div>
                <div class="route-point">
                    <div class="route-time">${flight.arrival}</div>
                    <div class="route-city">${flight.to}</div>
                </div>
            </div>

            <p class="service-description">${flight.description}</p>
            
            <div class="booking-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${flight.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-suitcase"></i>
                    <span>${flight.baggage}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-plane"></i>
                    <span>${flight.stops}</span>
                </div>
            </div>
            
            <div class="booking-actions">
                <button class="book-now-btn" onclick="proceedToPayment('flight', '${flight.airline} ${flight.flightNumber}', ${flight.price})">
                    Book Now
                </button>
                <div class="other-options">
                    <a href="#" class="option-link">Flight Details</a>
                    <a href="#" class="option-link">Baggage Info</a>
                </div>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = flightsHTML;
}

// Search Trains
function searchTrains() {
    const from = document.getElementById('trainFrom').value;
    const to = document.getElementById('trainTo').value;
    const date = document.getElementById('trainDate').value;
    const trainClass = document.getElementById('trainClass').value;

    if (!from || !to || !date) {
        showNotification('Please fill in all train search details', 'error');
        return;
    }

    displayTrainResults(trainData);
    showNotification(`Found ${trainData.length} trains from ${from} to ${to}`, 'success');
}

// Display Train Results
function displayTrainResults(trains) {
    const resultsContainer = document.getElementById('trainsResults');

    const trainsHTML = trains.map(train => `
        <div class="train-card">
            <div class="booking-header">
                <div class="booking-info">
                    <h4>${train.name} (${train.number})</h4>
                    <p>Runs on: Daily</p>
                </div>
                <div class="booking-price">
                    <div class="price-amount">₹${train.prices["3A"]}</div>
                    <div class="price-details">AC 3 Tier per person</div>
                </div>
            </div>
            
            <div class="booking-route train-route">
                <div class="route-point">
                    <div class="route-time">${train.departure}</div>
                    <div class="route-city">${train.from}</div>
                </div>
                <div class="route-line"></div>
                <div class="route-point">
                    <div class="route-time">${train.arrival}</div>
                    <div class="route-city">${train.to}</div>
                </div>
            </div>

            <p class="service-description">${train.description}</p>
            
            <div class="train-classes">
                ${train.classes.map(cls => `
                    <span class="class-badge">${cls}</span>
                `).join('')}
            </div>

            <div class="train-amenities">
                ${train.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
            </div>
            
            <div class="booking-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${train.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-chair"></i>
                    <span>AC 3 Tier: ₹${train.prices["3A"]}</span>
                </div>
                <div class="detail-item availability ${train.availability["3A"] === 'Available' ? 'available' : train.availability["3A"] === 'Limited' ? 'limited' : 'waitlist'}">
                    <i class="fas fa-users"></i>
                    <span>${train.availability["3A"]}</span>
                </div>
            </div>
            
            <div class="booking-actions">
                <button class="book-now-btn" onclick="proceedToPayment('train', '${train.name} (${train.number})', ${train.prices["3A"]})">
                    Book Now
                </button>
                <div class="other-options">
                    <a href="#" onclick="showTrainSchedule('${train.number}'); return false;" class="option-link">Schedule</a>
                    <a href="#" onclick="showTrainFareChart('${train.number}'); return false;" class="option-link">Fare Chart</a>
                </div>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = trainsHTML;
}

// Search Buses
function searchBuses() {
    const from = document.getElementById('busFrom').value;
    const to = document.getElementById('busTo').value;
    const date = document.getElementById('busDate').value;
    const busType = document.getElementById('busType').value;

    if (!from || !to || !date) {
        showNotification('Please fill in all bus search details', 'error');
        return;
    }

    displayBusResults(busData);
    showNotification(`Found ${busData.length} buses from ${from} to ${to}`, 'success');
}

// Search Hotels
function searchHotels() {
    const city = document.getElementById('hotelCity').value;
    const checkIn = document.getElementById('hotelCheckIn').value;
    const checkOut = document.getElementById('hotelCheckOut').value;
    const rooms = document.getElementById('hotelRooms').value;

    if (!city || !checkIn || !checkOut) {
        showNotification('Please fill in all hotel search details', 'error');
        return;
    }

    // Calculate number of nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }

    // Filter hotels by city
    const filteredHotels = hotelData.filter(hotel =>
        hotel.city.toLowerCase() === city.toLowerCase()
    );

    if (filteredHotels.length === 0) {
        showNotification(`No hotels found in ${city}. Showing available hotels nearby.`, 'info');
        displayHotelResults(hotelData, nights);
    } else {
        displayHotelResults(filteredHotels, nights);
        showNotification(`Found ${filteredHotels.length} hotels in ${city}`, 'success');
    }
}

// Display Bus Results
function displayBusResults(buses) {
    const resultsContainer = document.getElementById('busesResults');

    const busesHTML = buses.map(bus => `
        <div class="bus-card">
            <div class="booking-header">
                <div class="booking-info">
                    <h4>${bus.operator}</h4>
                    <div class="bus-type-badge">${bus.type}</div>
                </div>
                <div class="booking-price">
                    <div class="price-amount">₹${bus.price}</div>
                    <div class="price-details">${bus.seatsAvailable} seats available</div>
                </div>
            </div>
            
            <div class="booking-route bus-route">
                <div class="route-point">
                    <div class="route-time">${bus.departure}</div>
                    <div class="route-city">${bus.from}</div>
                </div>
                <div class="route-line"></div>
                <div class="route-point">
                    <div class="route-time">${bus.arrival}</div>
                    <div class="route-city">${bus.to}</div>
                </div>
            </div>

            <p class="service-description">${bus.description}</p>
            
            <div class="bus-amenities">
                ${bus.amenities.map(amenity => `
                    <span class="amenity">${amenity}</span>
                `).join('')}
            </div>
            
            <div class="booking-details">
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${bus.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>${bus.rating} rating</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>${bus.seatsAvailable} seats</span>
                </div>
            </div>
            
            <div class="booking-actions">
                <button class="book-now-btn" onclick="proceedToPayment('bus', '${bus.operator} - ${bus.type}', ${bus.price})">
                    Book Now
                </button>
                <div class="other-options">
                    <a href="#" class="option-link">Seat Layout</a>
                    <a href="#" class="option-link">Amenities</a>
                </div>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = busesHTML;
}

// Search Cabs
function searchCabs() {
    const pickup = document.getElementById('cabPickup').value;
    const dropoff = document.getElementById('cabDropoff').value;
    const date = document.getElementById('cabDate').value;
    const time = document.getElementById('cabTime').value;
    const cabType = document.getElementById('cabType').value;
    const passengers = document.getElementById('cabPassengers').value;

    if (!pickup || !dropoff || !date || !time) {
        showNotification('Please fill in all cab search details', 'error');
        return;
    }

    if (passengers < 1 || passengers > 6) {
        showNotification('Passengers must be between 1 and 6', 'error');
        return;
    }

    displayCabResults(cabData);
    showNotification(`Found ${cabData.length} available cabs from ${pickup} to ${dropoff}`, 'success');
}

// Display Cab Results
function displayCabResults(cabs) {
    const resultsContainer = document.getElementById('cabsResults');

    const cabsHTML = cabs.map(cab => `
        <div class="cab-card">
            <div class="booking-header">
                <div class="booking-info">
                    <h4>${cab.company} - ${cab.type}</h4>
                    <p>${cab.driver}</p>
                </div>
                <div class="booking-price">
                    <div class="price-amount">₹${cab.price}</div>
                    <div class="price-details">${cab.distance} • ${cab.eta}</div>
                </div>
            </div>
            
            <div class="cab-details">
                <div class="detail-item">
                    <i class="fas fa-car"></i>
                    <span>${cab.carModel}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-id-card"></i>
                    <span>${cab.carNumber}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-star"></i>
                    <span>${cab.rating} (${cab.reviews} reviews)</span>
                </div>
            </div>

            <p class="service-description">${cab.description}</p>
            
            <div class="cab-amenities">
                ${cab.amenities.map(amenity => `
                    <span class="amenity">${amenity}</span>
                `).join('')}
            </div>
            
            <div class="booking-actions">
                <button class="book-now-btn" onclick="proceedToPayment('cab', '${cab.company} - ${cab.type} (${cab.driver})', ${cab.price})">
                    Book Now
                </button>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = cabsHTML;
}

// Display Hotel Results
function displayHotelResults(hotels, nights = 1) {
    const resultsContainer = document.getElementById('hotelsResults');

    const hotelsHTML = hotels.map(hotel => `
        <div class="hotel-card ${hotel.featured ? 'featured-hotel' : ''}">
            ${hotel.featured ? '<div class="featured-badge">Featured</div>' : ''}
            <div class="hotel-image">
                <img src="${hotel.image}" alt="${hotel.name}">
                <div class="hotel-rating">
                    <i class="fas fa-star"></i> ${hotel.rating} (${hotel.reviews} reviews)
                </div>
            </div>
            
            <div class="hotel-content">
                <div class="hotel-header">
                    <div class="hotel-info">
                        <h4>${hotel.name}</h4>
                        <div class="hotel-category">${hotel.category}</div>
                        <p class="hotel-location">
                            <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                        </p>
                    </div>
                    <div class="hotel-price-section">
                        <div class="price-amount">₹${hotel.price}</div>
                        <div class="price-details">${hotel.priceDetails}</div>
                        <div class="total-price">Total: ₹${hotel.price * nights} for ${nights} night${nights > 1 ? 's' : ''}</div>
                    </div>
                </div>

                <p class="service-description">${hotel.description}</p>
                
                <div class="hotel-amenities">
                    <strong>Amenities:</strong>
                    ${hotel.amenities.slice(0, 3).map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                    ${hotel.amenities.length > 3 ? `<span class="amenity-tag">+${hotel.amenities.length - 3} more</span>` : ''}
                </div>
                
                <div class="hotel-details">
                    <div class="detail-item">
                        <i class="fas fa-door-open"></i>
                        <span>${hotel.roomTypes}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span>Check-in: ${hotel.checkIn}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map"></i>
                        <span>${hotel.distance}</span>
                    </div>
                </div>
                
                <div class="booking-actions">
                    <button class="book-now-btn" onclick="proceedToPayment('hotel', '${hotel.name}', ${hotel.price * nights})">
                        Book Now
                    </button>
                    <div class="other-options">
                        <a href="#" class="option-link">View Details</a>
                        <a href="#" class="option-link">See Photos</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = hotelsHTML;
}

// Booking Functions
function bookFlight(airline, flightNumber, price) {
    showNotification(`Booking ${airline} ${flightNumber} for ₹${price}`, 'success');
    setTimeout(() => {
        showNotification(`Flight booked! Reference: #FL${Date.now().toString().slice(-6)}`, 'success');
    }, 1500);
}

function bookTrain(trainName, trainNumber, price) {
    showNotification(`Booking ${trainName} (${trainNumber}) for ₹${price}`, 'success');
    setTimeout(() => {
        showNotification(`Train booked! Reference: #TR${Date.now().toString().slice(-6)}`, 'success');
    }, 1500);
}

function bookBus(operator, type, price) {
    showNotification(`Booking ${operator} ${type} for ₹${price}`, 'success');
    setTimeout(() => {
        showNotification(`Bus booked! Reference: #BS${Date.now().toString().slice(-6)}`, 'success');
    }, 1500);
}

function bookHotel(hotelName, pricePerNight, nights) {
    const totalPrice = pricePerNight * nights;
    showNotification(`Booking ${hotelName} for ${nights} night${nights > 1 ? 's' : ''} - ₹${totalPrice}`, 'success');
    setTimeout(() => {
        showNotification(`Hotel booked! Reference: #HT${Date.now().toString().slice(-6)}`, 'success');
    }, 1500);
}

// Payment Page Functions
let currentBooking = {
    type: '',
    name: '',
    price: 0
};

function proceedToPayment(bookingType, bookingName, price) {
    currentBooking = {
        type: bookingType,
        name: bookingName,
        price: price,
        orderId: `ORD${Date.now().toString().slice(-8)}`
    };

    showPage('paymentPage');

    // Set booking reference
    document.getElementById('bookingRef').textContent = `Order ID: #${currentBooking.orderId}`;

    // Populate user data from localStorage if available
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('passengerName').value = userData.name || '';
        document.getElementById('passengerEmail').value = userData.email || '';
        document.getElementById('passengerPhone').value = userData.phone || '';
    }

    // Populate booking summary
    const summary = document.getElementById('bookingSummary');
    const summaryHTML = `
        <div class="summary-item">
            <span class="summary-label">${bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}:</span>
            <span class="summary-value">${bookingName}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Base Price:</span>
            <span class="summary-value">₹${price.toLocaleString()}</span>
        </div>
    `;
    summary.innerHTML = summaryHTML;

    // Update price breakdown
    updatePriceBreakdown(price);
    window.scrollTo(0, 0);
}

function updatePriceBreakdown(basePrice) {
    const insurance = document.getElementById('insuranceOption').checked ? 99 : 0;
    const gst = Math.round((basePrice + insurance) * 0.05);
    const discount = parseFloat(document.getElementById('promoCode').dataset.discount || 0);
    const totalAmount = Math.round((basePrice + insurance + gst) * (1 - discount / 100));

    const breakdown = document.getElementById('priceBreakdown');
    const breakdownHTML = `
        <div class="breakdown-row">
            <span>Base Price</span>
            <span>₹${basePrice.toLocaleString()}</span>
        </div>
        ${insurance > 0 ? `<div class="breakdown-row"><span>Travel Insurance</span><span>₹${insurance}</span></div>` : ''}
        <div class="breakdown-row">
            <span>GST (5%)</span>
            <span>₹${gst.toLocaleString()}</span>
        </div>
        ${discount > 0 ? `<div class="breakdown-row discount"><span>Discount (${document.getElementById('promoCode').dataset.promoName})</span><span>-₹${Math.round(((basePrice + insurance + gst) * discount) / 100).toLocaleString()}</span></div>` : ''}
        <div class="breakdown-row total">
            <span>Total Amount</span>
            <span>₹${totalAmount.toLocaleString()}</span>
        </div>
    `;
    breakdown.innerHTML = breakdownHTML;
    document.getElementById('finalAmount').textContent = totalAmount;
}

document.getElementById('insuranceOption').addEventListener('change', function () {
    updatePriceBreakdown(currentBooking.price);
});

function togglePaymentForm() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    document.getElementById('cardDetails').style.display = paymentMethod === 'card' ? 'block' : 'none';
    document.getElementById('upiDetails').style.display = paymentMethod === 'upi' ? 'block' : 'none';
    document.getElementById('walletDetails').style.display = paymentMethod === 'wallet' ? 'block' : 'none';
    document.getElementById('netbankingDetails').style.display = paymentMethod === 'netbanking' ? 'block' : 'none';

    // Update required fields
    if (paymentMethod === 'card') {
        document.getElementById('cardNumber').required = true;
        document.getElementById('expiryDate').required = true;
        document.getElementById('cvv').required = true;
        document.getElementById('cardholderName').required = true;
        document.getElementById('upiId').required = false;
        document.getElementById('bankSelect').required = false;
    } else if (paymentMethod === 'upi') {
        document.getElementById('cardNumber').required = false;
        document.getElementById('expiryDate').required = false;
        document.getElementById('cvv').required = false;
        document.getElementById('cardholderName').required = false;
        document.getElementById('upiId').required = true;
        document.getElementById('bankSelect').required = false;
    } else if (paymentMethod === 'netbanking') {
        document.getElementById('cardNumber').required = false;
        document.getElementById('expiryDate').required = false;
        document.getElementById('cvv').required = false;
        document.getElementById('cardholderName').required = false;
        document.getElementById('upiId').required = false;
        document.getElementById('bankSelect').required = true;
    } else {
        document.getElementById('cardNumber').required = false;
        document.getElementById('expiryDate').required = false;
        document.getElementById('cvv').required = false;
        document.getElementById('cardholderName').required = false;
        document.getElementById('upiId').required = false;
        document.getElementById('bankSelect').required = false;
    }
}

function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    const promoCodes = {
        'TRAVEL50': 50,
        'SAVE20': 20,
        'FIRST10': 10,
        'WELCOME30': 30
    };

    if (promoCodes[promoCode]) {
        document.getElementById('promoCode').dataset.discount = promoCodes[promoCode];
        document.getElementById('promoCode').dataset.promoName = promoCode;
        showNotification(`Promo code applied! ${promoCodes[promoCode]}% discount`, 'success');
        updatePriceBreakdown(currentBooking.price);
    } else if (promoCode) {
        showNotification('Invalid promo code', 'error');
    }
}

function goBackFromPayment() {
    showPage('dashboardPage');
}

function processPayment(event) {
    event.preventDefault();

    // Validation
    if (!document.getElementById('passengerName').value) {
        showNotification('Please enter passenger name', 'error');
        return;
    }

    if (!document.getElementById('passengerEmail').value) {
        showNotification('Please enter valid email', 'error');
        return;
    }

    if (!document.getElementById('passengerPhone').value) {
        showNotification('Please enter valid phone number', 'error');
        return;
    }

    if (!document.getElementById('termsAgree').checked) {
        showNotification('Please accept terms and conditions', 'error');
        return;
    }

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

    // Payment method validation
    if (paymentMethod === 'card') {
        const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
        if (cardNum.length !== 16) {
            showNotification('Please enter valid card number', 'error');
            return;
        }
        if (!document.getElementById('expiryDate').value) {
            showNotification('Please enter expiry date', 'error');
            return;
        }
        if (!document.getElementById('cvv').value || document.getElementById('cvv').value.length !== 3) {
            showNotification('Please enter valid CVV', 'error');
            return;
        }
    } else if (paymentMethod === 'upi') {
        if (!document.getElementById('upiId').value || !document.getElementById('upiId').value.includes('@')) {
            showNotification('Please enter valid UPI ID', 'error');
            return;
        }
    } else if (paymentMethod === 'netbanking') {
        if (!document.getElementById('bankSelect').value) {
            showNotification('Please select a bank', 'error');
            return;
        }
    }

    // Show payment processing
    const payBtn = document.querySelector('.pay-btn');
    const originalText = payBtn.innerHTML;
    payBtn.disabled = true;
    payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    showNotification('Processing payment...', 'info');

    const name = document.getElementById('passengerName').value;
    const email = document.getElementById('passengerEmail').value;

    // Simulate payment processing
    setTimeout(() => {
        // Generate booking reference
        const bookingRef = `${currentBooking.type.charAt(0).toUpperCase()}${Date.now().toString().slice(-6)}`;

        // Save booking to localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push({
            id: bookingRef,
            orderId: currentBooking.orderId,
            type: currentBooking.type,
            name: currentBooking.name,
            passengerName: name,
            passengerEmail: email,
            amount: currentBooking.price,
            paymentMethod: paymentMethod,
            date: new Date().toLocaleString(),
            status: 'Confirmed'
        });
        localStorage.setItem('bookings', JSON.stringify(bookings));

        showNotification(`✓ Payment successful! Booking reference: ${bookingRef}`, 'success');

        // Reset and go back
        setTimeout(() => {
            showNotification(`Confirmation email sent to ${email}`, 'success');
            document.getElementById('paymentForm').reset();
            document.getElementById('promoCode').removeAttribute('data-discount');
            document.getElementById('promoCode').removeAttribute('data-promoName');
            payBtn.disabled = false;
            payBtn.innerHTML = originalText;
            goBackFromPayment();
        }, 1500);
    }, 2000);
}

// Train Schedule and Fare Chart Functions
function showTrainSchedule(trainNumber) {
    const train = trainData.find(t => t.number === trainNumber);
    if (!train) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content large-modal">
            <button class="close-btn" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3>Train Schedule - ${train.name} (${train.number})</h3>
            <div class="schedule-table">
                <div class="schedule-row header">
                    <div>Station</div>
                    <div>Arrival</div>
                    <div>Departure</div>
                    <div>Distance (km)</div>
                </div>
                <div class="schedule-row">
                    <div>${train.from}</div>
                    <div>-</div>
                    <div>${train.departure}</div>
                    <div>0</div>
                </div>
                <div class="schedule-row">
                    <div>Intermediate Stop 1</div>
                    <div>04:30</div>
                    <div>04:45</div>
                    <div>250</div>
                </div>
                <div class="schedule-row">
                    <div>Intermediate Stop 2</div>
                    <div>08:15</div>
                    <div>08:30</div>
                    <div>480</div>
                </div>
                <div class="schedule-row">
                    <div>${train.to}</div>
                    <div>${train.arrival}</div>
                    <div>-</div>
                    <div>725</div>
                </div>
            </div>
            <p style="margin-top: 20px; color: var(--center-glow); font-size: 13px;">
                Journey Duration: ${train.duration} | Total Distance: 725 km
            </p>
        </div>
    `;
    document.body.appendChild(modal);
}

function showTrainFareChart(trainNumber) {
    const train = trainData.find(t => t.number === trainNumber);
    if (!train) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3>Fare Chart - ${train.name} (${train.number})</h3>
            <div class="fare-table">
                <div class="fare-row header">
                    <div>Class</div>
                    <div>Seats</div>
                    <div>Price</div>
                    <div>Availability</div>
                </div>
                ${train.classes.map(cls => `
                    <div class="fare-row">
                        <div><strong>${cls}</strong></div>
                        <div>${train.schedule[cls]}</div>
                        <div>₹${train.prices[cls]}</div>
                        <div class="availability ${train.availability[cls].toLowerCase()}">
                            ${train.availability[cls]}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Tour Guide Functions
function updateCities() {
    const countrySelect = document.getElementById('countrySelect');
    const citySelect = document.getElementById('citySelect');
    const selectedCountry = countrySelect.value;

    // Clear existing cities
    citySelect.innerHTML = '<option value="">Choose a city</option>';

    if (selectedCountry && countryCityData[selectedCountry]) {
        const cities = countryCityData[selectedCountry].cities;
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });
    }
}

function searchTourGuides() {
    const country = document.getElementById('countrySelect').value;
    const city = document.getElementById('citySelect').value;
    const language = document.getElementById('languageSelect').value;
    const date = document.getElementById('tourDate').value;

    // Validation
    if (!country || !city || !language || !date) {
        showNotification('Please fill in all search criteria', 'error');
        return;
    }

    // Get tour guides for the selected city
    const guides = tourGuides[city] || [];

    // Filter by language if specified
    const filteredGuides = language ?
        guides.filter(guide => guide.languages.includes(language.charAt(0).toUpperCase() + language.slice(1))) :
        guides;

    // Display results
    displayTourGuides(filteredGuides);

    if (filteredGuides.length === 0) {
        showNotification('No tour guides found matching your criteria', 'info');
    }
}

function displayTourGuides(guides) {
    const resultsContainer = document.getElementById('tourGuidesResults');

    if (guides.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--center-glow);">No tour guides available for your selection.</p>';
        return;
    }

    const guidesHTML = guides.map(guide => `
        <div class="guide-card">
            <div class="guide-header">
                <div class="guide-avatar">${guide.avatar}</div>
                <div class="guide-info">
                    <h4>${guide.name}</h4>
                    <div class="rating">
                        <i class="fas fa-star"></i> ${guide.rating} (${guide.experience})
                    </div>
                </div>
            </div>
            <div class="guide-details">
                <p><i class="fas fa-dollar-sign"></i> ${guide.price}</p>
                <p><i class="fas fa-graduation-cap"></i> ${guide.specialties.join(', ')}</p>
            </div>
            <div class="guide-languages">
                ${guide.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
            </div>
            <div class="guide-actions">
                <button class="book-btn" onclick="bookTourGuide(${guide.id})">
                    <i class="fas fa-calendar-check"></i> Book Now
                </button>
                <button class="track-btn" onclick="trackTourGuide(${guide.id})">
                    <i class="fas fa-map-marker-alt"></i> Track
                </button>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = guidesHTML;
}

// Immediate cleanup function - can be called from browser console
function immediateCleanup() {
    // Remove all elements with position fixed that might be modals
    const fixedElements = document.querySelectorAll('*');
    fixedElements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.position === 'fixed' &&
            (element.textContent.includes('Book Tour Guide') ||
                element.textContent.includes('Rajesh Sharma') ||
                element.textContent.includes('₹500 per day'))) {
            element.remove();
        }
    });

    // Also remove any backdrop elements
    const backdrops = document.querySelectorAll('[style*="backdrop-filter"], [style*="rgba(0, 0, 0"]');
    backdrops.forEach(backdrop => {
        if (backdrop.style.position === 'fixed') {
            backdrop.remove();
        }
    });

    console.log('Modal cleanup completed');
}

// Make it available globally
window.immediateCleanup = immediateCleanup;
window.cleanupModals = cleanupModals;

function cleanupModals() {
    // Remove any modal overlays that might be stuck
    const modals = document.querySelectorAll('.modal-overlay, .modal.active');
    modals.forEach(modal => modal.remove());

    // Remove any guide booking modals
    const guideModals = document.querySelectorAll('.guide-booking-modal');
    guideModals.forEach(modal => modal.remove());

    // Remove any div with modal-overlay class
    const modalOverlays = document.querySelectorAll('div[class*="modal"]');
    modalOverlays.forEach(modal => modal.remove());

    // Remove any elements containing "Book Tour Guide" text
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        if (element.textContent && element.textContent.includes('Book Tour Guide') &&
            element.tagName !== 'BODY' && element.tagName !== 'HTML') {
            // Check if it's a modal-like element
            if (element.classList.contains('modal') ||
                element.classList.contains('overlay') ||
                element.style.position === 'fixed') {
                element.remove();
            }
        }
    });
}

// Run cleanup on page load and periodically
document.addEventListener('DOMContentLoaded', function () {
    cleanupModals();

    // Run cleanup every 2 seconds to catch any dynamically added modals
    setInterval(cleanupModals, 2000);
});

// Also run cleanup when page changes
function showPage(pageId) {
    cleanupModals(); // Clean up before showing new page

    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        // Show loading screen briefly
        showLoadingScreen();

        setTimeout(() => {
            targetPage.classList.add('active');
            hideLoadingScreen();
            cleanupModals(); // Clean up after page transition
        }, 500);
    }
}

// Make sure functions are globally available
window.bookTourGuide = function (guideId) {
    console.log('=== BOOK TOUR GUIDE DEBUG ===');
    console.log('Guide ID clicked:', guideId);
    console.log('Tour guides data:', tourGuides);
    console.log('Selected tour guide before search:', selectedTourGuide);

    // Check if tourGuides data exists
    if (!tourGuides) {
        console.error('Tour guides data not loaded!');
        showNotification('Tour guides data not available. Please refresh the page.', 'error');
        return;
    }

    // find guide across all cities
    selectedTourGuide = findGuideById(guideId);
    console.log('Found tour guide:', selectedTourGuide);

    if (selectedTourGuide) {
        console.log('Opening booking modal for:', selectedTourGuide.name);
        // Show booking confirmation modal immediately
        showGuideBookingModal(selectedTourGuide);

        // NO automatic closing - keep modal open until user closes it
        // NO automatic confirmation - wait for user to click confirm
    } else {
        console.error('Guide not found with ID:', guideId);
        showNotification('Guide not found!', 'error');
    }
};

function showGuideBookingModal(guide) {
    console.log('Opening guide booking modal for:', guide.name);

    // Close any existing modals first
    closeGuideBookingModal();
    closeLocationModal(null); // Pass null to use direct selector

    // Small delay to ensure DOM is ready
    setTimeout(() => {
        const modal = document.createElement('div');
        modal.className = 'booking-modal active';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="booking-header">
                    <h2><i class="fas fa-user-tie"></i> Book Tour Guide</h2>
                    <button class="close-btn" onclick="closeGuideBookingModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="guide-details">
                    <div class="guide-card">
                        <div class="guide-avatar">
                            <span>${guide.avatar}</span>
                        </div>
                        <div class="guide-info">
                            <h3>${guide.name}</h3>
                            <p class="guide-specialty">${guide.specialties}</p>
                            <div class="guide-stats">
                                <span><i class="fas fa-graduation-cap"></i> ${guide.education}</span>
                                <span><i class="fas fa-route"></i> ${guide.tripsCompleted} trips</span>
                                <span><i class="fas fa-check-circle"></i> ${guide.verification}</span>
                            </div>
                            <p class="guide-description">${guide.description}</p>
                        </div>
                    </div>
                </div>
                
                <div class="booking-form">
                    <h3>Booking Details</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tour Date</label>
                            <input type="date" id="tourDate" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label>Start Time</label>
                            <input type="time" id="tourTime" value="09:00">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Duration (hours)</label>
                            <select id="tourDuration">
                                <option value="2">2 hours</option>
                                <option value="4" selected>4 hours</option>
                                <option value="6">6 hours</option>
                                <option value="8">8 hours</option>
                                <option value="full">Full day</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Language</label>
                            <select id="tourLanguage">
                                <option value="english" selected>English</option>
                                <option value="hindi">Hindi</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="pricing-summary">
                        <h4>Price Summary</h4>
                        <div class="price-row">
                            <span>Guide Rate:</span>
                            <span>$${guide.hourlyRate}/hour</span>
                        </div>
                        <div class="price-row total">
                            <span>Estimated Total:</span>
                            <span id="estimatedTotal">$${guide.hourlyRate * 4}</span>
                        </div>
                    </div>
                    
                    <div class="booking-actions">
                        <button class="confirm-booking-btn" onclick="confirmGuideBooking(${guide.id})">
                            <i class="fas fa-check-circle"></i>
                            Confirm Booking
                        </button>
                        <button class="cancel-btn" onclick="closeGuideBookingModal()">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Prevent modal from closing when scrolling
        modal.addEventListener('wheel', function (e) {
            e.stopPropagation();
        }, { passive: false });

        modal.addEventListener('scroll', function (e) {
            e.stopPropagation();
        }, { passive: false });

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // NO event listeners that could close modal automatically
        // Modal will only close when user explicitly clicks close or confirm buttons

        // Update total when duration changes
        setTimeout(() => {
            const durationSelect = document.getElementById('tourDuration');
            if (durationSelect) {
                durationSelect.addEventListener('change', updateBookingTotal);
            }

            // Set minimum date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const dateInput = document.getElementById('tourDate');
            if (dateInput) {
                dateInput.min = tomorrow.toISOString().split('T')[0];
            }
        }, 100);

        console.log('Guide booking modal opened successfully');
    }, 50);
}

function updateBookingTotal() {
    const duration = document.getElementById('tourDuration').value;
    const hourlyRate = selectedTourGuide ? selectedTourGuide.hourlyRate : 35;
    let total;

    if (duration === 'full') {
        total = hourlyRate * 8; // Full day = 8 hours
    } else {
        total = hourlyRate * parseInt(duration);
    }

    const totalElement = document.getElementById('estimatedTotal');
    if (totalElement) {
        totalElement.textContent = `$${total}`;
    }
}

function confirmGuideBooking(guideId) {
    const date = document.getElementById('tourDate').value;
    const time = document.getElementById('tourTime').value;
    const duration = document.getElementById('tourDuration').value;
    const language = document.getElementById('tourLanguage').value;

    if (!date || !time) {
        showNotification('Please select date and time', 'warning');
        return;
    }

    // Calculate total
    const hourlyRate = selectedTourGuide ? selectedTourGuide.hourlyRate : 35;
    let total;
    if (duration === 'full') {
        total = hourlyRate * 8;
    } else {
        total = hourlyRate * parseInt(duration);
    }

    const bookingRef = 'TG' + Date.now().toString().slice(-6);

    // Store booking details
    localStorage.setItem('currentGuideBooking', JSON.stringify({
        guide: selectedTourGuide,
        bookingRef: bookingRef,
        date: date,
        time: time,
        duration: duration,
        language: language,
        total: total,
        timestamp: new Date().toISOString(),
        status: 'pending_payment'
    }));

    // Keep modal open - DO NOT auto-close
    // User can close manually when ready

    // Add success message to modal
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            text-align: center;
            font-weight: 600;
        `;
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            Booking Confirmed! Reference: ${bookingRef}
        `;

        // Insert after booking form
        const bookingForm = modalContent.querySelector('.booking-form');
        if (bookingForm) {
            bookingForm.appendChild(successMessage);
        }
    }
}

function closeGuideBookingModal() {
    const modal = document.querySelector('.booking-modal');
    if (modal) {
        modal.remove();
        // Restore body scroll when modal closes
        document.body.style.overflow = '';
    }
}

function trackTourGuide(guideId) {
    selectedTourGuide = findGuideById(guideId);
    if (selectedTourGuide) {
        showLocationModal();
    }
}

function findGuideById(guideId) {
    for (const cityKey of Object.keys(tourGuides)) {
        const list = tourGuides[cityKey] || [];
        const found = list.find(g => g.id === guideId);
        if (found) return found;
    }
    return null;
}

function showLocationModal() {
    const modal = document.createElement('div');
    modal.className = 'location-modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <h3><i class="fas fa-map-marker-alt"></i> Live Location - ${selectedTourGuide.name}</h3>
            <div class="location-map">
                <div>
                    <i class="fas fa-user-circle" style="font-size: 48px; color: var(--accent); margin-bottom: 10px;"></i>
                    <p>Guide is currently at: <strong>Eiffel Tower, Paris</strong></p>
                    <p style="font-size: 12px; margin-top: 10px;">Last updated: 2 minutes ago</p>
                    <p style="color: var(--success); font-size: 14px; margin-top: 10px;">
                        <i class="fas fa-circle"></i> Guide is active and ready
                    </p>
                </div>
            </div>
            <p style="color: var(--center-glow); margin-bottom: 20px;">
                You will receive the exact location 15 minutes before your tour starts.
            </p>
            <button class="close-modal" onclick="closeLocationModal(this)">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeLocationModal(button) {
    // If button is provided, find the modal through it
    if (button && button.closest) {
        const modal = button.closest('.location-modal');
        if (modal) {
            modal.remove();
        }
    } else {
        // If no button provided, find modal directly
        const modal = document.querySelector('.location-modal');
        if (modal) {
            modal.remove();
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    // Set background color based on type
    const colors = {
        success: '#27AE60',
        error: '#E74C3C',
        info: '#4A90E2',
        warning: '#F39C12'
    };
    notification.style.background = colors[type] || colors.info;

    // Add icon based on type
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    notification.innerHTML = `
        <i class="fas ${icons[type] || icons.info}" style="margin-right: 10px;"></i>
        ${message}
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Simulate live location updates (for demo purposes)
function simulateLocationUpdates() {
    // This would normally connect to a real-time location service
    setInterval(() => {
        if (selectedTourGuide && Math.random() > 0.7) {
            console.log(`Location update for ${selectedTourGuide.name}: Guide is moving to next location`);
        }
    }, 30000); // Check every 30 seconds
}

// Live Location Tracking System
let locationUpdateInterval = null;
let currentTrackingGuide = null;

function startLocationTracking(guideId) {
    currentTrackingGuide = tourGuides.paris.find(g => g.id === guideId) ||
        tourGuides.jaipur.find(g => g.id === guideId);

    if (!currentTrackingGuide) return;

    // Clear any existing tracking
    if (locationUpdateInterval) {
        clearInterval(locationUpdateInterval);
    }

    // Update location every 5 seconds for demo
    locationUpdateInterval = setInterval(() => {
        updateGuideLocation();
    }, 5000);

    showNotification(`Started tracking ${currentTrackingGuide.name}'s location`, 'success');
}

function updateGuideLocation() {
    if (!currentTrackingGuide) return;

    // Simulate location changes
    const locations = [
        {
            lat: currentTrackingGuide.location.lat + (Math.random() - 0.5) * 0.01,
            lng: currentTrackingGuide.location.lng + (Math.random() - 0.5) * 0.01,
            address: "Moving to next tourist spot"
        },
        {
            lat: currentTrackingGuide.location.lat,
            lng: currentTrackingGuide.location.lng,
            address: currentTrackingGuide.location.address
        }
    ];

    const newLocation = locations[Math.floor(Math.random() * locations.length)];
    currentTrackingGuide.currentLocation = newLocation;

    // Update map if visible
    const locationModal = document.querySelector('.location-modal.active');
    if (locationModal) {
        updateLocationDisplay(newLocation);
    }
}

// ---------------- Chat Widget ----------------
function initChat() {
    const toggle = document.getElementById('chatToggle');
    const widget = document.getElementById('chatWidget');
    const form = document.getElementById('chatForm');

    // If chatToggle missing (early load), exit
    if (!toggle || !widget || !form) return;

    // start with closed widget
    widget.setAttribute('aria-hidden', 'true');

    // Load small greeting if desired
    appendBotMessage('Hi! I can help with Jaipur places, trip planning, and bookings. Ask me anything.');
}

function toggleChat(open) {
    const widget = document.getElementById('chatWidget');
    const toggle = document.getElementById('chatToggle');
    if (!widget || !toggle) return;

    const isOpen = widget.getAttribute('aria-hidden') === 'false';
    const shouldOpen = typeof open === 'boolean' ? open : !isOpen;
    widget.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    if (shouldOpen) {
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
        document.getElementById('chatInput').focus();
    }
}

function sendChatMessage(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    appendUserMessage(text);
    input.value = '';

    // Try hooking to real AI API here. For now use a simple fallback.
    // sendToAI(text).then(response => appendBotMessage(response)).catch(() => appendBotMessage('Sorry, I could not reach the assistant. Try again later.'));

    // Fallback simulated bot
    setTimeout(() => {
        appendBotMessage(fakeBotResponse(text));
    }, 700 + Math.random() * 800);
}

function appendUserMessage(text) {
    const container = document.getElementById('chatMessages');
    const el = document.createElement('div');
    el.className = 'message user';
    el.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text) {
    const container = document.getElementById('chatMessages');
    const el = document.createElement('div');
    el.className = 'message bot';
    el.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
}

function escapeHtml(unsafe) {
    return unsafe.replace(/[&<>"']/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#039;" })[m]; });
}

function fakeBotResponse(text) {
    const t = text.toLowerCase();
    if (t.includes('hawa mahal') || t.includes('hawa')) return 'Hawa Mahal: Open 9:00 AM - 4:30 PM. Ticket: ₹50 (Indians), ₹200 (Foreigners). Great for sunrise views.';
    if (t.includes('amber') || t.includes('amber fort')) return 'Amber Fort: Open 8:00 AM - 5:30 PM. Ticket: ₹100 (Indians), ₹500 (Foreigners). Recommended 3-4 hours.';
    if (t.includes('guide')) return 'To book a guide, choose Tour Guide in the trip planner or from the Tour Guides page — I can prefill Jaipur for you.';
    if (t.includes('book') && t.includes('flight')) return 'To book flights, go to Flights → search and select your preferred option. I can prefill Jaipur as destination if you want.';
    if (t.includes('ticket') || t.includes('price')) return 'Ticket prices are shown on each place card; click View Map for location or Add to Trip to include in your itinerary.';
    return "I can help with Jaipur places, tour guides, bookings, and directions. Try asking 'What are the opening hours for Hawa Mahal?' or 'Book a guide for Jaipur'.";
}

/* Placeholder for real AI integration - implement server-side or client-side with secure key */
async function sendToAI(message) {
    // Example: POST to your server which forwards to an AI provider.
    // return fetch('/api/ai', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message})})
    //     .then(r => r.json()).then(d => d.reply);
    throw new Error('AI integration not configured');
}

// init chat after DOM ready
document.addEventListener('DOMContentLoaded', initChat);

function updateLocationDisplay(location) {
    const locationText = document.querySelector('.location-map p');
    if (locationText) {
        locationText.innerHTML = `
            <i class="fas fa-user-circle" style="font-size: 48px; color: var(--accent); margin-bottom: 10px;"></i>
            <p>Guide is currently at: <strong>${location.address}</strong></p>
            <p style="font-size: 12px; margin-top: 10px;">Last updated: Just now</p>
            <p style="color: var(--success); font-size: 14px; margin-top: 10px;">
                <i class="fas fa-circle"></i> Guide is active and moving
            </p>
        `;
    }
}

function stopLocationTracking() {
    if (locationUpdateInterval) {
        clearInterval(locationUpdateInterval);
        locationUpdateInterval = null;
    }
    currentTrackingGuide = null;
}

// Enhanced Tour Guide Display
function displayTourGuides(guides) {
    const resultsContainer = document.getElementById('tourGuidesResults');

    if (guides.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--center-glow);">No tour guides available for your selection.</p>';
        return;
    }

    const guidesHTML = guides.map(guide => `
        <div class="guide-card enhanced">
            <div class="guide-header">
                <div class="guide-avatar">
                    ${guide.avatar}
                    ${guide.verification === 'Premium' ? '<i class="fas fa-crown verification-badge premium"></i>' :
            guide.verification === 'Verified' ? '<i class="fas fa-check-circle verification-badge verified"></i>' : ''}
                </div>
                <div class="guide-info">
                    <h4>${guide.name}</h4>
                    <div class="rating">
                        <i class="fas fa-star"></i> ${guide.rating} (${guide.tripsCompleted} trips)
                    </div>
                    <div class="education-info">
                        <i class="fas fa-graduation-cap"></i> ${guide.education}
                    </div>
                </div>
                <div class="guide-price-section">
                    <div class="price-amount">${guide.price}</div>
                    <div class="experience-info">
                        <i class="fas fa-briefcase"></i> ${guide.experience}
                    </div>
                </div>
            </div>
            <div class="guide-details">
                <div class="detail-row">
                    <div class="detail-item">
                        <i class="fas fa-trophy"></i>
                        <span><strong>${guide.tripsCompleted}</strong> tours completed</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-certificate"></i>
                        <span>${guide.verification}</span>
                    </div>
                </div>
                <div class="guide-languages">
                    ${guide.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                </div>
                <div class="guide-specialties">
                    <strong>Specialties:</strong> ${guide.specialties.join(', ')}
                </div>
            </div>
            <div class="guide-actions">
                <button class="book-btn enhanced" onclick="bookTourGuide(${guide.id})">
                    <i class="fas fa-calendar-check"></i> Book Now
                </button>
                <button class="track-btn enhanced" onclick="trackTourGuideLive(${guide.id})">
                    <i class="fas fa-map-marker-alt"></i> Live Track
                </button>
                <button class="profile-btn" onclick="viewGuideProfile(${guide.id})">
                    <i class="fas fa-user"></i> Profile
                </button>
            </div>
        </div>
    `).join('');

    resultsContainer.innerHTML = guidesHTML;
}

function trackTourGuideLive(guideId) {
    selectedTourGuide = tourGuides.paris.find(g => g.id === guideId) ||
        tourGuides.jaipur.find(g => g.id === guideId);

    if (selectedTourGuide) {
        startLocationTracking(guideId);
        showLocationModal();
    }
}

function viewGuideProfile(guideId) {
    const guide = tourGuides.paris.find(g => g.id === guideId) ||
        tourGuides.jaipur.find(g => g.id === guideId);

    if (guide) {
        showNotification(`Viewing ${guide.name}'s full profile...`, 'info');
        // In a real app, this would open a detailed profile page
    }
}

// Jaipur Places Functions
let currentJaipurPage = 1;
const PLACES_PER_PAGE = 6;

function displayJaipurPlaces(page = 1) {
    console.log('=== DISPLAY JAIPUR PLACES START ===');
    console.log('displayJaipurPlaces called with page:', page);
    console.log('jaipurPlaces array:', jaipurPlaces);
    console.log('jaipurPlaces length:', jaipurPlaces ? jaipurPlaces.length : 'undefined');

    const placesGrid = document.getElementById('jaipurPlacesGrid');
    console.log('Places grid element:', placesGrid);

    if (!placesGrid) {
        console.error('jaipurPlacesGrid element not found!');
        return;
    }

    // Simple test - show basic content first
    placesGrid.innerHTML = `
        <div style="text-align: center; padding: 50px; color: white; background: rgba(74, 144, 226, 0.2); border-radius: 15px; margin: 20px;">
            <h2>🏰 Jaipur Monuments Test</h2>
            <p>If you can see this message, the basic display works!</p>
            <p>Total places available: ${jaipurPlaces ? jaipurPlaces.length : 'Loading...'}</p>
            <button onclick="testShowPlaces()" style="background: #4A90E2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Show Actual Places
            </button>
            
            <!-- Also add alternative button names to handle any case issues -->
            <button onclick="testshowplaces()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Show Places (alt)
            </button>
            
            <button onclick="TestShowPlaces()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Show Places (Title Case)
            </button>
        </div>
    `;

    console.log('Basic test content set');

    // Don't proceed with enhanced tiles until user clicks button
    return;

    // Original enhanced code (commented out for now)
    /*
    // Fallback: Show simple content if enhanced tiles don't work
    if (!jaipurPlaces || jaipurPlaces.length === 0) {
        placesGrid.innerHTML = `
            <div style="text-align: center; padding: 50px; color: white;">
                <h3>Loading Jaipur Places...</h3>
                <p>Please wait while we load the monuments.</p>
            </div>
        `;
        return;
    }

    const totalPages = Math.ceil(jaipurPlaces.length / PLACES_PER_PAGE);
    currentJaipurPage = Math.max(1, Math.min(page, totalPages));

    // Calculate start and end index
    const startIdx = (currentJaipurPage - 1) * PLACES_PER_PAGE;
    const endIdx = startIdx + PLACES_PER_PAGE;
    const paginatedPlaces = jaipurPlaces.slice(startIdx, endIdx);
    
    console.log('Paginated places:', paginatedPlaces.length);

    const placesHTML = paginatedPlaces.map(place => `
        <div class="place-card enhanced-tile" id="place-${place.id}">
            <div class="place-image-container">
                <img src="${place.image}" alt="${place.name}" class="place-image">
                <div class="place-type-badge">${place.type}</div>
                <div class="place-overlay">
                    <button class="view-map-btn" onclick="openMap('${place.mapLocation}')" title="View on Map">
                        <i class="fas fa-map-marked-alt"></i>
                    </button>
                    <button class="add-to-trip-btn" onclick="toggleAddToTrip(${place.id}, '${place.name}')" title="Add to Trip">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            <div class="place-content">
                <div class="place-header">
                    <div class="place-title-section">
                        <h3 class="place-title">${place.name}</h3>
                        <div class="place-rating">
                            <i class="fas fa-star"></i>
                            <span>4.8</span>
                            <span class="review-count">(2,345 reviews)</span>
                        </div>
                    </div>
                </div>
                
                <p class="place-description">${place.description}</p>
                
                <div class="place-highlights">
                    ${place.highlights.map(highlight => `
                        <div class="highlight-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${highlight}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="place-details-grid">
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="detail-info">
                            <span class="detail-label">Opening Hours</span>
                            <span class="detail-value">${place.openingTime}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="detail-info">
                            <span class="detail-label">Entry Fee</span>
                            <span class="detail-value">${place.ticketPrice}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="detail-info">
                            <span class="detail-label">Best Time</span>
                            <span class="detail-value">${place.bestTime}</span>
                        </div>
                    </div>
                    
                    <div class="detail-item">
                        <div class="detail-icon">
                            <i class="fas fa-hourglass-half"></i>
                        </div>
                        <div class="detail-info">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${place.duration}</span>
                        </div>
                    </div>
                </div>
                
                <div class="place-actions">
                    <button class="place-btn map-btn" onclick="openMap('${place.mapLocation}')">
                        <i class="fas fa-map-marked-alt"></i>
                        <span>View Map</span>
                    </button>
                    <button class="place-btn trip-btn" onclick="toggleAddToTrip(${place.id}, '${place.name}')">
                        <i class="fas fa-plus"></i>
                        <span>Add to Trip</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    placesGrid.innerHTML = placesHTML;

    // Add pagination controls
    if (totalPages > 1) {
        const paginationHTML = `
            <div class="pagination-controls enhanced-pagination">
                <button onclick="displayJaipurPlaces(${currentJaipurPage - 1})" 
                        ${currentJaipurPage === 1 ? 'disabled' : ''} 
                        class="pagination-btn prev-btn">
                    <i class="fas fa-chevron-left"></i>
                    <span>Previous</span>
                </button>
                
                <div class="pagination-info">
                    <span class="current-page">${currentJaipurPage}</span>
                    <span class="page-separator">of</span>
                    <span class="total-pages">${totalPages}</span>
                </div>
                
                <button onclick="displayJaipurPlaces(${currentJaipurPage + 1})" 
                        ${currentJaipurPage === totalPages ? 'disabled' : ''} 
                        class="pagination-btn next-btn">
                    <span>Next</span>
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        placesGrid.innerHTML += paginationHTML;
    }

    // Update selected places count
    updateSelectedPlacesCount();

    console.log('Places HTML set successfully');
    */
    console.log('=== DISPLAY JAIPUR PLACES END ===');
}

// Test function to show actual places
function testShowPlaces() {
    console.log('testShowPlaces called');
    showPlacesContent();
}

// Alternative function names to handle case issues
function testshowplaces() {
    console.log('testshowplaces called');
    showPlacesContent();
}

function TestShowPlaces() {
    console.log('TestShowPlaces called');
    showPlacesContent();
}

// Main function to show places content
function showPlacesContent() {
    const placesGrid = document.getElementById('jaipurPlacesGrid');

    if (!jaipurPlaces || jaipurPlaces.length === 0) {
        placesGrid.innerHTML = '<div style="color: white; text-align: center; padding: 50px;">No places data available!</div>';
        return;
    }

    // Show first 3 places as simple test
    const simplePlaces = jaipurPlaces.slice(0, 3);
    const placesHTML = simplePlaces.map(place => `
        <div style="background: rgba(74, 144, 226, 0.2); border: 2px solid #4A90E2; border-radius: 10px; padding: 20px; margin: 10px; color: white;">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <p><strong>Type:</strong> ${place.type}</p>
            <p><strong>Timing:</strong> ${place.openingTime}</p>
            <p><strong>Entry:</strong> ${place.ticketPrice}</p>
        </div>
    `).join('');

    placesGrid.innerHTML = placesHTML;
    console.log('Places content displayed successfully');
}

function toggleAddToTrip(placeId, placeName) {
    const placeIndex = selectedTripsPlaces.findIndex(p => p.id === placeId);

    if (placeIndex > -1) {
        // Remove from trip
        selectedTripsPlaces.splice(placeIndex, 1);
        console.log(`Removed: ${placeName}`);
    } else {
        // Add to trip
        const place = jaipurPlaces.find(p => p.id === placeId);
        if (place) {
            selectedTripsPlaces.push(place);
            console.log(`Added to trip: ${placeName}`, place);
        } else {
            console.warn(`Place not found: ${placeName}`);
        }
    }

    updateTripSummary();
}

function updateTripSummary() {
    const tripSummaryBar = document.getElementById('tripSummaryBar');
    const selectedPlacesCount = document.getElementById('selectedPlacesCount');

    if (selectedTripsPlaces.length > 0) {
        tripSummaryBar.style.display = 'flex';
        selectedPlacesCount.textContent = selectedTripsPlaces.length;
    } else {
        tripSummaryBar.style.display = 'none';
    }
}

function openTripBooking() {
    if (selectedTripsPlaces.length === 0) {
        showNotification('Please select at least one place', 'error');
        return;
    }

    showPage('tripPlanningPage');
    displaySelectedPlaces();

    // Add event listeners to checkboxes
    document.querySelectorAll('.booking-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updateBookingSelection);
    });
}

function goBackToPlaces() {
    showPage('jaipurPlacesPage');
}

function displaySelectedPlaces() {
    const reviewContainer = document.getElementById('selectedPlacesReview');
    const placesListCount = document.getElementById('tripPlacesListCount');

    placesListCount.textContent = selectedTripsPlaces.length;

    const placesHTML = selectedTripsPlaces.map(place => `
        <div class="selected-place-item">
            <div class="place-thumbnail">
                <img src="${place.image}" alt="${place.name}" loading="lazy" decoding="async">
            </div>
            <div class="place-info">
                <h4>${place.name}</h4>
                <p>${place.type}</p>
                <span class="duration"><i class="fas fa-clock"></i> ${place.duration}</span>
            </div>
            <button class="remove-btn" onclick="toggleAddToTrip(${place.id}, '${place.name}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    reviewContainer.innerHTML = placesHTML;
}

function updateBookingSelection() {
    const selectedBookings = [];
    document.querySelectorAll('.booking-checkbox:checked').forEach(checkbox => {
        const type = checkbox.value;
        selectedBookings.push(type.charAt(0).toUpperCase() + type.slice(1));
    });

    const bookingsList = document.getElementById('selectedBookingsList');
    const proceedBtn = document.getElementById('proceedBtn');

    if (selectedBookings.length > 0) {
        bookingsList.innerHTML = selectedBookings.map(booking =>
            `<li><i class="fas fa-check"></i> ${booking}</li>`
        ).join('');
        proceedBtn.disabled = false;
    } else {
        bookingsList.innerHTML = '<li class="empty-state"><i class="fas fa-info-circle"></i> Select at least one option</li>';
        proceedBtn.disabled = true;
    }

    window.selectedBookingTypes = selectedBookings;
}

function proceedWithSelectedBookings() {
    const selectedBookings = [];
    document.querySelectorAll('.booking-checkbox:checked').forEach(checkbox => {
        selectedBookings.push(checkbox.value);
    });

    if (selectedBookings.length === 0) {
        showNotification('Please select at least one booking option', 'error');
        return;
    }

    // Store trip data
    window.tripData = {
        places: selectedTripsPlaces,
        bookingTypes: selectedBookings
    };

    // Redirect based on first selected booking
    const firstBooking = selectedBookings[0];

    if (firstBooking === 'flight') {
        proceedToPayment('flight', 'Flight to Jaipur', 4500);
    } else if (firstBooking === 'cab') {
        proceedToPayment('cab', 'Cab Service to Jaipur', 450);
    } else if (firstBooking === 'train') {
        proceedToPayment('train', 'Train to Jaipur', 850);
    } else if (firstBooking === 'guide') {
        // Open Tour Guides page and prefill with Jaipur + selected places
        showPage('tourGuidesPage');

        // set country to India and city to Jaipur (if available)
        const countrySelect = document.getElementById('countrySelect');
        const citySelect = document.getElementById('citySelect');
        try {
            countrySelect.value = 'india';
            updateCities(); // populate cities for the selected country
            // attempt to set city to jaipur
            const jaipurOption = Array.from(citySelect.options).find(o => o.value === 'jaipur' || o.textContent.toLowerCase().includes('jaipur'));
            if (jaipurOption) citySelect.value = jaipurOption.value;
        } catch (e) {
            // ignore if elements not present
        }

        // show selected places summary on tour guides page
        const selectedPlacesDiv = document.getElementById('selectedTripPlaces');
        if (selectedPlacesDiv) {
            if (selectedTripsPlaces.length === 0) selectedPlacesDiv.innerHTML = '';
            else {
                selectedPlacesDiv.innerHTML = `<strong>Selected places:</strong> ${selectedTripsPlaces.map(p => p.name).join(', ')}`;
            }
        }

        // auto-run search for guides in the chosen city
        setTimeout(() => {
            try { searchTourGuides(); } catch (e) { }
        }, 200);
    }
}

function openMap(mapLocation) {
    // Google Maps URL using the location string
    const mapsURL = `https://www.google.com/maps/search/${encodeURIComponent(mapLocation)}/`;
    window.open(mapsURL, '_blank');
}

// ============ ACCOUNT PAGE FUNCTIONS ============

// Initialize Account Page with User Data
function initializeAccountPage() {
    // Get stored user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91-9876543210',
        country: 'India',
        joinDate: 'Feb 2026'
    };

    // Update profile section
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileMember').textContent = `Member since ${userData.joinDate}`;

    // Update edit form fields
    document.getElementById('editName').value = userData.name;
    document.getElementById('editEmail').value = userData.email;
    document.getElementById('editPhone').value = userData.phone || '';
    document.getElementById('editCountry').value = userData.country || '';
}

// Handle User Profile Click
document.addEventListener('DOMContentLoaded', function () {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function () {
            initializeAccountPage();
            showPage('accountPage');
        });
        userProfile.style.cursor = 'pointer';
    }

    // Setup form listeners
    setupFormListeners();
});

// Toggle Edit Profile Form
function toggleEditProfile() {
    const editForm = document.getElementById('editProfileForm');
    if (editForm) {
        editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
    }
}

// Save Profile Changes
function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const country = document.getElementById('editCountry').value;

    if (!name || !email) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }

    // Save to localStorage
    const userData = {
        name: name,
        email: email,
        phone: phone,
        country: country,
        joinDate: 'Feb 2026'
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update display
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileEmail').textContent = email;

    // Close edit form
    toggleEditProfile();

    showNotification('Profile updated successfully!', 'success');
}

// Toggle Add Payment Form
function toggleAddPayment() {
    showNotification('Add payment method functionality coming soon!', 'info');
}

// Change Password
function changePassword() {
    const currentPassword = prompt('Enter your current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;

    const confirmPassword = prompt('Confirm new password:');
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return;
    }

    // Simulate password change
    setTimeout(() => {
        showNotification('Password changed successfully!', 'success');
    }, 500);
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data
        localStorage.removeItem('userData');
        localStorage.removeItem('userLoggedIn');

        // Show loading screen
        showLoadingScreen();

        setTimeout(() => {
            // Redirect to login page
            showPage('loginPage');
            hideLoadingScreen();
            showNotification('Logged out successfully!', 'success');
        }, 500);
    }
}

// Global test functions for debugging
window.testJaipurMonuments = function () {
    console.log('Testing Jaipur monuments...');
    console.log('jaipurMonuments data:', jaipurMonuments);
    console.log('jaipurMonuments length:', jaipurMonuments ? jaipurMonuments.length : 'undefined');

    const grid = document.getElementById('jaipurPlacesGrid');
    console.log('jaipurPlacesGrid element:', grid);

    if (grid && jaipurMonuments && jaipurMonuments.length > 0) {
        grid.innerHTML = '<div style="color: white; text-align: center; padding: 50px;">✅ Jaipur monuments data loaded successfully! Found ' + jaipurMonuments.length + ' monuments.</div>';
        return true;
    } else {
        console.error('❌ Jaipur monuments test failed');
        return false;
    }
};

window.testDelhiMonuments = function () {
    console.log('Testing Delhi monuments...');
    console.log('delhiMonuments data:', delhiMonuments);
    console.log('delhiMonuments length:', delhiMonuments ? delhiMonuments.length : 'undefined');

    const grid = document.getElementById('delhiPlacesGrid');
    console.log('delhiPlacesGrid element:', grid);

    if (grid && delhiMonuments && delhiMonuments.length > 0) {
        grid.innerHTML = '<div style="color: white; text-align: center; padding: 50px;">✅ Delhi monuments data loaded successfully! Found ' + delhiMonuments.length + ' monuments.</div>';
        return true;
    } else {
        console.error('❌ Delhi monuments test failed');
        return false;
    }
};

// Force display functions for immediate testing
window.forceShowJaipurMonuments = function () {
    console.log('Force showing Jaipur monuments...');
    displayJaipurMonuments();
};

window.forceShowDelhiMonuments = function () {
    console.log('Force showing Delhi monuments...');
    displayDelhiMonuments();
};

// Auto-initialize monuments when page loads
window.initializeMonuments = function () {
    // Check if we're on a monument page and auto-display
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        if (activePage.id === 'jaipurPlacesPage') {
            console.log('Auto-initializing Jaipur monuments...');
            setTimeout(() => displayJaipurMonuments(), 200);
        } else if (activePage.id === 'delhiMonumentsPage') {
            console.log('Auto-initializing Delhi monuments...');
            setTimeout(() => displayDelhiMonuments(), 200);
        }
    }
};

// Run auto-initialization every 2 seconds as backup
setInterval(() => {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        if (activePage.id === 'jaipurPlacesPage') {
            const grid = document.getElementById('jaipurPlacesGrid');
            if (grid && grid.innerHTML.trim() === '') {
                console.log('Backup: Displaying Jaipur monuments...');
                displayJaipurMonuments();
            }
        } else if (activePage.id === 'delhiMonumentsPage') {
            const grid = document.getElementById('delhiPlacesGrid');
            if (grid && grid.innerHTML.trim() === '') {
                console.log('Backup: Displaying Delhi monuments...');
                displayDelhiMonuments();
            }
        }
    }
}, 2000);

// Fresh Delhi Monuments Display Function
function displayDelhiMonuments() {
    console.log('=== DISPLAY DELHI MONUMENTS DEBUG ===');

    const placesGrid = document.getElementById('delhiPlacesGrid');
    console.log('delhiPlacesGrid element:', placesGrid);

    if (!placesGrid) {
        console.error('delhiPlacesGrid element not found!');
        return;
    }

    // Simple test content
    placesGrid.innerHTML = `
        <div style="text-align: center; padding: 50px; color: white; background: rgba(74, 144, 226, 0.2); border-radius: 15px; margin: 20px;">
            <h2>🏛️ Delhi Monuments Test</h2>
            <p>If you can see this, the basic display works!</p>
            <p>Data available: ${delhiMonuments ? delhiMonuments.length + ' monuments' : 'No data'}</p>
            <button onclick="showDelhiMonumentsData()" style="background: #4A90E2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Show Actual Monuments
            </button>
        </div>
    `;

    console.log('Delhi test content set');
}

function showDelhiMonumentsData() {
    console.log('showDelhiMonumentsData called');
    const placesGrid = document.getElementById('delhiPlacesGrid');

    if (!delhiMonuments || delhiMonuments.length === 0) {
        placesGrid.innerHTML = '<div style="color: white; text-align: center; padding: 50px;">No monuments data available!</div>';
        return;
    }

    // Show first 3 monuments as simple test
    const simpleMonuments = delhiMonuments.slice(0, 3);
    const monumentsHTML = simpleMonuments.map(monument => `
        <div style="background: rgba(74, 144, 226, 0.2); border: 2px solid #4A90E2; border-radius: 10px; padding: 20px; margin: 10px; color: white;">
            <h3>${monument.name}</h3>
            <p>${monument.description}</p>
            <p><strong>Entry:</strong> ${monument.entryFee}</p>
            <p><strong>Timing:</strong> ${monument.timing}</p>
            <p><strong>Best Time:</strong> ${monument.bestTime}</p>
        </div>
    `).join('');

    placesGrid.innerHTML = monumentsHTML;
}

// Monument selection functionality
let selectedDelhiMonuments = [];

function toggleMonumentSelection(city, monumentId, monumentName) {
    const monumentCard = document.getElementById(`${city}-monument-${monumentId}`);
    const checkbox = document.getElementById(`${city}-check-${monumentId}`);
    const checkIcon = checkbox.querySelector('i');

    if (city === 'delhi') {
        const index = selectedDelhiMonuments.findIndex(m => m.id === monumentId);

        if (index > -1) {
            selectedDelhiMonuments.splice(index, 1);
            monumentCard.style.borderColor = '#4A90E2';
            monumentCard.style.background = 'linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(26, 37, 54, 0.8))';
            checkIcon.style.display = 'none';
            checkbox.style.background = 'rgba(255,255,255,0.1)';
        } else {
            selectedDelhiMonuments.push({ id: monumentId, name: monumentName });
            monumentCard.style.borderColor = '#28a745';
            monumentCard.style.background = 'linear-gradient(135deg, rgba(40, 167, 69, 0.3), rgba(26, 37, 54, 0.8))';
            checkIcon.style.display = 'block';
            checkbox.style.background = '#28a745';
        }

        // Update selection summary
        const summaryDiv = document.getElementById('delhi-selection-summary');
        const countSpan = document.getElementById('delhi-selected-count');

        if (selectedDelhiMonuments.length > 0) {
            summaryDiv.style.display = 'block';
            countSpan.textContent = selectedDelhiMonuments.length;
        } else {
            summaryDiv.style.display = 'none';
        }
    }
}

function proceedToDelhiBooking() {
    if (selectedDelhiMonuments.length === 0) {
        showNotification('Please select at least one monument', 'warning');
        return;
    }

    // Store selected monuments for booking
    localStorage.setItem('selectedDelhiMonuments', JSON.stringify(selectedDelhiMonuments));

    // Show booking options
    showDelhiBookingOptions();
}

function showDelhiBookingOptions() {
    const placesGrid = document.getElementById('delhiPlacesGrid');

    const bookingHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: white; font-size: 28px; margin-bottom: 20px;">🎯 Book Services for Your Delhi Trip</h2>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 16px;">Selected Monuments: ${selectedDelhiMonuments.map(m => m.name).join(', ')}</p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px;">
            <div onclick="bookDelhiService('flight')" style="background: linear-gradient(135deg, rgba(74, 144, 226, 0.3), rgba(26, 37, 54, 0.8)); border: 2px solid #4A90E2; border-radius: 15px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-plane" style="font-size: 48px; color: #4A90E2; margin-bottom: 15px;"></i>
                <h3 style="color: white; margin: 0 0 10px 0;">✈️ Flight</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0;">Book flights to Delhi</p>
            </div>
            
            <div onclick="bookDelhiService('cab')" style="background: linear-gradient(135deg, rgba(40, 167, 69, 0.3), rgba(26, 37, 54, 0.8)); border: 2px solid #28a745; border-radius: 15px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-car" style="font-size: 48px; color: #28a745; margin-bottom: 15px;"></i>
                <h3 style="color: white; margin: 0 0 10px 0;">🚗 Cab</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0;">Local transportation</p>
            </div>
            
            <div onclick="bookDelhiService('hotel')" style="background: linear-gradient(135deg, rgba(255, 193, 7, 0.3), rgba(26, 37, 54, 0.8)); border: 2px solid #ffc107; border-radius: 15px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-hotel" style="font-size: 48px; color: #ffc107; margin-bottom: 15px;"></i>
                <h3 style="color: white; margin: 0 0 10px 0;">🏨 Hotel</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0;">Accommodation</p>
            </div>
            
            <div onclick="bookDelhiService('guide')" style="background: linear-gradient(135deg, rgba(220, 53, 69, 0.3), rgba(26, 37, 54, 0.8)); border: 2px solid #dc3545; border-radius: 15px; padding: 30px; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                <i class="fas fa-user-tie" style="font-size: 48px; color: #dc3545; margin-bottom: 15px;"></i>
                <h3 style="color: white; margin: 0 0 10px 0;">👔 Guide</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin: 0;">Tour guide services</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="displayDelhiMonuments()" style="background: transparent; border: 2px solid white; color: white; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-right: 10px;">
                ← Back to Monuments
            </button>
            <button onclick="bookAllDelhiServices()" style="background: linear-gradient(135deg, #4A90E2, #28a745); border: none; color: white; padding: 12px 24px; border-radius: 8px; cursor: pointer;">
                Book All Services
            </button>
        </div>
    `;

    placesGrid.innerHTML = bookingHTML;
}

function bookDelhiService(serviceType) {
    showNotification(`Booking ${serviceType} for Delhi monuments...`, 'info');

    // Redirect to appropriate booking page
    switch (serviceType) {
        case 'flight':
            showPage('flightsPage');
            break;
        case 'cab':
            showPage('cabsPage');
            break;
        case 'hotel':
            showPage('hotelsPage');
            break;
        case 'guide':
            showPage('tourGuidesPage');
            break;
    }
}

function bookAllDelhiServices() {
    showNotification('Booking all services for your Delhi trip...', 'info');
}

// Fresh Jaipur Monuments Display Function - Enhanced with Location Info
function displayJaipurMonuments() {
    console.log('=== DISPLAY JAIPUR MONUMENTS DEBUG ===');

    const placesGrid = document.getElementById('jaipurPlacesGrid');
    console.log('jaipurPlacesGrid element:', placesGrid);

    if (!placesGrid) {
        console.error('jaipurPlacesGrid element not found!');
        return;
    }

    // Simple test content
    placesGrid.innerHTML = `
        <div style="text-align: center; padding: 50px; color: white; background: rgba(74, 144, 226, 0.2); border-radius: 15px; margin: 20px;">
            <h2>🏰 Jaipur Monuments Test</h2>
            <p>If you can see this, the basic display works!</p>
            <p>Data available: ${jaipurMonuments ? jaipurMonuments.length + ' monuments' : 'No data'}</p>
            <button onclick="showJaipurMonumentsData()" style="background: #4A90E2; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                Show Actual Monuments
            </button>
        </div>
    `;

    console.log('Jaipur test content set');
}

function showJaipurMonumentsData() {
    console.log('showJaipurMonumentsData called');
    const placesGrid = document.getElementById('jaipurPlacesGrid');

    if (!jaipurMonuments || jaipurMonuments.length === 0) {
        placesGrid.innerHTML = '<div style="color: white; text-align: center; padding: 50px;">No monuments data available!</div>';
        return;
    }

    // Show first 3 monuments as simple test
    const simpleMonuments = jaipurMonuments.slice(0, 3);
    const monumentsHTML = simpleMonuments.map(monument => `
        <div style="background: rgba(74, 144, 226, 0.2); border: 2px solid #4A90E2; border-radius: 10px; padding: 20px; margin: 10px; color: white;">
            <h3>${monument.name}</h3>
            <p>${monument.description}</p>
            <p><strong>Entry:</strong> ${monument.entryFee}</p>
            <p><strong>Timing:</strong> ${monument.timing}</p>
            <p><strong>Best Time:</strong> ${monument.bestTime}</p>
        </div>
    `).join('');

    placesGrid.innerHTML = monumentsHTML;
}

// Debug function to check modal issues
window.debugGuideModal = function () {
    console.log('=== DEBUG GUIDE MODAL ===');
    console.log('selectedTourGuide:', selectedTourGuide);

    // Check if modal exists
    const existingModal = document.querySelector('.booking-modal');
    console.log('Existing modal:', existingModal);

    // Check if guide data exists
    console.log('Tour guides available:', tourGuides);
    console.log('Jaipur guides:', tourGuides.jaipur);

    if (tourGuides && tourGuides.jaipur) {
        console.log('Available guides:', tourGuides.jaipur.length);
        tourGuides.jaipur.forEach((guide, index) => {
            console.log(`Guide ${index + 1}:`, guide.name, 'ID:', guide.id);
        });
    }

    return {
        modalExists: !!existingModal,
        guidesAvailable: !!(tourGuides && tourGuides.jaipur),
        guideCount: tourGuides.jaipur ? tourGuides.jaipur.length : 0
    };
};

// Force open booking modal for testing
window.testGuideModal = function (guideId) {
    console.log('Testing guide modal with ID:', guideId);
    const guide = findGuideById(guideId);
    if (guide) {
        showGuideBookingModal(guide);
    } else {
        console.error('Guide not found with ID:', guideId);
    }
};

// Test function to manually trigger booking
window.testGuideBooking = function () {
    console.log('=== MANUAL TEST GUIDE BOOKING ===');

    // Try to find Rajesh Sharma directly
    if (tourGuides && tourGuides.jaipur) {
        const rajesh = tourGuides.jaipur.find(g => g.name === 'Rajesh Sharma');
        if (rajesh) {
            console.log('Found Rajesh Sharma:', rajesh);
            console.log('Calling bookTourGuide with ID:', rajesh.id);
            bookTourGuide(rajesh.id);
        } else {
            console.error('Rajesh Sharma not found in Jaipur guides');
            console.log('Available guides:', tourGuides.jaipur.map(g => ({ name: g.name, id: g.id })));
        }
    } else {
        console.error('Tour guides data not available');
    }
};

// Check if button exists
window.checkGuideButton = function () {
    const buttons = document.querySelectorAll('.book-btn');
    console.log('Found book buttons:', buttons.length);
    buttons.forEach((btn, index) => {
        console.log(`Button ${index}:`, btn.onclick);
    });
};

// Restart booking system
window.restartBookingSystem = function () {
    console.log('=== RESTARTING BOOKING SYSTEM ===');

    // Clear any existing modals
    closeGuideBookingModal();
    closeLocationModal(null); // Pass null to use direct selector

    // Reset selected guide
    selectedTourGuide = null;

    // Clear local storage bookings
    localStorage.removeItem('currentGuideBooking');

    // Reinitialize tour guides data
    console.log('Tour guides data:', tourGuides);

    // Show restart notification
    showNotification('🔄 Booking system restarted!', 'success');

    // Test if guides are available
    if (tourGuides && tourGuides.jaipur) {
        console.log('Available guides:', tourGuides.jaipur.length);
        const rajesh = tourGuides.jaipur.find(g => g.name === 'Rajesh Sharma');
        if (rajesh) {
            console.log('✅ Rajesh Sharma found:', rajesh);
            console.log('✅ Book Now button should work with ID:', rajesh.id);
        } else {
            console.error('❌ Rajesh Sharma not found');
        }
    } else {
        console.error('❌ Tour guides data not available');
    }

    return {
        restarted: true,
        guidesAvailable: !!(tourGuides && tourGuides.jaipur),
        guideCount: tourGuides.jaipur ? tourGuides.jaipur.length : 0
    };
};

// Auto-restart on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('Page loaded - initializing booking system...');
    setTimeout(() => {
        restartBookingSystem();
    }, 1000);
});

// End of script file - all functions properly closed

