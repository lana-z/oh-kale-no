import { useState, useEffect } from 'react';
import { Message, Refresh } from '@mui/icons-material';
import CustomCard from './components/Card';
import CustomCheckbox from './components/Checkbox';
import CustomProgress from './components/Progress';
import { getVisitCount, incrementVisitCount } from './api_calls/CounterApi';
import { AnimatedCounter } from './components/AnimatedCounter';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  const healthyChoices = [
    { id: 1, label: "ate something green", emoji: "🥬", checked: false },
    { id: 2, label: "held space for my own emotion", emoji: "🥑", checked: false },
    { id: 3, label: "held space for someone else's emotion", emoji: "🥕", checked: false },
    { id: 4, label: "moved my body for 30 minutes", emoji: "🌶️", checked: false },
    { id: 5, label: "built my relationship with curiosity", emoji: "🍄", checked: false },
    { id: 6, label: "spent time with someone", emoji: "🥦", checked: false },
    { id: 7, label: "went outside and made peace with the weather", emoji: "🌤", checked: false },
    { id: 8, label: "verbally expressed gratitude", emoji: "🥒", checked: false },
  ];

  const [choices, setChoices] = useState(healthyChoices);

  const handleCheck = (id) => {
    setChoices(
      choices.map(choice =>
        choice.id === id ? { ...choice, checked: !choice.checked } : choice
      )
    );
    setScore(prevScore =>
      choices.find(c => c.id === id)?.checked ? prevScore - 1 : prevScore + 1
    );
  };

  useEffect(() => {
    const initializeCounter = async () => {
      // Increment count on initial page load
      const newCount = await incrementVisitCount();
      setVisitCount(newCount);
    };

    const fetchCount = async () => {
      // Just get the current count without incrementing
      const count = await getVisitCount();
      setVisitCount(count);
    };

    // Initial load - increment counter
    initializeCounter();

    // Set up interval to just fetch current count
    const interval = setInterval(fetchCount, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-green-100 bg-[url('/kale.png')] bg-repeat p-4 sm:p-6 md:p-8 responsive-bg"
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl italic mb-4 text-center">oh, kale no!</h1>
        <p className="text-sm text-center mb-6">
          when life gives us avocados, we make guacamole
        </p>

        <CustomProgress value={score} max={choices.length} />

        <div className="mt-4 space-y-2">
          {choices.map(choice => (
            <CustomCheckbox
              key={choice.id}
              label={choice.label}
              labelClassName="text-sm md:text-base"
              emoji={choice.emoji}
              checked={choice.checked}
              onChange={() => handleCheck(choice.id)}
            />
          ))}
        </div>

        <div className="my-8 flex justify-center">
          <button
            onClick={toggleChat}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Message className="mr-2" />
            Chat
          </button>
        </div>

        {showChat && (
          <div className="mt-6">
            <CustomCard content="Hey there, what would you like to focus on today?" />
          </div>
        )}
        
        <div className="flex flex-wrap items-center justify-center gap-1 mt-6 mb-8 text-center">
          <span className="text-sm md:text-base">You + </span>
          <AnimatedCounter value={visitCount} />
          <span className="text-sm md:text-base">others choosing that healthy vibe!</span>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-green-600 text-white rounded-md px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base flex items-center justify-center hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            <Refresh className="mr-2" /> Refresh my day
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
