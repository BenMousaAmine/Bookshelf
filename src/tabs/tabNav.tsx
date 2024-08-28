import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { IoMdHome } from 'react-icons/io';

import { useNavigate } from 'react-router-dom';
import { appColor } from '../costants/colors.ts';
import { IoLibrary } from 'react-icons/io5';
import { AiFillAppstore } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';

const TabNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('home');

  const handleChange = (
    _event: React.ChangeEvent<object>,
    newValue: string
  ): void => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => handleChange(event, newValue)}
      style={footerStyle}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<IoMdHome size={24} />}
        style={{ color: value === 'home' ? appColor.tab_on : appColor.tab_off }}
      />
      <BottomNavigationAction
        label="Library"
        value="library"
        icon={<IoLibrary size={24} />}
        style={{
          color: value === 'library' ? appColor.tab_on : appColor.tab_off,
        }}
      />
      <BottomNavigationAction
        label="Category"
        value="category"
        icon={<AiFillAppstore size={24} />}
        style={{
          color: value === 'category' ? appColor.tab_on : appColor.tab_off,
        }}
      />
      <BottomNavigationAction
        label="Menu"
        value="account"
        icon={<GiHamburgerMenu size={24} />}
        style={{
          color: value === 'account' ? appColor.tab_on : appColor.tab_off,
        }}
      />
    </BottomNavigation>
  );
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100vw',
  backgroundColor: appColor.blue_title,
  color: 'white',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
} as React.CSSProperties;

export default TabNav;
