import { useNavigate, useParams } from "react-router-dom";
import { IContact } from "../interfaces/index";

export default function Contact({
  conversation_id,
  contact_name,
  contact_photo,
}: IContact) {
  const { conversationId } = useParams();
  const isCurrentPage: boolean = conversationId === conversation_id;
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
        src={contact_photo}
        alt="user image"
        className="rounded-xl w-14 h-14 object-contain"
      />
      <div className="flex-grow">
        <span className="inline-flex align-middle justify-between w-full">
          <span className="text-white font-medium">{contact_name}</span>
        </span>
      </div>
    </div>
  );
}
