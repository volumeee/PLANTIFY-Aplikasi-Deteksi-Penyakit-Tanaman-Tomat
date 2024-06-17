import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  BackHandler,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {IconX} from 'tabler-icons-react-native';
import tw from '../utils/tailwind';

const CustomModalResult = ({
  modalVisible = true,
  modalTitle,
  modalSubtitle,
  modalType,
  modalContent,
  onCloseModal,
}) => {
  const handleBackButton = () => {
    onCloseModal();
    return true;
  };

  return (
    <Modal
      isVisible={modalVisible}
      animationInTiming={1000}
      animationIn={'slideInUp'}
      animationOutTiming={700}
      onBackButtonPress={handleBackButton}
      onBackdropPress={onCloseModal}
      style={{justifyContent: 'flex-end', margin: 0}}>
      <View
        style={{
          flex: modalType === 'large' ? 1 : 0,
          backgroundColor: 'white',
          padding: modalType === 'large' ? 0 : 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderColor: 'rgba(0, 0, 0, 0.1)',
        }}>
        <View style={{paddingBottom: modalType === 'large' ? 115 : 0}}>
          <View
            style={{
              paddingHorizontal: modalType === 'large' ? 22 : 0,
              paddingTop: modalType === 'large' ? 22 : 0,
            }}>
            <TouchableOpacity
              onPress={onCloseModal}
              style={{
                backgroundColor: '#DDDDDD',
                height: 33,
                width: 33,
                borderRadius: 33,
                alignSelf: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconX size={20} color="black" />
            </TouchableOpacity>
            <Text
              style={[
                tw`font-montBold`,
                {fontSize: 30, color: 'black', marginBottom: 2},
              ]}>
              {modalTitle}
            </Text>
            <Text style={[tw` font-montBold text-black pb-3`]}>
              {modalSubtitle}
            </Text>
          </View>

          <ScrollView>{modalContent}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModalResult;
