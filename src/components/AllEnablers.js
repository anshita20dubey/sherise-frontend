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
            title: "Startup Angel Investor",
            description: "Mrs Universe Aesthetic 2024, Mrs Indian Ocean Universe 2024, Winner of Mrs Central India 2023, Mrs. MP 2022 RU",
            expertise: ["Funding", "Leadership", "Tech"],
            region: "Bhopal",
            yearsOfExperience: 15
        },
        {
            id: 2,
            name: "Priya Tiwari",
            photo: "../../images/Enablers/PriyaTiwari.jpg",
            title: "North Zone Winner",
            description: "Walked at Bombay Times, First Runner up",
            expertise: ["Venture Capital", "Early-stage Investments", "Beauty"],
            region: "India",
            yearsOfExperience: 12
        },
        {
            id: 3,
            name: "Preeti Chaudhary",
            photo: "../../images/Enablers/PreetiChaudhary.jpg",
            title: "North Zone Winner",
            description: "Walked at Bombay Times, First Runner up",
            expertise: ["Venture Capital", "Early-stage Investments", "Beauty"],
            region: "India",
            yearsOfExperience: 12
        },
        {
            id: 4,
            name: "Poojashree Chouksey",
            photo: "../../images/Enablers/PoojashreeChouksey.jpg",
            title: "Executive Director of the LNCT Group",
            description: "Founded the Kalakunj Foundation",
            expertise: ["Mentorship", "Non-profit", "Social Impact"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 5,
            name: "Harpreet Kaur Reen",
            photo: "../../images/Enablers/HarpreetKaur.jpg",
            title: "Senior Reporter, IBC 24 NEWS",
            description: "Harpreet is working in the capital Bhopal with the beat of crime reporter in reporting.",
            expertise: ["Mentorship", "Non-profit", "Social Impact"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 6,
            name: "Sindhu Dholpure",
            photo: "../../images/Enablers/SindhuDholpure.jpg",
            title: "Founder, People's Theatre Group",
            description: "Sindhu is Kathak Dancer, Theatre Practitioner, Counsellor Family Court Bhopal, Child Counsellor Mahila avam Bal Vikas Bhopal, Social Worker..",
            expertise: ["Emerging Markets", "Growth Strategy", "Funding"],
            region: "Bhopal",
            yearsOfExperience: 8
        },
        {
            id: 7,
            name: "Darshana Solanki",
            photo: "../../images/Enablers/DarshnaSolanki.jpg",
            title: "Co-founder, Recooty",
            description: "Passionate about revolutionizing recruitment with AI-driven solutions",
            expertise: ["Emerging Markets", "Growth Strategy", "Funding"],
            region: "Bhopal",
            yearsOfExperience: 8
        },
        {
            id: 8,
            name: "Umang Shridhar",
            photo: "../../images/Enablers/UmangShridhar.jpg",
            title: "Founder/Director, UmangShridhar Designs Private limited",
            description: "Passionate about revolutionizing recruitment with AI-driven solutions",
            expertise: ["Emerging Markets", "Growth Strategy", "Funding"],
            region: "Bhopal",
            yearsOfExperience: 8
        },
        {
            id: 9,
            name: "Sunila Dubey",
            photo: "../../images/Enablers/SunilaDubey.jpg",
            title: "Founder of Saree culture India, Odeon art and cultural society",
            description: "अखिल भारतीय ब्राह्मण महिला प्रकोष्ठ राष्ट्रीय अध्यक्ष",
            expertise: ["Awareness", "Women Empowerment", "Art"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 10,
            name: "Anita Arya",
            photo: "../../images/Enablers/AnitaArya.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 11,
            name: "Yashashree Chauhan",
            photo: "../../images/Enablers/YashashreeChauhan.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 12,
            name: "Poonam shroti",
            photo: "../../images/Enablers/PoonamShroti.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 13,
            name: "Bhakti Sharma",
            photo: "../../images/Enablers/BhaktiSharma.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 14,
            name: "Alpa Rawal",
            photo: "../../images/Enablers/AlpaRawal.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 15,
            name: "CA. Vaishali Baheti",
            photo: "../../images/Enablers/VaishaliBaheti.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 16,
            name: "Dr. Rashmi Moghe Hirve",
            photo: "../../images/Enablers/RashmiMoghe.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 17,
            name: "RJ Sukriti",
            photo: "../../images/Enablers/RJSukriti.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },
        {
            id: 18,
            name: "Anuradha Joshi",
            photo: "../../images/Enablers/AnuradhaJoshi.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
            expertise: ["Awareness", "Women Empowerment", "Social"],
            region: "Bhopal",
            yearsOfExperience: 10
        },


    ];

    const [enablers, setEnablers] = useState(allEnablers);
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
                    <div className="bg-black bg-opacity-60 rounded-lg p-6 sm:p-6">
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
                                    }`}
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
                                    <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm line-clamp-3">{enabler.description}</p>

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