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
            name: "Neha Tiwari",
            photo: "../../images/Enablers/NehaTiwari.png",
            title: "Startup Angel Investor",
            description: "Mrs Universe Aesthetic 2024, Mrs Indian Ocean Universe 2024, Winner of Mrs Central India 2023, Mrs. MP 2022 RU"
        },
        {
            name: "Priya Tiwari",
            photo: "../../images/Enablers/PriyaTiwari.png",
            title: "North Zone Winner",
            description: "Walked at Bombay Times, First Runner up"
        },
        {
            name: "Poojashree Chouksey",
            photo: "../../images/Enablers/PoojashreeChouksey.png",
            title: "Executive Director of the LNCT Group",
            description: "Founded the Kalakunj Foundation",
        },
        {
            name: "Harpreet Kaur Reen",
            photo: "../../images/Enablers/HarpreetKaur.jpg",
            title: "Senior Reporter, IBC 24 NEWS",
            description: "Harpreet is working in the capital Bhopal with the beat of crime reporter in reporting.",
        },
        {
            name: "Sindhu Dholpure",
            photo: "../../images/Enablers/SindhuDholpure.jpg",
            title: "Founder, People's Theatre Group",
            description: "Sindhu is Kathak Dancer, Theatre Practitioner, Counsellor Family Court Bhopal, Child Counsellor Mahila avam Bal Vikas Bhopal, Social Worker..",
        },
        {
            name: "Darshana Solanki",
            photo: "../../images/Enablers/DarshnaSolanki.jpg",
            title: "Co-founder, Recooty",
            description: "Passionate about revolutionizing recruitment with AI-driven solutions",
        },
        {
            name: "Umang Shridhar",
            photo: "../../images/Enablers/UmangShridhar.jpg",
            title: "Founder/Director, UmangShridhar Designs Private limited",
            description: "Passionate about revolutionizing recruitment with AI-driven solutions",
        },
        {
            name: "Sunila Dubey",
            photo: "../../images/Enablers/SunilaDubey.jpg",
            title: "Founder of Saree culture India, Odeon art and cultural society",
            description: "अखिल भारतीय ब्राह्मण महिला प्रकोष्ठ राष्ट्रीय अध्यक्ष",
        },
        {
            name: "Anita Arya",
            photo: "../../images/Enablers/AnitaArya.jpg",
            title: "President, Damini ki Awaaz-NGO",
            description: "Working member in ICC(SSB, DoorDarshan)",
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
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={enablersRef}
            id="enablers"
            className="py-12 md:py-24 bg-gradient-to-b from-[#121212] to-black text-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className={`text-center mb-8 md:mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                        Our <span className="text-[#48d494]">Enablers</span>
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
                        Meet the exceptional women leaders who inspire, mentor, and empower our community
                        to build the next generation of groundbreaking startups.
                    </p>
                </div>

                <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    {/* Slider navigation arrows - hidden on smallest screens */}
                    <button
                        onClick={prevSlide}
                        className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 md:p-3 z-10 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 md:p-3 z-10 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </button>

                    <div ref={sliderRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {enablers.map((enabler, index) => (
                                <div key={index} className="min-w-full p-2 md:p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                        {/* Photo container - make it square on mobile */}
                                        <div className="relative group w-full aspect-square md:aspect-auto md:h-60 overflow-hidden rounded-lg shadow-lg mx-auto">
                                            {/* Photo with overlay */}
                                            <img
                                                src={enabler.photo}
                                                alt={enabler.name}
                                                className="w-full h-full object-cover md:object-contain transition-opacity duration-300 group-hover:opacity-30"
                                            />

                                            {/* Hover overlay - visible on tap for mobile */}
                                            <div className="absolute inset-0 bg-[#48d494]/80 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-black">
                                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">{enabler.name}</h3>
                                                <p className="text-xs md:text-sm font-medium mb-1 md:mb-2">{enabler.title}</p>
                                                <p className="text-xs text-center line-clamp-4 md:line-clamp-none">{enabler.description}</p>
                                            </div>
                                        </div>

                                        {/* Text content */}
                                        <div className="flex flex-col justify-center mt-4 md:mt-0">
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[#48d494] animate-fade-in-up">{enabler.name}</h3>
                                            <p className="text-lg md:text-xl text-white mb-3 md:mb-6">{enabler.title}</p>
                                            <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">{enabler.description}</p>
                                            <div className="w-12 md:w-16 h-1 bg-[#48d494] mb-4 md:mb-8"></div>
                                            <button
                                                onClick={handleConnect}
                                                className="self-start bg-transparent hover:bg-[#48d494]/20 text-[#48d494] border border-[#48d494] px-4 md:px-6 py-1 md:py-2 text-sm md:text-base rounded-md transition-colors duration-300"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile navigation arrows */}
                    <div className="flex justify-between sm:hidden mt-4">
                        <button
                            onClick={prevSlide}
                            className="bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Pagination dots */}
                    <div className="flex justify-center mt-4 md:mt-8 space-x-1 md:space-x-2">
                        {enablers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#48d494] w-4 md:w-6' : 'bg-gray-500'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View all enablers button */}
                <div className={`text-center mt-8 md:mt-16 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                    <button
                        onClick={() => navigate('/allenablers')}
                        className="bg-[#48d494] text-black px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-md font-medium hover:bg-[#3bc17f] transition-colors inline-flex items-center"
                    >
                        View All Enablers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Enablers;