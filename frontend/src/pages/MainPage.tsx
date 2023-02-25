import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import Contact from "../components/Contact";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useContactsStore } from "../stores/contactsStore";
import User from "../components/User";
import { IUser } from "../interfaces";
import { UserService } from "../api/services/user.service";

export default function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputActive, setInputActive] = useState(false);
  const [searchResults, setSearchResults] = useState<IUser[]>([]);
  const isSearchActive = inputActive && inputValue;
  const user = useUserStore((state) => state.user);
  const { setContacts, contacts } = useContactsStore((state) => state);

  useEffect(() => {
    setContacts();
  }, []);

  useEffect(() => {
    if (!isSearchActive) {
      setInputValue("");
      setSearchResults([]);
    }
  }, [isSearchActive]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await UserService.getUsers(inputValue);
      console.log(users.data);

      const usersWithoutMe = users.data.filter(
        (foundUser) => foundUser.id !== user.id
      );
      if (usersWithoutMe) setSearchResults(usersWithoutMe);
    };

    if (inputValue.length > 3) getUsers();
  }, [inputValue]);

  const closeSearch = () => {
    setInputActive(false);
  };

  const userSearchResults = searchResults.map((user) => {
    return (
      <User
        id={user.id}
        name={user.name}
        profile_photo={user.profile_photo}
        key={user.id}
      />
    );
  });

  return user ? (
    <div className="flex">
      <aside className="bg-zinc-800 h-screen flex flex-col overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-3/12 border-r-[1px] border-zinc-900 shrink-0">
        <nav className="bg-zinc-800 w-full flex p-2 gap-4 align-middle relative top-0 left-0">
          {isSearchActive ? (
            <XMarkIcon
              onClick={() => closeSearch()}
              className="text-gray-400 h-12 w-14 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer"
            />
          ) : (
            <Bars3Icon className="text-gray-400 h-12 w-14 py-2 hover:bg-zinc-700 rounded-xl cursor-pointer" />
          )}
          <div className="w-full relative">
            <input
              type="text"
              className="bg-zinc-900 rounded-3xl w-full py-3 px-10 text-white outline-none focus:outline-indigo-500"
              placeholder="Search"
              value={inputValue}
              onFocus={() => setInputActive(true)}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <MagnifyingGlassIcon className="text-gray-500 absolute w-5 h-5 top-3.5 left-3" />
          </div>
          {isSearchActive && (
            <div className="w-full absolute top-full left-0">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex gap-2 flex-col m-2 p-2 bg-zinc-900 rounded-2xl min-h-[72px] max-h-full"
              >
                {searchResults.length < 1 ? (
                  <p className="text-white text-center mt-4">
                    Did not found any users
                  </p>
                ) : (
                  userSearchResults
                )}
              </div>
            </div>
          )}
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
                contact_name={contact.contact_name}
                contact_photo={contact.contact_photo}
                lastMessage={contact.lastMessage}
                key={contact.id}
              />
            );
          })}
        </div>
      </aside>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/auth" />
  );
}
