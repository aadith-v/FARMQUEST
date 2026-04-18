import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import BadgeCard from '../components/BadgeCard';

// Mock data for the user's profile
const userProfile = {
  name: "Gopa Kishor",
  joinDate: "September 2025",
  points: 980,
  level: 15,
  nextLevelPoints: 1500,
  location: "Amaravati, Andhra Pradesh",
  bio: "Passionate farmer dedicated to sustainable agriculture and community growth. Always eager to learn new techniques and share knowledge with fellow farmers.",
  badges: [
    { name: "First Harvest", icon: "leaf", color: "text-green-400", bgColor: "bg-green-400/10", description: "Completed your first challenge.", earnedDate: "Oct 2025", rarity: "Common" },
    { name: "Community Helper", icon: "users", color: "text-blue-400", bgColor: "bg-blue-400/10", description: "Helped 5 other farmers.", earnedDate: "Nov 2025", rarity: "Uncommon" },
    { name: "Eco-Warrior", icon: "zap", color: "text-yellow-400", bgColor: "bg-yellow-400/10", description: "Used 3 sustainable methods.", earnedDate: "Dec 2025", rarity: "Rare" },
    { name: "Master Gardener", icon: "trophy", color: "text-purple-400", bgColor: "bg-purple-400/10", description: "Reached Level 15.", earnedDate: "Jan 2025", rarity: "Epic" },
  ],
  stats: {
    challengesCompleted: 24,
    helpedFarmers: 8,
    sustainableMethods: 12,
    daysActive: 147
  },
  recentAchievements: [
    { name: "Weekly Goal Crusher", date: "2 days ago", points: 50 },
    { name: "Knowledge Sharer", date: "1 week ago", points: 30 },
    { name: "Early Bird", date: "2 weeks ago", points: 25 }
  ]
};

// --- Helper Components ---

const ProgressBar = ({ current, max, label, color = "bg-green-400" }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((current / max) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [current, max]);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>{current}/{max}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const StatCard = ({ iconName, label, value, color, bgColor, delay }) => (
  <div 
    className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-4 text-center transition-all duration-300 hover:bg-gray-800/50 hover:transform hover:scale-105 opacity-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-3 mx-auto`}>
      <Icon name={iconName} className={`w-6 h-6 ${color}`} />
    </div>
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const RecentAchievement = ({ achievement, index }) => (
  <div 
    className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-all duration-200 opacity-0 animate-slide-in"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="w-8 h-8 bg-green-400/10 rounded-full flex items-center justify-center">
      <Icon name="checkCircle" className="w-4 h-4 text-green-400" />
    </div>
    <div className="flex-1">
      <div className="text-sm font-medium">{achievement.name}</div>
      <div className="text-xs text-gray-400">{achievement.date}</div>
    </div>
    <div className="text-sm font-semibold text-green-400">+{achievement.points}</div>
  </div>
);


// --- Main Profile Page Component ---
const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 p-4 md:p-8 text-white">
        <div className="max-w-6xl mx-auto">
          
          {/* Enhanced Profile Header */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 mb-8 border border-gray-700/50 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-5xl font-bold border-4 border-gray-700 shadow-xl">
                  {userProfile.name.charAt(0)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm border-4 border-gray-800">
                  {userProfile.level}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 mb-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                    {userProfile.name}
                  </h1>
                  <button className="mt-2 lg:mt-0 inline-flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm">
                    <Icon name="edit" className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-gray-300 mb-4">
                  <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <Icon name="calendar" className="w-4 h-4" />
                    <span>Farming since {userProfile.joinDate}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <Icon name="mapPin" className="w-4 h-4" />
                    <span>{userProfile.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-400 max-w-2xl leading-relaxed">
                  {userProfile.bio}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <div className="text-center bg-green-400/10 rounded-lg p-4 min-w-20">
                    <p className="text-2xl font-bold text-green-400">{userProfile.points}</p>
                    <p className="text-xs text-gray-400">Points</p>
                  </div>
                  <div className="text-center bg-yellow-400/10 rounded-lg p-4 min-w-20">
                    <p className="text-2xl font-bold text-yellow-400">{userProfile.level}</p>
                    <p className="text-xs text-gray-400">Level</p>
                  </div>
                </div>
                
                {/* Level Progress */}
                <div className="w-48">
                  <ProgressBar 
                    current={userProfile.points} 
                    max={userProfile.nextLevelPoints} 
                    label={`Level ${userProfile.level} Progress`}
                    color="bg-gradient-to-r from-green-400 to-yellow-400"
                  />
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    {userProfile.nextLevelPoints - userProfile.points} points to next level
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: 'barChart' },
              { id: 'badges', label: 'Badges', icon: 'award' },
              { id: 'activity', label: 'Activity', icon: 'activity' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-green-400 text-gray-900' 
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Stats Overview */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                  <Icon name="trending" className="w-6 h-6 text-green-400" />
                  <span>Your Statistics</span>
                </h2>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <StatCard iconName="target" label="Challenges" value={userProfile.stats.challengesCompleted} color="text-blue-400" bgColor="bg-blue-400/10" delay={0} />
                  <StatCard iconName="users" label="Farmers Helped" value={userProfile.stats.helpedFarmers} color="text-purple-400" bgColor="bg-purple-400/10" delay={100} />
                  <StatCard iconName="leaf" label="Eco Methods" value={userProfile.stats.sustainableMethods} color="text-green-400" bgColor="bg-green-400/10" delay={200} />
                  <StatCard iconName="clock" label="Days Active" value={userProfile.stats.daysActive} color="text-orange-400" bgColor="bg-orange-400/10" delay={300} />
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Icon name="star" className="w-5 h-5 text-yellow-400" />
                  <span>Recent Achievements</span>
                </h2>
                <div className="space-y-3">
                  {userProfile.recentAchievements.map((achievement, index) => (
                    <RecentAchievement key={index} achievement={achievement} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center space-x-2">
                  <Icon name="award" className="w-6 h-6 text-yellow-400" />
                  <span>My Badges</span>
                  <span className="text-lg text-gray-400">({userProfile.badges.length})</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userProfile.badges.map((badge, index) => (
                  <BadgeCard key={badge.name} badge={badge} index={index} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-center py-12">
              <Icon name="activity" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Activity Feed Coming Soon</h3>
              <p className="text-gray-400">Track your daily farming activities and progress here.</p>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.4s ease-out forwards; }
      `}</style>
    </>
  );
};

export default Profile;

