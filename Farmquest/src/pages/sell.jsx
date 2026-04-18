import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

// --- MOCK DATA ---
const marketData = [
  { id: 1, name: "Edappally Morning Market", distance: "5 km away", contact: { phone: "9876543210", email: "contact@edappally.market" }, demands: [{ crop: "Leafy Greens (Cheera)", price: 18, unit: "bunch", needed: 500 }, { crop: "Bitter Gourd", price: 40, unit: "kg", needed: 150 }, { crop: "Coconut", price: 35, unit: "piece", needed: 1200 }], image: "https://placehold.co/600x400/16a34a/white?text=Edappally" },
  { id: 2, name: "Tripunithura Agri-Market", distance: "10 km away", contact: { phone: "9876543211", email: "procurement@tripunithura.agri" }, demands: [{ crop: "Nendran Bananas", price: 48, unit: "kg", needed: 900 }, { crop: "Tapioca (Cassava)", price: 28, unit: "kg", needed: 1500 }, { crop: "Ginger", price: 115, unit: "kg", needed: 200 }], image: "https://placehold.co/600x400/f59e0b/white?text=Tripunithura" },
  { id: 3, name: "Maradu Wholesale Hub", distance: "8 km away", contact: { phone: "9876543212", email: "orders@maraduhub.com" }, demands: [{ crop: "Black Pepper", price: 560, unit: "kg", needed: 400 }, { crop: "Tomatoes", price: 35, unit: "kg", needed: 600 }, { crop: "Okra (Ladies' Finger)", price: 42, unit: "kg", needed: 250 }], image: "https://placehold.co/600x400/3b82f6/white?text=Maradu+Hub" },
  { id: 4, name: "Aluva Riverside Traders", distance: "18 km away", contact: { phone: "9876543213", email: "traders@aluvariver.co" }, demands: [{ crop: "Matta Rice (Paddy)", price: 29, unit: "kg", needed: 4000 }, { crop: "Nutmeg", price: 750, unit: "kg", needed: 100 }, { crop: "Taro Root (Chembu)", price: 55, unit: "kg", needed: 300 }], image: "https://placehold.co/600x400/8b5cf6/white?text=Aluva+Traders" },
];

// --- CONTACT MODAL COMPONENT ---
const ContactModal = ({ market, onClose }) => {
  if (!market) return null;
  const demandedCrops = market.demands.map(d => `${d.needed} ${d.unit}s of ${d.crop}`).join(', ');

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl w-full max-w-lg border border-gray-700/50 shadow-2xl flex flex-col relative">
        <div className="p-6 flex justify-between items-center border-b border-gray-700/50">
           <h2 className="text-2xl font-bold text-white">Contact {market.name}</h2>
           <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="p-6 text-white space-y-4">
           <p className="text-gray-400">You can reach the buyer via the details below or send them a message directly.</p>
           <div className="flex gap-4">
             <div className="bg-gray-900/50 p-3 rounded-lg flex-1 text-center">
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-semibold">{market.contact.phone}</p>
             </div>
             <div className="bg-gray-900/50 p-3 rounded-lg flex-1 text-center">
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-semibold">{market.contact.email}</p>
             </div>
           </div>
           <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
              <textarea 
                id="message" 
                rows="5"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-green-500"
                defaultValue={`Hello, I am a farmer using the FarmQuest app. I am interested in supplying the following produce you have in demand: ${demandedCrops}. Please let me know the next steps.`}
              />
           </div>
           <button onClick={onClose} className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Send Message
            </button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN SELL PAGE COMPONENT ---
const Sell = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <div className="p-4 md:p-8 text-white">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center space-x-3 mb-6 transition-all duration-700 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <Icon name="store" className="text-4xl text-green-400" />
            <h1 className="text-3xl font-bold tracking-wider">Sell Your Yield</h1>
          </div>
          <p className={`text-gray-400 mb-8 transition-all duration-700 ease-out delay-200 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            Find nearby markets in Kerala (under 20km) and see what produce they're looking for.
          </p>
          
          <div className="space-y-8">
            {marketData.map((market, index) => (
              <div key={market.id} className={`bg-gray-800/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl flex flex-col md:flex-row transition-all duration-500 ease-out hover:border-green-500 hover:scale-[1.02] ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${index * 150}ms` }}>
                <img src={market.image} alt={market.name} className="w-full md:w-1/3 h-48 md:h-auto object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">{market.name}</h2>
                      <p className="text-gray-400 text-sm">{market.distance}</p>
                    </div>
                    {/* UPDATED BUTTON ONCLICK HANDLER */}
                    <button onClick={() => setSelectedMarket(market)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap">
                      Contact Now
                    </button>
                  </div>
                  <div className="border-t border-gray-700/50 my-4"></div>
                  <h3 className="font-semibold mb-2 text-gray-300">Currently in demand:</h3>
                  <div className="flex-grow space-y-2">
                    {market.demands.map(demand => (
                      <div key={demand.crop} className="flex justify-between items-center bg-gray-900/50 p-2 rounded-md text-sm">
                        <span className="font-semibold">{demand.crop}</span>
                        <div className="text-right">
                          <p className="text-green-400 font-bold">₹{demand.price} / {demand.unit}</p>
                          <p className="text-gray-400">Need: {demand.needed} {demand.unit}s</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* RENDER THE MODAL WHEN A MARKET IS SELECTED */}
      {selectedMarket && <ContactModal market={selectedMarket} onClose={() => setSelectedMarket(null)} />}
    </>
  );
};

export default Sell;

