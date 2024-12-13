import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import IMG from '../assets/dynavest.png'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <nav className="bg-[#2DD4BF] p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={IMG} alt="Logo" className="h-12 w-auto bg-transparent" />
        </div>

        
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to="/" className="text-white">Home</Link> 
          <button 
            onClick={handleLogout} 
            className="text-white bg-[#2DD4BF] px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

    
      {isMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col items-center space-y-2">
          <Link to="/" className="text-white">Home</Link> 
          <button 
            onClick={handleLogout} 
            className="text-white bg-[#2DD4BF] px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
