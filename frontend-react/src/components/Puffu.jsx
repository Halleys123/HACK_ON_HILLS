import React, { useCallback, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import puffu from '@assets/puffu.jpg';

export default function AiAssistant() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize Gemini API
  const genAI = new GoogleGenerativeAI(
    'AIzaSyCGh2_hrRKVOwZXeN4B4EXhqAkfk_1Oa7U'
  );
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro', // Update to 'gemini-2.0-flash' if needed
    maxOutputTokens: 100,
    temperature: 0.7,
  });

  // Send message to Gemini API and get a response
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Add user's message to the chat
      const userMessage = { content: inputMessage, isBot: false };
      setMessages((prev) => [...prev, userMessage]);

      // Generate response from Gemini API
      const prompt =
        'Requrements: 1. Strictly Give reply in 2 lines, 2. should only be about himachal pradesh, 3. If next line contains questions that are not related to himachal then say I know only about Himachal only: myQuery: ' +
        inputMessage;
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      // Add bot's response to the chat
      const botMessage = { content: responseText, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
      setInputMessage('');
    } catch (err) {
      setError('Error communicating with Gemini API');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chat visibility
  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  return (
    <div className='fixed bottom-5 right-5 z-[1000] flex items-end gap-3'>
      {/* Chat Box */}
      {isChatOpen && (
        <div className='w-[350px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col'>
          {/* Chat Header */}
          <div className='bg-slate-900 p-4 rounded-t-lg flex justify-between items-center'>
            <div className="flex items-center gap-3">
              <img 
                src={puffu} 
                alt="Puffu" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <h2 className='text-white text-lg font-semibold'>
                Puffu Assistant
              </h2>
            </div>
            <button
              onClick={toggleChat}
              className='text-white hover:text-gray-200'
            >
              ×
            </button>
          </div>

          {/* Chat Messages */}
          <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isBot ? 'justify-start' : 'justify-end'
                }`}
              >
                {msg.isBot && (
                  <img 
                    src={puffu} 
                    alt="Puffu" 
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-white text-gray-800 shadow-sm border'
                      : 'bg-slate-900 text-white'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className='flex justify-start'>
                <img 
                  src={puffu} 
                  alt="Puffu" 
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <div className='bg-white p-3 rounded-lg shadow-sm border'>
                  Typing...
                </div>
              </div>
            )}
            {error && <div className='text-red-500 text-sm p-2'>{error}</div>}
          </div>

          {/* Input Area */}
          <div className='p-4 border-t'>
            <div className='flex gap-2'>
              <input
                type='text'
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder='Type your message...'
                className='flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900'
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className='bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50'
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Trigger Button */}
      <button
        onClick={toggleChat}
        className='w-[60px] h-[60px] rounded-full bg-white p-1 cursor-pointer transition-transform duration-300 hover:scale-110 shadow-lg overflow-hidden'
        aria-label={isChatOpen ? 'Close Chat' : 'Open Chat'}
      >
        <img 
          src={puffu} 
          alt="Puffu Assistant" 
          className="w-full h-full rounded-full object-cover"
        />
      </button>
    </div>
  );
}
