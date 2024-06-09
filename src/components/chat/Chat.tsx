import  { useEffect, useState } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { sender: 'person1', text: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
    }
  };
  useEffect(() => {
    let loc = window.location;
    const url = 'localhost:8000';
    let wsStart = 'ws://';

    if (loc.protocol === 'https:') {
      wsStart = 'wss://';
    }

    let endpoint = wsStart + url + loc.pathname;

    var socket = new WebSocket(endpoint);

    socket.onopen = (e) => {
      console.log('WebSocket connected:', e);
    };

    socket.onmessage = (e) => {
      console.log('WebSocket message received:', e);
    };

    socket.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    socket.onclose = (e) => {
      console.log('WebSocket closed:', e);
    };

    // Clean up function
    return () => {
      socket.close();
    };
  }, []);

  

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-96 mx-auto sm:w-[90%] border border-gray-300 rounded-lg p-2">
      <div className="flex-1 overflow-y-auto p-2 border-b border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 sm:w-[48%] max-[400px]:text-xs text-sm p-2 rounded-md ${
              msg.sender === 'person1' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 max-[400px]:text-xs text-sm border border-gray-300 rounded-md mr-2"
        />
        <button
          onClick={handleSend}
          className="p-2 max-[400px]:text-xs text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
