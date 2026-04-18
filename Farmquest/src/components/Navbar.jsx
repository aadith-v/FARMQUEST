import React from 'react';
import Icon from './Icon';

const Navbar = ({ onNavClick, isSidebarOpen, isLoggedIn, onLogout }) => {
  return (
    <nav className="bg-green-900 bg-opacity-30 backdrop-blur-md p-4 text-white flex justify-between items-center fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center space-x-2">
        {/* The leaf icon will only appear if the sidebar can be opened (i.e., user is logged in) */}
        {isLoggedIn && (
          <span className={`text-2xl transition-transform duration-300 ${isSidebarOpen ? 'rotate-90' : ''}`}>
             <Icon name="leaf" />
          </span>
        )}
        <h1 className="text-2xl font-bold">FarmQuest</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* --- CONDITIONAL BUTTON LOGIC --- */}
        {isLoggedIn ? (
          <button 
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Log Out
          </button>
        ) : (
          <button 
            onClick={() => onNavClick('LoginSignup')}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

