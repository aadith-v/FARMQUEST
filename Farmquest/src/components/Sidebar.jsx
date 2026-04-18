import React from 'react';
import Icon from './Icon';

const Sidebar = ({ onNavClick, isOpen, currentPage }) => {
  const navItems = [
    { name: 'Home', icon: 'home' },
    { name: 'Challenges', icon: 'challenges' },
    { name: 'Community', icon: 'community' },
    { name: 'Profile', icon: 'profile' },
    { name: 'AIChat', icon: 'chat' },
    { name: 'Shop Equipments', icon: 'cart' },
    { name: 'Sell', icon: 'store' },
  ];

  const pageDisplayNames = {
    'AIChat': 'AI Chat',
    'Shop Equipments': 'Shop Equipments',
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-gray-800/70 backdrop-blur-xl text-white w-64 p-4 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-700/50 shadow-2xl`}
    >
      <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-700/50">
        <Icon name="compass" className="text-3xl text-green-400" />
        <h2 className="text-xl font-bold tracking-wider uppercase">Navigation</h2>
      </div>

      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.name} className="mb-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); 
                  onNavClick(item.name); 
                }}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-700/50 ${currentPage === item.name ? 'bg-green-500 text-white font-semibold shadow-lg scale-105' : 'text-gray-300 hover:text-white'}`}
              >
                <div className="w-6 h-6 mr-4">
                  <Icon name={item.icon} />
                </div>
                <span className="text-lg">{pageDisplayNames[item.name] || item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

