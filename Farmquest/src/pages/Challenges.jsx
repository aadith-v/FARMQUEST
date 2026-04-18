import React, { useState, useEffect, useRef } from 'react';
import Icon from '../components/Icon';

// --- UPDATED MOCK DATA WITH BILINGUAL INSTRUCTIONS ---
const initialChallengesData = [
  {
    id: 1,
    title: "Water Conservation Challenge",
    description: "Implement a drip irrigation system to reduce water usage by 20%.",
    reward: 150,
    difficulty: "Medium",
    icon: "water",
    status: "In Progress",
    progress: 60,
    proofImage: null,
    howToDo: [
      { en: "Research and purchase a suitable drip irrigation kit.", ml: "അനുയോജ്യമായ ഒരു ഡ്രിപ്പ് ഇറിഗേഷൻ കിറ്റ് ഗവേഷണം ചെയ്ത് വാങ്ങുക." },
      { en: "Install the main pipeline from your water source.", ml: "നിങ്ങളുടെ ജലസ്രോതസ്സിൽ നിന്ന് പ്രധാന പൈപ്പ് ലൈൻ സ്ഥാപിക്കുക." },
      { en: "Lay out the drip lines along your crop rows.", ml: "വിളകളുടെ നിരകളിൽ ഡ്രിപ്പ് ലൈനുകൾ സ്ഥാപിക്കുക." },
      { en: "Install emitters at the base of each plant.", ml: "ഓരോ ചെടിയുടെയും ചുവട്ടിൽ എമിറ്ററുകൾ സ്ഥാപിക്കുക." },
      { en: "Monitor water usage for one week to confirm a 20% reduction.", ml: "20% കുറവ് ഉറപ്പാക്കാൻ ഒരാഴ്ചത്തേക്ക് ജല ഉപയോഗം നിരീക്ഷിക്കുക." }
    ]
  },
  {
    id: 2,
    title: "Organic Composting",
    description: "Create your own organic compost pile and use it to fertilize one field.",
    reward: 100,
    difficulty: "Easy",
    icon: "leaf",
    status: "Completed",
    progress: 100,
    proofImage: "https://placehold.co/600x400/22c55e/white?text=Compost+Pile",
    howToDo: [
      { en: "Designate a spot for your compost pile.", ml: "നിങ്ങളുടെ കമ്പോസ്റ്റ് കൂനയ്ക്കായി ഒരു സ്ഥലം കണ്ടെത്തുക." },
      { en: "Gather green materials and brown materials.", ml: "പച്ചയും തവിട്ടുനിറവുമുള്ള വസ്തുക്കൾ ശേഖരിക്കുക." },
      { en: "Layer the materials, keeping the pile moist and turn it weekly.", ml: "വസ്തുക്കൾ അടുക്കി, കൂന നനവുള്ളതാക്കി ആഴ്ചയിൽ ഇളക്കുക." },
      { en: "Once decomposed, spread the compost on one of your fields.", ml: "അഴുകിയ ശേഷം, കമ്പോസ്റ്റ് നിങ്ങളുടെ ഒരു വയലിൽ വിതറുക." }
    ]
  },
  {
    id: 3,
    title: "Pest Management",
    description: "Introduce beneficial insects to control pests without chemical pesticides.",
    reward: 200,
    difficulty: "Hard",
    icon: "bug",
    status: "Not Started",
    progress: 0,
    proofImage: null,
    howToDo: [
      { en: "Identify the primary pests affecting your crops.", ml: "വിളകളെ ബാധിക്കുന്ന പ്രധാന കീടങ്ങളെ തിരിച്ചറിയുക." },
      { en: "Source beneficial insects like ladybugs or lacewings.", ml: "ലേഡിബഗ്ഗുകൾ പോലുള്ള ഗുണകരമായ പ്രാണികളെ കണ്ടെത്തുക." },
      { en: "Release the insects in the affected areas.", ml: "ബാധിത പ്രദേശങ്ങളിൽ പ്രാണികളെ വിടുക." },
      { en: "Document the reduction in pest damage over two weeks.", ml: "രണ്ടാഴ്ചയ്ക്കുള്ളിൽ കീടങ്ങളുടെ നാശം കുറയുന്നത് രേഖപ്പെടുത്തുക." }
    ]
  },
  {
    id: 4,
    title: "Crop Rotation",
    description: "Plan and implement a crop rotation schedule for the next season.",
    reward: 120,
    difficulty: "Medium",
    icon: "cycle",
    status: "Not Started",
    progress: 0,
    proofImage: null,
    howToDo: [
      { en: "Map out your current fields and crop families.", ml: "നിങ്ങളുടെ നിലവിലെ വയലുകളും വിള കുടുംബങ്ങളും രേഖപ്പെടുത്തുക." },
      { en: "Create a 3-year rotation plan.", ml: "ഒരു 3 വർഷത്തെ വിള ഭ്രമണ പദ്ധതി തയ്യാറാക്കുക." },
      { en: "Prepare the soil for the next crop in the sequence.", ml: "അടുത്ത വിളയ്ക്കായി മണ്ണ് ഒരുക്കുക." },
      { en: "Implement the first year of your new planting plan.", ml: "പുതിയ നടീൽ പദ്ധതിയുടെ ആദ്യ വർഷം നടപ്പിലാക്കുക." }
    ]
  },
];

