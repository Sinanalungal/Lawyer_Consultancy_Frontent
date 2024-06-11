import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAxiosInstance } from '../../services/axiosInstance/AxiosInstance';
import { BASE_URL, ImgBackendUrl } from '../../constants';

const ChatComponent = ({ send_to_id, path }) => {
  const [messages, setMessages] = useState([]);
  const [chattedPersons, setChattedPersons] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [thread,setThread] = useState(null);
  const { value } = useSelector((store) => store.login);
  console.log(value);

  useEffect(() => {
    if (!send_to_id) {
      navigate('../');
    }

    const fetchChattedPersons = async () => {
      try {
        const axiosInstance = await getAxiosInstance()
        const response = await axiosInstance.get(`${BASE_URL}chat/messages/`) ; 
        console.log(response.data)
        setChattedPersons(response.data);
      } catch (error) {
        console.error('Error fetching chatted persons:', error);
      }
    };

    fetchChattedPersons();

    let loc = window.location;
    const url = 'localhost:8000';
    let wsStart = 'ws://';

    if (loc.protocol === 'https:') {
      wsStart = 'wss://';
    }

    let endpoint = wsStart + url + `${path}${value}`;

    const newSocket = new WebSocket(endpoint);
    setSocket(newSocket);

    newSocket.onopen = (e) => {
      console.log('WebSocket connected:', e);
    };

    newSocket.onmessage = (e) => {
      console.log('WebSocket message received:', e);
      const receivedMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    newSocket.onerror = (e) => {
      console.error('WebSocket error:', e);
    };

    newSocket.onclose = (e) => {
      console.log('WebSocket closed:', e);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && socket) {
      let data = { sent_by: value, send_to: Number(send_to_id), text: input };
      let dataValue = JSON.stringify(data);
      socket.send(dataValue);
      setInput('');
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='max-w-[1400px] mx-auto'>
      <div className='flex'>
      <div className='sm:min-w-[300px] border rounded-lg max-sm:w-full pr-1'>
        <div className=' border-gray-200 p-1 w-full rounded-xl h-full overflow-y-scroll'>
          <h1 className='pl-2 font-bold text-xl py-5 bg-slate-800 rounded-md mb-1 text-white text-center'>Chats</h1>
          {chattedPersons.map((person, index) => (
            <div
              key={index}
              className=' p-2 border  border-gray-200 flex space-x-1  rounded-md w-full mb-[3px] cursor-pointer'
              onClick={() => setThread(person)} // Adjust this to navigate to the selected chat
            >
              <div className=''>
                <img
                  src={`${ImgBackendUrl}${person.other_user.profile}`}
                  alt='Profile'
                  className='w-[40px] object-cover border h-[40px] rounded-full'
                />
              </div>

              <div className='xl:col-span-4 col-span-3 flex items-center'>
                <p className='font-semibold text-xs text-black truncate'>{person.other_user.full_name.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    {thread?(<div className='flex ml-1  flex-col  max-sm:hidden h-96 mx-auto w-[90%] border border-gray-300 rounded-lg '>
        <div className='w-full flex items-center  h-16 pl-2 bg-slate-800 rounded-t-lg rounded-b-sm'>
        <div className='col-span-1 flex justify-center'>
                <img
                  src={`${ImgBackendUrl}${thread.other_user.profile}`}
                  alt='Profile'
                  className='w-[40px] border h-[40px] rounded-full'
                />
              </div>
              <div className='xl:col-span-4 col-span-3 flex items-center ml-1'>
              <p className='font-semibold text-white truncate'>{thread.other_user.full_name.toUpperCase()}</p>
              </div>        </div>
              <div className='flex-1 overflow-y-auto p-2 border-b border-gray-300'>
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`flex mb-2 ${msg.send_by === value ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`sm:max-w-[48%] max-[400px]:text-xs text-sm py-2 px-3 rounded-md ${
          msg.send_by === value ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        {msg.message}
      </div>
    </div>
  ))}
</div>

        <div className='flex p-2'>
          <input
            type='text'
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder='Type your message...'
            className='flex-1 p-2 max-[400px]:text-xs text-sm border border-gray-300 rounded-md mr-2'
          />
          <button
            onClick={handleSend}
            className='p-2 max-[400px]:text-xs text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600'
          >
            Send
          </button>
        </div>
      </div>):(<div className='flex ml-1  flex-col  max-sm:hidden h-96 mx-auto w-[90%] border border-gray-300 rounded-lg '></div>)}
    </div>
    </div>
  );
};

export default ChatComponent;
