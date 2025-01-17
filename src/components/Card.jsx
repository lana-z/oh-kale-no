import { useState } from 'react';
import { getClaudeResponse } from '../api_calls/ChatApi'; 

function CustomCard({ content }) {
  const [userInput, setUserInput] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (userInput.trim() && !isLoading) {
      setIsLoading(true);
      try {
        const response = await getClaudeResponse(userInput);
        setClaudeResponse(response);
        setUserInput('');
      } catch (error) {
        setClaudeResponse("Oops! Let's try that again - like replanting a seed.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mx-2 md:mx-5 my-5">
      <div>
        <p className="text-sm md:text-base mb-4">{content}</p>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="less screentime, creativity..."
            className="flex-1 border rounded-md p-2 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !userInput.trim()}
            className={`${
              isLoading || !userInput.trim()
                ? 'bg-gray-400'
                : 'bg-green-600 hover:bg-green-700'
            } text-white rounded-md px-4 py-2 transition-colors duration-200`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        {claudeResponse && (
          <div className="mt-4 p-3 bg-gray-100 rounded-md">
            <p className="text-sm md:text-base">{claudeResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCard;
