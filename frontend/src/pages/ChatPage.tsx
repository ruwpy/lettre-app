import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { chatBoxes } from "./MainPage";
import { useEffect, useState } from "react";
import { chatProps } from "../components/ChatBox";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";

export default function ChatPage() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [chatData, setChatData] = useState({} as chatProps);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    chatBoxes.map((box) => {
      if (box.id === chatId) setChatData(box);
    });
  });

  return (
    <div className="bg-zinc-800 h-full">
      <nav className="bg-zinc-800 w-full flex p-2 gap-2 align-middle fixed top-0 left-0">
        <ArrowLeftIcon
          onClick={() => navigate("/")}
          className="text-gray-400 h-12 w-12 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer"
        />
        <div className="flex gap-3 items-center">
          <img
            src={chatData?.img}
            alt="user pfp"
            className="w-12 h-12 rounded-xl"
          />
          <span className="text-white font-medium">{chatData?.name}</span>
        </div>
      </nav>
      <div className="pb-16 pt-16 flex flex-col h-screen justify-end bg-zinc-900 items-center">
        <div className="w-96">
          <Message
            createdAt="19:56"
            id={"4545"}
            senderId={chatData.id}
            text="hello"
          />
          <Message
            createdAt="19:56"
            id="4545"
            senderId="4545"
            text="hiiiiiiii"
          />
        </div>
      </div>
      <div className="bg-zinc-800 w-full flex p-2 gap-4 align-middle fixed bottom-0 left-0">
        <input
          type="text"
          onChange={(e) => setMessageValue(e.target.value)}
          value={messageValue}
          className="bg-zinc-900 rounded-3xl w-full py-3 px-5 text-white outline-none"
          placeholder="Message"
        />
        <button>
          <PaperAirplaneIcon
            className={`p-2 w-12 h-12 rounded-xl hover:bg-zinc-700 ${
              messageValue ? "text-zinc-100" : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
