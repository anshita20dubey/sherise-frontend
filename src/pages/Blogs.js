import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    // Sample blog data - replace with your actual blog data
    const [blogs, setBlogs] = useState([
        {
            id: 1,
            link: "https://www.srepublic.in/shakti-sangam-2025-a-grand-celebration-on-2nd-march-2025",
            title: "Shakti Sangam 2025 – A Grand Celebration on 2nd March 2025",
            excerpt: "Shakti Sangam 2025 is a dynamic celebration of women's leadership and success. Hosted by Incubation Masters at Courtyard by Marriott Bhopal",
            date: "February 7, 2025",
            readTime: "5 min read",
            image: "../../images/Blogs/ShaktiSangam.jpg"
        },
        {
            id: 2,
            link: "https://www.srepublic.in/shakti-sangam-2025-the-biggest-womens-event-in-madhya-pradesh",
            title: "Shakti Sangam 2025: The Biggest Women's Event in Madhya Pradesh",
            excerpt: "Join Shakti Sangam 2025 on 02 March, the biggest Women's Day celebration in Madhya Pradesh.",
            date: "February 7, 2025",
            readTime: "4 min read",
            image: "../../images/Blogs/ShaktiSangam2.jpg"
        },
        {
            id: 3,
            link: "https://www.srepublic.in/A-Wednesday-with-Women",
            title: "Udhyogini",
            excerpt: "Udhyogini – A Wednesday with Women is a transformative initiative led by the Women Entrepreneurship Development Cell (WEDC) at the Jabalpur Smart City Incubation Centre.",
            date: "October 6, 2023",
            readTime: "6 min read",
            image: "../../images/Blogs/Udhyogini.jpg"
        }
    ]);
    const navigate = useNavigate();

    // Categories for filtering
    const [activeCategory, setActiveCategory] = useState("All");

    // Filter blogs based on active category
    const filteredBlogs = activeCategory === "All"
        ? blogs
        : blogs.filter(blog => blog.category === activeCategory);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header with logo */}
            <Navbar />

            {/* Hero section - improved responsive spacing */}
            <section className="py-8 md:py-10 lg:py-12 pt-20 md:pt-24 lg:pt-20 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4 pt-1 sm:pt-8">
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
                <div className="container mx-auto px-4 -mt-14 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                        Our <span className="text-[#48d494]">Blog</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto px-2">
                        Stay updated with the latest trends, tips, and insights from the Sherise Club community.
                    </p>
                </div>
            </section>

            {/* Blog posts grid - improved responsive grid */}
            <section className="container mx-auto px-4 py-6 md:py-8 lg:py-10">
                {/* Optional category filtering - can be shown/hidden on mobile */}
                <div className="overflow-x-auto mb-6 hidden md:block">
                    <div className="flex space-x-4 pb-2">
                        <button
                            className={`px-4 py-2 rounded-full text-sm transition ${activeCategory === "All"
                                ? "bg-[#48d494] text-black"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            onClick={() => setActiveCategory("All")}
                        >
                            All
                        </button>
                        {/* Add your other category buttons here */}
                    </div>
                </div>

                {/* Responsive grid - stacks on mobile, 2 columns on tablet, 3 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {filteredBlogs.map(blog => (
                        <article
                            key={blog.id}
                            className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-[#48d494]/20 transition duration-300 transform hover:-translate-y-1"
                        >
                            <a href={blog.link} className="block">
                                <div className="relative">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-36 sm:h-40 md:h-48 object-cover"
                                    />
                                </div>
                                <div className="p-4 md:p-6">
                                    <div className="flex justify-between items-center mb-2 md:mb-3">
                                        <span className="text-xs text-gray-400">
                                            {blog.date}
                                        </span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs md:text-sm text-gray-500">
                                            {blog.readTime}
                                        </span>
                                        <span className="text-[#48d494] text-sm md:text-base font-medium flex items-center">
                                            Read More
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </article>
                    ))}
                </div>

                {/* Add responsive pagination if needed */}
                {filteredBlogs.length > 0 && (
                    <div className="mt-8 md:mt-12 flex justify-center">
                        <button className="mx-1 px-3 py-1 md:px-4 md:py-2 rounded bg-gray-800 text-sm md:text-base hover:bg-gray-700">
                            Previous
                        </button>
                        <button className="mx-1 px-3 py-1 md:px-4 md:py-2 rounded bg-[#48d494] text-black text-sm md:text-base">
                            1
                        </button>
                        <button className="mx-1 px-3 py-1 md:px-4 md:py-2 rounded bg-gray-800 text-sm md:text-base hover:bg-gray-700">
                            2
                        </button>
                        <button className="mx-1 px-3 py-1 md:px-4 md:py-2 rounded bg-gray-800 text-sm md:text-base hover:bg-gray-700">
                            Next
                        </button>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default Blogs;