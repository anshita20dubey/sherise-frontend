import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, ArrowRight } from 'lucide-react';
import "./AllEnablers.css";

const AllEnablers = () => {
    // Sample data for enablers (same as in the Enablers component)
    const allEnablers = [
        {
            id: 1,
            name: "Sarah Johnson",
            photo: "https://plus.unsplash.com/premium_photo-1661591471787-4779d0e1b36c?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "CEO & Founder, TechWomen",
            description: "Sarah has been empowering women in tech for over 15 years, helping more than 500 startups secure funding.",
            expertise: ["Funding", "Leadership", "Tech"],
            region: "North America",
            yearsOfExperience: 15
        },
        {
            id: 2,
            name: "Maya Chen",
            photo: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Venture Capitalist, Emerge Capital",
            description: "Maya specializes in early-stage investments for women-led startups, with a portfolio valued at $80M.",
            expertise: ["Venture Capital", "Early-stage Investments", "Finance"],
            region: "Asia",
            yearsOfExperience: 12
        },
        {
            id: 3,
            name: "Priya Mehta",
            photo: "https://images.unsplash.com/photo-1573166475912-1ed8b4f093d2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Founder, WomenRise Foundation",
            description: "Priya's mentorship programs have supported over 2,000 women entrepreneurs across 15 countries.",
            expertise: ["Mentorship", "Non-profit", "Social Impact"],
            region: "Asia",
            yearsOfExperience: 10
        },
        {
            id: 4,
            name: "Amara Nelson",
            photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Partner, Growth Accelerator",
            description: "Amara has facilitated $15M in funding for women-owned businesses in emerging markets.",
            expertise: ["Emerging Markets", "Growth Strategy", "Funding"],
            region: "Africa",
            yearsOfExperience: 8
        },
        {
            id: 5,
            name: "Zoe Rodriguez",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "COO, FemTech Innovations",
            description: "Zoe champions sustainable business practices while mentoring the next generation of women leaders.",
            expertise: ["Sustainability", "Operations", "FemTech"],
            region: "South America",
            yearsOfExperience: 9
        },
        {
            id: 6,
            name: "Elena Kowalski",
            photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Director, Women in STEM Initiative",
            description: "Elena has created educational programs that have helped over 5,000 women enter STEM fields.",
            expertise: ["Education", "STEM", "Policy"],
            region: "Europe",
            yearsOfExperience: 14
        },
        {
            id: 7,
            name: "Layla Washington",
            photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Angel Investor & Mentor",
            description: "Layla has personally invested in 30+ women-led startups and provides ongoing mentorship to founders.",
            expertise: ["Angel Investing", "Mentorship", "Tech"],
            region: "North America",
            yearsOfExperience: 11
        },
        {
            id: 8,
            name: "Fatima Al-Zahra",
            photo: "https://images.unsplash.com/photo-1580894732930-0babd100d356?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Founder, Global Women Entrepreneurs",
            description: "Fatima connects women entrepreneurs across borders, facilitating international partnerships and expansion.",
            expertise: ["Global Markets", "Networking", "Entrepreneurship"],
            region: "Middle East",
            yearsOfExperience: 13
        }
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

    // Extract unique filter options
    const expertiseOptions = [...new Set(allEnablers.flatMap(enabler => enabler.expertise))];
    const regionOptions = [...new Set(allEnablers.map(enabler => enabler.region))];
    const experienceOptions = [
        { label: "Any experience", value: null },
        { label: "Less than 10 years", value: "lt10" },
        { label: "10-15 years", value: "10to15" },
        { label: "More than 15 years", value: "gt15" }
    ];
    const [activeSection, setActiveSection] = useState('home');
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const statsRef = useRef(null);
    const enablersRef = useRef(null); // New ref for enablers section
    const contactRef = useRef(null);


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

    const scrollToSection = (sectionId) => {
        const sectionRefs = {
            home: homeRef,
            about: aboutRef,
            stats: statsRef,
            enablers: enablersRef, // Add enablers to the sections
            contact: contactRef
        };

        if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
            sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <>
            <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 px-6 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    SheRise<span className="text-emerald-400">Club</span>
                </div>
                <div className="flex space-x-8 text-white">
                    <a
                        href="#home"
                        onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                        className={`relative group ${activeSection === 'home' ? 'text-emerald-400' : ''}`}
                    >
                        <span className="hover:text-emerald-400 transition-colors">Home</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                    <a
                        href="#stats"
                        onClick={(e) => { e.preventDefault(); scrollToSection('stats'); }}
                        className={`relative group ${activeSection === 'stats' ? 'text-emerald-400' : ''}`}
                    >
                        <span className="hover:text-emerald-400 transition-colors">About</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'stats' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                    {/* New Enablers navigation item */}
                    <a
                        href="#enablers"
                        onClick={(e) => { e.preventDefault(); scrollToSection('enablers'); }}
                        className={`relative group ${activeSection === 'enablers' ? 'text-emerald-400' : ''}`}
                    >
                        <span className="hover:text-emerald-400 transition-colors">Enablers</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'enablers' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                        className={`relative group ${activeSection === 'contact' ? 'text-emerald-400' : ''}`}
                    >
                        <span className="hover:text-emerald-400 transition-colors">Contact</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                </div>
                <button className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-2 rounded-md transition-colors flex items-center">
                    Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </nav>
            <div className="min-h-screen pt-20 bg-gradient-to-b from-[#121212] to-black text-white pb-20">
                {/* Hero section */}
                <div className="bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-black bg-opacity-60">
                        <div className="max-w-7xl mx-auto px-6 py-24">
                            <h1 className="text-5xl font-bold mb-4 text-white">
                                Meet Our <span className="text-[#48d494]">Enablers</span>
                            </h1>
                            <p className="text-gray-200 max-w-2xl text-xl mb-8">
                                Connect with our network of exceptional women leaders who are transforming the entrepreneurial landscape globally.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and filter section */}
                <div className="max-w-7xl w-full mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full bg-gray-900 border border-gray-700 rounded-md py-3 pl-10 pr-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48d494] focus:border-transparent"
                                placeholder="Search by name, title, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                className="flex z-10 items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-md transition-colors"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-5 w-5" />
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </button>

                            {(filters.expertise.length > 0 || filters.region.length > 0 || filters.yearsOfExperience) && (
                                <button
                                    className="flex z-10 items-center gap-2 bg-[#48d494]/20 hover:bg-[#48d494]/30 text-[#48d494] px-4 py-3 rounded-md transition-colors"
                                    onClick={resetFilters}
                                >
                                    <X className="h-5 w-5" />
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter panel */}
                    {showFilters && (
                        <div className="bg-gray-900 rounded-lg p-6 mb-8 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Expertise filters */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[#48d494]">Expertise</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {expertiseOptions.map((expertise) => (
                                            <button
                                                key={expertise}
                                                className={`px-3 py-1 rounded-full text-sm ${filters.expertise.includes(expertise)
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
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[#48d494]">Region</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {regionOptions.map((region) => (
                                            <button
                                                key={region}
                                                className={`px-3 py-1 rounded-full text-sm ${filters.region.includes(region)
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
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 text-[#48d494]">Experience</h3>
                                    <div className="space-y-2">
                                        {experienceOptions.map((option) => (
                                            <div key={option.value || "any"} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={option.value || "any"}
                                                    name="experience"
                                                    checked={filters.yearsOfExperience === option.value}
                                                    onChange={() => setExperienceFilter(option.value)}
                                                    className="h-4 w-4 text-[#48d494] focus:ring-[#48d494]"
                                                />
                                                <label htmlFor={option.value || "any"} className="ml-2 text-gray-200">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-2 pt-35">
                        {enablers.map((enabler, index) => (
                            <div
                                key={enabler.id}
                                className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 ${activeEnablers.includes(index)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                                    }`}
                            >
                                <div className="relative h-64 group">
                                    <img
                                        src={enabler.photo}
                                        alt={enabler.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    <div className="absolute bottom-0 left-0 p-4">
                                        <h3 className="text-xl font-bold text-white mb-1">{enabler.name}</h3>
                                        <p className="text-[#48d494]">{enabler.title}</p>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="text-gray-300 mb-4 line-clamp-3">{enabler.description}</p>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Expertise</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {enabler.expertise.map(skill => (
                                                <span key={skill} className="bg-gray-800 text-xs px-2 py-1 rounded-full text-gray-300">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">{enabler.region}</span>
                                        <span className="text-sm text-gray-400">{enabler.yearsOfExperience} years</span>
                                    </div>

                                    <button className="w-full mt-4 bg-[#48d494]/10 hover:bg-[#48d494]/20 text-[#48d494] py-2 rounded-md transition-colors border border-[#48d494] font-medium">
                                        Connect with {enabler.name.split(' ')[0]}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty state */}
                    {enablers.length === 0 && (
                        <div className="text-center py-16">
                            <div className="bg-gray-900 rounded-lg p-8 max-w-lg mx-auto">
                                <h3 className="text-2xl font-bold text-white mb-2">No Matches Found</h3>
                                <p className="text-gray-300 mb-6">
                                    We couldn't find any enablers matching your search criteria. Try adjusting your filters.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="bg-[#48d494] text-black px-6 py-3 rounded-md font-medium hover:bg-[#3bc17f] transition-colors"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllEnablers;