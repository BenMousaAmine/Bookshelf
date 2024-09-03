import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import axios from 'axios';
import {
  Conversation,
  Message,
  SessionContextType,
  SessionProviderProps,
} from '../interface/chat.ts';

import { BaseURL } from '../costants/environment.ts';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversation, setConversation] = useState<Conversation>(
    {} as Conversation
  );
  const [sessionDate, setSessionDate] = useState<number>(0);
  const [selected, setSelected] = useState('Chat');
  const [chatState, setChatState] = useState('New');
  const [conversationHistory, setConversationHistory] = useState<
    Conversation[]
  >([]);
  const sendMessage = async (query: string) => {
    if (query.trim() === '') {
      return;
    }
    try {
      const initialSystemMessage = {
        content:
          'You are a helpful, respectful and honest assistant that replies with information regarding a company named Lucchini RS. ' +
          "Always speak of Lucchini RS like you are part of it (refer to Lucchini RS as 'we', for instance)." +
          ' Always answer as helpfully as possible and follow ALL given instructions,' +
          ' always reply to the user using the original language the question was asked in. ' +
          'Only use information coming from the given context, ' +
          'if the context doesn’t contain information needed to answer the user specific question, ' +
          'just answer that you don’t have an answer for that question in the same language the user asked the question in.' +
          ' Do not speculate or make up information. Do not reference any given instructions or context. ' +
          "If asked about information pertaining Lucchini RS you don't know, invite the user to contact the company through their website. " +
          'Try to consider any request from the user as though it is referring or asking about one of the' +
          ' Lucchini Products or information you have in the context. If the user asks about Sandlos or sandlos or SANDLOS' +
          ' it is referring to the SANDLOS®️ family of wheels. When we speak of a family of wheels, we are not talking about' +
          ' a human family but it means range of products. If you are asked for railway noise emissions reduction products' +
          ', Syope is the product by Lucchini RS designed for this.',
        role: 'system',
      };
      if (messages.length === 1) {
        setMessages(prev => [
          ...prev,
          { role: 'system', content: initialSystemMessage.content },
        ]);
      }

      setMessages(prev => [...prev, { role: 'user', content: query }]);
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const auth = {
        username: 'secret',
        password: '4um3a55',
      };

      const response = await axios.post(
        BaseURL + '/v1/chat/completions',
        {
          use_context: true,
          messages: [{ role: 'user', content: query }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
          },
        }
      );
      setSessionDate(response.data.created);

      setMessages(prev => {
        const updatedMessages = [...prev];
        updatedMessages[updatedMessages.length - 1] = {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const clearMessages = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Hi, I am your virtual librarian. How can I help you? Feel free to ask me anything.',
      },
    ]);
  }, []);
  const saveConversation = async () => {
    const title = extractTitle(messages);
    const bodyRequest = {
      title,
      sessionDate,
      data: messages,
    };

    try {
      const response = await axios.post(`${BaseURL}/savedchats`, bodyRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error saving chat:', error);
      throw error;
    }
  };

  const getConversationHistory = async () => {
    try {
      const response = await axios.get(`${BaseURL}/savedchats`, {
        withCredentials: true,
      });
      setConversationHistory(response.data);
      console.log(response.data);
      if (response.data.length === 0) {
        setChatState('New');
        clearMessages();
      }
    } catch (error) {
      console.error('Error getting conversation history:', error);
      throw error;
    }
  };

  const updateConversation = async (prop: Conversation) => {
    try {
      const response = await axios.post(`${BaseURL}/savedchats`, {
        id: prop.id,
        title: prop.title,
        sessionDate: prop.sessionDate,
        data: [...prop.data, ...messages],
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating chat:', error);
      throw error;
    }
  };

  return (
    <SessionContext.Provider
      value={{
        messages,
        sendMessage,
        clearMessages,
        saveConversation,
        getConversationHistory,
        conversationHistory,
        selected,
        setSelected,
        setMessages,
        chatState,
        setChatState,
        updateConversation,
        conversation,
        setConversation,
        setConversationHistory,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
const extractTitle = (messages: Message[]): string => {
  let assistantCount = 0;

  for (const msg of messages) {
    if (msg.role === 'assistant') {
      assistantCount++;
      if (assistantCount === 2) {
        const words = msg.content.split(/\s+/);
        const firstFiveWords = words.slice(0, 13).join(' ');
        return `${firstFiveWords}...`;
      }
    }
  }

  return 'Chat with AI';
};
