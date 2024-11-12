import { useState } from 'react';
import { getClaudeResponse } from '../api_calls/ChatContext'; // Adjust the import path as needed

function CustomCard({ content }) {
  const [userInput, setUserInput] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    if (userInput.trim()) {
      const response = await getClaudeResponse(userInput);
      setClaudeResponse(response);
      setUserInput(''); // Clear the input field after sending
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-5">
      <div>
        <p className="text-sm md:text-base mb-4">{content}</p>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="less screentime, creativity..."
          className="w-full border rounded-md p-2 mb-2"
        />
        <button
          onClick={handleSend}
          className="bg-green-600 text-white rounded-md px-3 py-1 hover:bg-green-700"
        >
          Send
        </button>
        {claudeResponse && (
          <div className="mt-4 p-2 bg-gray-100 rounded-md">
            <p className="text-sm md:text-base">{claudeResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomCard;
