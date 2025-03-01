import React, { useState, useEffect, useRef } from "react";
import { Activity, Users, Banana, Heart, HelpCircle, Send } from "lucide-react";
import Footer from "../components/Footer";
import Enablers from "../components/Enablers";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import API_URL from "../components/config";
const Home = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [enablersVisible, setEnablersVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("club");
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    members: 0,
    visitors: 0,
    programs: 0,
    impact: 0,
  });
  const images = [
    "../../images/About/1.jpg",
    "../../images/About/2.jpg",
    "../../images/About/3.jpg",
    "../../images/About/4.jpg",
    "../../images/About/5.jpg",
    "../../images/About/6.jpg",
    "../../images/About/7.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(nextImage, 4000); // 10 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const [helpFormData, setHelpFormData] = useState({
    name: "",
    email: "",
    question: "",
  });

  const [helpSubmitting, setHelpSubmitting] = useState(false);
  const [helpSubmitStatus, setHelpSubmitStatus] = useState(null);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const enablersRef = useRef(null);
  const quickHelpRef = useRef(null);
  const contactRef = useRef(null);

  const handletouch = () => {
    navigate("/membership");
  };

  const targetCounts = {
    members: 2260,
    visitors: 210,
    programs: 887,
    impact: 1920,
  };

  // Function to go to the next image
  const nextImage = () => {
    setStatsVisible(false); // Start fade-out animation

    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setStatsVisible(true); // Start fade-in animation
    }, 500); // Half a second for fade out before changing image
  };

  // Handle scroll to section functionality
  const scrollToSection = (sectionId) => {
    const sectionRefs = {
      home: homeRef,
      about: aboutRef,
      stats: statsRef,
      enablers: enablersRef,
      contact: contactRef,
      quickHelp: quickHelpRef,
    };

    if (sectionRefs[sectionId] && sectionRefs[sectionId].current) {
      sectionRefs[sectionId].current.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Handle input changes for help form
  const handleHelpFormChange = (e) => {
    const { id, value } = e.target;
    setHelpFormData((prev) => ({
      ...prev,
      [id === "helpName" ? "name" : id === "helpEmail" ? "email" : "question"]:
        value,
    }));
  };

  // Handle help form submission
  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    setHelpSubmitting(true);
    setHelpSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/api/quick-help`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: helpFormData.name,
          email: helpFormData.email,
          question: helpFormData.question,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setHelpSubmitStatus({
          type: "success",
          message:
            "Your question has been submitted. We'll get back to you soon!",
        });
        // Reset form
        setHelpFormData({
          name: "",
          email: "",
          question: "",
        });
      } else {
        setHelpSubmitStatus({
          type: "error",
          message: data.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setHelpSubmitStatus({
        type: "error",
        message: "Failed to connect to the server. Please try again later.",
      });
      console.error("Error submitting help form:", error);
    } finally {
      setHelpSubmitting(false);
    }
  };

  // Use Intersection Observer to detect when stats section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
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
      const duration = 1000;
      const progress = Math.min(elapsedTime / duration, 1);

      // Easing function for smoother animation
      const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);
      const easedProgress = easeOutQuart(progress);

      setCounts({
        members: Math.round(easedProgress * targetCounts.members),
        visitors: Math.round(easedProgress * targetCounts.visitors),
        programs: Math.round(easedProgress * targetCounts.programs),
        impact: Math.round(easedProgress * targetCounts.impact),
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

  // Set animationComplete to true after a short delay when the component mounts
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <div className="relative w-full font-sans">
      <Navbar />

      {/* Home/Hero Section - Improved responsiveness */}
      <section
        ref={homeRef}
        id="home"
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Video background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-gray-700/80 transition-opacity duration-1000">
          {/* Placeholder background before video loads */}
        </div>

        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-85" : "opacity-0"
          }`}
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

        {/* Main content with animations - improved responsive text sizing */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 text-center">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 transition-all duration-700 ${
              animationComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Welcome To
            <br />
            <span className="text-emerald-400">SheRise Club</span>
          </h1>

          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              animationComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Empowering Women, Enabling Growth. Join a powerful network of women
            leaders, entrepreneurs, and professionals dedicated to uplifting and
            supporting women across Madhya Pradesh.
          </p>

          <div
            className={`mt-6 sm:mt-8 md:mt-10 lg:mt-12 flex gap-4 transition-all duration-700 delay-300 ${
              animationComplete
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          ></div>
        </div>

        {/* Bottom "scroll down" indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 transition-all duration-700 delay-450 cursor-pointer ${
            animationComplete
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          onClick={() => scrollToSection("about")}
        >
          <p className="text-sm mb-2">Discover More</p>
          <div className="w-px h-8 bg-emerald-400 animate-pulse"></div>
        </div>
      </section>

      {/* Stats Section - Improved for mobile */}
      <section
        ref={statsRef}
        id="stats"
        className="w-full bg-black text-white py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Section - Responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-24">
            {/* Members Stats */}
            <div
              className={`flex flex-col items-center p-4 transition-all duration-700`}
            >
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Activity className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                {counts.members.toLocaleString()}
              </h2>
              <p className="text-sm sm:text-base text-gray-400">Members</p>
            </div>

            {/* Daily Visitors Stats */}
            <div
              className={`flex flex-col items-center p-4 transition-all duration-700 `}
            >
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                {counts.visitors}
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Daily Visitors
              </p>
            </div>

            {/* Programs Stats */}
            <div
              className={`flex flex-col items-center p-4 transition-all duration-700`}
            >
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Banana className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                {counts.programs}
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Health Program
              </p>
            </div>

            {/* Impact Stats */}
            <div
              className={`flex flex-col items-center p-4 transition-all duration-700 `}
            >
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                {counts.impact.toLocaleString()}
              </h2>
              <p className="text-sm sm:text-base text-gray-400">Heart Beat</p>
            </div>
          </div>

          {/* Content Section - Stack on mobile, side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side text content */}
            <div className={`transition-all duration-1000 `}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 mb-4 sm:mb-6 md:mb-8 leading-tight">
                Mission of SheRise
                <br className="hidden sm:block" />
                Club
              </h2>
              <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed">
                To create a dynamic ecosystem where women help women—mentoring,
                networking, and enabling each other to achieve personal and
                professional growth. <br className="hidden md:block" />
                Join a powerful network of women leaders, entrepreneurs, and
                professionals dedicated to uplifting and supporting women across
                Madhya Pradesh.
              </p>
              <button
                className="bg-emerald-400 hover:bg-emerald-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded transition-colors duration-300 font-medium uppercase tracking-wide text-xs sm:text-sm"
                onClick={handletouch}
              >
                Get in touch
              </button>
            </div>

            {/* Right side image - Responsive image handling */}
            <div className="hidden">
              {images.map((src, index) => (
                <img key={`preload-${index}`} src={src} alt="" />
              ))}
            </div>

            {/* Visible current image with animation */}
            <div className={`relative transition-all duration-1000 `}>
              <img
                src={images[currentImageIndex]}
                alt={`SheRise members ${currentImageIndex + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 border-r-4 border-b-4 border-emerald-400 rounded-lg transform translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 md:translate-x-4 md:translate-y-4 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enablers Section */}
      <Enablers enablersRef={enablersRef} isVisible={enablersVisible} />

      {/* Quick Help Section - Improved responsiveness */}
      <section
        ref={quickHelpRef}
        id="quickHelp"
        className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#181818] to-[#0d0d0d]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-400/10 mb-4 sm:mb-6">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white">
              Need <span className="text-emerald-400">Quick Help?</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-3xl mx-auto">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-black/50 p-4 sm:p-6 md:p-8 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-400/5">
            {/* Status Message */}
            {helpSubmitStatus && (
              <div
                className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-md ${
                  helpSubmitStatus.type === "success"
                    ? "bg-emerald-400/20 border border-emerald-400/30 text-emerald-400"
                    : "bg-red-400/20 border border-red-400/30 text-red-400"
                }`}
              >
                <p className="text-xs sm:text-sm font-medium">
                  {helpSubmitStatus.message}
                </p>
              </div>
            )}

            <form
              className="space-y-4 sm:space-y-6"
              onSubmit={handleHelpSubmit}
            >
              <div>
                <label
                  htmlFor="helpName"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="helpName"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm sm:text-base"
                  placeholder="Enter your name"
                  value={helpFormData.name}
                  onChange={handleHelpFormChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="helpEmail"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="helpEmail"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm sm:text-base"
                  placeholder="you@example.com"
                  value={helpFormData.email}
                  onChange={handleHelpFormChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="helpQuestion"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Your Question
                </label>
                <textarea
                  id="helpQuestion"
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-700 bg-black/70 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm sm:text-base"
                  placeholder="How can we help you today?"
                  value={helpFormData.question}
                  onChange={handleHelpFormChange}
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full group bg-emerald-400 hover:bg-emerald-500 text-black py-2 sm:py-3 rounded-md transition-all duration-300 font-medium flex items-center justify-center text-sm sm:text-base"
                  disabled={helpSubmitting}
                >
                  {helpSubmitting ? (
                    <>
                      <span>Submitting...</span>
                      <div className="ml-2 h-3 w-3 sm:h-4 sm:w-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <span>Submit Question</span>
                      <Send className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-emerald-400/10 rounded-md border border-emerald-400/20">
              <p className="text-gray-300 text-xs sm:text-sm">
                <span className="text-emerald-400 font-semibold">
                  Quick Tip:
                </span>{" "}
                For immediate assistance, you can also use our live chat feature
                at the bottom right of your screen.
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
