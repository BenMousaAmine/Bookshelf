import { ReactNode } from 'react';

export interface SessionContextType {
  messages: Message[];
  sendMessage: (query: string) => Promise<void>;
  clearMessages: () => void;
  saveConversation: () => void;
  selected: string;
  setSelected: (selected: string) => void;
  chatState: string;
  setChatState: (chatState: string) => void;
  getConversationHistory: () => void;
  conversationHistory: any[];
  setMessages: (messages: Message[]) => void;
  updateConversation: (prop: Conversation) => void;
  conversation: Conversation;
  setConversation: (conversation: Conversation) => void;
  setConversationHistory: (
    conversationHistory: (prevConversations: Conversation[]) => Conversation[]
  ) => void;
}
export interface Conversation {
  id: string;
  created_at: string;
  data: Message[];
  sessionDate: number;
  title: string;
  updated_at: string;
  user_id: string;
}
export interface ArchiveCardProps {
  conversation: Conversation;
  onConversationDeleted: (id: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface ConversationProps {
  messages: Message[];
}
export interface SessionProviderProps {
  children: ReactNode;
}
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
