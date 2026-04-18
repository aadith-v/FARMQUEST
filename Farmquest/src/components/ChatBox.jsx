import React, { useState } from 'react';
import Icon from './Icon';

// Mock data for chat messages
const initialMessages = [
  { user: "Harsh", text: "Just finished the 'Waste Watcher' challenge.", color: "text-blue-400", icon: "recycle" },
  { user: "Aadith", text: "Awesome! Any tips? I'm starting today.", color: "text-purple-400", icon: null },
  { user: "Ananya", text: "Definitely weigh your compost, it adds up fast!", color: "text-blue-400", icon: null },
  { user: "Gauri", text: "Just planted a tree for the 'Urban Gardener' badge!", color: "text-red-400", icon: "tree" },
];

const ChatBox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    // In a real app, this would be your user's name
    const user = "You"; 
    setMessages([...messages, { user, text: newMessage, color: "text-green-400" }]);
    setNewMessage('');
  };

  return (
    // Main container with glassmorphism effect
    <div className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-6 text-white h-[30rem] flex flex-col border border-gray-700/50 shadow-2xl">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-700/50">
        <Icon name="community" className="text-2xl text-green-400" />
        <h3 className="text-xl font-bold tracking-wider">Community Chat</h3>
      </div>
      
      {/* Message area with custom scrollbar and hover effects */}
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-900/50">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 mt-1 flex items-center justify-center font-bold ${msg.color.replace('text-', 'bg-')}/30`}>
              {msg.user.charAt(0)}
            </div>
            <div>
              <span className={`font-bold ${msg.color}`}>{msg.user}</span>
              <p className="text-gray-300 text-sm leading-relaxed">{msg.text}</p>
            </div>
             {msg.icon && <Icon name={msg.icon} className="text-green-400 ml-auto self-center" />}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-700/50">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Share a tip or ask a question..."
          className="flex-grow bg-gray-900/50 border-2 border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label="Send message"
        >
          <Icon name="send" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

