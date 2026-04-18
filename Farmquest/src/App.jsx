import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Import all the page components
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Profile from './pages/Profile';
import LoginSignup from './pages/LoginSignup';
import AIChat from './pages/AIChat';
import Shop from './pages/shop';
import Sell from './pages/sell';

const App = () => {
  // --- AUTHENTICATION STATE ADDED ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Default page is now LoginSignup
  const [currentPage, setCurrentPage] = useState('LoginSignup');

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (page) => {
    // Prevent navigation away from login page if not logged in
    if (!isLoggedIn && page !== 'LoginSignup') {
      setCurrentPage('LoginSignup');
      return;
    }
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage('Home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('LoginSignup');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Challenges': return <Challenges />;
      case 'Community': return <Community />;
      case 'Profile': return <Profile />;
      case 'LoginSignup': return <LoginSignup onLoginSuccess={handleLoginSuccess} />;
      case 'AIChat': return <AIChat />;
      case 'Shop Equipments': return <Shop />;
      case 'Sell': return <Sell />;
      case 'Home':
      default:
        // If not logged in and trying to access Home, show Login page instead
        return isLoggedIn ? <Home onNavClick={handleNavClick} /> : <LoginSignup onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-900 font-sans transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`} onMouseLeave={() => isLoggedIn && setSidebarOpen(false)}>
      
      {/* --- SIDEBAR IS NOW CONDITIONAL --- */}
      {isLoggedIn && (
        <>
          <div 
            className="fixed top-0 left-0 h-full w-8 z-50"
            onMouseEnter={() => setSidebarOpen(true)}
          />
          <Sidebar 
            onNavClick={handleNavClick} 
            isOpen={isSidebarOpen}
            currentPage={currentPage}
          />
        </>
      )}
      
      <Navbar 
        onNavClick={handleNavClick} 
        isSidebarOpen={isSidebarOpen}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <main className={`transition-transform duration-300 ease-in-out pt-20 ${isSidebarOpen && isLoggedIn ? 'ml-64' : 'ml-0'}`}>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;

