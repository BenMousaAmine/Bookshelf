import { useSession } from '../hooks/SessionContext.tsx';
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import { ArchiveCardProps, Conversation } from '../interface/chat.ts';
import _ from 'lodash';
import axios from 'axios';
import { BaseURL } from '../costants/environment.ts';
import interFont from '../costants/interFont.ts';
import { FaRegTrashCan } from 'react-icons/fa6';
import DialogModal from '../component/dialogModal.tsx';

const Archive = () => {
  const {
    setSelected,
    setMessages,
    messages,
    setChatState,
    updateConversation,
    setConversation,
    getConversationHistory,
    conversationHistory,
    setConversationHistory,
  } = useSession();

  const [loading, setLoading] = useState(false);

  /*  useEffect(
    useCallback(() => {
      getConversationHistory();
    }, [])
  );*/
  useEffect(() => {
    getConversationHistory();
  }, []);

  const handlePress = (item: Conversation) => {
    getConversationHistory;
    setLoading(true);
    try {
      setChatState('Archive');
      if (messages.length > 1 && !_.isEqual(messages, item.data)) {
        updateConversation(item);
      }
      setConversation(item);
      setMessages(item.data);
      setSelected('Chat');
    } catch (error) {
      console.error('Error setting conversation:', error);
    } finally {
      setLoading(false);
    }
  };
  const removeConversationFromState = (id: string) => {
    setConversationHistory((prevConversations: Conversation[]) =>
      prevConversations.filter(conversation => conversation.id !== id)
    );
  };

  return (
    <>
      {conversationHistory.length === 0 && (
        <p style={{ margin: '2%' }}>No archived conversations</p>
      )}
      {conversationHistory.map((item, index) => (
        <div
          key={item.id || index}
          /*
          onClick={() => handlePress(item)}
*/
          style={{ width: '40rem' }}
        >
          <ArchiveCard
            conversation={item}
            onConversationDeleted={removeConversationFromState}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      ))}
    </>
  );
};

export default Archive;

const ArchiveCard: React.FC<ArchiveCardProps> = ({
  conversation,
  onConversationDeleted,
  setLoading,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const deleteConversation = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`${BaseURL}/savedchats/${id}`, {
        withCredentials: true,
      });
      onConversationDeleted(id);
      setLoading(false);
    } catch (error) {
      console.error('Error deleting conversation:', error);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  return (
    <>
      {isDialogOpen && (
        <DialogModal
          size={'xs'}
          title={'Delete conversation'}
          onConfirm={() => deleteConversation(conversation.id)}
          onClose={() => setDialogOpen(false)}
          text={'Are you sure you want to delete this conversation?'}
          open={isDialogOpen}
        />
      )}
      <div style={styles.shadow}>
        <div style={styles.cardContainer}>
          <span style={styles.cardText}>{conversation.title}</span>
          <button
            style={{
              ...styles.trashButton,
              ...(isHovered ? styles.btnHovered : {}),
              ...(isPressed ? styles.btnHovered : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onClick={() => setDialogOpen(true)}
          >
            <FaRegTrashCan style={styles.icon} size={24} />
          </button>
        </div>
      </div>
    </>
  );
};
// onClick={() => deleteConversation(conversation.id)}
const styles: Record<string, CSSProperties> = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  shadow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    margin: '10px',
    borderWidth: '1px',
    backgroundColor: 'white',
    borderColor: '#edf3f6',
    borderRadius: '10px',
    boxShadow: '0 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  cardText: {
    maxWidth: '90%',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  trashButton: {
    borderRadius: '50%',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  btnHovered: {
    backgroundColor: 'rgba(205, 205, 205, 0.73)',
  },
  icon: {
    padding: '3px',
    margin: '2px',

    color: '#545454',
  },
};
