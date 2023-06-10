import axios from "axios";
import React, { useState } from "react";

const ChatUI = () => {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.chat.value;
    setInput(message);

    setIsLoading(true); // Set loading to true before making the request

    try {
      const response = await axios.post(
        "https://chat-gpt-server-indol.vercel.app/chat/chatting",
        {
          message,
        }
      );
      setData(response.data);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false); // Set loading to false after the request is complete
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 ">
      <div className="text-center mb-4 ">
        <h1 className="text-2xl font-bold text-blue-600 ">Chat with GPT</h1>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 mb-2">
        {input ? (
          <div>{input}</div>
        ) : (
          <>
            {" "}
            <p className="text-sm text-blue-600 mb-2">
              You started a new conversation
            </p>
            <p className="text-sm text-gray-500">
              Hello! How can I assist you today?
            </p>
          </>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          {data && <div className="bg-blue-50 rounded-lg p-4 mb-2">{data}</div>}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-center mt-96 sticky bottom-8"
      >
        <input
          type="text"
          name="chat"
          placeholder="Write a message..."
          required
          className="flex-1 bg-blue-50 rounded-lg p-4 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
