import { create } from "zustand";
import { IConversation } from "../interfaces";
import { ContactService } from "../api/services/contact.service";
import { ConversationService } from "../api/services/conversation.service";

type conversationState = {
  conversation: IConversation;
  setConversation: (conversationId: string | undefined) => void;
};

export const useConversationStore = create<conversationState>((set) => ({
  conversation: <IConversation>{},

  setConversation: async (conversationId) => {
    const conversation = await ConversationService.getConversation(
      conversationId
    );
    set({ conversation: conversation.data });
  },
}));
