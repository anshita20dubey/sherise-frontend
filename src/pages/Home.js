import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Activity, Users, Banana, Heart, HelpCircle, Send } from 'lucide-react';
import Footer from '../components/Footer';
import Enablers from '../components/Enablers'; // Import the new Enablers component
import Chatbot from '../components/Chatbot'; // Adjust the path based on your file structure

const Home = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [enablersVisible, setEnablersVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [counts, setCounts] = useState({
        members: 0,
        visitors: 0,
        programs: 0,
        impact: 0
    });

    // Form states
    const [joinFormData, setJoinFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        message: ''
    });

    const [helpFormData, setHelpFormData] = useState({
        name: '',
        email: '',
        question: ''
    });

    // Form submission states
    const [joinSubmitting, setJoinSubmitting] = useState(false);
    const [joinSubmitStatus, setJoinSubmitStatus] = useState(null);

    const [helpSubmitting, setHelpSubmitting] = useState(false);
    const [helpSubmitStatus, setHelpSubmitStatus] = useState(null);

    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const statsRef = useRef(null);
    const enablersRef = useRef(null);
    const contactRef = useRef(null);
    const quickHelpRef = useRef(null); // New ref for quick help section


    const targetCounts = {
        members: 2260,
        visitors: 210,
        programs: 887,
        impact: 1920
    };

    // Handle scroll to section functionality
    const scrollToSection = (sectionId) => {
        const sectionRefs = {
            home: homeRef,
            about: aboutRef,
            stats: statsRef,
            enablers: enablersRef,
            contact: contactRef,
            quickHelp: quickHelpRef // Add quick help to the sections
        };

        if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
            sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    // Handle input changes for join form
    const handleJoinFormChange = (e) => {
        const { id, value } = e.target;
        setJoinFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle input changes for help form
    const handleHelpFormChange = (e) => {
        const { id, value } = e.target;
        setHelpFormData(prev => ({
            ...prev,
            [id === 'helpName' ? 'name' : id === 'helpEmail' ? 'email' : 'question']: value
        }));
    };

    // Handle join form submission
    const handleJoinSubmit = async (e) => {
        e.preventDefault();
        setJoinSubmitting(true);
        setJoinSubmitStatus(null);

        try {
            const response = await fetch('http://localhost:5000/api/join-club', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: joinFormData.firstName,
                    lastName: joinFormData.lastName,
                    email: joinFormData.email,
                    companyName: joinFormData.companyName,
                    message: joinFormData.message
                })
            });

            const data = await response.json();

            if (response.ok) {
                setJoinSubmitStatus({ type: 'success', message: 'Thank you for joining SheRise Club!' });
                // Reset form
                setJoinFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    companyName: '',
                    message: ''
                });
            } else {
                setJoinSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setJoinSubmitStatus({ type: 'error', message: 'Failed to connect to the server. Please try again later.' });
            console.error('Error submitting join form:', error);
        } finally {
            setJoinSubmitting(false);
        }
    };

    // Handle help form submission
    const handleHelpSubmit = async (e) => {
        e.preventDefault();
        setHelpSubmitting(true);
        setHelpSubmitStatus(null);

        try {
            const response = await fetch('http://localhost:5000/api/quick-help', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: helpFormData.name,
                    email: helpFormData.email,
                    question: helpFormData.question
                })
            });

            const data = await response.json();

            if (response.ok) {
                setHelpSubmitStatus({ type: 'success', message: 'Your question has been submitted. We\'ll get back to you soon!' });
                // Reset form
                setHelpFormData({
                    name: '',
                    email: '',
                    question: ''
                });
            } else {
                setHelpSubmitStatus({ type: 'error', message: data.message || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setHelpSubmitStatus({ type: 'error', message: 'Failed to connect to the server. Please try again later.' });
            console.error('Error submitting help form:', error);
        } finally {
            setHelpSubmitting(false);
        }
    };

    // Check which section is in view
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Adding offset for fixed navbar

            // Check which section is currently in view
            if (homeRef.current && scrollPosition < homeRef.current.offsetHeight) {
                setActiveSection('home');
            } else if (aboutRef.current && scrollPosition < aboutRef.current.offsetTop + aboutRef.current.offsetHeight) {
                setActiveSection('about');
            } else if (statsRef.current && scrollPosition < statsRef.current.offsetTop + statsRef.current.offsetHeight) {
                setActiveSection('stats');
            } else if (enablersRef.current && scrollPosition < enablersRef.current.offsetTop + enablersRef.current.offsetHeight) {
                setActiveSection('enablers');
            } else if (contactRef.current && scrollPosition < contactRef.current.offsetTop + contactRef.current.offsetHeight) {
                setActiveSection('contact');
            } else if (quickHelpRef.current) {
                setActiveSection('quickHelp');
            }

            // Check if stats section is visible
            if (statsRef.current) {
                const statsPosition = statsRef.current.getBoundingClientRect();
                if (statsPosition.top < window.innerHeight * 0.75 && statsPosition.bottom >= 0) {
                    setStatsVisible(true);
                }
            }

            // Check if enablers section is visible
            if (enablersRef.current) {
                const enablersPosition = enablersRef.current.getBoundingClientRect();
                if (enablersPosition.top < window.innerHeight * 0.75 && enablersPosition.bottom >= 0) {
                    setEnablersVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial position

        // Start the greeting animation after a short delay
        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(animationTimer);
        };
    }, []);

    // Animate counting numbers
    useEffect(() => {
        if (!statsVisible) return;

        let animationFrameId;
        let startTime;

        const animateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const duration = 2000; // 2 seconds for count animation
            const progress = Math.min(elapsedTime / duration, 1);

            // Easing function for smoother animation
            const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
            const easedProgress = easeOutQuart(progress);

            setCounts({
                members: Math.round(easedProgress * targetCounts.members),
                visitors: Math.round(easedProgress * targetCounts.visitors),
                programs: Math.round(easedProgress * targetCounts.programs),
                impact: Math.round(easedProgress * targetCounts.impact)
            });

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animateCount);
            }
        };

        animationFrameId = requestAnimationFrame(animateCount);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [statsVisible]);

    return (
        <div className="relative w-full font-sans">
            {/* Fixed Navigation */}
            <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 px-6 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    SheRise<span className="text-emerald-400">Club</span>
                </div>
                <div className="flex space-x-6 text-white">
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
                        <span className="hover:text-emerald-400 transition-colors">Join Us</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                    {/* New Quick Help menu item */}
                    <a
                        href="#quickHelp"
                        onClick={(e) => { e.preventDefault(); scrollToSection('quickHelp'); }}
                        className={`relative group ${activeSection === 'quickHelp' ? 'text-emerald-400' : ''}`}
                    >
                        <span className="hover:text-emerald-400 transition-colors">Quick Help</span>
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all ${activeSection === 'quickHelp' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                </div>
                <button className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 py-2 rounded-md transition-colors flex items-center">
                    Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </nav>

            {/* Home/Hero Section */}
            <section ref={homeRef} id="home" className="relative h-screen w-full overflow-hidden">
                {/* Video background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-700/80 transition-opacity duration-1000">
                    {/* Placeholder background before video loads */}
                </div>

                <video
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-85' : 'opacity-0'}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                >
                    <source src="../../videos/front.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Gradient overlay on top of video */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/30"></div>

                {/* Main content with animations */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                    <h1 className={`text-6xl md:text-8xl font-bold text-white mb-6 transition-all duration-700 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        Welcome To<br />
                        <span className="text-emerald-400">SheRise Club</span>
                    </h1>

                    <p className={`text-xl md:text-2xl text-white/90 max-w-2xl transition-all duration-700 delay-150 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                        Empowering women leaders to build the next generation of groundbreaking startups
                    </p>

                    <div className={`mt-12 flex gap-4 transition-all duration-700 delay-300 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}>
                    </div>
                </div>

                {/* Bottom "scroll down" indicator */}
                <div
                    className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 transition-all duration-700 delay-450 cursor-pointer ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                    onClick={() => scrollToSection('about')}
                >
                    <p className="text-sm mb-2">Discover More</p>
                    <div className="w-px h-8 bg-emerald-400 animate-pulse"></div>
                </div>
            </section>

            {/* Stats Section */}
            <section ref={statsRef} id="stats" className="w-full bg-black text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
                        {/* Members Stats */}
                        <div className={`flex flex-col items-center transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                            <div className="flex items-center justify-center mb-3">
                                <Activity className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-2">{counts.members.toLocaleString()}</h2>
                            <p className="text-gray-400">Members</p>
                        </div>

                        {/* Daily Visitors Stats */}
                        <div className={`flex flex-col items-center transition-all duration-700 delay-100 ease-out ${statsVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                            <div className="flex items-center justify-center mb-3">
                                <Users className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-2">{counts.visitors}</h2>
                            <p className="text-gray-400">Daily Visitors</p>
                        </div>

                        {/* Programs Stats */}
                        <div className={`flex flex-col items-center transition-all duration-700 delay-200 ease-out ${statsVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                            <div className="flex items-center justify-center mb-3">
                                <Banana className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-2">{counts.programs}</h2>
                            <p className="text-gray-400">Health Program</p>
                        </div>

                        {/* Impact Stats */}
                        <div className={`flex flex-col items-center transition-all duration-700 delay-300 ease-out ${statsVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                            <div className="flex items-center justify-center mb-3">
                                <Heart className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-5xl font-bold text-white mb-2">{counts.impact.toLocaleString()}</h2>
                            <p className="text-gray-400">Heart Beat</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Left side text content */}
                        <div className={`transition-all duration-1000 ease-out ${statsVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-10'}`}>
                            <h2 className="text-5xl font-bold text-emerald-400 mb-8 leading-tight">
                                History of SheRise<br />Club
                            </h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Rem possimus distinctio ex. Natus totam voluptatibus
                                animi aspernatur ducimus quas obcaecati mollitia
                                quibusdam temporibus culpa dolore molestias blanditiis
                                consequuntur sunt nisi.
                            </p>
                            <button
                                className="bg-emerald-400 hover:bg-emerald-500 text-white px-8 py-3 rounded transition-colors duration-300 font-medium uppercase tracking-wide text-sm"
                                onClick={() => scrollToSection('contact')}
                            >
                                Get in touch
                            </button>
                        </div>

                        {/* Right side image */}
                        <div className={`relative transition-all duration-1000 ease-out ${statsVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-10'}`}>
                            <div className="relative">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1679415150568-03cfd3dd8293?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="SheRise members"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                                <div className="absolute inset-0 border-r-4 border-b-4 border-emerald-400 rounded-lg transform translate-x-4 translate-y-4 -z-10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enablers Section */}
            <Enablers enablersRef={enablersRef} isVisible={enablersVisible} />

            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="py-24 bg-[#121212]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            Join <span className="text-[#48d494]">SheRise Club</span>
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Ready to connect with other women entrepreneurs and access valuable resources?
                            Fill out the form below and become a part of our growing community.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <form className="space-y-6" onSubmit={handleJoinSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#48d494]"
                                        placeholder="Your first name"
                                        value={joinFormData.firstName}
                                        onChange={handleJoinFormChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#48d494]"
                                        placeholder="Your last name"
                                        value={joinFormData.lastName}
                                        onChange={handleJoinFormChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#48d494]"
                                    placeholder="you@example.com"
                                    value={joinFormData.email}
                                    onChange={handleJoinFormChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    className="w-full px-4 py-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#48d494]"
                                    placeholder="Your company name"
                                    value={joinFormData.companyName}
                                    onChange={handleJoinFormChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message (Optional)</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#48d494]"
                                    placeholder="Tell us about your startup and how we can help"
                                    value={joinFormData.message}
                                    onChange={handleJoinFormChange}
                                ></textarea>
                            </div>

                            {joinSubmitStatus && (
                                <div className={`p-4 rounded-md ${joinSubmitStatus.type === 'success' ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'}`}>
                                    {joinSubmitStatus.message}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#48d494] hover:bg-[#3cbc80] text-black py-3 rounded-md transition-colors font-medium flex items-center justify-center"
                                    disabled={joinSubmitting}
                                >
                                    {joinSubmitting ? 'Submitting...' : 'Join SheRise Club'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Quick Help Section */}
            <section ref={quickHelpRef} id="quickHelp" className="py-24 bg-gradient-to-b from-[#181818] to-[#0d0d0d]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-400/10 mb-6">
                            <HelpCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-white">
                            Need <span className="text-emerald-400">Quick Help?</span>
                        </h2>
                        <p className="text-gray-300 max-w-3xl mx-auto">
                            Have a question or need assistance? Fill out the form below and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="max-w-xl mx-auto bg-black/50 backdrop-blur-sm p-8 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-400/5">
                        {/* Status Message - This is the new part */}
                        {helpSubmitStatus && (
                            <div className={`mb-6 p-4 rounded-md ${helpSubmitStatus.type === 'success'
                                ? 'bg-emerald-400/20 border border-emerald-400/30 text-emerald-400'
                                : 'bg-red-400/20 border border-red-400/30 text-red-400'
                                }`}>
                                <p className="text-sm font-medium">{helpSubmitStatus.message}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleHelpSubmit}>
                            <div>
                                <label htmlFor="helpName" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    id="helpName"
                                    className="w-full px-4 py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                                    placeholder="Enter your name"
                                    value={helpFormData.name}
                                    onChange={handleHelpFormChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="helpEmail" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="helpEmail"
                                    className="w-full px-4 py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                                    placeholder="you@example.com"
                                    value={helpFormData.email}
                                    onChange={handleHelpFormChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="helpQuestion" className="block text-sm font-medium text-gray-300 mb-1">Your Question</label>
                                <textarea
                                    id="helpQuestion"
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                                    placeholder="How can we help you today?"
                                    value={helpFormData.question}
                                    onChange={handleHelpFormChange}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full group bg-emerald-400 hover:bg-emerald-500 text-black py-3 rounded-md transition-all duration-300 font-medium flex items-center justify-center"
                                    disabled={helpSubmitting}
                                >
                                    {helpSubmitting ? (
                                        <>
                                            <span>Submitting...</span>
                                            <div className="ml-2 h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit Question</span>
                                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 p-4 bg-emerald-400/10 rounded-md border border-emerald-400/20">
                            <p className="text-gray-300 text-sm">
                                <span className="text-emerald-400 font-semibold">Quick Tip:</span> For immediate assistance, you can also use our live chat feature at the bottom right of your screen.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Chatbot */}
            <Chatbot />
        </div>
    );
};

export default Home;