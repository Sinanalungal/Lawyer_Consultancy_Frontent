import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAxiosInstance } from "../../services/axiosInstance/AxiosInstance";
import { BASE_URL, ImgBackendUrl } from "../../constants";
import { IoMdArrowRoundBack } from "react-icons/io";

const ChatComponent = ({ send_to_id, path }) => {
  const [messages, setMessages] = useState([]);
  const [chattedPersons, setChattedPersons] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [thread, setThread] = useState(null);
  const { value } = useSelector((store) => store.login);

  useEffect(() => {
    if (thread) {
      const fetchThread = async () => {
        try {
          const axiosInstance = await getAxiosInstance();
          const response = await axiosInstance.get(
            `${BASE_URL}chat/messages/thread/${thread.id}/`
          );
          console.log(response.data);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching thread messages:", error);
        }
      };
      fetchThread();
    }
  }, [thread]);

  useEffect(() => {
    if (!send_to_id) {
      navigate("../");
    }

    const fetchChattedPersons = async () => {
      try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.get(`${BASE_URL}chat/messages/`);
        setChattedPersons(response.data);
      } catch (error) {
        console.error("Error fetching chatted persons:", error);
      }
    };

    fetchChattedPersons();

    let loc = window.location;
    const url = "localhost:8000";
    let wsStart = "ws://";

    if (loc.protocol === "https:") {
      wsStart = "wss://";
    }

    let endpoint = wsStart + url + `${path}${value}`;

    const newSocket = new WebSocket(endpoint);
    setSocket(newSocket);

    newSocket.onopen = (e) => {
      console.log("WebSocket connected:", e);
    };

    newSocket.onmessage = (e) => {
      const receivedMessage = JSON.parse(e.data);
      console.log(receivedMessage, "latest received msg");
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    newSocket.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    newSocket.onclose = (e) => {
      console.log("WebSocket closed:", e);
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() && socket) {
      let data = {
        sent_by: value,
        send_to: Number(send_to_id),
        text: input,
        thread: thread.id,
      };
      let dataValue = JSON.stringify(data);
      socket.send(dataValue);
      setInput("");
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="flex">
        <div
          className={`sm:min-w-[300px] border rounded-lg max-sm:w-full pr-1 ${
            thread && "max-sm:hidden"
          }`}
        >
          <div className="border-gray-200 p-1 w-full rounded-xl h-full overflow-y-scroll">
            <h1 className="pl-2 font-bold text-xl py-5 bg-slate-800 rounded-md mb-1 text-white text-center">
              Chats
            </h1>
            {chattedPersons.map((person, index) => (
              <div
                key={index}
                className="p-2 border border-gray-200 flex space-x-1 rounded-md w-full mb-[3px] cursor-pointer"
                onClick={() => setThread(person)}
              >
                <div>
                  <img
                    src={`${ImgBackendUrl}${person.other_user.profile}`}
                    alt="Profile"
                    className="w-[40px] object-cover border h-[40px] rounded-full"
                  />
                </div>
                <div className="xl:col-span-4 col-span-3 flex items-center">
                  <p className="font-semibold text-xs text-black truncate">
                    {person.other_user.full_name.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {thread ? (
          <div className="flex ml-1 flex-col  h-96 mx-auto max-sm:w-[100%] w-[90%] border border-gray-300 rounded-lg">
            <div className="w-full flex items-center h-16 pl-2 bg-slate-800 rounded-t-lg rounded-b-sm">
              <p
                className="text-white pr-2 sm:hidden"
                onClick={() => setThread(null)}
              >
                <IoMdArrowRoundBack size={20} />
              </p>
              <div className="col-span-1 flex justify-center">
                <img
                  src={`${ImgBackendUrl}${thread.other_user.profile}`}
                  alt="Profile"
                  className="w-[40px] border h-[40px] rounded-full"
                />
              </div>
              <div className="xl:col-span-4 col-span-3 flex items-center ml-1">
                <p className="font-semibold text-white truncate">
                  {thread.other_user.full_name.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 border-b border-gray-300">
              {messages.map((msg, index) => {
                const date = new Date(msg.timestamp);
                const formattedDate = date.toLocaleDateString();
                const formattedTime = date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const showDate =
                  index === 0 ||
                  formattedDate !==
                    new Date(
                      messages[index - 1].timestamp
                    ).toLocaleDateString();

                return (
                  <div key={index}>
                    {showDate && (
                      <div className="text-center my-2">
                        <span className="bg-slate-200 px-2 text-gray-700 text-[9px] py-1 rounded-lg">
                          {formattedDate}
                        </span>
                      </div>
                    )}

                    <div
                      className={`flex flex-col mb-2 ${
                        msg.send_by === value ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`sm:max-w-[48%] max-[400px]:text-xs text-sm py-2 px-3 rounded-md ${
                          msg.send_by === value
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        style={{
                          wordBreak: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.message}
                      </div>
                      <p className="text-[7px] pt-[2px] pl-1">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                className="p-2 max-[400px]:text-xs text-sm bg-slate-700 text-white rounded-md hover:bg-slate-800"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="flex ml-1 flex-col max-sm:hidden h-96 mx-auto w-[90%] border border-gray-300 rounded-lg"></div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
