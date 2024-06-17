import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from '../utils/tailwind';
import * as TablerIcons from 'tabler-icons-react-native';
import {style} from 'twrnc';

const CustomButton = ({title, iconName, onPress, size, disabled, style}) => {
  const SelectedIcon = TablerIcons[iconName];
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
      <Text style={tw` text-white text-base font-montSB`}>{title}</Text>
      {SelectedIcon && (
        <SelectedIcon size={size} color={'white'} style={tw`ml-1`} />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
