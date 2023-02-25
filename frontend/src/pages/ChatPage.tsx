import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import { IMessage } from "../interfaces/index";
import { io } from "socket.io-client";
import { useUserStore } from "../stores/userStore";
import { useConversationStore } from "../stores/conversationStore";
import { useContactsStore } from "../stores/contactsStore";

const socket = io("ws://localhost:3002");

export default function ChatPage() {
  const scrollToBottom = useRef<any>();
  const user = useUserStore((state) => state.user);
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [messageValue, setMessageValue] = useState("");
  const messageData: IMessage = {
    sender_id: user.id,
    conversation_id: conversationId,
    text: messageValue,
  };
  const { conversation, setConversation } = useConversationStore(
    (state) => state
  );
  const { contacts } = useContactsStore();
  const currentContact = contacts.filter(
    (contact) => contact.conversation_id === conversationId
  )[0];

  useEffect(() => {
    setMessages([]);
    setConversation(conversationId);
  }, [conversationId]);

  useEffect(() => {
    socket.on("message", (message: IMessage) => {
      setMessages((prev) => [...prev, message]);

      setTimeout(() => {
        scrollToBottom.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    if (conversation.messages) setMessages(conversation.messages);
  }, [conversation]);

  const sendMessage = (): void => {
    if (!messageValue) return;

    socket.emit("createMessage", messageData, () => {
      setMessageValue("");
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  const messageItems = messages.map((message) => (
    <Message
      id={message.id}
      sender_id={message.sender_id}
      text={message.text}
      conversation_id={message.conversation_id}
      is_edited={message.is_edited}
      created_at={message.created_at}
      key={message.id}
    />
  ));

  return (
    <div className="bg-zinc-800 h-screen sm:w-screen relative flex flex-col sm:shrink-0 md:flex-shrink">
      <div className="bg-zinc-800 w-full flex p-2 gap-2 align-middle relative">
        <ArrowLeftIcon
          onClick={() => navigate("/")}
          className="text-gray-400 h-12 w-12 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer md:hidden"
        />
        <div className="flex gap-3 items-center ml-4">
          {currentContact ? (
            <img
              src={currentContact?.contact_photo}
              alt="user pfp"
              className="w-12 h-12 rounded-xl"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-zinc-900" />
          )}
          <span className="text-white font-medium">
            {currentContact ? currentContact.contact_name : "Loading"}
          </span>
        </div>
      </div>
      <div className="flex flex-col h-full justify-end content-center bg-zinc-900 overflow-y-hidden">
        <div className="overflow-y-scroll w-full">
          <div className="max-w-[48.5rem] px-6 m-auto">
            <div>{messageItems}</div>
          </div>
          <div ref={scrollToBottom}></div>
        </div>
      </div>
      <div className="flex bg-zinc-900 justify-center">
        <div className=" w-full flex mb-6 mt-2 gap-4 max-w-[48.5rem] px-6">
          <input
            type="text"
            onChange={(e) => setMessageValue(e.target.value)}
            value={messageValue}
            className="bg-zinc-800 rounded-3xl w-full py-3 px-5 text-white outline-none"
            placeholder="Message"
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button
            className="p-2 rounded-2xl bg-zinc-800 hover:bg-zinc-700"
            onClick={() => sendMessage()}
          >
            <PaperAirplaneIcon
              className={`w-8 h-8  ${
                messageValue ? "text-indigo-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
