import { useState } from 'react';
import { Message, Refresh } from '@mui/icons-material';
import CustomCard from './components/Card';
import CustomCheckbox from './components/Checkbox';
import CustomProgress from './components/Progress';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [showChat, setShowChat] = useState(false);

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-green-100 bg-[url('/kale.png')] bg-repeat p-4 sm:p-6 md:p-8 responsive-bg"
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl italic mb-4 text-center">oh, kale no!</h1>
        <p className="text-sm sm:text-base text-center mb-6">
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

        <div className="mt-6 flex justify-between">
          <button
            className="bg-transparent border border-gray-400 rounded-md px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base flex items-center hover:bg-gray-100"
            onClick={() => setShowChat(!showChat)}
          >
            <Message className="mr-2" /> Customize
          </button>
          <button
            className="bg-green-600 text-white rounded-md px-3 py-1 text-sm sm:px-4 sm:py-2 sm:text-base flex items-center hover:bg-green-700"
            onClick={() => window.location.reload()}
          >
            <Refresh className="mr-2" /> Refresh my day
          </button>
        </div>

        {showChat && (
          <div className="mt-6">
            <CustomCard content="Hey there, what would you like to focus on today?" />
          </div>
        )}
        <p className='bg-red-100 text-center m-6'>
          insert counter here
        </p>
      </div>

    </div>
  );
}

export default App;