// --- CHALLENGE MODAL COMPONENT ---
const ChallengeModal = ({ challenge, onClose, onUpdateChallenge }) => {
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ml' for Malayalam

  useEffect(() => {
    if (challenge) {
      setUploadedImage(challenge.proofImage);
    }
  }, [challenge]);

  if (!challenge) return null;

  const handleStartChallenge = () => {
    onUpdateChallenge({ ...challenge, status: 'In Progress', proofImage: uploadedImage });
  };
  
  const handleProgressChange = (amount) => {
    const newProgress = Math.max(0, Math.min(100, challenge.progress + amount));
    let newStatus = challenge.status;

    if (newProgress >= 100) newStatus = "Completed";
    else if (challenge.status === 'Completed' && newProgress < 100) newStatus = "In Progress";
    else if (newProgress > 0 && challenge.status === 'Not Started') newStatus = "In Progress";

    onUpdateChallenge({ ...challenge, progress: newProgress, status: newStatus, proofImage: uploadedImage });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setUploadedImage(newImage);
        onUpdateChallenge({ ...challenge, proofImage: newImage });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRedoChallenge = () => {
    onUpdateChallenge({ ...challenge, status: 'Not Started', progress: 0, proofImage: null });
  };

  const renderActionButton = () => {
    if (challenge.status === 'Not Started') return <button onClick={handleStartChallenge} className="w-full font-bold py-3 px-4 rounded-lg transition-colors bg-green-500 hover:bg-green-600">Start Challenge</button>;
    if (challenge.status === 'Completed') return <button onClick={handleRedoChallenge} className="w-full font-bold py-3 px-4 rounded-lg transition-colors bg-blue-500 hover:bg-blue-600">Redo Challenge</button>;
    return <button className="w-full font-bold py-3 px-4 rounded-lg transition-colors bg-gray-600 cursor-not-allowed" disabled>Challenge In Progress</button>;
  };

  return (
     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-gray-700/50 shadow-2xl flex flex-col relative max-h-[90vh]">
        <div className="p-6 flex justify-between items-center border-b border-gray-700/50">
           <h2 className="text-3xl font-bold text-white">{challenge.title}</h2>
           <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
        </div>
        <div className="p-6 flex-grow overflow-y-auto space-y-4 text-white">
          <p className="text-gray-300">{challenge.description}</p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-yellow-400 font-semibold">Reward: {challenge.reward} Points</span>
            <span className="text-gray-300">Difficulty: {challenge.difficulty}</span>
          </div>
          <div className="border-t border-gray-700/50 my-4"></div>
          
          {/* --- LANGUAGE TOGGLE ADDED HERE --- */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">How to Complete:</h3>
            <div className="flex bg-gray-900/50 rounded-lg p-1">
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 text-sm rounded-md ${language === 'en' ? 'bg-green-500' : ''}`}>English</button>
              <button onClick={() => setLanguage('ml')} className={`px-3 py-1 text-sm rounded-md ${language === 'ml' ? 'bg-green-500' : ''}`}>മലയാളം</button>
            </div>
          </div>
          <ul className="list-decimal list-inside space-y-2 text-gray-300">
            {challenge.howToDo.map((step, index) => <li key={index}>{step[language]}</li>)}
          </ul>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
            <div className="flex items-center gap-3">
              <button onClick={() => handleProgressChange(-10)} disabled={challenge.status !== 'In Progress'} className="bg-gray-700 w-8 h-8 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">-</button>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${challenge.progress}%` }}></div>
              </div>
               <button onClick={() => handleProgressChange(10)} disabled={challenge.status !== 'In Progress'} className="bg-gray-700 w-8 h-8 rounded-full font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">+</button>
            </div>
            <p className="text-right text-sm text-gray-400 mt-1">{challenge.progress}% Complete</p>
          </div>

           <div className="mt-6">
             <h3 className="text-lg font-semibold mb-2">Proof of Work</h3>
             {uploadedImage ? (
                <img src={uploadedImage} alt="Proof of work" className="w-full h-48 object-cover rounded-lg" />
             ) : (
                <p className="text-gray-500 text-sm">No photo uploaded yet.</p>
             )}
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
             <button onClick={() => fileInputRef.current.click()} className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">Upload a Photo</button>
           </div>
        </div>
        <div className="p-6 border-t border-gray-700/50">
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
};

// --- MAIN CHALLENGES PAGE COMPONENT ---
const Challenges = () => {
  const [challenges, setChallenges] = useState(initialChallengesData);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateChallenge = (updatedChallenge) => {
    setChallenges(prev => prev.map(c => c.id === updatedChallenge.id ? updatedChallenge : c));
    setSelectedChallenge(updatedChallenge);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress": return "bg-blue-500 text-blue-100";
      case "Completed": return "bg-green-500 text-green-100";
      default: return "bg-gray-500 text-gray-100";
    }
  };

  return (
    <>
      <div className="p-4 md:p-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-3xl font-bold mb-6 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>Current Challenges</h1>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div 
                key={challenge.id} 
                onClick={() => setSelectedChallenge(challenge)}
                className={`group bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 flex items-start space-x-4 transition-all duration-500 ease-out hover:bg-gray-700/80 hover:scale-105 hover:shadow-lg cursor-pointer ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl text-green-400 mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon name={challenge.icon || 'challenges'} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{challenge.title}</h2>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClass(challenge.status)}`}>{challenge.status}</span>
                  </div>
                  <p className="text-gray-400 mt-1">{challenge.description}</p>
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-yellow-400 font-semibold">Reward: {challenge.reward} Points</span>
                    <span className="text-gray-300">Difficulty: {challenge.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChallengeModal 
        challenge={selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
        onUpdateChallenge={handleUpdateChallenge}
      />
    </>
  );
};

export default Challenges;

