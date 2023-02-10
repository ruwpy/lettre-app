import { useNavigate } from "react-router-dom";

export type chatProps = {
  id: string;
  img: string;
  name: string;
  lastMessage: string;
  lastMessageDate: string;
};

export default function ChatBox({
  id,
  img,
  name,
  lastMessage,
  lastMessageDate,
}: chatProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/chat/" + id)}
      className="flex p-2 gap-3 cursor-pointer hover:bg-zinc-700 rounded-xl m-2"
    >
      <img
        src={img}
        alt="user image"
        className="rounded-xl w-14 h-14 object-contain"
      />
      <div className="flex-grow">
        <span className="inline-flex align-middle justify-between w-full">
          <span className="text-white font-medium">{name}</span>
          <span className="text-gray-500 whitespace-nowrap text-sm">
            {lastMessageDate}
          </span>
        </span>
        <p className="text-gray-300">{lastMessage}</p>
      </div>
    </div>
  );
}
