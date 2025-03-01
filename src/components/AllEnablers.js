import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ArrowRight } from 'lucide-react';
import "./AllEnablers.css";
import Navbar from './NavBar';
import ConnectPopup from './ConnectPopup';

const AllEnablers = () => {
    // Sample data for enablers (same as in the Enablers component)
    const allEnablers = [
        {
            id: 1,
            name: "Neha Tiwari",
            photo: "../../images/Enablers/NehaTiwari.jpg",
            title: "Startup Angel Investor | Miss Central India",
            description: "Neha Tiwari is a graceful and confident titleholder of Miss Central India, known for her charisma, elegance, and determination. She embodies beauty with purpose, using her platform to inspire and empower others. With a passion for fashion, social impact, and personal growth, Neha continues to make her mark in the world of pageantry and beyond.",
            expertise: ["Funding", "Leadership", "Fashion", "Modelling"],
            region: "Madhya Pradesh",
            yearsOfExperience: 12
        },
        {
            id: 2,
            name: "Priya Tiwari",
            photo: "../../images/Enablers/PriyaTiwari.jpg",
            title: "North Zone Winner & Fashion Model ",
            description: "Priya Tiwari is a rising star in the fashion industry, crowned North Zone Winner at KJM Dreamz. She has graced prestigious runways, including Bombay Times at Panache Runway Fashion, and secured the First Runner-up title at Veenus Film and Events. With her elegance, confidence, and passion for modeling, Priya continues to make a mark in the world of fashion and beauty.",
            expertise: ["Modelling", "Fashion", "Beauty"],
            region: "Madhya Pradesh",
            yearsOfExperience: 12
        },
        {
            id: 3,
            name: "Preeti Chaudhary",
            photo: "../../images/Enablers/PreetiChaudhary.jpg",
            title: "Board Member | Startup Mentor | Inclusion Ally",
            description: "Preeti Chaudhary is a renowned board member, startup mentor, and enabler with international and national credibility. A strong advocate for inclusion and UN SDGs, she actively drives impact and innovation. A polyglot fluent in six languages, she is passionate about travel and is known for her hands-on approach to making things happen.",
            expertise: ["Startup Mentor", "Early-stage Investments", "Leadership", "Finance"],
            region: "Madhya Pradesh",
            yearsOfExperience: 12
        },
        {
            id: 4,
            name: "Poojashree Chouksey",
            photo: "../../images/Enablers/PoojashreeChouksey.jpg",
            title: "Executive Director, LNCT Group | Social Entrepreneur | Industry Leader",
            description: "Pooja Shree Chouksey is a visionary leader in education, industry, and social entrepreneurship. As Executive Director of LNCT Group, she has enhanced academic excellence, innovation, and industry-driven programs, bridging the gap between education and real-world expertise. She also oversees businesses in sugar production and ethanol manufacturing while leading Kalakunj Foundation, which empowers women and underprivileged communities through education and skill development. Actively involved with CII Young Indians, she mentors future leaders, driving sustainable growth and social impact.",
            expertise: ["Education", "Mentorship", "Social Impact"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 5,
            name: "Harpreet Kaur Reen",
            photo: "../../images/Enablers/HarpreetKaur.jpg",
            title: "Senior Reporter, IBC 24 News | Crime & Event Journalist",
            description: "Harpreet Kaur Reen, a seasoned journalist with over 15 years of experience, is a senior reporter at IBC 24 News in Bhopal.She has previously worked with Bhaskar Group and Sahara Group and has made a mark in the challenging field of crime reporting, being the only female crime reporter in Bhopal.Harpreet has covered major crime cases and significant national and global events, including the world’s largest religious fair, Maha Kumbh.Dedicated to journalism as her life’s mission, she strives to bring truth to light and help others through her work.",
            expertise: ["Mentorship", "Journalism", "Media", "Social Impact"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 6,
            name: "Sindhu Dholpure",
            photo: "../../images/Enablers/SindhuDholpure.jpg",
            title: "Theatre Director | Kathak Dancer | Social Reformer",
            description: "Sindhu Dhaulpure, Founder of People's Theatre Group, Bhopal, has been transforming lives through theatre, counseling, and social service for over 20 years. A Kathak Scholar and acclaimed theatre director, she has rehabilitated 55+ prisoners through theatre therapy. Her award-winning play Aranya Rudan highlights women’s empowerment. Honored with 50+ national and international awards, she continues to uplift underprivileged talent through free theatre training",
            expertise: ["Social Impact", "Theatre", "Legal", "Dance"],
            region: "Madhya Pradesh",
            yearsOfExperience: 8
        },
        {
            id: 7,
            name: "Darshana Solanki",
            photo: "../../images/Enablers/DarshnaSolanki.jpg",
            title: "Co-founder, Recooty",
            description: "Darshna Solanki is a passionate entrepreneur revolutionizing recruitment with AI-driven solutions. As the Co-founder of Recooty, she helps businesses hire smarter and faster, transforming talent acquisition. With a deep interest in HR innovation and employer branding, she is constantly exploring new ways to streamline hiring and enhance workforce efficiency.",
            expertise: ["IT", "Growth Strategy", "Entrepreneurship"],
            region: "Madhya Pradesh",
            yearsOfExperience: 8
        },
        {
            id: 8,
            name: "Umang Shridhar",
            photo: "../../images/Enablers/UmangShridhar.jpg",
            title: "Founder & Director, UmangShridhar Designs Pvt. Ltd.",
            description: "Umang Shridhar is a visionary entrepreneur and the Founder & Director of UmangShridhar Designs Pvt. Ltd. She is dedicated to sustainable fashion and empowering artisans, creating impactful designs that blend tradition with innovation. Her work focuses on social entrepreneurship and ethical fashion, making a difference in communities while promoting sustainability",
            expertise: ["Textile", "Entrepreneurship", "Fashion"],
            region: "Madhya Pradesh",
            yearsOfExperience: 8
        },
        {
            id: 9,
            name: "Sunila Dubey",
            photo: "../../images/Enablers/SunilaDubey.jpg",
            title: "Founder, Saree Culture India & Odeon Art and Cultural Society National President |  Akhil Bharatiya Brahmin Mahila Prakoshth",
            description: "Sunila Dubey is a cultural ambassador and social leader, dedicated to preserving India’s rich heritage. As the founder of Saree Culture India and Odeon Art and Cultural Society,she actively promotes traditional arts, textiles, and cultural initiatives. In her role as National President of Akhil Bharatiya Brahmin Mahila Prakoshth, she works towards women’s empowerment and social upliftment, making a lasting impact on society.",
            expertise: ["Leadership", "Women Empowerment", "Art"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 10,
            name: "Anita Arya",
            photo: "../../images/Enablers/AnitaArya.jpg",
            title: "President, Damini Ki Awaaz NGO | Social Activist | ICC Member",
            description: "Anita Arya is the President of Damini Ki Awaaz NGO, dedicated to spreading awareness about women’s safety and empowerment through counseling. She is an active ICC member at SSB and Doordarshan, advocating for gender justice. With 10 years of experience, she has received prestigious awards like the National Media Foundation Award (2015) and Bhopal Ratna Vishwa Foundation Award (2016). Passionate about social work, gardening, and music, she continues to make a meaningful impact in society.",
            expertise: ["Awareness", "Women Empowerment", "Social", "Women Safety"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 11,
            name: "Yashashree Chauhan",
            photo: "../../images/Enablers/YashashreeChauhan.jpg",
            title: "MD Homoeopathic Consultant | NGO runner RPBS",
            description: "Dr. Yashashree Chauhan is a dedicated MD Homoeopathic Consultant, committed to holistic healing and patient- centric care.With a passion for alternative medicine, she provides personalized treatments to improve health naturally.Beyond her practice, she is the founder of RPBS, a non - profit working towards social welfare, healthcare awareness, and community development. Through medicine and service, she continues to make a meaningful impact onsociety.",
            expertise: ["Medical", "Women Empowerment", "Social"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 12,
            name: "Poonam shroti",
            photo: "../../images/Enablers/PoonamShroti.jpg",
            title: "Founder Uddip social welfare society | CEO | PaytraQR HR services pvt Ltd",
            description: "Poonam Shroti is a visionary leader and social entrepreneur, dedicated to empowering marginalized communities and driving inclusive social development through Uddip Social Welfare Society.As the CEO of PaytraQR HR Services Pvt.Ltd., she focuses on innovative HR solutions and workforce development.With expertise in leadership, strategy, and social impact, she continues to inspire and create opportunities in both corporate and non- profit sectors.",
            expertise: ["Awareness", "Women Empowerment", "Social", "Leadership"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 13,
            name: "Bhakti Sharma",
            photo: "../../images/Enablers/BhaktiSharma.jpg",
            title: "Sarpanch | Social Reformer | Community Leader",
            description: "Bhakti Sharma is a dedicated Sarpanch who left a promising career in the U.S. to transform her village, Barkhedi Abdullah (Bhopal). A political science graduate and law student, she took charge in 2015-16, winning the elections with a significant margin. Under her leadership, the village saw remarkable progress, including better housing, electricity, water, and sanitation. Recognized among India’s most influential women, Bhakti continues to drive rural development and inspire young leaders.",
            expertise: ["Community Leader", "Women Empowerment", "Social Reformer"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 14,
            name: "Alpa Rawal",
            photo: "../../images/Enablers/AlpaRawal.jpg",
            title: "Founder, DIVYAFAL THE CREATIONS | Fashion Designer | Jury Member",
            description: "Alpa Rawal, the proud founder of DIVYAFAL THE CREATIONS, has been crafting exquisite outfits for 15+ years, delighting 5000+ clients. As the official costume partner for VPR Mrs. India 2021 & 2022 and the Gujarati movie Mukti, she has made a mark in the fashion industry. A jury member for VPR Mrs. India 2022, she has also showcased her designs in Divyafal Couture Saga Season 1 & 2. Based in Bhopal, she actively promotes handloom fashion, collaborating with local artisans to create timeless designs.",
            expertise: ["Fashion Designing", "Textile", "Handloom"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 15,
            name: "CA. Vaishali Baheti",
            photo: "../../images/Enablers/VaishaliBaheti.jpg",
            title: "Chartered Accountant | Financial Expert | Sports Enthusiast",
            description: "CA. Vaishali Baheti is a seasoned Chartered Accountant with 25+ years of expertise in accountancy, audit, taxation, and financial consulting. Holding a DISA qualification and certifications in Forensic Accounting, AI, GST, and Banking Audits, she has served as a judge, Quiz Master, and MOC at ICAI events, showcasing her leadership and public speaking skills. Beyond finance, she actively organizes Lions and Leo Club events and is a university champion in Table Tennis, excelling in badminton and dance as well.",
            expertise: ["Finance", "Accounting", "Taxation"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 16,
            name: "Dr. Rashmi Moghe Hirve",
            photo: "../../images/Enablers/RashmiMoghe.jpg",
            title: "Psychiatrist & Counsellor | Gold Medalist MBBS | Mental Health Expert",
            description: "Dr. Rashmi Moghe Hirve is a highly accomplished psychiatrist and counsellor, holding an MBBS (Gold Medalist), DNB Psychiatry, and multiple PG Diplomas in Counselling & Mental Health. With expertise in treating depression, anxiety, sleep disorders, and migraines, she is dedicated to promoting mental well-being. Certified in Career Counselling from GCC UCLA, she provides personalized therapy and guidance. She consults at Synapse Neurosciences Clinic, Bhopal, offering compassionate care to those in need.",
            expertise: ["Mental Health Expert", "Medical", "Counsellor"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 17,
            name: "RJ Sukriti",
            photo: "../../images/Enablers/RJSukriti.jpg",
            title: "Radio Mirchi",
            description: "RJ Sukriti is a vibrant and charismatic radio personality at Radio Mirchi, known forher engaging voice and energetic hosting style. With her witty storytelling and deep connectionwith listeners, she keeps the audience entertained and informed. Her shows blend music,entertainment, and social insights, making her a favorite among radio lovers. Passionate about creating impactful content, RJ Sukriti continues to bring positivity and fun to the airwaves, making every listener’s day a little brighter!",
            expertise: ["Awareness", "Social Media", "Influencer"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 18,
            name: "Anuradha Joshi",
            photo: "../../images/Enablers/AnuradhaJoshi.jpg",
            title: "Sarpanch & Social Leader",
            description: "Anuradha Joshi, a dedicated leader, has transitioned from being a housewife and part-time LIC agent to an active social activist and political representative. With five years of social work experience, she has been instrumental in community development and is now an active member of BJP, working towards grassroots empowerment and progress.",
            expertise: ["Community Development", "Women Empowerment", "Social Activist"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 19,
            name: "Simran Khurana",
            photo: "../../images/Enablers/SimranKhurana.jpg",
            title: "Brand Media Expert | Creative head | Director",
            description: "With 15+ years of experience, Simrrun Khuurana is a brand media expert, creative head, and director, shaping impactful campaigns, words, and brands. She is also Mrs. Central India Curvy 2023, confidently breaking stereotypes in plus-size fashion. Passionate about storytelling and innovation, she continues to empower brands and redefine beauty standards with creativity and confidence.",
            expertise: ["Beauty", "Media Expert", "Empowerment"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 20,
            name: "Madhuri Mishra",
            photo: "../../images/Enablers/MadhuriMishra.jpg",
            title: "Director, Apna Ghar Old Age Home",
            description: "Madhuri Mishra is a compassionate leader and social worker, dedicated to providing care and dignity to the elderly. As the Director of Apna Ghar Old Age Home, she works tirelessly to create a safe, loving, and supportive environment for senior citizens. Her mission is to ensure that every elder receives the respect, care, and companionship they deserve in their golden years.",
            expertise: ["Leadership", "Women Empowerment", "Companionship"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },
        {
            id: 21,
            name: "Anamika Tiwari",
            photo: "../../images/Enablers/AnamikaTiwari.jpg",
            title: "Visionary Nationalist & Educationist",
            description: "Anamika Tiwari is a nationalist, entrepreneur, and reformer dedicated to transforming India's next generation. A postgraduate in Social Work, she returned to Bharat after a decade abroad to promote Indian Knowledge Systems, long before NEP 2020. She actively teaches Vedic Maths, Sanskrit, and Astronomy to students and professionals, including military and Sainik schools. Passionate about women empowerment, she supports artisans and counsels women facing challenges in India and abroad. Her mission is to decolonize minds and shape a Viksit Bharat by 2047.",
            expertise: ["Entrepreneurship", "Women Empowerment", "Education"],
            region: "Madhya Pradesh",
            yearsOfExperience: 10
        },


    ];

    const [enablers, setEnablers] = useState(allEnablers);
    const [expandedCards, setExpandedCards] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        expertise: [],
        region: [],
        yearsOfExperience: null
    });
    const [showFilters, setShowFilters] = useState(false);
    const [activeEnablers, setActiveEnablers] = useState([]);
    const [isFiltering, setIsFiltering] = useState(false);
    const [selectedEnabler, setSelectedEnabler] = useState(null);

    // Function to handle clicking on an enabler
    const handleEnablerClick = (enabler) => {
        setSelectedEnabler(enabler);
    };

    // Extract unique filter options
    const expertiseOptions = [...new Set(allEnablers.flatMap(enabler => enabler.expertise))];
    const regionOptions = [...new Set(allEnablers.map(enabler => enabler.region))];
    const experienceOptions = [
        { label: "Any experience", value: null },
        { label: "Less than 10 years", value: "lt10" },
        { label: "10-15 years", value: "10to15" },
        { label: "More than 15 years", value: "gt15" }
    ];

    // Toggle card expansion
    const toggleCardExpansion = (enablerId) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(enablerId)) {
                newSet.delete(enablerId);
            } else {
                newSet.add(enablerId);
            }
            return newSet;
        });
    };

    // Apply search and filters
    useEffect(() => {
        setIsFiltering(true);
        // Reset active enablers when filtering starts
        setActiveEnablers([]);

        let filtered = allEnablers;

        // Apply search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                enabler =>
                    enabler.name.toLowerCase().includes(term) ||
                    enabler.title.toLowerCase().includes(term) ||
                    enabler.description.toLowerCase().includes(term)
            );
        }

        // Apply expertise filter
        if (filters.expertise.length > 0) {
            filtered = filtered.filter(enabler =>
                enabler.expertise.some(exp => filters.expertise.includes(exp))
            );
        }

        // Apply region filter
        if (filters.region.length > 0) {
            filtered = filtered.filter(enabler =>
                filters.region.includes(enabler.region)
            );
        }

        // Apply years of experience filter
        if (filters.yearsOfExperience) {
            switch (filters.yearsOfExperience) {
                case 'lt10':
                    filtered = filtered.filter(enabler => enabler.yearsOfExperience < 10);
                    break;
                case '10to15':
                    filtered = filtered.filter(enabler =>
                        enabler.yearsOfExperience >= 10 && enabler.yearsOfExperience <= 15
                    );
                    break;
                case 'gt15':
                    filtered = filtered.filter(enabler => enabler.yearsOfExperience > 15);
                    break;
                default:
                    break;
            }
        }

        setEnablers(filtered);

        // Set filtering to false after a small delay to ensure state updates have been processed
        setTimeout(() => {
            setIsFiltering(false);
        }, 100);
    }, [searchTerm, filters]);

    // Animation effect for cards appearing
    useEffect(() => {
        // Only run animation if we're not in the middle of filtering
        if (!isFiltering) {
            const timer = setTimeout(() => {
                const newActiveEnablers = [];
                enablers.forEach((_, index) => {
                    setTimeout(() => {
                        newActiveEnablers.push(index);
                        setActiveEnablers([...newActiveEnablers]);
                    }, index * 150);
                });
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [enablers, isFiltering]);

    // Toggle expertise filter
    const toggleExpertise = (expertise) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (updated.expertise.includes(expertise)) {
                updated.expertise = updated.expertise.filter(exp => exp !== expertise);
            } else {
                updated.expertise = [...updated.expertise, expertise];
            }
            return updated;
        });
    };

    // Toggle region filter
    const toggleRegion = (region) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (updated.region.includes(region)) {
                updated.region = updated.region.filter(r => r !== region);
            } else {
                updated.region = [...updated.region, region];
            }
            return updated;
        });
    };

    // Set experience filter
    const setExperienceFilter = (value) => {
        setFilters(prev => ({
            ...prev,
            yearsOfExperience: value
        }));
    };

    // Reset all filters
    const resetFilters = () => {
        // Clear active enablers before resetting filters
        setActiveEnablers([]);
        setFilters({
            expertise: [],
            region: [],
            yearsOfExperience: null
        });
        setSearchTerm('');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-[#121212] to-black text-white pb-12 sm:pb-20 px-4 sm:px-6">
                {/* Hero section */}
                <div className="bg-cover bg-center relative">
                    <div className="bg-transparent bg-opacity-60 rounded-lg p-6 sm:p-6">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-white">
                                Meet Our <span className="text-[#48d494]">Enablers</span>
                            </h1>
                            <p className="text-gray-200 max-w-2xl text-base sm:text-lg md:text-xl mb-4 sm:mb-8">
                                Connect with our network of exceptional women leaders who are transforming the entrepreneurial landscape globally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and filter section */}
                <div className="max-w-7xl w-full mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                        <div className="relative w-full sm:w-auto sm:flex-1 max-w-full sm:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full bg-gray-900 border border-gray-700 rounded-md py-2 sm:py-3 pl-8 sm:pl-10 pr-3 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48d494] focus:border-transparent"
                                placeholder="Search by name, title, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto mt-3 sm:mt-0">
                            <button
                                className="flex z-10 items-center gap-1 sm:gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="hidden xs:inline">{showFilters ? "Hide Filters" : "Show Filters"}</span>
                            </button>

                            {(filters.expertise.length > 0 || filters.region.length > 0 || filters.yearsOfExperience) && (
                                <button
                                    className="flex z-10 items-center gap-1 sm:gap-2 bg-[#48d494]/20 hover:bg-[#48d494]/30 text-[#48d494] px-3 sm:px-4 py-2 sm:py-3 rounded-md transition-colors text-sm sm:text-base flex-1 sm:flex-none justify-center"
                                    onClick={resetFilters}
                                >
                                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="hidden xs:inline">Reset Filters</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter panel */}
                    {showFilters && (
                        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Expertise filters */}
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-[#48d494]">Expertise</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {expertiseOptions.map((expertise) => (
                                            <button
                                                key={expertise}
                                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${filters.expertise.includes(expertise)
                                                    ? "bg-[#48d494] text-black"
                                                    : "bg-gray-800 text-white hover:bg-gray-700"
                                                    } transition-colors`}
                                                onClick={() => toggleExpertise(expertise)}
                                            >
                                                {expertise}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Region filters */}
                                <div className="sm:mt-0">
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-[#48d494]">Region</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {regionOptions.map((region) => (
                                            <button
                                                key={region}
                                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${filters.region.includes(region)
                                                    ? "bg-[#48d494] text-black"
                                                    : "bg-gray-800 text-white hover:bg-gray-700"
                                                    } transition-colors`}
                                                onClick={() => toggleRegion(region)}
                                            >
                                                {region}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience filters */}
                                <div className="mt-4 lg:mt-0">
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-[#48d494]">Experience</h3>
                                    <div className="space-y-1 sm:space-y-2">
                                        {experienceOptions.map((option) => (
                                            <div key={option.value || "any"} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={option.value || "any"}
                                                    name="experience"
                                                    checked={filters.yearsOfExperience === option.value}
                                                    onChange={() => setExperienceFilter(option.value)}
                                                    className="h-3 w-3 sm:h-4 sm:w-4 text-[#48d494] focus:ring-[#48d494]"
                                                />
                                                <label htmlFor={option.value || "any"} className="ml-2 text-sm sm:text-base text-gray-200">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enablers grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-2">
                        {enablers.map((enabler, index) => (
                            <div
                                key={enabler.id}
                                className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ${activeEnablers.includes(index)
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                    } ${expandedCards.has(enabler.id) ? 'h-auto' : 'h-auto'}`}
                            >
                                <div className="relative h-48 sm:h-56 md:h-64 group">
                                    <img
                                        src={enabler.photo}
                                        alt={enabler.name}
                                        className="w-full h-full object-contain transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    <div className="absolute bottom-0 left-0 p-3 sm:p-4">
                                        <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{enabler.name}</h3>
                                        <p className="text-[#48d494] text-sm sm:text-base">{enabler.title}</p>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4">
                                    <div className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                                        <p className={`${expandedCards.has(enabler.id) ? '' : 'line-clamp-3'}`}>
                                            {enabler.description}
                                        </p>
                                        {enabler.description.length > 150 && (
                                            <button
                                                onClick={() => toggleCardExpansion(enabler.id)}
                                                className="text-[#48d494] hover:text-[#3bc17f] text-xs sm:text-sm mt-1 focus:outline-none"
                                            >
                                                {expandedCards.has(enabler.id) ? 'Read Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>

                                    <div className="mb-3 sm:mb-4">
                                        <h4 className="text-xs sm:text-sm font-semibold text-gray-400 mb-1 sm:mb-2">Expertise</h4>
                                        <div className="flex flex-wrap gap-1 sm:gap-2">
                                            {enabler.expertise.map(skill => (
                                                <span key={skill} className="bg-gray-800 text-xxs xs:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-gray-300">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs sm:text-sm text-gray-400">{enabler.region}</span>
                                        <span className="text-xs sm:text-sm text-gray-400">{enabler.yearsOfExperience} years</span>
                                    </div>

                                    <button
                                        onClick={() => handleEnablerClick(enabler)}
                                        className="w-full mt-3 sm:mt-4 bg-[#48d494]/10 hover:bg-[#48d494]/20 text-[#48d494] py-1.5 sm:py-2 rounded-md transition-colors border border-[#48d494] font-medium text-xs sm:text-sm"
                                    >
                                        Connect with {enabler.name.split(' ')[0]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {enablers.length === 0 && (
                        <div className="text-center py-8 sm:py-16">
                            <div className="bg-gray-900 rounded-lg p-6 sm:p-8 max-w-lg mx-auto">
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Matches Found</h3>
                                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                                    We couldn't find any enablers matching your search criteria. Try adjusting your filters.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="bg-[#48d494] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-[#3bc17f] transition-colors text-sm sm:text-base"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {selectedEnabler && (
                <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                    <div className="absolute inset-0 backdrop-blur-md bg-opacity-50" onClick={() => setSelectedEnabler(null)}></div>
                    <ConnectPopup
                        enablerName={selectedEnabler.name}
                        onClose={() => setSelectedEnabler(null)}
                    />
                </div>
            )}
        </>
    );
};

export default AllEnablers;