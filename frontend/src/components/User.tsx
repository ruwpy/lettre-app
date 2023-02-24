import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/index";
import { ContactService } from "../api/services/contact.service";

export default function Contact({ id, name, profile_photo }: IUser) {
  const navigate = useNavigate();

  const createChat = async () => {
    const contact = await ContactService.createContact(
      "bff995f9-b224-4268-b119-1c0ef36d780d"
    );
    if (contact) navigate("chat/" + contact.data.conversation_id);
  };

  return (
    <div
      onClick={() => createChat()}
      className={`flex p-2 gap-3 cursor-pointer hover:bg-zinc-700 rounded-xl m-2`}
    >
      <img
        src={profile_photo}
        alt="user image"
        className="rounded-xl w-14 h-14 object-contain"
      />
      <div className="flex-grow">
        <span className="inline-flex align-middle justify-between w-full">
          <span className="text-white font-medium">{name}</span>
        </span>
      </div>
    </div>
  );
}
