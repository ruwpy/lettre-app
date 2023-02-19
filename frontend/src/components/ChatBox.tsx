import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useUserStore } from "../stores/userStore";
import { TChat } from "../types/chat";

export default function ChatBox({ id, from_id, to_id }: TChat) {
  const { chatId } = useParams();
  const isCurrentPage: boolean = chatId === to_id;
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const createChat = async () => {
    if (isCurrentPage) return;

    const chat = await api.post<TChat>("chat/create", {
      from_id: user.id,
      to_id: to_id,
    });

    if (!chat) return;

    navigate("/chat/" + chat.data.to_id);
  };

  return (
    <div
      onClick={() => createChat()}
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
