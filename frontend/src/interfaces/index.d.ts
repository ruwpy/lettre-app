export interface IContact {
  id: string;
  conversation?: object;
  conversation_id: string;
  lastMessage?: object;
  user?: object;
  user_id: string;
  contact_id: string;
  created_at: Date;
}

export interface IConversation {
  id: string;
  participants: Array;
  messages: Array;
  contacts: Array;
}

export interface IMessage {
  id?: string;
  text: string;
  sender_id: string;
  conversation?: object;
  conversation_id?: string;
  is_edited?: boolean;
  created_at?: Date;
}

export interface IUser {
  id: string;
  email?: string;
  name: string;
  profile_photo: string;
  contacts?: Array;
  createdAt?: Date;
}
