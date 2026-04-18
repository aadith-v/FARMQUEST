import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

// --- MOCK DATA WITH RUPEE PRICING AND GUARANTEED-TO-WORK IMAGES ---
const initialProducts = [
  { id: 1, name: "Heavy-Duty Tractor", price: 850000, image: "https://placehold.co/600x400/22c55e/FFF?text=Tractor", description: "A reliable and powerful tractor for all your large-scale farming needs.", rating: 4.8, category: "Machinery" },
  { id: 2, name: "Automatic Seeder", price: 120000, image: "https://placehold.co/600x400/34d399/FFF?text=Seeder", description: "Plant seeds with precision and speed, increasing your yield.", rating: 4.6, category: "Machinery" },
  { id: 3, name: "Drip Irrigation Kit", price: 25000, image: "https://placehold.co/600x400/6ee7b7/FFF?text=Irrigation", description: "Conserve water while ensuring your crops get the moisture they need.", rating: 4.9, category: "Tools" },
  { id: 4, name: "Organic Fertilizer Bags", price: 1500, image: "https://placehold.co/600x400/a7f3d0/333?text=Fertilizer", description: "Enrich your soil with our 100% organic compost fertilizer (20kg bag).", rating: 4.7, category: "Supplies" },
  { id: 5, name: "Heirloom Tomato Seeds", price: 250, image: "https://placehold.co/600x400/ef4444/FFF?text=Seeds", description: "A pack of 50 non-GMO heirloom tomato seeds for a flavorful harvest.", rating: 4.9, category: "Seeds" },
  { id: 6, name: "Hand Trowel Set", price: 1200, image: "https://placehold.co/600x400/f59e0b/FFF?text=Tools", description: "Durable stainless steel tools for gardening and small-scale farming.", rating: 4.5, category: "Tools" },
  { id: 7, name: "Protective Gloves", price: 500, image: "https://placehold.co/600x400/84cc16/FFF?text=Gloves", description: "High-quality, durable gloves to protect your hands while working.", rating: 4.8, category: "Tools" },
  { id: 8, name: "Harvesting Basket", price: 850, image: "https://placehold.co/600x400/d97706/FFF?text=Basket", description: "A sturdy, woven basket perfect for collecting your harvest.", rating: 4.6, category: "Tools" },
  { id: 9, name: "Premium Potting Soil", price: 750, image: "https://placehold.co/600x400/78350f/FFF?text=Soil", description: "Nutrient-rich soil ideal for starting seeds and potting plants (15L bag).", rating: 4.9, category: "Supplies" },
];

// --- PRODUCT MODAL COMPONENT ---
const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (amount) => setQuantity(prev => Math.max(1, prev + amount));
  const handleAddToCartClick = () => { onAddToCart(product, quantity); onClose(); };
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-gray-700/50 shadow-2xl flex flex-col md:flex-row relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10">&times;</button>
        <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" />
        <div className="p-6 flex flex-col text-white">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-400 mt-2 flex-grow">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-3xl font-semibold text-green-400">₹{(product.price * quantity).toLocaleString('en-IN')}</p>
            <div className="flex items-center gap-1 text-yellow-400">
              <Icon name="star" />
              <span className="text-lg font-bold">{product.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 my-6">
            <button onClick={() => handleQuantityChange(-1)} className="bg-gray-700 w-10 h-10 rounded-full font-bold text-lg">-</button>
            <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="bg-gray-700 w-10 h-10 rounded-full font-bold text-lg">+</button>
          </div>
          <button onClick={handleAddToCartClick} className="w-full mt-auto bg-green-500 hover:bg-green-600 font-bold py-3 px-4 rounded-lg transition-colors">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CART MODAL COMPONENT ---
const CartModal = ({ cart, onClose, onUpdateQuantity, onRemoveItem, cartTotal }) => {
  if (!cart) return null;

  const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl w-full max-w-3xl border border-gray-700/50 shadow-2xl flex flex-col relative max-h-[90vh]">
        <div className="p-6 flex justify-between items-center border-b border-gray-700/50">
           <h2 className="text-3xl font-bold text-white">Your Cart</h2>
           <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-10">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-grow text-white">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-400">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="bg-gray-700 w-8 h-8 rounded-full font-bold text-lg">-</button>
                  <span className="text-lg font-bold w-10 text-center">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="bg-gray-700 w-8 h-8 rounded-full font-bold text-lg">+</button>
                </div>
                <p className="text-xl font-semibold text-green-400 w-24 text-right">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
                <button onClick={() => onRemoveItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                  <TrashIcon />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-700/50">
            <div className="flex justify-between items-center text-white">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-bold text-green-400">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN SHOP PAGE COMPONENT ---
const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCartTotal(total);
  }, [cart]);

  const handleAddToCart = (productToAdd, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId, amount) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId) {
          return { ...item, quantity: Math.max(0, item.quantity + amount) };
        }
        return item;
      });
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="p-4 md:p-8 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Page Header with Animation */}
          <div className={`flex flex-col md:flex-row justify-between items-center mb-6 gap-4 transition-all duration-700 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <div className="flex items-center space-x-3">
              <Icon name="cart" className="text-4xl text-green-400" />
              <h1 className="text-3xl font-bold tracking-wider">Shop Equipments</h1>
            </div>
            <div className="flex items-center gap-4 bg-gray-800/70 p-3 rounded-lg border border-gray-700/50">
               <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
                 <Icon name="cart" className="text-3xl" />
                 {cartItemCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-pulse">
                     {cartItemCount}
                   </span>
                 )}
               </div>
               <div className="text-right">
                  <span className="text-gray-400 text-sm">Cart Total</span>
                  <p className="text-xl font-bold text-green-400">₹{cartTotal.toLocaleString('en-IN')}</p>
               </div>
               {cartItemCount > 0 && (
                 <button onClick={() => setIsCartOpen(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors ml-4">
                   Proceed to Buy
                 </button>
               )}
            </div>
          </div>
          
          {/* Product Grid with Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProducts.map((product, index) => (
              <div 
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className={`bg-gray-800/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl flex flex-col transition-all duration-500 ease-out hover:border-green-500 hover:scale-105 cursor-pointer ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow text-white">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-400 mt-2 flex-grow text-sm">{product.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-semibold text-green-400">₹{product.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Icon name="star" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />
      {isCartOpen && (
        <CartModal 
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          cartTotal={cartTotal}
        />
      )}
    </>
  );
};

export default Shop;

