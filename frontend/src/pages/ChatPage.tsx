import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { messageProps } from "../components/Message";
import { io } from "socket.io-client";
import { useUserStore } from "../stores/userStore";

const socket = io("ws://localhost:3002");

export default function ChatPage() {
  const scrollToBottom = useRef<any>();
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const [messages, setMessages] = useState<messageProps[]>([]);
  const [messageValue, setMessageValue] = useState<string>("");
  const messageData: messageProps = {
    from_id: user.id,
    to_id: "4646",
    text: messageValue,
  };

  useEffect(() => {
    socket.emit("findAllMessages", {}, (messages: messageProps[]) => {
      setMessages(messages);
      scrollToBottom.current.scrollIntoView();
    });

    socket.on("message", (message: messageProps) => {
      setMessages((prev) => [...prev, message]);

      setTimeout(() => {
        scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {}, []);

  const sendMessage = (): void => {
    if (!messageValue) return;

    socket.emit("createMessage", messageData, () => {
      setMessageValue("");
    });
  };

  const messageItems = messages.map((message) => (
    <Message
      id={message.id}
      from_id={message.from_id}
      text={message.text}
      to_id={message.to_id}
      key={message.id}
      created_at={message.created_at}
    />
  ));

  return (
    <div className="bg-zinc-800 h-screen w-full relative flex flex-col">
      <div className="bg-zinc-800 w-full flex p-2 gap-2 align-middle relative">
        <ArrowLeftIcon
          onClick={() => navigate("/")}
          className="text-gray-400 h-12 w-12 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer md:hidden"
        />
        <div className="flex gap-3 items-center ml-4">
          <img
            src="https://picsum.photos/seed/piscu/200"
            alt="user pfp"
            className="w-12 h-12 rounded-xl"
          />
          <span className="text-white font-medium">ruwpy</span>
        </div>
      </div>
      <div className="flex flex-col h-full justify-end content-center bg-zinc-900 overflow-y-hidden">
        <div className="overflow-y-scroll w-full">
          <div className="max-w-[45.5rem] m-auto">
            <div>{messageItems}</div>
          </div>
          <div ref={scrollToBottom}></div>
        </div>
      </div>
      <div className="flex bg-zinc-900 justify-center">
        <div className=" w-full flex mb-6 mt-2 gap-4 max-w-[45.5rem]">
          <input
            type="text"
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}
            className="bg-zinc-800 rounded-3xl w-full py-3 px-5 text-white outline-none"
            placeholder="Message"
          />
          <button
            className="p-2 rounded-2xl bg-zinc-800 hover:bg-zinc-700"
            onClick={() => sendMessage()}
          >
            <PaperAirplaneIcon
              className={`w-8 h-8  ${
                messageValue ? "text-zinc-100" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
