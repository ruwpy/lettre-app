import api from "..";
import { IContact } from "../../interfaces/index";

export class ContactService {
  static async getContacts() {
    return api.get<IContact[]>("/contacts");
  }

  static async createContact(relatedUserId: string) {
    return api.post<IContact>("/contacts/create", { relatedUserId });
  }
}
