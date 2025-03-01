import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("");
    const [animationComplete, setAnimationComplete] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const clubRef = useRef(null);
    const membershipRef = useRef(null);
    const enablersRef = useRef(null);
    const eventsRef = useRef(null);
    const resourcesRef = useRef(null);
    const quickHelpRef = useRef(null);

    const scrollToSection = (sectionId) => {
        // If we're not on the home page and trying to scroll to quickHelp, 
        // we need to navigate to home first
        if (sectionId === "quickHelp" && location.pathname !== "/") {
            navigate("/");
            // Set a flag in sessionStorage to indicate we want to scroll to quickHelp
            // after navigation completes
            sessionStorage.setItem("scrollToSection", "quickHelp");
            return;
        }

        const sectionRefs = {
            club: clubRef,
            membership: membershipRef,
            enablers: enablersRef,
            events: eventsRef,
            resources: resourcesRef,
            quickHelp: quickHelpRef,
        };

        if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
            sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
            setMobileMenuOpen(false);
        } else {
            // If the ref is not available, try to find the element by ID
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setActiveSection(sectionId);
                setMobileMenuOpen(false);
            }
        }
    };

    const handleNavigation = (path, sectionId = null) => (e) => {
        e.preventDefault();

        if (location.pathname === path && sectionId) {
            // If we're already on the target page, just scroll to the section
            scrollToSection(sectionId);
        } else {
            // Otherwise navigate to the new page
            navigate(path);
            if (sectionId) {
                // Store the section to scroll to after navigation
                sessionStorage.setItem("scrollToSection", sectionId);
            }
        }
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        // Check if we need to scroll to a section after navigation
        const sectionToScrollTo = sessionStorage.getItem("scrollToSection");
        if (sectionToScrollTo) {
            // Clear the storage item
            sessionStorage.removeItem("scrollToSection");

            // Add a small delay to ensure the DOM is fully loaded
            setTimeout(() => {
                const element = document.getElementById(sectionToScrollTo);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sectionToScrollTo);
                }
            }, 300);
        }

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            if (clubRef.current && scrollPosition < clubRef.current.offsetHeight) {
                setActiveSection("club");
            } else if (membershipRef.current && scrollPosition < membershipRef.current.offsetTop + membershipRef.current.offsetHeight) {
                setActiveSection("membership");
            } else if (enablersRef.current && scrollPosition < enablersRef.current.offsetTop + enablersRef.current.offsetHeight) {
                setActiveSection("enablers");
            } else if (eventsRef.current && scrollPosition < eventsRef.current.offsetTop + eventsRef.current.offsetHeight) {
                setActiveSection("events");
            } else if (resourcesRef.current && scrollPosition < resourcesRef.current.offsetTop + resourcesRef.current.offsetHeight) {
                setActiveSection("resources");
            } else if (quickHelpRef.current) {
                setActiveSection("quickHelp");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        const animationTimer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        // Close mobile menu on window resize
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            clearTimeout(animationTimer);
        };
    }, [location.pathname]); // Re-run when path changes

    // Function to handle the "Need Help?" button click
    const handleQuickHelpClick = (e) => {
        e.preventDefault();
        if (location.pathname !== "/") {
            // If not on home page, navigate to home page first
            navigate("/");
            // Set a flag to scroll to quickHelp after navigation
            sessionStorage.setItem("scrollToSection", "quickHelp");
        } else {
            // If already on home page, just scroll to the section
            const quickHelpSection = document.getElementById("quickHelp");
            if (quickHelpSection) {
                quickHelpSection.scrollIntoView({ behavior: "smooth" });
                setActiveSection("quickHelp");
            }
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 px-4 md:px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="text-white text-2xl font-bold">
                <Link to="/">
                    <img
                        className="w-[150px] md:w-[250px] h-auto object-contain cursor-pointer"
                        src="/images/logo.png"
                        alt="Logo"
                    />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4 lg:space-x-6 text-white">
                <a href="/" onClick={handleNavigation('/', 'club')} className={`relative group ${activeSection === "club" ? "text-emerald-400" : ""}`}>
                    <span className="hover:text-emerald-400 transition-colors">The Club</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/membership" onClick={handleNavigation('/membership', 'membership')} className={`relative group ${activeSection === "membership" ? "text-emerald-400" : ""}`}>
                    <span className="hover:text-emerald-400 transition-colors">Membership</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/allenablers" onClick={handleNavigation('/allenablers', 'enablers')} className={`relative group ${activeSection === "enablers" ? "text-emerald-400" : ""}`}>
                    <span className="hover:text-emerald-400 transition-colors">Enablers</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/events" onClick={handleNavigation('/events', 'events')} className={`relative group ${activeSection === "events" ? "text-emerald-400" : ""}`}>
                    <span className="hover:text-emerald-400 transition-colors whitespace-nowrap">Events & Workshops</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/resources" onClick={handleNavigation('/resources', 'resources')} className={`relative group ${activeSection === "resources" ? "text-emerald-400" : ""}`}>
                    <span className="hover:text-emerald-400 transition-colors">Resources</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
            </div>

            {/* Help Button - Hidden on mobile, shown on medium screens */}
            <button
                onClick={handleQuickHelpClick}
                className="hidden md:flex bg-emerald-400 hover:bg-emerald-500 text-white px-4 lg:px-6 py-2 rounded-md transition-colors items-center text-sm lg:text-base"
            >
                Need Help? <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            {/* Mobile Menu Button - Now with explicit styling for visibility */}
            <button
                className="block md:hidden text-white p-2 bg-emerald-500 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 md:hidden p-4 flex flex-col space-y-4">
                    <a href="/" onClick={handleNavigation('/', 'club')} className={`block py-2 relative group ${activeSection === "club" ? "text-emerald-400" : "text-white"}`}>
                        The Club
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/membership" onClick={handleNavigation('/membership', 'membership')} className={`block py-2 relative group ${activeSection === "membership" ? "text-emerald-400" : "text-white"}`}>
                        Membership
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/allenablers" onClick={handleNavigation('/allenablers', 'enablers')} className={`block py-2 relative group ${activeSection === "enablers" ? "text-emerald-400" : "text-white"}`}>
                        Enablers
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/events" onClick={handleNavigation('/events', 'events')} className={`block py-2 relative group ${activeSection === "events" ? "text-emerald-400" : "text-white"}`}>
                        Events & Workshops
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="/resources" onClick={handleNavigation('/resources', 'resources')} className={`block py-2 relative group ${activeSection === "resources" ? "text-emerald-400" : "text-white"}`}>
                        Resources
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <button
                        onClick={handleQuickHelpClick}
                        className="bg-emerald-400 hover:bg-emerald-500 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center w-full"
                    >
                        Need Help? <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;