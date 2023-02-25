export interface IContact {
  id: string;
  conversation?: object;
  conversation_id: string;
  lastMessage?: ILastMessage;
  user?: object;
  user_id: string;
  contact_id: string;
  created_at: Date;
  contact_name: string;
  contact_photo: string;
}

interface ILastMessage {
  message_date: Date;
  message_text: string;
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
