import { Bars3Icon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import { nanoid } from "nanoid";

export const chatBoxes = [
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/piscu/200",
    name: "ruwpy",
    lastMessage: "hi",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/piscum/200",
    name: "юля",
    lastMessage: "привет",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
  {
    id: nanoid(),
    img: "https://picsum.photos/seed/pisc/200",
    name: "эва",
    lastMessage: "ыаыаыаыа",
    lastMessageDate: "Feb 19",
  },
];

export default function MainPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="max-w-sm bg-zinc-800 h-full">
      <nav className="bg-zinc-800 w-full max-w-sm flex p-2 gap-4 align-middle fixed top-0 left-0">
        <Bars3Icon className="text-gray-400 h-12 w-14 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer" />
        <span className="relative w-full">
          <input
            type="text"
            className="bg-zinc-900 rounded-3xl w-full py-3 px-10 text-white outline-none"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <MagnifyingGlassIcon className="text-gray-500 absolute w-5 h-5 top-3.5 left-3" />
        </span>
      </nav>
      <div className="pt-14 pb-2">
        {chatBoxes.map((box) => {
          return (
            <ChatBox
              id={box.id}
              img={box.img}
              lastMessage={box.lastMessage}
              lastMessageDate={box.lastMessageDate}
              name={box.name}
              key={box.id}
            />
          );
        })}
      </div>
    </div>
  );
}
