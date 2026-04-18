import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import Leaderboard from '../components/Leaderboard';

// --- Slideshow Background Component ---
const Slideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1492496913980-5013382e103b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1444858291040-5c7f763d9f1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute top-0 left-0 w-full h-full">
      {images.map((img, index) => (
        <div
          key={img}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${img})`, opacity: index === currentImage ? 1 : 0 }}
        />
      ))}
      {/* Dimming overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
    </div>
  );
};

// --- Main Home Page Component ---
// It now accepts 'onNavClick' as a prop
const Home = ({ onNavClick }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations shortly after the component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Data for the two featured challenges
  const featuredChallenges = [
      { name: "Water Conservation", icon: "water", description: "Reduce water usage by 20% this week." },
      { name: "Organic Composting", icon: "leaf", description: "Start a new compost pile with kitchen scraps." }
  ];

  return (
    <div className="text-white">
      {/* Hero Section with Slideshow */}
      <div className="relative h-80 flex items-center justify-center text-center p-4 overflow-hidden">
        <Slideshow />
        <div className="relative z-10">
          <h1 className={`text-5xl font-bold mb-2 transition-all duration-1000 ease-out ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1/4'}`}>
            Welcome back, Farm-Adventurer!
          </h1>
          <p className={`text-xl text-gray-300 transition-all duration-1000 ease-out delay-200 ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1/4'}`}>
            Your journey to sustainable farming continues.
          </p>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Featured Challenge */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className={`bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: 980, label: 'Total Points', color: 'text-green-400' },
                  { value: 15, label: 'Current Level', color: 'text-yellow-400' },
                  { value: 4, label: 'Badges Earned', color: 'text-purple-400' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-900/50 p-4 rounded-lg text-center transition-transform duration-300 hover:scale-105">
                    <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Challenge Section */}
            <div className={`bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '200ms'}}>
              <h2 className="text-2xl font-bold mb-4">Featured Challenges</h2>
              <div className="space-y-4">
                {featuredChallenges.map(challenge => (
                   <div key={challenge.name} className="flex items-center space-x-4 bg-gray-900/50 p-3 rounded-lg">
                     <div className="text-3xl text-green-400">
                       <Icon name={challenge.icon} />
                     </div>
                     <div>
                       <h3 className="text-lg font-semibold">{challenge.name}</h3>
                       <p className="text-gray-400 text-sm">{challenge.description}</p>
                     </div>
                   </div>
                ))}
              </div>
              <div className="text-right mt-4">
                {/* This link is now functional */}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick('Challenges');
                  }}
                  className="text-sm font-semibold text-green-400 hover:text-white"
                >
                  View All Challenges →
                </a>
              </div>
            </div>
          </div>
          
          {/* Right Column: Leaderboard */}
          <div className={`lg:col-span-1 transition-all duration-700 ease-out ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: '400ms'}}>
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

