import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons';

const CustomHeaderButton: React.FC<HeaderButtonProps> = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />;
};

export default CustomHeaderButton;
