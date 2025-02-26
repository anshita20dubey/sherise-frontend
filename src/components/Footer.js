import React, { useRef, useState } from 'react'

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
        <footer className="bg-black text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">SheRise<span className="text-emerald-400">Club</span></h3>
                        <p className="text-gray-400">
                            Empowering women leaders to build the next generation of groundbreaking startups.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a></li>
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="text-gray-400 hover:text-emerald-400 transition-colors">About</a></li>
                            <li><a href="#stats" onClick={(e) => { e.preventDefault(); scrollToSection('stats'); }} className="text-gray-400 hover:text-emerald-400 transition-colors">Our Impact</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="text-gray-400 hover:text-emerald-400 transition-colors">Join Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Mentorship</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Events</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Newsletter</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-4">Contact Us</h4>
                        <address className="text-gray-400 not-italic">
                            123 Startup Street<br />
                            San Francisco, CA 94107<br />
                            hello@sheriseclub.com<br />
                            (123) 456-7890
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SheRise Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer