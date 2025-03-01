import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import API_URL from "../components/config";

const Membership = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobFunction: "",
    vertical: "",
    interests: [],
    hearAbout: "",
    emailPermission: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "interests") {
        let newInterests = [...formData.interests];
        if (checked) {
          newInterests.push(value);
        } else {
          newInterests = newInterests.filter((interest) => interest !== value);
        }
        setFormData({ ...formData, interests: newInterests });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/membership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Successfully submitted!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          jobFunction: "",
          vertical: "",
          interests: [],
          hearAbout: "",
          emailPermission: false,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181818] to-[#0d0d0d] text-white flex flex-col">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content - with padding-top to avoid navbar overlap */}
      <div className="flex-grow pt-16">
        {/* Hero Section */}
        <div className="py-6 sm:py-10 bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white drop-shadow-md">
              Become a Member
            </h1>
            <p className="mt-2 sm:mt-4 text-center text-white text-lg sm:text-xl max-w-2xl mx-auto px-2">
              Exclusive access to mentorship from successful women leaders.
              <br /> Opportunities for networking, business collaborations, and
              funding
            </p>
            <div className="mt-4 sm:mt-6 text-center">
              <Link
                to="/memberlogin"
                className="inline-flex items-center px-4 sm:px-5 py-2 border border-white/30 rounded-md shadow-sm text-sm font-medium text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-150"
              >
                Already a member? Log in
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-10">
          <div className="bg-black/50 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 mb-8 border border-gray-700 transition-all hover:shadow-green-900/20">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-400 mb-4 sm:mb-6">
              Join Our Community
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Please join our worldwide network and support women and the
                localization industry. Participate in chapter or virtual events,
                subscribe to our newsletter, advance your career, and connect
                with peers from all over the world.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-gray-800 rounded-md border-l-4 border-green-400 mb-6 text-sm sm:text-base">
              <p className="text-gray-200">
                <span className="font-medium text-green-300">Important:</span>{" "}
                Please sign up with your personal email, not your work or school
                email, to ensure continued access to your Sherise Club
                membership if you change jobs or finish school.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-green-300 mb-1"
                  >
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                    className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50  text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-green-300 mb-1"
                  >
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50  text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Email address <span className="text-red-400">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.personal@email.com"
                    required
                    className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50  text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <p className="mt-1 text-xs sm:text-sm text-gray-400 italic">
                  Please use your personal email, not your work or school email.
                </p>
              </div>

              {/* Job Function */}
              <div>
                <label
                  htmlFor="jobFunction"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Job Function <span className="text-red-400">*</span>
                </label>
                <select
                  id="jobFunction"
                  name="jobFunction"
                  required
                  className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50  text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                  value={formData.jobFunction}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="management">Management</option>
                  <option value="student">Student</option>
                  <option value="engineer">Engineer</option>
                  <option value="translator">Translator</option>
                  <option value="project-manager">Project Manager</option>
                  <option value="business-development">
                    Business Development
                  </option>
                </select>
              </div>

              {/* Vertical */}
              <div>
                <label
                  htmlFor="vertical"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Vertical <span className="text-red-400">*</span>
                </label>
                <select
                  id="vertical"
                  name="vertical"
                  required
                  className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50  text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                  value={formData.vertical}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="tech">Technology</option>
                  <option value="health">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="retail">Retail</option>
                </select>
              </div>

              {/* Interests */}
              <div className="p-4 sm:p-6 bg-black/50  rounded-lg border border-gray-600 shadow-inner">
                <p className="block text-sm font-medium text-green-300 mb-2 sm:mb-3">
                  Areas of Interest
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                  {[
                    {
                      id: "interest-news",
                      value: "industry-news",
                      label: "Learn about industry news and trends",
                    },
                    {
                      id: "interest-recruitment",
                      value: "recruitment",
                      label: "Recruitment",
                    },
                    {
                      id: "interest-connect",
                      value: "network",
                      label: "Connect to our network of professionals",
                    },
                    {
                      id: "interest-events",
                      value: "events",
                      label: "Keep up with Chapter events",
                    },
                    {
                      id: "interest-mentor",
                      value: "mentor",
                      label: "Become a mentor/Find a mentor",
                    },
                    {
                      id: "interest-volunteer",
                      value: "volunteer",
                      label: "Become a Sherise Club volunteer",
                    },
                    {
                      id: "interest-business",
                      value: "business",
                      label: "Sales/Business development",
                    },
                    { id: "interest-job", value: "job", label: "Job seeking" },
                    { id: "interest-other", value: "other", label: "Other" },
                  ].map((interest) => (
                    <div key={interest.id} className="flex items-start">
                      <input
                        id={interest.id}
                        name="interests"
                        type="checkbox"
                        value={interest.value}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-800 mt-0.5"
                        onChange={handleChange}
                        checked={formData.interests.includes(interest.value)}
                      />
                      <label
                        htmlFor={interest.id}
                        className="ml-2 sm:ml-3 block text-xs sm:text-sm text-gray-300"
                      >
                        {interest.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source */}
              <div>
                <label
                  htmlFor="hearAbout"
                  className="block text-sm font-medium text-green-300 mb-1"
                >
                  Where did you hear about us?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <select
                  id="hearAbout"
                  name="hearAbout"
                  required
                  className="block w-full px-3 sm:px-4 py-2 border border-gray-600 rounded-md shadow-sm bg-black/50 text-white focus:ring-green-500 focus:border-green-500 transition duration-150 text-sm sm:text-base"
                  value={formData.hearAbout}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Friend or Colleague</option>
                  <option value="event">Event</option>
                  <option value="search">Search Engine</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Email Permission */}
              <div className="pt-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailPermission"
                      name="emailPermission"
                      type="checkbox"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 border-gray-600 rounded focus:ring-green-500 bg-gray-800"
                      checked={formData.emailPermission}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="ml-2 sm:ml-3 text-xs sm:text-sm">
                    <label htmlFor="emailPermission" className="text-gray-300">
                      I agree to receive newsletters and updates from Sherise
                      Club
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button with Login Link */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>SUBSCRIBE</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Membership;
