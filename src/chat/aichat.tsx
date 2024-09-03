import { Typography } from '@material-tailwind/react';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { useSession } from '../hooks/SessionContext.tsx';
import Archive from './archive.tsx';
import Converstation from './converstation.tsx';
import _ from 'lodash';
import DialogModal from '../component/dialogModal.tsx';

const Aichat = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);

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
    setChatState,
  } = useSession();
  const createSession = () => {
    if (chatState === 'New') {
      messages.length > 1 && saveConversation();
    } else if (
      chatState === 'Archive' &&
      !_.isEqual(messages, conversation.data) &&
      messages.length > 1
    ) {
      updateConversation(conversation);
    }
    clearMessages();
    setChatState('New');
  };
  const handleBack = () => {
    createSession();
    navigate(-1);
  };

  const handleNewSessionClick = () => {
    if (messages.length === 1) {
      return;
    } else {
      setDialogOpen(true);
    }
  };
  console.log(messages.length);

  const handleNewSession = () => {
    createSession();
    setSelected('Chat');
    setDialogOpen(false);
  };
  return (
    <>
      <div>
        {isDialogOpen && (
          <DialogModal
            size={'xs'}
            title={'New conversation'}
            onConfirm={() => handleNewSession()}
            onClose={() => setDialogOpen(false)}
            text={'Are you sure you want to start a new conversation?'}
            open={isDialogOpen}
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem 2rem 1rem 2rem',
          }}
        >
          <div style={{ display: 'flex' }}>
            <MdOutlineArrowBackIos
              className={'pt-2'}
              style={{ display: 'flex', alignSelf: 'flex-start' }}
              size={36}
              onClick={() => handleBack()}
            />
            <Typography variant="h3" style={{ color: 'black' }}>
              AI Librarian
            </Typography>
          </div>
          <FaPlusCircle
            size={34}
            color={'green'}
            onClick={() => handleNewSessionClick()}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            style={{
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              width: '50%',
              borderBottom:
                selected === 'Chat' ? '5px solid black' : '1px solid black',
            }}
            onClick={() => setSelected('Chat')}
          >
            Chat
          </Typography>
          <Typography
            variant="h4"
            style={{
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              width: '50%',
              borderBottom:
                selected === 'Archive' ? '5px solid black' : '1px solid black',
            }}
            onClick={() => setSelected('Archive')}
          >
            Archive
          </Typography>
        </div>
      </div>
      <div
        style={{
          height: 'calc(100vh - 160px)',
          overflowY: 'auto',
          paddingBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {selected === 'Chat' ? <Converstation /> : <Archive />}
      </div>
    </>
  );
};

export default Aichat;
