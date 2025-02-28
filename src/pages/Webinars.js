import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const WebinarsPage = () => {
    // Sample webinar data - replace with your actual webinar information
    const navigate = useNavigate();
    const webinars = [
        {
            id: 1,
            title: "Marketing Channels: Diversification And Integration",
            description: "We are delighted to announce an exclusive session with Nabomita Mazumdar, President of India Awardee and Founder of Nabomita.com!",
            date: "July 03, 2024",
            duration: "64 minutes",
            thumbnail: "../../images/webinars/Marketing.png",
            youtubeLink: "https://www.youtube.com/watch?v=4K8E3uvjxoQ"
        },
        {
            id: 2,
            title: "Performance Marketing Metrics & Optimization",
            description: "Jabalpur Incubation Center invites you to an exclusive webinar that will unlock the secrets of performance marketing. Whether you're a marketing novice or a seasoned pro, this session is packed with insights to supercharge your campaigns.",
            date: "June 13, 2024",
            duration: "29 minutes",
            thumbnail: "../../images/webinars/Performance.png",
            youtubeLink: "https://www.youtube.com/watch?v=Y42Tcel48hI"
        },
        {
            id: 3,
            title: "Annual Compliance for Startups",
            description: "Join us for a power-packed webinar on April 13th at 12 PM, to dive deep into the intricacies of Annual Compliance for Startups with Ms. Devagya Mukharji, HOD of MBA Department BTIRT College.",
            date: "April 13, 2024",
            duration: "27 minutes",
            thumbnail: "../../images/webinars/Annual.png",
            youtubeLink: "https://www.youtube.com/watch?v=Y_sa4B3ATSQ"
        },
        {
            id: 4,
            title: "Comprehensive Financial Report: P&L, Balance Sheet, Cash Flow Statements",
            description: "Join us for an enlightening session organized by Satna Incubation center.",
            date: "September 8, 2023",
            duration: "25 minutes",
            thumbnail: "../../images/webinars/Comprehensive.png",
            youtubeLink: "https://www.youtube.com/watch?v=l4sPStuvOTA"
        }
    ];

    const [filter, setFilter] = useState('all');

    // Filter webinars based on selection
    const filteredWebinars = filter === 'all'
        ? webinars
        : webinars.filter(webinar => {
            const webinarDate = new Date(webinar.date);
            const today = new Date();
            if (filter === 'upcoming') {
                return webinarDate > today;
            } else {
                return webinarDate <= today;
            }
        });

    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <Navbar />

            {/* Hero Section */}
            <section className="relative px-4 py-10 pt-18 md:py-12 bg-gray-900">
                <div className="container mx-auto pt-12 sm:pt-8">
                    {/* Better positioned Back Button */}
                    <button
                        onClick={() => navigate('/resources')}
                        className="flex items-center px-4 py-2 rounded-lg bg-gray-900 hover:bg-[#48d494] text-white hover:text-black transition-all duration-200 mb-6 sm:mb-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                </div>
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Expert <span className="text-[#48d494]">Webinars</span></h2>
                    <p className="max-w-2xl mx-auto text-base md:text-xl text-gray-300 mb-5 px-2">
                        Access premium content designed to help you grow personally and professionally
                    </p>

                    {/* Filter options */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full border ${filter === 'all' ? 'bg-[#48d494] text-gray-900 border-[#48d494]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-[#48d494]'}`}
                        >
                            All Webinars
                        </button>
                        <button
                            onClick={() => setFilter('upcoming')}
                            className={`px-3 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full border ${filter === 'upcoming' ? 'bg-[#48d494] text-gray-900 border-[#48d494]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-[#48d494]'}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setFilter('past')}
                            className={`px-3 py-1 md:px-6 md:py-2 text-sm md:text-base rounded-full border ${filter === 'past' ? 'bg-[#48d494] text-gray-900 border-[#48d494]' : 'bg-transparent text-gray-300 border-gray-600 hover:border-[#48d494]'}`}
                        >
                            Past Webinars
                        </button>
                    </div>
                </div>
            </section>

            {/* Webinars Grid */}
            <section className="py-6 md:py-10 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {filteredWebinars.map((webinar) => (
                            <div key={webinar.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                                <a href={webinar.youtubeLink} target="_blank" rel="noopener noreferrer" className="block relative">
                                    <img
                                        src={webinar.thumbnail}
                                        alt={webinar.title}
                                        className="w-full h-40 sm:h-44 md:h-48 object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-[#48d494] rounded-full p-2 md:p-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </a>
                                <div className="p-4 md:p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs md:text-sm text-[#48d494]">{webinar.date}</span>
                                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{webinar.duration}</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 hover:text-[#48d494] transition-colors line-clamp-2">
                                        <a href={webinar.youtubeLink} target="_blank" rel="noopener noreferrer">
                                            {webinar.title}
                                        </a>
                                    </h3>
                                    <p className="text-gray-400 mb-4 text-sm md:text-base line-clamp-3">{webinar.description}</p>
                                    <a
                                        href={webinar.youtubeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-[#48d494] hover:text-white border border-[#48d494] hover:bg-[#48d494] px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base transition-colors duration-300"
                                    >
                                        Watch Now
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default WebinarsPage;