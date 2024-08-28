import { HiChatAlt2 } from "react-icons/hi";

import './CustomTabBtnStyle.css'







const CustomTabBarButton = () => {

    return (
        <div
            style={{
                position: 'absolute',
                bottom: '5rem',
                width: '97%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}
        >
            <div className="shadow-container_custom_tab_btn">
                <button className="container_custom_tab_btn">
                    <div className="gradient_custom_tab_btn">
                        <HiChatAlt2 color={'white'} size={28}/>
                    </div>
                </button>
            </div>
        </div>

            )

            }
            export default CustomTabBarButton;

            /*<HiChatAlt2/>*/
