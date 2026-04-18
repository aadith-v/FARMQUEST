import React, { useState, useEffect } from 'react';
import Icon from './Icon';

const Leaderboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScores, setAnimatedScores] = useState({});
  const [hoveredPlayer, setHoveredPlayer] = useState(null);

  const topPlayers = [
    { rank:1,name: 'Harsh', score: 1500, avatar: 'https://placehold.co/40x40/a2e6b9/333333?text=A' },
    { rank:2,name: 'Kishore', score: 1450, avatar: 'https://placehold.co/40x40/f4e8a1/333333?text=B' },
    { rank:3,name: 'Gauri', score: 1300, avatar: 'https://placehold.co/40x40/a1c9f4/333333?text=C' },
  ];

  const otherPlayers = [
    { rank: 4, name: 'Gopi', score: 1250, avatar: 'https://placehold.co/40x40/e6a2a2/333333?text=D' },
    { rank: 5, name: 'Adhit', score: 1100, avatar: 'https://placehold.co/40x40/a2e6d3/333333?text=E' },
    { rank: 6, name: 'Deepak', score: 1050, avatar: 'https://placehold.co/40x40/d3a2e6/333333?text=F' },
    { rank: 7, name: 'You', score: 980, avatar: 'https://placehold.co/40x40/b8e6a2/333333?text=Y' },
  ];

  const medalIcons = ['medal1', 'medal2', 'medal3'];
  const medalColors = ['text-yellow-400', 'text-gray-400', 'text-yellow-600'];

  // Component entrance animation
  useEffect(() => {
    setIsVisible(true);
    
    // Score counting animation
    const allPlayers = [...topPlayers, ...otherPlayers];
    const scoreAnimations = {};
    
    allPlayers.forEach((player, index) => {
      const timer = setTimeout(() => {
        scoreAnimations[player.name] = player.score;
        setAnimatedScores({...scoreAnimations});
      }, 200 * (index + 1));
      
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div className={`bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-lg text-white transform transition-all duration-700 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <h3 className="text-2xl font-bold mb-6 text-center transform transition-transform duration-500 hover:scale-105 flex items-center justify-center gap-3">
        <Icon name="trophy" className="text-yellow-400" />
        Leaderboard
        <Icon name="crown" className="text-yellow-400" />
      </h3>
      
      <div className="space-y-3">
        {/* Top 3 Players with Medals */}
        {topPlayers.map((player, index) => (
          <div 
            key={player.name} 
            className={`flex items-center bg-white bg-opacity-20 p-4 rounded-lg transform transition-all duration-500 hover:scale-102 hover:bg-opacity-30 hover:shadow-xl border-2 ${
              index === 0 ? 'border-yellow-400 border-opacity-50' : 
              index === 1 ? 'border-gray-400 border-opacity-50' : 
              'border-yellow-600 border-opacity-50'
            } ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${index * 100}ms`,
              transform: hoveredPlayer === player.name ? 'scale(1.02) translateY(-2px)' : 'scale(1)'
            }}
            onMouseEnter={() => setHoveredPlayer(player.name)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            {/* Medal Icon */}
            <span className={`w-10 text-center transform transition-all duration-300 ${
              hoveredPlayer === player.name ? 'scale-110 rotate-12' : 'scale-100'
            } ${medalColors[index]}`}>
              <Icon name={medalIcons[index]} size={32} />
            </span>
            
            {/* Player Avatar */}
            <img 
              src={player.avatar} 
              alt={player.name} 
              className="w-12 h-12 rounded-full ml-3 transform transition-transform duration-300 hover:scale-110 border-2 border-white border-opacity-30 shadow-lg"
            />
            
            {/* Player Name */}
            <span className="font-semibold ml-4 flex-grow transform transition-all duration-300 hover:translate-x-1 text-lg">
              {player.name}
            </span>
            
            {/* Animated Score */}
            <span className="font-bold text-lg bg-white bg-opacity-20 px-3 py-2 rounded-full transform transition-all duration-500 hover:scale-110 hover:bg-opacity-30 shadow-inner">
              {animatedScores[player.name] || 0}
            </span>
          </div>
        ))}

        {/* Divider with Animation */}
        <div className={`relative my-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-500 border-opacity-50"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white bg-opacity-10 px-3 py-1 rounded-full text-sm text-gray-300 backdrop-blur-sm">
              Other Players
            </span>
          </div>
        </div>

        {/* Other Players */}
        {otherPlayers.map((player, index) => (
          <div 
            key={player.name} 
            className={`flex items-center p-3 rounded-lg transform transition-all duration-500 hover:scale-102 ${
              player.name === 'You' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-opacity-30 hover:bg-opacity-40 hover:shadow-lg border border-green-400 border-opacity-30' 
                : 'hover:bg-white hover:bg-opacity-10 border border-transparent'
            } ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
            style={{ 
              transitionDelay: `${(index + topPlayers.length) * 80}ms`,
              transform: hoveredPlayer === player.name ? 'scale(1.02) translateY(-1px)' : 'scale(1)'
            }}
            onMouseEnter={() => setHoveredPlayer(player.name)}
            onMouseLeave={() => setHoveredPlayer(null)}
          >
            {/* Rank Number */}
            <span className="w-8 text-center font-semibold transform transition-transform duration-300 hover:scale-125 text-gray-300">
              {player.rank}
            </span>
            
            {/* Player Avatar */}
            <img 
              src={player.avatar} 
              alt={player.name} 
              className="w-10 h-10 rounded-full ml-3 transform transition-transform duration-300 hover:scale-110 border-2 border-white border-opacity-20 shadow-md"
            />
            
            {/* Player Name */}
            <span className={`font-semibold ml-4 flex-grow transform transition-all duration-300 hover:translate-x-1 ${
              player.name === 'You' ? 'text-green-300 font-bold' : ''
            }`}>
              {player.name}
            </span>
            
            {/* Animated Score */}
            <span className={`font-bold text-lg px-3 py-1 rounded-full transform transition-all duration-500 hover:scale-110 shadow-inner ${
              player.name === 'You' 
                ? 'bg-green-500 bg-opacity-30 text-green-100' 
                : 'bg-white bg-opacity-15 text-gray-100'
            }`}>
              {animatedScores[player.name] || 0}
            </span>
          </div>
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl -z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white bg-opacity-20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
        {/* Trophy sparkles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 30}%`,
              top: '10%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Status Bar */}
      <div className={`mt-6 pt-4 border-t border-white border-opacity-20 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center text-sm text-gray-300">
          <span className="flex items-center gap-2">
            <Icon name="award" size={16} className="text-yellow-400" />
            {topPlayers.length} Top Players
          </span>
          <span className="flex items-center gap-2">
            <Icon name="history" size={16} className="text-blue-400" />
            Updated just now
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;