import { create } from "zustand";
import { IContact } from "../interfaces";
import { ContactService } from "../api/services/contact.service";

type contactsState = {
  contacts: IContact[];
  setContacts: () => void;
};

export const useContactsStore = create<contactsState>((set) => ({
  contacts: [],

  setContacts: async () => {
    const contacts = await ContactService.getContacts();
    set({ contacts: contacts.data });
  },
}));
