import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Enablers = ({ enablersRef, isVisible }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    // Sample data for enablers
    const enablers = [
        {
            name: "Sarah Johnson",
            photo: "https://plus.unsplash.com/premium_photo-1661591471787-4779d0e1b36c?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "CEO & Founder, TechWomen",
            description: "Sarah has been empowering women in tech for over 15 years, helping more than 500 startups secure funding."
        },
        {
            name: "Maya Chen",
            photo: "https://images.unsplash.com/photo-1610631066894-62452ccb927c?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Venture Capitalist, Emerge Capital",
            description: "Maya specializes in early-stage investments for women-led startups, with a portfolio valued at $80M."
        },
        {
            name: "Priya Mehta",
            photo: "https://images.unsplash.com/photo-1573166475912-1ed8b4f093d2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Founder, WomenRise Foundation",
            description: "Priya's mentorship programs have supported over 2,000 women entrepreneurs across 15 countries."
        },
        {
            name: "Amara Nelson",
            photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Partner, Growth Accelerator",
            description: "Amara has facilitated $15M in funding for women-owned businesses in emerging markets."
        },
        {
            name: "Zoe Rodriguez",
            photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "COO, FemTech Innovations",
            description: "Zoe champions sustainable business practices while mentoring the next generation of women leaders."
        }
    ];

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === enablers.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? enablers.length - 1 : prevIndex - 1));
    };

    // Navigate to all enablers page
    const handleConnect = () => {
        navigate('/allenablers');
    };

    // Auto rotate slides
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={enablersRef}
            id="enablers"
            className="py-24 bg-gradient-to-b from-[#121212] to-black text-white"
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className={`text-center mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <h2 className="text-4xl font-bold mb-4 text-white">
                        Our <span className="text-[#48d494]">Enablers</span>
                    </h2>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Meet the exceptional women leaders who inspire, mentor, and empower our community
                        to build the next generation of groundbreaking startups.
                    </p>
                </div>

                <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    {/* Slider navigation arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-3 z-10 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-3 z-10 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    <div ref={sliderRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {enablers.map((enabler, index) => (
                                <div key={index} className="min-w-full p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="relative group w-full max-w-sm h-60 overflow-hidden rounded-lg shadow-lg mx-auto">
                                            {/* Photo with overlay */}
                                            <img
                                                src={enabler.photo}
                                                alt={enabler.name}
                                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-30"
                                            />

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-[#48d494]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-black">
                                                <h3 className="text-xl font-bold mb-2">{enabler.name}</h3>
                                                <p className="text-sm font-medium mb-2">{enabler.title}</p>
                                                <p className="text-xs text-center">{enabler.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <h3 className="text-3xl font-bold mb-3 text-[#48d494] animate-fade-in-up">{enabler.name}</h3>
                                            <p className="text-xl text-white mb-6">{enabler.title}</p>
                                            <p className="text-gray-300 mb-8 leading-relaxed">{enabler.description}</p>
                                            <div className="w-16 h-1 bg-[#48d494] mb-8"></div>
                                            <button
                                                onClick={handleConnect}
                                                className="self-start bg-transparent hover:bg-[#48d494]/20 text-[#48d494] border border-[#48d494] px-6 py-2 rounded-md transition-colors duration-300"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {enablers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#48d494] w-6' : 'bg-gray-500'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View all enablers button */}
                <div className={`text-center mt-16 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <button
                        onClick={() => navigate('/allenablers')}
                        className="bg-[#48d494] text-black px-8 py-3 rounded-md font-medium hover:bg-[#3bc17f] transition-colors inline-flex items-center"
                    >
                        View All Enablers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Enablers;