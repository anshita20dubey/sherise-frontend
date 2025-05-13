import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ConnectPopup from './ConnectPopup'; // Your existing ConnectPopup component

const Enablers = ({ enablersRef, isVisible }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const [selectedEnabler, setSelectedEnabler] = useState(null);

    // Handle clicking the Connect button
    const handleEnablerClick = (enabler) => {
        setSelectedEnabler(enabler);
    };

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === enablers.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? enablers.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Your enablers array (unchanged)
    const enablers = [
        {
            id: 1,
            name: "Neha Tiwari",
            photo: "../../images/Enablers/NehaTiwari.jpg",
            title: "Startup Angel Investor | Miss Central India",
            description: "Neha Tiwari is a graceful and confident titleholder of Miss Central India, known for her charisma, elegance, and determination. She embodies beauty with purpose, using her platform to inspire and empower others. With a passion for fashion, social impact, and personal growth, Neha continues to make her mark in the world of pageantry and beyond.",
        },
        {
            id: 2,
            name: "Priya Tiwari",
            photo: "../../images/Enablers/PriyaTiwari.jpg",
            title: "North Zone Winner & Fashion Model ",
            description: "Priya Tiwari is a rising star in the fashion industry, crowned North Zone Winner at KJM Dreamz. She has graced prestigious runways, including Bombay Times at Panache Runway Fashion, and secured the First Runner-up title at Veenus Film and Events. With her elegance, confidence, and passion for modeling, Priya continues to make a mark in the world of fashion and beauty.",
        },
        {
            id: 3,
            name: "Preeti Chaudhary",
            photo: "../../images/Enablers/PreetiChaudhary.jpg",
            title: "Board Member | Startup Mentor | Inclusion Ally",
            description: "Preeti Chaudhary is a renowned board member, startup mentor, and enabler with international and national credibility. A strong advocate for inclusion and UN SDGs, she actively drives impact and innovation. A polyglot fluent in six languages, she is passionate about travel and is known for her hands-on approach to making things happen.",
        },
        {
            id: 4,
            name: "Poojashree Chouksey",
            photo: "../../images/Enablers/PoojashreeChouksey.jpg",
            title: "Executive Director, LNCT Group | Social Entrepreneur | Industry Leader",
            description: "Pooja Shree Chouksey is a visionary leader in education, industry, and social entrepreneurship. As Executive Director of LNCT Group, she has enhanced academic excellence, innovation, and industry-driven programs, bridging the gap between education and real-world expertise. She also oversees businesses in sugar production and ethanol manufacturing while leading Kalakunj Foundation, which empowers women and underprivileged communities through education and skill development. Actively involved with CII Young Indians, she mentors future leaders, driving sustainable growth and social impact."
        },
        {
            id: 5,
            name: "Harpreet Kaur Reen",
            photo: "../../images/Enablers/HarpreetKaur.jpg",
            title: "Senior Reporter, IBC 24 News | Crime & Event Journalist",
            description: "Harpreet Kaur Reen, a seasoned journalist with over 15 years of experience, is a senior reporter at IBC 24 News in Bhopal.She has previously worked with Bhaskar Group and Sahara Group and has made a mark in the challenging field of crime reporting, being the only female crime reporter in Bhopal.Harpreet has covered major crime cases and significant national and global events, including the world’s largest religious fair, Maha Kumbh.Dedicated to journalism as her life’s mission, she strives to bring truth to light and help others through her work.",
        },
        {
            id: 6,
            name: "Sindhu Dholpure",
            photo: "../../images/Enablers/SindhuDholpure.jpg",
            title: "Theatre Director | Kathak Dancer | Social Reformer",
            description: "Sindhu Dhaulpure, Founder of People's Theatre Group, Bhopal, has been transforming lives through theatre, counseling, and social service for over 20 years. A Kathak Scholar and acclaimed theatre director, she has rehabilitated 55+ prisoners through theatre therapy. Her award-winning play Aranya Rudan highlights women’s empowerment. Honored with 50+ national and international awards, she continues to uplift underprivileged talent through free theatre training",
        },
        {
            id: 7,
            name: "Darshana Solanki",
            photo: "../../images/Enablers/DarshnaSolanki.jpg",
            title: "Co-founder, Recooty",
            description: "Darshna Solanki is a passionate entrepreneur revolutionizing recruitment with AI-driven solutions. As the Co-founder of Recooty, she helps businesses hire smarter and faster, transforming talent acquisition. With a deep interest in HR innovation and employer branding, she is constantly exploring new ways to streamline hiring and enhance workforce efficiency.",
        },
        {
            id: 8,
            name: "Umang Shridhar",
            photo: "../../images/Enablers/UmangShridhar.jpg",
            title: "Founder & Director, UmangShridhar Designs Pvt. Ltd.",
            description: "Umang Shridhar is a visionary entrepreneur and the Founder & Director of UmangShridhar Designs Pvt. Ltd. She is dedicated to sustainable fashion and empowering artisans, creating impactful designs that blend tradition with innovation. Her work focuses on social entrepreneurship and ethical fashion, making a difference in communities while promoting sustainability",
        },
        {
            id: 9,
            name: "Sunila Dubey",
            photo: "../../images/Enablers/SunilaDubey.jpg",
            title: "Founder, Saree Culture India & Odeon Art and Cultural Society National President |  Akhil Bharatiya Brahmin Mahila Prakoshth",
            description: "Sunila Dubey is a cultural ambassador and social leader, dedicated to preserving India’s rich heritage. As the founder of Saree Culture India and Odeon Art and Cultural Society,she actively promotes traditional arts, textiles, and cultural initiatives. In her role as National President of Akhil Bharatiya Brahmin Mahila Prakoshth, she works towards women’s empowerment and social upliftment, making a lasting impact on society.",
        },
        {
            id: 10,
            name: "Anita Arya",
            photo: "../../images/Enablers/AnitaArya.jpg",
            title: "President, Damini Ki Awaaz NGO | Social Activist | ICC Member",
            description: "Anita Arya is the President of Damini Ki Awaaz NGO, dedicated to spreading awareness about women’s safety and empowerment through counseling. She is an active ICC member at SSB and Doordarshan, advocating for gender justice. With 10 years of experience, she has received prestigious awards like the National Media Foundation Award (2015) and Bhopal Ratna Vishwa Foundation Award (2016). Passionate about social work, gardening, and music, she continues to make a meaningful impact in society.",
        },
        {
            id: 11,
            name: "Yashashree Chauhan",
            photo: "../../images/Enablers/YashashreeChauhan.jpg",
            title: "MD Homoeopathic Consultant | NGO runner RPBS",
            description: "Dr. Yashashree Chauhan is a dedicated MD Homoeopathic Consultant, committed to holistic healing and patient- centric care.With a passion for alternative medicine, she provides personalized treatments to improve health naturally.Beyond her practice, she is the founder of RPBS, a non - profit working towards social welfare, healthcare awareness, and community development. Through medicine and service, she continues to make a meaningful impact onsociety.",
        },
        {
            id: 12,
            name: "Poonam shroti",
            photo: "../../images/Enablers/PoonamShroti.jpg",
            title: "Founder Uddip social welfare society | CEO | PaytraQR HR services pvt Ltd",
            description: "Poonam Shroti is a visionary leader and social entrepreneur, dedicated to empowering marginalized communities and driving inclusive social development through Uddip Social Welfare Society.As the CEO of PaytraQR HR Services Pvt.Ltd., she focuses on innovative HR solutions and workforce development.With expertise in leadership, strategy, and social impact, she continues to inspire and create opportunities in both corporate and non- profit sectors.",
        },
        {
            id: 13,
            name: "Bhakti Sharma",
            photo: "../../images/Enablers/BhaktiSharma.jpg",
            title: "Sarpanch | Social Reformer | Community Leader",
            description: "Bhakti Sharma is a dedicated Sarpanch who left a promising career in the U.S. to transform her village, Barkhedi Abdullah (Bhopal). A political science graduate and law student, she took charge in 2015-16, winning the elections with a significant margin. Under her leadership, the village saw remarkable progress, including better housing, electricity, water, and sanitation. Recognized among India’s most influential women, Bhakti continues to drive rural development and inspire young leaders."
        },
        {
            id: 14,
            name: "Alpa Rawal",
            photo: "../../images/Enablers/AlpaRawal.jpg",
            title: "Founder, DIVYAFAL THE CREATIONS | Fashion Designer | Jury Member",
            description: "Alpa Rawal, the proud founder of DIVYAFAL THE CREATIONS, has been crafting exquisite outfits for 15+ years, delighting 5000+ clients. As the official costume partner for VPR Mrs. India 2021 & 2022 and the Gujarati movie Mukti, she has made a mark in the fashion industry. A jury member for VPR Mrs. India 2022, she has also showcased her designs in Divyafal Couture Saga Season 1 & 2. Based in Bhopal, she actively promotes handloom fashion, collaborating with local artisans to create timeless designs."
        },
        {
            id: 15,
            name: "CA. Vaishali Baheti",
            photo: "../../images/Enablers/VaishaliBaheti.jpg",
            title: "Chartered Accountant | Financial Expert | Sports Enthusiast",
            description: "CA. Vaishali Baheti is a seasoned Chartered Accountant with 25+ years of expertise in accountancy, audit, taxation, and financial consulting. Holding a DISA qualification and certifications in Forensic Accounting, AI, GST, and Banking Audits, she has served as a judge, Quiz Master, and MOC at ICAI events, showcasing her leadership and public speaking skills. Beyond finance, she actively organizes Lions and Leo Club events and is a university champion in Table Tennis, excelling in badminton and dance as well."
        },
        {
            id: 16,
            name: "Dr. Rashmi Moghe Hirve",
            photo: "../../images/Enablers/RashmiMoghe.jpg",
            title: "Psychiatrist & Counsellor | Gold Medalist MBBS | Mental Health Expert",
            description: "Dr. Rashmi Moghe Hirve is a highly accomplished psychiatrist and counsellor, holding an MBBS (Gold Medalist), DNB Psychiatry, and multiple PG Diplomas in Counselling & Mental Health. With expertise in treating depression, anxiety, sleep disorders, and migraines, she is dedicated to promoting mental well-being. Certified in Career Counselling from GCC UCLA, she provides personalized therapy and guidance. She consults at Synapse Neurosciences Clinic, Bhopal, offering compassionate care to those in need."
        },
        {
            id: 17,
            name: "RJ Sukriti",
            photo: "../../images/Enablers/RJSukriti.jpg",
            title: "Radio Mirchi",
            description: "RJ Sukriti is a vibrant and charismatic radio personality at Radio Mirchi, known forher engaging voice and energetic hosting style. With her witty storytelling and deep connectionwith listeners, she keeps the audience entertained and informed. Her shows blend music,entertainment, and social insights, making her a favorite among radio lovers. Passionate about creating impactful content, RJ Sukriti continues to bring positivity and fun to the airwaves, making every listener’s day a little brighter!"
        },
        {
            id: 18,
            name: "Anuradha Joshi",
            photo: "../../images/Enablers/AnuradhaJoshi.jpg",
            title: "Sarpanch & Social Leader",
            description: "Anuradha Joshi, a dedicated leader, has transitioned from being a housewife and part-time LIC agent to an active social activist and political representative. With five years of social work experience, she has been instrumental in community development and is now an active member of BJP, working towards grassroots empowerment and progress."
        },
        {
            id: 19,
            name: "Simran Khurana",
            photo: "../../images/Enablers/SimranKhurana.jpg",
            title: "Brand Media Expert | Creative head | Director",
            description: "With 15+ years of experience, Simrrun Khuurana is a brand media expert, creative head, and director, shaping impactful campaigns, words, and brands. She is also Mrs. Central India Curvy 2023, confidently breaking stereotypes in plus-size fashion. Passionate about storytelling and innovation, she continues to empower brands and redefine beauty standards with creativity and confidence."
        },
        {
            id: 20,
            name: "Madhuri Mishra",
            photo: "../../images/Enablers/MadhuriMishra.jpg",
            title: "Director, Apna Ghar Old Age Home",
            description: "Madhuri Mishra is a compassionate leader and social worker, dedicated to providing care and dignity to the elderly. As the Director of Apna Ghar Old Age Home, she works tirelessly to create a safe, loving, and supportive environment for senior citizens. Her mission is to ensure that every elder receives the respect, care, and companionship they deserve in their golden years.",
        },
        {
            id: 21,
            name: "Anamika Tiwari",
            photo: "../../images/Enablers/AnamikaTiwari.jpg",
            title: "Visionary Nationalist & Educationist",
            description: "Anamika Tiwari is a nationalist, entrepreneur, and reformer dedicated to transforming India's next generation. A postgraduate in Social Work, she returned to Bharat after a decade abroad to promote Indian Knowledge Systems, long before NEP 2020. She actively teaches Vedic Maths, Sanskrit, and Astronomy to students and professionals, including military and Sainik schools. Passionate about women empowerment, she supports artisans and counsels women facing challenges in India and abroad. Her mission is to decolonize minds and shape a Viksit Bharat by 2047.",
        },
    ];

    return (
        <section
            ref={enablersRef}
            id="enablers"
            className="py-12 md:py-24 bg-gradient-to-b from-[#121212] to-black text-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
                        Our <span className="text-[#48d494]">Enablers</span>
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto">
                        Meet the exceptional women leaders who inspire, mentor, and empower our community
                        to build the next generation of groundbreaking startups.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Slider navigation arrows */}
                    <button
                        onClick={prevSlide}
                        className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 md:p-3 z-10 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 md:p-3 z-10 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </button>

                    <div ref={sliderRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {enablers.map((enabler, index) => (
                                <div key={index} className="min-w-full p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center">
                                        {/* Larger Circular Image Container */}
                                        <div className="w-60 h-60 mt-4 md:w-80 md:h-80 mx-auto md:mx-0 aspect-square rounded-full overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-105">
                                            <img
                                                src={enabler.photo}
                                                alt={enabler.name}
                                                className="w-full h-full object-cover object-top rounded-full"
                                            />
                                        </div>

                                        {/* Text Content with Reduced Whitespace */}
                                        <div className="flex flex-col justify-center text-center md:text-left mt-4 md:mt-0">
                                            <h3 className="text-xl md:text-2xl font-bold mb-1 text-[#48d494]">{enabler.name}</h3>
                                            <p className="text-base md:text-lg text-white mb-2">{enabler.title}</p>
                                            <p className="text-sm md:text-base text-gray-300 mb-3 leading-relaxed line-clamp-4 md:line-clamp-none">{enabler.description}</p>
                                            <div className="w-16 h-1 bg-[#48d494] mb-3 mx-auto md:mx-0"></div>
                                            <button
                                                onClick={() => handleEnablerClick(enabler)} // Fixed to pass enabler object
                                                className="self-center md:self-start bg-transparent hover:bg-[#48d494]/20 text-[#48d494] border border-[#48d494] px-4 py-1.5 rounded-md text-sm transition-colors duration-300"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popup Rendering */}
                    {selectedEnabler && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                                onClick={() => setSelectedEnabler(null)}
                            ></div>
                            {/* Your ConnectPopup Component */}
                            <div className="relative z-50">
                                <ConnectPopup
                                    enablerName={selectedEnabler.name}
                                    onClose={() => setSelectedEnabler(null)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Mobile Navigation Arrows */}
                    <div className="flex justify-between sm:hidden mt-6">
                        <button
                            onClick={prevSlide}
                            className="bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-[#48d494]/20 hover:bg-[#48d494]/40 rounded-full p-2 transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {enablers.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#48d494] w-4' : 'bg-gray-500'}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* View All Enablers Button */}
                <div className="text-center mt-12">
                    <button
                        onClick={() => navigate('/allenablers')}
                        className="bg-[#48d494] text-black px-6 py-2 rounded-md font-medium hover:bg-[#3bc17f] transition-colors duration-300"
                    >
                        View All Enablers
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Enablers;