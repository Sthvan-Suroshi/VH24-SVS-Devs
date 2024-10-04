import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const menuRef = useRef(null); 

  
  const toggleMenu = () => {
    setIsLoginHovered((prev) => !prev);
  };

  
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsLoginHovered(false);
    }
  };

  useEffect(() => {
    
    document.addEventListener('mousedown', handleClickOutside);
    
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col">
      <header className="px-6 h-20 flex items-center bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <span className="ml-2 text-2xl font-bold text-blue-600">CharityConnect</span>
        </div>
        <nav className="ml-auto flex items-center gap-4">
          <button className="py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200">
            Sign Up
          </button>
          <div className="relative" ref={menuRef}>
            <button
              className="py-2 px-4 border border border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition duration-200"
              onClick={toggleMenu}
            >
              Login
            </button>
            {isLoginHovered && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-10">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  Donor
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  Shopkeeper
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                  Institute
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 lg:px-[120px]">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {}
          <div className="text-center lg:text-left w-full px-5 ">
            <h1 className="text-6xl lg:text-6xl font-bold mb-7 text-blue-800 leading-tight">
              Connecting Hearts, Delivering Essentials
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our community of donors, suppliers, and charitable institutes to make a lasting impact.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg">
              Get Started
            </button>
          </div>

          {}
          <div className="flex justify-center ">
            <div className="relative">
              <img
                src="src/assets/donation.jpeg" 
                alt="Charity"
                className="relative z-10 rounded-lg"
                style={{ maxWidth: '550px', height: 'auto' }} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
