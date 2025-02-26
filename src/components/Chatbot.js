import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot popup window */}
      {isOpen && (
        <div className="mb-4 w-72 bg-black border border-emerald-400 rounded-lg shadow-lg overflow-hidden transition-all">
          {/* Chat header */}
          <div className="bg-emerald-400 p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-black mr-2" />
              <h3 className="font-medium text-black">SheRise Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-black hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat body */}
          <div className="h-80 bg-gray-900 p-3 overflow-y-auto">
            <div className="bg-gray-800 rounded-lg p-3 mb-2">
              <p className="text-white text-sm">
                Welcome to SheRise Club! How can I help you today?
              </p>
            </div>
            {/* More chat messages would go here */}
          </div>
          
          {/* Chat input */}
          <div className="p-3 bg-gray-800 border-t border-gray-700">
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <button className="bg-emerald-400 hover:bg-emerald-500 text-black px-4 py-2 rounded-r-md transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating chat button */}
      <button
        onClick={toggleChat}
        className="bg-emerald-400 hover:bg-emerald-500 text-black p-4 rounded-full shadow-lg transition-colors flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;