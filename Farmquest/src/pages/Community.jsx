import React from 'react';
import ChatBox from '../components/ChatBox';
import Icon from '../components/Icon';
import Leaderboard from '../components/Leaderboard';

const Community = () => {
  const recentActivities = [
    { user: 'Harsh', action: 'completed the "Weekly Composting" challenge!', icon: 'challenges' },
    { user: 'Gauri', action: 'earned the "Green Thumb" badge!', icon: 'badge' },
    { user: 'Kishore', action: 'just joined the "Local Cleanup" event.', icon: 'community' },
  ];

  return (
    <div className="p-4 md:p-8 text-white animate-fade-in-up">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="community" className="text-4xl text-green-400" />
        <h1 className="text-3xl font-bold tracking-wider">Community Hub</h1>
      </div>
      
      {/* Using Flexbox for a robust two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
        
        {/* Left Column (takes up 2/3 of the width on large screens) */}
        <div className="lg:w-2/3 space-y-8">

          {/* Recent Activity Section with enhanced styling and hover effects */}
          <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 text-white border border-gray-700/50 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700/50">
              <Icon name="history" className="text-2xl text-green-400" />
              <h2 className="text-xl font-bold tracking-wider">Recent Activity</h2>
            </div>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li 
                  key={index} 
                  className="flex items-center bg-gray-900/50 p-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700/50 hover:scale-105 cursor-pointer"
                >
                  <div className="text-green-300 w-6 h-6 mr-4">
                    <Icon name={activity.icon} />
                  </div>
                  <div>
                    <span className="font-semibold">{activity.user}</span>
                    <span className="ml-1 text-gray-300">{activity.action}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Community Chat */}
          <ChatBox />

        </div>

        {/* Right Column (takes up 1/3 of the width on large screens) */}
        <div className="lg:w-1/3">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Community;



