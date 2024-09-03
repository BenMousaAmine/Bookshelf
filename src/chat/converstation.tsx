import { Button, Input, Typography } from '@material-tailwind/react';

import AiAvatar from '../assets/images/ai-avatar.png';
import Avatar from '../assets/images/avatar.png';

import { ConversationProps } from '../interface/chat.ts';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { appColor } from '../costants/colors.ts';
import { AiFillAudio } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { useSession } from '../hooks/SessionContext.tsx';

const Converstation = () => {
  const [input, setInput] = useState('');
  const {
    saveConversation,
    sendMessage,
    messages,
    clearMessages,
    selected,
    setSelected,
    updateConversation,
    chatState,
    conversation,
    getConversationHistory,
  } = useSession();

  useEffect(() => {
    clearMessages();
  }, []);
  const handleSend = async () => {
    await sendMessage(input);
    setInput('');
  };
  useEffect(() => {
    return () => {
      if (messages.length > 1 && chatState === 'Chat') {
        saveConversation();
      } else if (
        chatState === 'Archive' &&
        !_.isEqual(messages, conversation.data) &&
        messages.length > 1
      ) {
        updateConversation(conversation);
      }
    };
  }, [messages]);
  return (
    <>
      {messages.map((msg, index) =>
        msg.role === 'assistant' ? (
          <CardAI key={index} message={msg.content} />
        ) : (
          msg.role === 'user' && <UserCard key={index} message={msg.content} />
        )
      )}

      <footer style={footerStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '80%',
            alignItems: 'center',
          }}
        >
          <FaPlus />
          <Input
            style={{ width: '99%', marginLeft: '1rem' }}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: 'hidden',
            }}
            containerProps={{ className: 'min-w-[100px]' }}
            placeholder="Type your message here"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSend();
                e.preventDefault();
              }
            }}
          />
          <AiFillAudio size={34} style={{ marginLeft: '1rem' }} />
        </div>
      </footer>
    </>
  );
};

export default Converstation;

const CardAI = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem',
      }}
    >
      <img
        src={AiAvatar}
        alt="AI Avatar"
        style={{
          height: '3rem',
          width: '3rem',
          borderRadius: 50,
          alignSelf: 'flex-end',
          objectFit: 'contain',
          marginBottom: '-1rem',
        }}
      />
      <div
        style={{
          backgroundColor: '#F9FAFB',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          width: '70%',
          padding: '1rem',
        }}
      >
        <Typography variant={'h5'}> AI librarian</Typography>
        <Typography>{message}</Typography>
      </div>
    </div>
  );
};
const UserCard = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        margin: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#D2EBFE',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 12,
          width: '70%',
          padding: '1rem',
        }}
      >
        <Typography variant={'h5'}>You</Typography>
        <Typography>{message}</Typography>
      </div>
      <img
        src={Avatar}
        alt="AI Avatar"
        style={{
          height: '3rem',
          width: '3rem',
          borderRadius: 50,
          alignSelf: 'flex-end',
          objectFit: 'contain',
          marginBottom: '-1rem',
          padding: 6,
        }}
      />
    </div>
  );
};
const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  backgroundColor: appColor.blue_title,
  color: 'white',
  height: '10vh',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  display: 'flex',
  justifyContent: 'center',
} as React.CSSProperties;
