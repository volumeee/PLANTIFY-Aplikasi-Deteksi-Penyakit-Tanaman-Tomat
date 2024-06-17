import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import tw from '../utils/tailwind';
import {useNavigation} from '@react-navigation/native';
import {IconPlus, IconAlertCircle} from 'tabler-icons-react-native';
import CustomAlert from '../components/CustomAlert';
import CustomHeader from '../components/CustomHeader';

const plantlist = [
  {
    id: 1,
    nav: 'Diagnose',
    title: 'Daun Tomat',
    subtitle: 'identifikasi',
    url: require('../assets/tomato.png'),
  },
  // {
  //   id: 2,
  //   nav: 'Diagnose',
  //   title: 'Potato Leaf',
  //   subtitle: 'identifier',
  //   url: require('../assets/potato.png'),
  // },
  // {
  //   id: 3,
  //   nav: 'Diagnose',
  //   title: 'Chili Leaf',
  //   subtitle: 'identifier',
  //   url: require('../assets/chili.png'),
  // },
  // {
  //   id: 4,
  //   nav: 'Diagnose',
  //   title: 'Cabbage Leaf',
  //   subtitle: 'identifier',
  //   url: require('../assets/cabbage.png'),
  // },
  // {
  //   id: 5,
  //   nav: 'Diagnose',
  //   title: 'Mushroom Leaf',
  //   subtitle: 'identifier',
  //   url: require('../assets/mushroom.png'),
  // },
];

const PlantScreen = () => {
  const navigation = useNavigation();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [selectedItemTitle, setSelectedItemTitle] = useState('');
  const [selectedNav, setSelectedNav] = useState('');
  const [isMaintenanceAlertVisible, setMaintenanceAlertVisible] =
    useState(false);

  const showAlert = (title, nav) => {
    setSelectedItemTitle(title);
    setSelectedNav(nav);
    setAlertVisible(true);
  };

  const showAlertMaintenance = () => {
    setMaintenanceAlertVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={tw`bg-slate-50`}>
      <View style={tw`flex-row p-2`}>
        <CustomHeader
          title="Bagus Erwanto"
          iconName="IconUserCircle"
          size="30"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={tw`flex-col items-center justify-center mt-3`}>
        <Text style={tw`text-black text-5 flex font-montSB`}>
          Diagnosis Penyakit Tanaman
        </Text>
        <Text style={tw`text-black text-lg flex font-montR`}>dari foto</Text>
        <Image
          source={require('../../src/assets/plant.png')}
          style={tw`rounded-5 mt-5 h-50 w-90 justify-center items-center`}
        />
        <Text style={tw` mt-5 font-montSB text-pgreen text-5`}>
          pilih tanaman
        </Text>
      </View>
      {/* plantlist */}
      <View
        style={tw`flex-1 flex-row flex-wrap mt-5 justify-center items-center`}>
        {plantlist.map(item => (
          <TouchableOpacity
            key={item.id}
            style={tw` bg-white rounded-5 m-3 h-55 w-40 shadow-xl shadow-slate-300`}
            onPress={() => {
              showAlert(item.title, item.nav);
            }}>
            <View>
              {item.url ? (
                <Image
                  style={[tw`h-36 w-36 mt-2`, {alignSelf: 'center'}]}
                  source={item.url}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <View style={tw` ml-3`}>
                <Text
                  key={item.id}
                  style={tw` font-montSB text-black text-base`}>
                  {item.title}
                  {''}
                </Text>
                <Text style={tw` text-slate-500 font-montR`}>
                  {item.subtitle}
                  {''}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={tw`bg-white rounded-full m-8 h-30 w-30 shadow-xl shadow-slate-300 justify-center items-center`}
          onPress={() => {
            showAlertMaintenance();
          }}>
          <View
            style={tw` font-montSB absolute -top-2 -right-2 flex-row justify-center items-center bg-red-600 rounded-5 p-0.5`}>
            <Text style={tw` m-0.5 text-white font-montSB text-3.5`}>Dev</Text>
            <IconAlertCircle size={18} color={'white'} />
          </View>
          <IconPlus size={50} color={'#000'} />
        </TouchableOpacity>
      </View>
      <View style={{height: 40}} />
      {/* Tampilkan CustomAlert untuk alert utama */}
      <CustomAlert
        visible={isAlertVisible}
        onClose={() => {
          setAlertVisible(false);
        }}
        title="Tanaman Dipilih🌱"
        message={`Diagnosis Penyakit ${selectedItemTitle}`}
        onPressOk={() => {
          setAlertVisible(false);
          navigation.navigate(selectedNav, {
            selectedItemTitle: selectedItemTitle,
          });
        }}
        onTouchOutside={() => {
          setAlertVisible(false);
          setSelectedItemTitle('');
        }}
      />
      {/* Tampilkan CustomAlert untuk alert maintenance */}
      <CustomAlert
        visible={isMaintenanceAlertVisible}
        onClose={() => {
          setMaintenanceAlertVisible(false);
        }}
        title="Warning⚠️"
        message={`Fitur Dalam Proses Maintenance`}
        onPressOk={() => {
          setMaintenanceAlertVisible(false);
          console.log('Fitur Dalam Proses Maintenance');
        }}
        onTouchOutside={() => {
          setMaintenanceAlertVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default PlantScreen;
