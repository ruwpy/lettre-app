import { Bars3Icon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Contact from "../components/Contact";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useContactsStore } from "../stores/contactsStore";
import User from "../components/User";

export default function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const user = useUserStore((state) => state.user);
  const { setContacts, contacts } = useContactsStore((state) => state);

  console.log(contacts);

  useEffect(() => {
    setContacts();
  }, []);

  return user ? (
    <div className="flex">
      <aside className="bg-zinc-800 h-screen flex flex-col overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-3/12 border-r-[1px] border-zinc-900 shrink-0">
        <nav className="bg-zinc-800 w-full flex p-2 gap-4 align-middle relative top-0 left-0">
          <Bars3Icon className="text-gray-400 h-12 w-14 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer" />
          <span className="w-full relative">
            <input
              type="text"
              className="bg-zinc-900 rounded-3xl w-full py-3 px-10 text-white outline-none focus:outline-indigo-500"
              placeholder="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <MagnifyingGlassIcon className="text-gray-500 absolute w-5 h-5 top-3.5 left-3" />
          </span>
        </nav>
        <div className="overflow-y-scroll h-full">
          {contacts.map((contact) => {
            return (
              <Contact
                id={contact.id}
                contact_id={contact.contact_id}
                conversation_id={contact.conversation_id}
                created_at={contact.created_at}
                user_id={contact.user_id}
                key={contact.id}
              />
            );
          })}
          {/* <User id="321" name="ruwpy" profile_photo="321" /> */}
        </div>
      </aside>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/auth" />
  );
}
