import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from '../utils/tailwind';
import * as TablerIcons from 'tabler-icons-react-native';

const CustomHeader = ({title, iconName, onPress, size}) => {
  const SelectedIcon = TablerIcons[iconName];
  return (
    <View style={tw` bg-white bg-opacity-0 p-2 mt-3`}>
      {SelectedIcon && (
        <TouchableOpacity onPress={onPress} style={tw`flex-row items-center`}>
          <SelectedIcon size={size} color={'black'} />
          <Text style={tw`text-black text-base font-montSB ml-2`}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
