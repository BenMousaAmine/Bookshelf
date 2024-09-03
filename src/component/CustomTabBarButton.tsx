import { HiChatAlt2 } from 'react-icons/hi';

import './CustomTabBtnStyle.css';
import { useNavigate } from 'react-router-dom';

const CustomTabBarButton = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        width: '95%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <div className="shadow-container_custom_tab_btn">
        <button className="container_custom_tab_btn">
          <div className="gradient_custom_tab_btn">
            <HiChatAlt2
              color={'white'}
              size={28}
              onClick={() => navigate('/chat')}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
export default CustomTabBarButton;
