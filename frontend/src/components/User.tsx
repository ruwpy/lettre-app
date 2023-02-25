import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/index";
import { ContactService } from "../api/services/contact.service";
import { useContactsStore } from "../stores/contactsStore";

export default function User({ id, name, profile_photo }: IUser) {
  const navigate = useNavigate();
  const { contacts } = useContactsStore();
  const contactExist = contacts.filter(
    (contact) => contact.contact_id === id
  )[0];

  const createChat = async () => {
    if (!contactExist) {
      const contact = await ContactService.createContact(id);
      if (contact) navigate("chat/" + contact.data.conversation_id);
    }
    navigate("chat/" + contactExist.conversation_id);
  };

  return (
    <div
      onClick={() => createChat()}
      className={`flex p-2 gap-3 cursor-pointer hover:bg-zinc-700 rounded-xl`}
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
