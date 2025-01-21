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

  const formatResponse = (text) => {
    const sentences = text.split(/(?<=\.)/).filter(Boolean);
    return sentences.map((sentence, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {sentence.trim()}
      </p>
    ));
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
    <div className="p-4 mx-2 my-5 bg-white rounded-lg shadow-md md:mx-5">
      <div>
        <p className="mb-4 text-sm md:text-base">{content}</p>
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="less screentime, creativity..."
            className="flex-1 p-2 border rounded-md focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
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
          <div className="p-3 mt-4 bg-gray-100 rounded-md">
            <div className="space-y-2 text-sm md:text-base">
              {formatResponse(claudeResponse)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCard;
