import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const PodcastPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    // Sample podcast data - replace with your actual podcasts
    const podcasts = [
        {
            id: 1,
            title: "Nirmatri 2.0",
            description: "Exploring the intersection of creativity and mindful living!",
            platform: "Instagram",
            link: "https://www.instagram.com/p/C9H100lRoCV/",
            image: "../../images/Podcasts/Sicsatna.png"
        },
        {
            id: 2,
            title: "Aarohini",
            description: "Empowering Women Startups in Sagar!",
            platform: "Instagram",
            link: "https://www.instagram.com/reel/C1Wv0inoSvI/",
            image: "../../images/Podcasts/Spark.jpg"
        },
        {
            id: 3,
            title: "RISE Jhansi Hackathon 2.0",
            description: "Exciting conversation about one of the biggest innovation events in Jhansi—Young Innovators' Conclave & RISE Jhansi Hackathon 2.0! ",
            platform: "Instagram",
            link: "https://www.instagram.com/reel/DAs28MCvfye/",
            image: "../../images/Podcasts/PriyankaJain2.jpg"
        },
        {
            id: 4,
            title: "Dedicated Resources Series",
            description: "Explore proven strategies and innovative approaches to fostering a motivated and committed workforce.",
            platform: "Instagram",
            link: "https://www.instagram.com/reel/C_5WBo7vb5E/",
            image: "../../images/Podcasts/TishyaAgrawal1.jpg"
        },
        {
            id: 5,
            title: "Dedicated Resources Series",
            description: "Get ready to dive deep into the fascinating world of dedicated resources with our insightful host Tishya Agarwal.",
            platform: "Instagram",
            link: "https://www.instagram.com/reel/C9KF7GbSRes/",
            image: "../../images/Podcasts/TishyaAgrawal2.jpg"
        },
        {
            id: 6,
            title: "Women Entrepreneurship Development Cell",
            description: "Get ready to embark on an empowering journey with Priyanka Jain, startup consultant at RISE Jhansi Incubation Center",
            platform: "Instagram",
            link: "https://www.instagram.com/reel/C86qI5JSlcE/",
            image: "../../images/Podcasts/PriyankaJain1.jpg"
        },

    ];

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />



            {/* Hero Section with improved mobile responsiveness */}
            <div className="relative w-full py-10 sm:py-16 md:py-20 lg:py-12 bg-gradient-to-r from-black to-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 pt-12 sm:pt-8">
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
                <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center text-white px-2 sm:px-0 break-words">
                        <span className="text-[#48d494]">Sherise</span> Club Podcasts
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl text-center">
                        Tune in to conversations that inspire, inform, and entertain
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                        <span className="mr-2">Featured</span>
                        <span className="h-1 w-16 bg-[#48d494]"></span>
                    </h2>

                    {/* Featured Podcast */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[#48d494]/20 hover:shadow-xl">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 h-56 md:h-auto">
                                <img
                                    src="../../images/Podcasts/Sicsatna.png"
                                    alt="Featured podcast cover"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="w-full md:w-2/3 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <div className="inline-block px-3 py-1 bg-[#48d494] text-black text-sm font-semibold rounded-full mb-4">
                                        LATEST EPISODE
                                    </div>
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Nirmatri 2.0</h3>
                                    <p className="text-gray-300 mb-6">Join us for an inspiring journey with Nirmatri 2.0! We're thrilled to announce our latest initiative designed to support and empower women entrepreneurs.</p>
                                    <div className="flex items-center text-sm text-gray-400 mb-6">
                                        <span className="mr-4">45 min</span>
                                        <span>July 7, 2024</span>
                                    </div>
                                </div>
                                <a
                                    href="https://www.instagram.com/p/C9H100lRoCV/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#48d494] hover:bg-[#3ab87d] text-black font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-center"
                                >
                                    Listen Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Podcasts Grid */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center">
                        <span className="mr-2">All Episodes</span>
                        <span className="h-1 w-16 bg-[#48d494]"></span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {podcasts.map((podcast, index) => (
                            <div
                                key={podcast.id}
                                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[#48d494]/20 hover:shadow-xl"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <div className="relative overflow-hidden h-40 sm:h-48">
                                    <img
                                        src={podcast.image}
                                        alt={podcast.title}
                                        className={`w-full h-full object-contain transition-all duration-500 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                                    />
                                    <div className="absolute top-3 right-3 bg-[#48d494] text-black text-xs font-bold px-2 py-1 rounded">
                                        {podcast.platform}
                                    </div>
                                </div>
                                <div className="p-4 sm:p-5">
                                    <h3 className="text-lg sm:text-xl font-bold mb-2">{podcast.title}</h3>
                                    <p className="text-gray-400 text-sm mb-4">{podcast.description}</p>
                                    <a
                                        href={podcast.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-[#48d494] hover:text-white transition-colors duration-200"
                                    >
                                        <span className="mr-2">Listen</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Subscribe Section */}
                <div className="bg-gray-900 rounded-lg p-6 sm:p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="w-full md:w-2/3 mb-6 md:mb-0">
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Subscribe to <span className="text-[#48d494]">Sherise Club</span></h2>
                            <p className="text-gray-300">Never miss an episode. Get notified when new content drops.</p>
                        </div>
                        <div className="w-full md:w-1/3">
                            <div className="flex justify-center md:justify-end">
                                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="mr-4 bg-black hover:bg-gray-800 p-3 rounded-full transition-all duration-200">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                    </svg>
                                </a>
                                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="mr-4 bg-black hover:bg-gray-800 p-3 rounded-full transition-all duration-200">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5.343 21.602C5.4 21.801 5.599 21.96 5.818 21.96H8.46L6.873 24h-1.06c-.22 0-.418-.158-.457-.36l-1.22-6.119 1.207 4.081zm9.96-13.44c0 .258.199.46.438.46.24 0 .44-.2.44-.46 0-.239-.2-.44-.44-.44-.239 0-.438.201-.438.44zm8.078 4.259v-.699c0-.78-.62-1.4-1.4-1.4H2.02c-.78 0-1.4.62-1.4 1.4v.699h22.761zM.031 14.532l1.509 7.587c.14.719.759 1.24 1.47 1.24H21c.71 0 1.329-.521 1.46-1.24l1.509-7.587H.031zm6.54-1.939c0-3.658 2.92-6.615 6.551-6.62h.002c.841-.015 1.68.137 2.466.431.88.329 1.68.853 2.354 1.526.674.673 1.198 1.474 1.526 2.352.294.788.446 1.628.431 2.47 0 .46-.371.831-.83.831-.458 0-.83-.371-.83-.83.014-.671-.112-1.339-.368-1.969-.285-.705-.74-1.352-1.325-1.934-.586-.582-1.229-1.037-1.933-1.321-.631-.256-1.298-.382-1.969-.368-3.04.005-5.506 2.487-5.506 5.532H6.57zm8.43-6.579c0 .258.199.46.438.46.24 0 .44-.202.44-.46 0-.24-.2-.44-.44-.44-.239 0-.438.2-.438.44z" />
                                    </svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-black hover:bg-gray-800 p-3 rounded-full transition-all duration-200">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PodcastPage;