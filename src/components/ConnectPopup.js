import React, { useState, useEffect } from 'react';

const ConnectPopup = ({ enablerName, onClose }) => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });

  // Auto-close after successful submission
  useEffect(() => {
    if (message && message.includes("✅")) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Close after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          enabler: enablerName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Inquiry submitted successfully!"); // Success message will trigger auto-close
        setFormData({ name: "", email: "", question: "" }); // Clear form
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    // Overlay with blurred background that covers the entire viewport
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Blurred semi-transparent background */}
      <div
        className="fixed inset-0  bg-opacity-70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Popup container with modern design */}
      <div className="bg-black rounded-lg border border-gray-800 shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-fadeIn relative z-10">
        {/* Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-gray-800">
          <h3 className="text-lg font-medium text-white">Connect with <span className="text-green-400">{enablerName}</span></h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-400 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Message Display with animation */}
        {message && (
          <div
            className={`px-6 py-3 text-sm animate-fadeIn ${message.includes("✅")
                ? "bg-black text-green-400 border-l-4 border-green-400"
                : "bg-black text-red-400 border-l-4 border-red-400"
              }`}
          >
            {message}
            {message.includes("✅") && <span className="ml-2 italic text-xs text-gray-400">Closing in 2 seconds...</span>}
          </div>
        )}

        {/* Form with improved styling */}
        <form onSubmit={handleSubmit} className="p-6 bg-black text-gray-300">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-300">
                Your Message
              </label>
              <textarea
                id="question"
                name="question"
                rows="3"
                required
                value={formData.question}
                onChange={handleChange}
                placeholder={`Hi ${enablerName.split(' ')[0]}, I would like to connect with you...`}
                className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-400 transition-all duration-200"
              style={{ backgroundColor: '#48d494' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ConnectPopup;