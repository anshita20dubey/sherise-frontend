import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

const Events = () => {
    // Get current date for filtering past/upcoming events
    const currentDate = new Date();

    // Sample events data - replace with your actual events
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Udyogini 3.0",
            date: "June 26, 2024",
            dateObj: new Date(2025, 2, 10), // Month is 0-indexed
            time: "6:00 PM - 8:00 PM",
            location: "Jabalpur",
            description: "Through mentorship programs, workshops, and networking events, aspiring female entrepreneurs gain insights and knowledge crucial for shaping their vision. ",
            link: "https://www.facebook.com/story.php?story_fbid=1022352226559897&id=100063553887190&rdid=wVOahP4oAKZUlZQV",
            category: "event",
            coverImage: "../../images/Events/Udhyogini.jpg",
            imageAlt: "Udyogini 3.0"
        },
        {
            id: 2,
            title: "Nirmatri 2.0",
            date: "February 8, 2025",
            dateObj: new Date(2025, 2, 15),
            time: "7:00 PM - 10:00 PM",
            location: "Satna",
            description: "Unlocking the Power of Meta Ads. Women entrepreneurs explored the potential of Meta Ads to scale their businesses, drive engagement, and maximize ROI in the digital landscape.",
            link: "https://www.facebook.com/story.php?story_fbid=652056927176134&id=100071154977203&rdid=NFqQ8PzFOr8LPxgG",
            category: "event",
            coverImage: "../images/Events/Nirmatri.jpg",
            imageAlt: "Networking Mixer Event"
        },
    ]);

    // Filter states
    const [categoryFilter, setCategoryFilter] = useState('all'); // all, event, workshop
    const [timeFilter, setTimeFilter] = useState('all'); // all, upcoming, past

    // Filtered events based on category and time
    const filteredEvents = events.filter(event => {
        // Category filter
        const passesCategory = categoryFilter === 'all' || event.category === categoryFilter;

        // Time filter
        let passesTime = true;
        if (timeFilter === 'upcoming') {
            passesTime = event.dateObj > currentDate;
        } else if (timeFilter === 'past') {
            passesTime = event.dateObj < currentDate;
        }

        return passesCategory && passesTime;
    });

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Filter Section */}
            <div className="container mx-auto px-4 py-8 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
                <div className="mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center">Filter Events</h2>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <button
                            onClick={() => setCategoryFilter('all')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${categoryFilter === 'all' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            All Categories
                        </button>
                        <button
                            onClick={() => setCategoryFilter('event')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${categoryFilter === 'event' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            Events
                        </button>
                        <button
                            onClick={() => setCategoryFilter('workshop')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${categoryFilter === 'workshop' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            Workshops
                        </button>
                    </div>

                    {/* Time Filters */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        <button
                            onClick={() => setTimeFilter('all')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${timeFilter === 'all' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => setTimeFilter('upcoming')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${timeFilter === 'upcoming' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setTimeFilter('past')}
                            className={`px-3 py-1 sm:px-6 sm:py-2 text-xs sm:text-sm rounded-full border border-[#48d494] font-medium transition-all ${timeFilter === 'past' ? 'bg-[#48d494] text-black' : 'bg-transparent text-[#48d494] hover:bg-[#48d494]/10'
                                }`}
                        >
                            Past
                        </button>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <a
                                href={event.link}
                                key={event.id}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-black border border-gray-800 rounded-lg overflow-hidden hover:border-[#48d494] transition-all hover:shadow-[0_0_15px_rgba(72,212,148,0.3)]"
                            >
                                {/* Cover Image */}
                                <div className="relative h-40 sm:h-48 overflow-hidden">
                                    <img
                                        src={event.coverImage}
                                        alt={event.imageAlt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${event.category === 'workshop'
                                            ? 'bg-[#48d494]/20 text-[#48d494]'
                                            : 'bg-white/10 text-white'
                                            }`}>
                                            {event.category === 'workshop' ? 'Workshop' : 'Event'}
                                        </span>
                                    </div>

                                    {/* Past/Upcoming Badge */}
                                    {event.dateObj < currentDate && (
                                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-700/80 text-gray-300">
                                                Past
                                            </span>
                                        </div>
                                    )}
                                    {event.dateObj > currentDate && (
                                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#48d494]/30 text-[#48d494]">
                                                Upcoming
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="h-1 bg-[#48d494] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                                <div className="p-4 sm:p-6">
                                    <div className="flex justify-end items-start mb-2 sm:mb-4">
                                        <div className="text-[#48d494] text-xs sm:text-sm font-medium">
                                            {event.date}
                                        </div>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#48d494] transition-colors line-clamp-2">
                                        {event.title}
                                    </h3>

                                    <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-3">
                                        {event.description}
                                    </p>

                                    <div className="flex flex-col space-y-2 text-xs sm:text-sm text-gray-300">
                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#48d494]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span>{event.time}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#48d494]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 sm:mt-6 text-center">
                                        <span className="inline-block py-1 sm:py-2 px-3 sm:px-4 bg-transparent text-[#48d494] border border-[#48d494] text-xs sm:text-sm rounded hover:bg-[#48d494] hover:text-black transition-colors duration-300 font-medium">
                                            {event.dateObj < currentDate ? 'View Details' : 'Learn More'}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <div className="col-span-full py-8 sm:py-12 lg:py-16 text-center">
                            <div className="text-3xl sm:text-4xl text-[#48d494] mb-3 sm:mb-4">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No events found</h3>
                            <p className="text-gray-400 text-sm sm:text-base">Try changing your filters to see more events.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Events;