import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const MemberLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', credentials);
    // After successful login
    navigate('/memberlogin');
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen flex flex-col">
      <Navbar/>

      <main className="flex-grow flex items-center justify-center p-4 mt-12 md:p-6">
        <div className="w-full max-w-md">
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
            <div className="bg-[#48d494]/10 p-6 border-b border-gray-800">
              <h1 className="text-2xl font-bold text-center text-[#48d494]">Member Login</h1>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username or Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      value={credentials.username}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#48d494]/50 focus:border-[#48d494]/50 text-white placeholder-gray-400" 
                      placeholder="Enter your username or email" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={credentials.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#48d494]/50 focus:border-[#48d494]/50 text-white placeholder-gray-400" 
                      placeholder="Enter your password" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#48d494] hover:bg-[#48d494]/90 text-gray-900 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#48d494]/30 flex items-center justify-center space-x-2"
                  >
                    <span>Log In</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </form>
              
              <div className="flex items-center justify-between text-sm">
                <a href="/forgot-password" className="text-[#48d494]/90 hover:text-[#48d494] transition-colors">Forgot password?</a>
                <a href="/trouble-login" className="text-[#48d494]/90 hover:text-[#48d494] transition-colors">Trouble logging in?</a>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/70 text-gray-400">Or</span>
                </div>
              </div>
              
              <div className="text-center">
                <a 
                  href="/membership" 
                  className="inline-block px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-[#48d494] border border-gray-700 rounded-lg transition-colors duration-200"
                >
                  Become a member now!
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>© 2020-2025 Sherise Club. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MemberLogin;