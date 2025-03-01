import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SYSTEM_PROMPT = `You are an AI assistant representing SheRise Club, an exclusive initiative launched by the powerful women of Incubation Masters, led by Neha Tiwari, Mrs. Universe Aesthetics 2024, and a dedicated social worker. This club is a first-of-its-kind support network for women in Madhya Pradesh, connecting them with enablers—empowered women from various fields—who provide mentorship, guidance, and assistance free of cost to help other women grow personally and professionally.

Your primary responsibilities as an AI assistant include:

Providing Information – Explain what SheRise Club is, its mission, and how it empowers women.
Guiding Users on Joining – If a user asks how to join, provide them with the registration link: https://sherise.club.
Answering FAQs – Respond to inquiries based on the information available on the website and the core mission of the club.
Encouraging Engagement – Motivate women to join, participate, and take advantage of the resources and mentorship opportunities available.
Clarifying the Role of Enablers & Members – Explain that enablers are successful and empowered women offering support, while members are those seeking guidance.
Promoting the Unique Nature of the Club – Emphasize that SheRise Club is one of a kind, completely free, and designed to foster a community of empowered women helping each other.
If certain information is not available, politely direct users to the official website: https://sherise.club. Your responses should be supportive, informative, and empowering, encouraging women to become part of this life-changing initiative. Keep responses concise and professional (2-3 sentences max)`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const welcomeMessages = [
    {
      sender: "bot",
      text: "Hi there! Welcome to SheRise Club",
    },
    {
      sender: "bot",
      text: "I am Astraa, your AI assistant and I am ready to help you with your questions about SheRise Club.",
    },
    {
      sender: "bot",
      text: "How can I help you today?",
    },
  ];
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const generateChatGPTPrompt = (userMessage) => ({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  // Add body class to prevent scrolling when chat is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen, isMobile]);

  const sendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");
    setIsTyping(true);

    try {
      const prompt = generateChatGPTPrompt(userMessage);
      console.log("Sending request to OpenAI API...", prompt); // Debug log
      const response = await axios.post(
        process.env.REACT_APP_OPENAI_API_URL,
        prompt,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OpenAI API Response:", response.data); // Debug log

      const botResponse =
        response.data.choices?.[0]?.message?.content ||
        "I couldn't generate a response. Please try again.";

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Error calling ChatGPT API:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I apologize, but I'm having trouble processing your request at the moment. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to add messages with delay
  const addMessagesSequentially = async () => {
    for (let i = 0; i < welcomeMessages.length; i++) {
      setIsTyping(true);
      // Wait for 1 second to simulate typing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessages((prev) => [...prev, welcomeMessages[i]]);
      setIsTyping(false);
      // Wait for 500ms between messages
      if (i < welcomeMessages.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addMessagesSequentially();
    }
  }, [isOpen, messages.length]);

  const renderMessages = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
          >
            <div
              className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
            >
              {msg.sender === "bot" && (
                <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIn2lCLQPTvUze5FrfuxIoINxjHoiuwW9Cw&s"
                      alt="Bot Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">Eimee</span>
                </div>
              )}

              <div
                className={`${msg.sender === "user"
                  ? "bg-gradient-to-r from-[#48d494] to-green-400 text-white rounded-t-xl rounded-bl-xl"
                  : "bg-white text-gray-800 rounded-t-xl rounded-br-xl shadow-sm"
                  } py-2 px-3 text-sm leading-normal break-words`}
              >
                <p className="text-[13px] sm:text-[14px]">{msg.text}</p>
              </div>

              {msg.sender === "user" && (
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-[#48d494] to-green-400 flex items-center justify-center shadow-sm">
                  <User className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIn2lCLQPTvUze5FrfuxIoINxjHoiuwW9Cw&s"
                    alt="Bot Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500">Eimee</span>
              </div>
              <div className="bg-white rounded-t-xl rounded-br-xl py-2 px-3 shadow-sm">
                <div className="flex space-x-1">
                  <div
                    className="w-1.5 h-1.5 bg-[#48d494] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-[#48d494] rounded-full animate-bounce"
                    style={{ animationDelay: "200ms" }}
                  />
                  <div
                    className="w-1.5 h-1.5 bg-[#48d494] rounded-full animate-bounce"
                    style={{ animationDelay: "400ms" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-2 sm:px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-[#48d494] focus:ring-1 focus:ring-[#48d494] transition-colors"
          />
          <button
            type="submit"
            className="px-2 sm:px-3 py-2 bg-gradient-to-r from-[#48d494] to-green-400 hover:opacity-90 text-white rounded-lg transition-all shadow-sm flex items-center justify-center min-w-[40px] min-h-[40px]"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={`${isOpen && isMobile ? 'fixed inset-0 z-50' : 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50'}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${isMobile ? 'w-full h-full' : 'w-[95vw] sm:w-[380px] h-[75vh] sm:h-[600px] max-w-[380px] max-h-[600px] rounded-xl sm:rounded-2xl'} shadow-2xl overflow-hidden flex flex-col border border-gray-200 bg-white`}
            initial={isMobile ? { opacity: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
            animate={isMobile ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
            exit={isMobile ? { opacity: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {/* Navbar / Header - Always visible */}
            <div className="bg-white p-3 sm:p-4 flex items-center justify-between border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#48d494]" />
                </div>
                <span className="text-sm sm:text-base text-gray-900 font-semibold">SheRise Club Support</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Don't reset messages so conversation continues if reopened
                }}
                className="text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Content */}
            <div className="flex-1 flex overflow-hidden">
              {renderMessages()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#48d494] to-green-400 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ boxShadow: "0 8px 20px rgba(72, 212, 148, 0.3)" }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
        </motion.button>
      )}
    </div>
  );
}

export default Chatbot;