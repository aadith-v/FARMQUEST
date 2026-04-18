import React, { useState, useEffect, useRef } from 'react';

// --- Helper Components for better organization ---

// Slideshow Background Component
const SlideshowBackground = () => {
    const images = [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % images.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            {images.map((src, index) => (
                <div
                    key={src}
                    className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${src})` }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-800/80 via-green-900/70 to-green-800/80" />
                </div>
            ))}
        </div>
    );
};


// Main AIChat Component
const AIChat = () => {
    // --- State Management ---
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('english');
    const chatboxRef = useRef(null);
    
    // --- Voice Assistance State ---
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const recognitionRef = useRef(null);
    const synthesisRef = useRef(null);

    // --- Gemini API Configuration ---
    const API_KEY = "AIzaSyDTlnulaNXAxyz98tNrXz38SSHGFvPNiaQ"; // IMPORTANT: Replace with your actual key
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    // --- Translations ---
    const translations = {
        english: {
            title: "🌾 AgriBot Assistant",
            subtitle: "Your AI-Powered Farming Companion",
            welcome: "🌱 Welcome to AgriBot! How can I assist you with your farming questions today?",
            placeholder: "Ask about farming, crops, soil, weather...",
            quickActions: [
                { label: "Seasonal Crops", text: "What crops should I plant this season?" },
                { label: "Soil Health", text: "How do I improve my soil quality?" },
                { label: "Pest Control", text: "Pest control methods for vegetables" },
                { label: "Weather Tips", text: "Weather forecast impact on farming" },
                { label: "Organic Methods", text: "Organic farming practices" },
                { label: "Water Management", text: "Irrigation and water management" }
            ],
            errorMessage: "🌐 Connection error. Please check your internet and API Key.",
            defaultError: "🚜 Sorry, I couldn't process that. Please try another farming question."
        },
        malayalam: {
            title: "🌾 അഗ്രി ബോട്ട് സഹായി",
            subtitle: "നിങ്ങളുടെ AI-പവർഡ് കൃഷി സഹായി",
            welcome: "🌱 അഗ്രിബോട്ടിലേക്ക് സ്വാഗതം! കൃഷി, വിളകൾ, മണ്ണ് പരിപാലനം, കാലാവസ്ഥാ ഉപദേശം എന്നിവയിൽ നിങ്ങളെ സഹായിക്കാൻ ഞാൻ ഇവിടെയുണ്ട്.",
            placeholder: "കൃഷി, വിളകൾ, മണ്ണ്, കാലാവസ്ഥയെ കുറിച്ച് ചോദിക്കൂ...",
            quickActions: [
                { label: "സീസണൽ വിളകൾ", text: "ഈ സീസണിൽ ഏതു വിളകൾ നടണം?" },
                { label: "മണ്ണിന്റെ ആരോഗ്യം", text: "എന്റെ മണ്ണിന്റെ ഗുണനിലവാരം എങ്ങനെ മെച്ചപ്പെടുത്താം?" },
                { label: "കീടനിയന്ത്രണം", text: "പച്ചക്കറികളുടെ കീടനിയന്ത്രണ രീതികൾ" },
                { label: "കാലാവസ്ഥാ നുറുങ്ങുകൾ", text: "കാലാവസ്ഥാ പ്രവചനം കൃഷിയെ എങ്ങനെ ബാധിക്കുന്നു" },
                { label: "ജൈവ രീതികൾ", text: "ജൈവ കൃഷി രീതികൾ" },
                { label: "ജല പരിപാലനം", text: "ജലസേചനവും ജല പരിപാലനവും" }
            ],
            errorMessage: "🌐 കണക്ഷൻ പിശക്. ദയവായി നിങ്ങളുടെ ഇന്റർനെറ്റ് പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കൂ.",
            defaultError: "🚜 ക്ഷമിക്കൂ, നിങ്ങളുടെ ചോദ്യം ഇപ്പോൾ പ്രോസസ് ചെയ്യാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കൂ."
        }
    };
    
    const t = translations[currentLanguage];

    // --- Effects ---
    useEffect(() => {
        // Scroll to bottom of chatbox when messages change
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // Initialize speech recognition and synthesis
    useEffect(() => {
        // Check for speech recognition support
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setSpeechSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = currentLanguage === 'malayalam' ? 'ml-IN' : 'en-US';
            
            recognitionRef.current.onstart = () => {
                setIsListening(true);
            };
            
            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };
            
            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
            
            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        // Check for speech synthesis support
        if ('speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            if (synthesisRef.current) {
                synthesisRef.current.cancel();
            }
        };
    }, [currentLanguage]);

    // --- Functions ---
    const formatMessage = (text) => {
        // A simple markdown-to-HTML converter
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-green-100 text-green-800 px-2 py-1 rounded">$1</code>')
            .replace(/\n/g, '<br />');
    };

    const sendMessage = async (userText) => {
        if (!userText || isTyping) return;

        const newUserMessage = {
            sender: 'user',
            text: userText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const languageInstruction = currentLanguage === 'malayalam' 
                ? "Please respond in Malayalam language (മലയാളം)." 
                : "Please respond in English language.";
            
            const agriculturalPrompt = `${languageInstruction} As an expert agricultural AI assistant, provide helpful, practical advice about: ${userText}. Focus on farming practices, crop management, soil health, pest control, and sustainable agriculture. Make your response clear, actionable, and suitable for farmers.`;

            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: agriculturalPrompt }] }]
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();
            
            let botReply = t.defaultError;
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                botReply = data.candidates[0].content.parts[0].text;
            }
            
            const newBotMessage = {
                sender: 'bot',
                text: botReply,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, newBotMessage]);
            
            // Auto-speak the bot's response
            speakText(botReply);

        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                sender: 'bot',
                text: t.errorMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSendClick = () => {
        sendMessage(input);
    };
    
    const handleQuickActionClick = (text) => {
        sendMessage(text);
    };

    // --- Voice Functions ---
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
        }
    };

    const speakText = (text) => {
        if (synthesisRef.current && !isSpeaking) {
            // Stop any ongoing speech
            synthesisRef.current.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = currentLanguage === 'malayalam' ? 'ml-IN' : 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            
            utterance.onstart = () => {
                setIsSpeaking(true);
            };
            
            utterance.onend = () => {
                setIsSpeaking(false);
            };
            
            utterance.onerror = (event) => {
                console.error('Speech synthesis error:', event.error);
                setIsSpeaking(false);
            };
            
            synthesisRef.current.speak(utterance);
        }
    };

    const stopSpeaking = () => {
        if (synthesisRef.current) {
            synthesisRef.current.cancel();
            setIsSpeaking(false);
        }
    };

    // --- Render JSX ---
    return (
        <>
            <SlideshowBackground />
            <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] p-4 text-gray-800">
                <div className="w-full max-w-3xl h-[85vh] bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col border border-white/20">
                    {/* Header */}
                    <header className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 text-center rounded-t-2xl relative">
                        <h1 className="text-2xl font-bold">{t.title}</h1>
                        <p className="opacity-90">{t.subtitle}</p>
                         <button onClick={() => setCurrentLanguage(currentLanguage === 'english' ? 'malayalam' : 'english')} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full text-sm">
                           🌐 {currentLanguage === 'english' ? 'English' : 'മലയാളം'}
                        </button>
                    </header>
                    
                    {/* Chatbox */}
                    <div ref={chatboxRef} className="flex-1 p-6 overflow-y-auto bg-green-50/50">
                        {messages.length === 0 && (
                            <div className="text-center text-green-800 p-8 border-2 border-dashed border-green-300 rounded-lg">
                                <p>{t.welcome}</p>
                            </div>
                        )}
                        <div className="space-y-6">
                           {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl ${msg.sender === 'user' ? 'bg-green-700' : 'bg-yellow-600'}`}>
                                        {msg.sender === 'user' ? '👨‍🌾' : '🤖'}
                                    </div>
                                    <div className={`max-w-md p-4 rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none'}`}>
                                       <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                                       <div className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>{msg.time}</div>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                               <div className="flex items-start gap-3">
                                   <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl bg-yellow-600">🤖</div>
                                   <div className="p-4 rounded-2xl shadow-md bg-white text-gray-700 rounded-bl-none flex items-center gap-2">
                                       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                                       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></span>
                                       <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-300"></span>
                                   </div>
                               </div>
                            )}
                            
                            {/* Speaking Indicator */}
                            {isSpeaking && (
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl bg-purple-600">🔊</div>
                                    <div className="p-4 rounded-2xl shadow-md bg-purple-100 text-purple-700 rounded-bl-none flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-150"></span>
                                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-300"></span>
                                        <span className="ml-2 text-sm">Speaking...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Quick Actions & Input */}
                    <footer className="p-4 bg-white/80 rounded-b-2xl border-t border-green-200">
                        <div className="flex gap-2 justify-center flex-wrap mb-3">
                            {t.quickActions.slice(0, 3).map(qa => (
                                <button key={qa.label} onClick={() => handleQuickActionClick(qa.text)} className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full hover:bg-green-200">
                                    {qa.label}
                                </button>
                            ))}
                            
                            {/* Voice Controls */}
                            {speechSupported && (
                                <div className="flex gap-2">
                                    {isSpeaking && (
                                        <button 
                                            onClick={stopSpeaking}
                                            className="bg-red-100 text-red-800 px-3 py-1 text-sm rounded-full hover:bg-red-200 flex items-center gap-1"
                                        >
                                            🔇 Stop Speaking
                                        </button>
                                    )}
                                    
                                    {!isListening && !isSpeaking && (
                                        <button 
                                            onClick={startListening}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full hover:bg-blue-200 flex items-center gap-1"
                                        >
                                            🎤 Voice Input
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendClick()}
                                placeholder={t.placeholder}
                                className="flex-1 p-3 border-2 border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            
                            {/* Voice Input Button */}
                            {speechSupported && (
                                <button 
                                    onClick={isListening ? stopListening : startListening}
                                    disabled={isTyping}
                                    className={`p-3 rounded-full transition-all duration-200 ${
                                        isListening 
                                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                    } disabled:bg-gray-400`}
                                    title={isListening ? 'Stop listening' : 'Start voice input'}
                                >
                                    {isListening ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                            <line x1="12" y1="19" x2="12" y2="23"></line>
                                            <line x1="8" y1="23" x2="16" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            )}
                            
                            {/* Send Button */}
                            <button onClick={handleSendClick} disabled={isTyping} className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full disabled:bg-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default AIChat;