import React, { useState } from 'react';
import Icon from '../components/Icon';

// 1. The component now accepts the 'onLoginSuccess' function as a prop
const LoginSignup = ({ onLoginSuccess }) => {
  const [formStep, setFormStep] = useState('signup'); 
  const [loginMethod, setLoginMethod] = useState('phone'); 

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const isPhoneValid = loginMethod === 'phone' && phone.trim() !== '' && password.trim() !== '';
    const isEmailValid = loginMethod === 'email' && email.trim() !== '' && password.trim() !== '';

    if (isPhoneValid || isEmailValid) {
      setFormStep('otp');
    } else {
      // In a real app, a more elegant notification would be used
      alert('Please fill in all required fields.'); 
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log("OTP Submitted and verified!");
    // 2. After submission, we call the function passed from App.jsx to change the page
    onLoginSuccess();
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit}>
      <div className="mb-4">
        {loginMethod === 'phone' ? (
          <>
            <label htmlFor="phone" className="block text-gray-300 text-sm font-bold mb-2">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="Enter your phone number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-500" 
            />
          </>
        ) : (
          <>
            <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-500" 
            />
          </>
        )}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Password</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Enter your password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-500" 
        />
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
        Log In
      </button>
    </form>
  );

  const renderOtpForm = () => (
    <form onSubmit={handleOtpSubmit} className="text-center">
      <p className="text-gray-300 mb-4">An OTP has been sent to your {loginMethod}. Please enter it below.</p>
       <div className="mb-6">
        <label htmlFor="otp" className="block text-gray-300 text-sm font-bold mb-2">One-Time Password (OTP)</label>
        <input type="text" id="otp" placeholder="Enter the 6-digit OTP" maxLength="6" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white text-center tracking-widest text-lg focus:outline-none focus:border-green-500" />
      </div>
      <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
        Verify & Log In
      </button>
       <button type="button" onClick={() => setFormStep('signup')} className="mt-4 text-sm text-gray-400 hover:text-white">
        Back to Login
      </button>
    </form>
  );

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 text-white relative"
      style={{
        backgroundImage: 'url("https://media.istockphoto.com/id/543212762/photo/tractor-cultivating-field-at-spring.jpg?s=612x612&w=0&k=20&c=uJDy7MECNZeHDKfUrLNeQuT7A1IqQe89lmLREhjIJYU=")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2">
          {formStep === 'otp' ? 'Verify Your Identity' : 'Join FarmQuest'}
        </h2>
        <p className="text-center text-gray-400 mb-6">
          {formStep === 'otp' ? 'A final step to secure your account.' : 'Your adventure in sustainable farming starts here.'}
        </p>
        
        {formStep !== 'otp' && (
          <div className="flex justify-center bg-gray-900/50 rounded-lg p-1 mb-6">
            <button 
              onClick={() => setLoginMethod('phone')}
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${loginMethod === 'phone' ? 'bg-green-500' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              Phone
            </button>
            <button 
              onClick={() => setLoginMethod('email')}
              className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${loginMethod === 'email' ? 'bg-green-500' : 'text-gray-400 hover:bg-gray-700/50'}`}
            >
              Email
            </button>
          </div>
        )}

        {formStep === 'otp' ? renderOtpForm() : renderLoginForm()}

        {formStep !== 'otp' && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-400">Or</span>
              </div>
            </div>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;

