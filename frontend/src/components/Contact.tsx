import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useUserStore } from "../stores/userStore";
import { IContact } from "../interfaces/index";

export default function Contact({
  id,
  contact_id,
  conversation,
  conversation_id,
  created_at,
  lastMessage,
  user,
  user_id,
}: IContact) {
  const { chatId } = useParams();
  const isCurrentPage: boolean = chatId === conversation_id;
  const navigate = useNavigate();

  const openConversation = () => {
    navigate("chat/" + conversation_id);
  };

  return (
    <div
      onClick={() => openConversation()}
      className={`flex p-2 gap-3 cursor-pointer ${
        isCurrentPage ? "bg-indigo-500" : "hover:bg-zinc-700"
      } rounded-xl m-2`}
    >
      <img
        src="a"
        alt="user image"
        className="rounded-xl w-14 h-14 object-contain"
      />
      <div className="flex-grow">
        <span className="inline-flex align-middle justify-between w-full">
          <span className="text-white font-medium">ruwpy</span>
          <span className="text-white opacity-40 whitespace-nowrap text-sm">
            {"19 feb"}
          </span>
        </span>
        <p className="text-gray-300">{"hi"}</p>
      </div>
    </div>
  );
}
