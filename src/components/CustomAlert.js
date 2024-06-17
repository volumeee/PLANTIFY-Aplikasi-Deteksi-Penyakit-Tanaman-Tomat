import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import tw from '../utils/tailwind';

const CustomAlert = ({
  visible,
  onClose,
  title,
  message,
  onPressOk,
  onTouchOutside,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onTouchOutside} // Menutup modal saat area di luar modal di-klik
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white rounded-3 p-5 w-80`}>
          <Text style={tw`text-black font-montSB text-lg mb-2 text-center`}>
            {title}
          </Text>
          <Text style={tw`text-gray-500 font-montR text-sm mb-5 text-center`}>
            {message}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onPressOk();
              onClose();
            }}>
            <Text style={tw`text-blue-500 font-montSB text-lg text-center`}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
export default CustomAlert;
