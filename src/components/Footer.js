import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
    const [activeSection, setActiveSection] = useState('home');
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const statsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (sectionId) => {
        const sectionRefs = {
            home: homeRef,
            about: aboutRef,
            stats: statsRef,
            contact: contactRef
        };

        if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
            sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    return (
        <footer className="bg-black text-white py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Main footer content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and tagline - full width on mobile */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-1 mb-6 sm:mb-0">
                        <Link to="/">
                            <img
                                className="w-[180px] sm:w-[220px] lg:w-[250px] h-auto object-contain mx-auto sm:mx-0"
                                src="/images/logo.png"
                                alt="Logo"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm sm:text-base mt-4 text-center sm:text-left">
                            Empowering women leaders to build the next generation of groundbreaking startups.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-lg font-medium mb-4 text-center sm:text-left">Quick Links</h4>
                        <ul className="space-y-2 text-center sm:text-left">
                            <li><a href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a></li>
                            <li><a href="/allenablers" className="text-gray-400 hover:text-emerald-400 transition-colors">Enablers</a></li>
                            <li><a href="/membership" className="text-gray-400 hover:text-emerald-400 transition-colors">Become a Member?</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="mb-6 sm:mb-0">
                        <h4 className="text-lg font-medium mb-4 text-center sm:text-left">Resources</h4>
                        <ul className="space-y-2 text-center sm:text-left">
                            <li><a href="/events" className="text-gray-400 hover:text-emerald-400 transition-colors">Events & Workshops</a></li>
                            <li><a href="/resources/blog" className="text-gray-400 hover:text-emerald-400 transition-colors">Blog</a></li>
                            <li><a href="/resources/podcast" className="text-gray-400 hover:text-emerald-400 transition-colors">Podcast</a></li>
                            <li><a href="/resources/webinars" className="text-gray-400 hover:text-emerald-400 transition-colors">Webinars</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-lg font-medium mb-4 text-center sm:text-left">Contact Us</h4>
                        <address className="text-gray-400 not-italic text-center sm:text-left">
                            EI -007 8th Floor, Bansal One <br />
                            Near Rani Kamlapati Railway Station<br />
                            Bhopal - 462016<br />
                            clubsherise@gmail.com<br />
                            +91 83057 08012
                        </address>
                    </div>
                </div>

                {/* Copyright section */}
                <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} SheRise Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer