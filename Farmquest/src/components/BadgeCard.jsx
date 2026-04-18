import React, { useState } from 'react';
import Icon from './Icon';

const BadgeCard = ({ badge, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const rarityColors = {
    Common: "border-gray-400",
    Uncommon: "border-green-400", 
    Rare: "border-blue-400",
    Epic: "border-purple-400",
    Legendary: "border-yellow-400"
  };

  return (
    <div 
      className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 border-2 ${rarityColors[badge.rarity]} border-opacity-20 hover:border-opacity-60 transition-all duration-300`}>
        <div className={`w-12 h-12 ${badge.bgColor} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
          <Icon name={badge.icon} className={`w-6 h-6 ${badge.color}`} />
        </div>
        <h3 className="font-semibold text-center text-sm mb-1">{badge.name}</h3>
        <p className="text-xs text-gray-400 text-center mb-2">{badge.description}</p>
        <div className="flex justify-between items-center text-xs">
          <span className={`px-2 py-1 rounded-full text-xs ${badge.bgColor} ${badge.color}`}>
            {badge.rarity}
          </span>
          <span className="text-gray-500">{badge.earnedDate}</span>
        </div>
      </div>
      
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white p-3 rounded-lg shadow-lg z-20 min-w-48 border border-gray-700">
          <div className="text-sm font-semibold mb-1">{badge.name}</div>
          <div className="text-xs text-gray-300 mb-2">{badge.description}</div>
          <div className="text-xs text-gray-400">Earned: {badge.earnedDate}</div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700"></div>
        </div>
      )}
    </div>
  );
};

export default BadgeCard;

