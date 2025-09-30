import { useState, useEffect } from "react";
import {
  ArrowRight,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Use state instead of localStorage for better React practices
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  const navLinks = [
    { href: "/", label: "The Club", section: "club" },
    { href: "/membership", label: "Membership", section: "membership" },
    { href: "/allenablers", label: "Enablers", section: "enablers" },
    { href: "/events", label: "Events & Workshops", section: "events" },
    { href: "/resources", label: "Resources", section: "resources" },
  ];

  const scrollToSection = (sectionId) => {
    if (sectionId === "quickHelp" && location.pathname !== "/") {
      navigate("/");
      sessionStorage.setItem("scrollToSection", "quickHelp");
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const handleNavigation =
    (path, sectionId = null) =>
    (e) => {
      e.preventDefault();

      if (location.pathname === path && sectionId) {
        scrollToSection(sectionId);
      } else {
        navigate(path);
        if (sectionId) {
          sessionStorage.setItem("scrollToSection", sectionId);
        }
      }
      setMobileMenuOpen(false);
    };

  const handleQuickHelpClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      sessionStorage.setItem("scrollToSection", "quickHelp");
    } else {
      scrollToSection("quickHelp");
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const getDashboardPath = () => {
    const dashboards = {
      admin: "/admin",
      operator: "/operator",
      enabler: "/enabler",
    };
    return dashboards[role] || "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.section);
      const offset = 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Handle scroll to section after navigation
    const sectionToScrollTo = sessionStorage.getItem("scrollToSection");
    if (sectionToScrollTo) {
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => scrollToSection(sectionToScrollTo), 300);
    }

    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest("nav")) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg shadow-emerald-500/10"
          : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-50 group">
            <img
              className="h-8 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              src="/images/logo.png"
              alt="Company Logo"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.innerHTML =
                  '<span class="text-emerald-400 text-xl md:text-2xl font-bold">LOGO</span>';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={link.href}
                onClick={handleNavigation(link.href, link.section)}
                className={`relative px-4 lg:px-5 xl:px-6 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg group whitespace-nowrap ${
                  activeSection === link.section ||
                  location.pathname === link.href
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-white hover:text-emerald-300 hover:bg-white/5"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-emerald-400 transition-all duration-300 ${
                    activeSection === link.section ||
                    location.pathname === link.href
                      ? "w-3/4"
                      : "w-0 group-hover:w-3/4"
                  }`}
                ></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth & Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            {token ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 px-4 lg:px-5 py-2 text-sm lg:text-base font-medium text-white hover:text-emerald-400 hover:bg-white/5 transition-all duration-200 rounded-lg whitespace-nowrap"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 lg:px-5 py-2 text-sm lg:text-base font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 lg:px-5 py-2 text-sm lg:text-base font-medium text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 lg:px-5 py-2 text-sm lg:text-base font-medium text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 hover:border-emerald-500 rounded-lg transition-all duration-200 whitespace-nowrap"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
            <button
              onClick={handleQuickHelpClick}
              className="flex items-center gap-2 px-5 lg:px-6 py-2.5 text-sm lg:text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/50 hover:scale-105 whitespace-nowrap"
            >
              <span>Need Help?</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 text-white hover:bg-white/10 active:bg-white/20 rounded-lg transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <X
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "rotate-0 opacity-100"
                    : "rotate-90 opacity-0"
                }`}
              />
              <Menu
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  mobileMenuOpen
                    ? "-rotate-90 opacity-0"
                    : "rotate-0 opacity-100"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 bottom-0 z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full bg-gradient-to-b from-black via-black to-gray-900 backdrop-blur-lg border-t border-white/10 shadow-2xl">
          <div className="px-4 py-6 space-y-2 h-full overflow-y-auto">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={link.href}
                onClick={handleNavigation(link.href, link.section)}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  activeSection === link.section ||
                  location.pathname === link.href
                    ? "text-emerald-400 bg-emerald-500/20 border border-emerald-500/50"
                    : "text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

            {/* Auth Section */}
            {token ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-white hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-base font-medium text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 hover:border-emerald-500 rounded-lg transition-all duration-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-500 rounded-lg transition-all duration-200"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </Link>
              </>
            )}

            {/* Help Button */}
            <button
              onClick={handleQuickHelpClick}
              className="flex items-center justify-center gap-2 w-full px-4 py-3.5 text-base font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/30 mt-4"
            >
              <span>Need Help?</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
