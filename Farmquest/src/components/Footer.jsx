import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} FarmQuest. Join us in making the world greener.</p>
      </div>
    </footer>
  );
};

export default Footer;
