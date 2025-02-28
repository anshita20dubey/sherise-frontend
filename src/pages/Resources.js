import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

// Resource Card Component
const ResourceCard = ({ title, image }) => {
    return (
        <div className="bg-[#0f1224] rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-[#48d494] transition-all duration-300 group">
            <div className="relative overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80">
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-opacity-30 flex items-end">
                    <div className="bg-gray-900/90 w-full p-3 sm:p-4 flex justify-between items-center backdrop-blur-sm">
                        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
                        <div className="bg-[#48d494] rounded-full p-1.5 sm:p-2 text-[#0f1224]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Resources Page Component
const Resources = () => {
    // Resource data
    const resources = [
        {
            id: 1,
            title: 'Podcast',
            image: 'https://images.unsplash.com/photo-1525431301226-f824535d4953?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image paths
            path: '/resources/podcast'
        },
        {
            id: 2,
            title: 'Webinars',
            image: 'https://images.unsplash.com/photo-1585974738771-84483dd9f89f?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            path: '/resources/webinars'
        },
        {
            id: 3,
            title: 'Blog',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            path: '/resources/blog'
        }
    ];

    return (
        <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 bg-[#0f1224] text-white flex flex-col">
            <Navbar />

            <main className="container mx-auto px-4 py-8 sm:py-10 md:py-12 pb-20 sm:pb-24 md:pb-28 max-w-7xl flex-grow">
                {/* Resources Header */}
                <div className="mb-8 sm:mb-10 md:mb-12">
                    <p className="text-center text-[#48d494] font-medium tracking-wide">• RESOURCES •</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mt-3 md:mt-4">Resources</h1>
                </div>

                {/* Resource Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {resources.map(resource => (
                        <a href={resource.path} key={resource.id}>
                            <ResourceCard
                                title={resource.title}
                                image={resource.image}
                            />
                        </a>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Resources;