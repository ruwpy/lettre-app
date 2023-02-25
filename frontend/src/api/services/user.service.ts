import api from "..";
import { IUser } from "../../interfaces/index";

export class UserService {
  static async getUsers(query: string) {
    return api.get<IUser[]>("/user/" + query);
  }
}
