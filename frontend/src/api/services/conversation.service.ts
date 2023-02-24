import api from "..";
import { IConversation } from "../../interfaces/index";

export class ConversationService {
  static async getConversation(conversationId: string | undefined) {
    return api.get<IConversation>("/conversation/" + conversationId);
  }
}
