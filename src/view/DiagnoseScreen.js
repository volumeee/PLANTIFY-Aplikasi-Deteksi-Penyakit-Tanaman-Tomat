import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomHeader from '../components/CustomHeader';
import tw from '../utils/tailwind';
import CustomButton from '../components/CustomButton';
import CustomModalResult from '../components/CustomModalResult';
import {FetchDataTomato} from '../services/apiServices';
import RNFS from 'react-native-fs';
import CustomAlert from '../components/CustomAlert';
import {
  IconClipboardText,
  IconPlant,
  IconPlant2,
  IconPlantOff,
} from 'tabler-icons-react-native';

const DiagnoseScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {selectedItemTitle} = route.params;
  const [isConnectionAlertVisible, setConnectionAlertVisible] = useState(false);
  const [responseData, setResponseData] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [scanImageUri, setScanImageUri] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [responseState, setResponseState] = useState({data: '', image: ''});
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const diagnoselist = [
    {
      id: 1,
      title: 'Daun Tomat',
      url1: require('../assets/tomatoleaf.png'),
      url2: require('../assets/logo.png'),
      api: 'https://detect.roboflow.com/tomatos-wqajc/1',
      apiKey: 't7TkDtel7GH5Ut2SUAh5',
    },
    {
      id: 2,
      title: 'Potato Leaf',
      url1: require('../assets/potatoleaf.png'),
      url2: require('../assets/logo.png'),
      api: '',
      apiKey: '',
    },
    {
      id: 3,
      title: 'Chili Leaf',
      url1: require('../assets/chilileaf.png'),
      url2: require('../assets/logo.png'),
      api: '',
      apiKey: '',
    },
    {
      id: 4,
      title: 'Cabbage Leaf',
      url1: require('../assets/cabbageleaf.png'),
      url2: require('../assets/logo.png'),
      api: '',
      apiKey: '',
    },
    {
      id: 5,
      title: 'Mushroom Leaf',
      url1: require('../assets/mushroomleaf.png'),
      url2: require('../assets/logo.png'),
      api: '',
      apiKey: '',
    },
  ];

  console.log(responseState.data);

  const tomato_diseaselist = [
    {
      id: '1',
      name: 'Leaf Mold',
      class: 'fungi',
      about:
        'Leaf mold pada tanaman tomat adalah penyakit jamur yang disebabkan oleh jamur Fulvia fulva (sebelumnya disebut Cladosporium fulvum). Penyakit ini sering kali menjadi masalah bagi petani tomat karena dapat menyebabkan kerugian besar dalam produksi. Gejala leaf mold meliputi bercak kuning atau hijau kusam pada daun, bercak coklat pada bagian bawah daun, kerut pada daun, dan pengurangan produksi buah pada tanaman tomat yang terinfeksi.',
      characteristic: `
      Bercak Kuning atau Hijau Kusam pada Daun: Daun tanaman tomat yang terinfeksi leaf mold akan memiliki bercak kuning atau hijau kusam. Bercak ini biasanya berkembang menjadi area yang lebih besar seiring dengan perkembangan penyakit.
      Bercak Coklat pada Bagian Bawah Daun: Pada tahap lanjut penyakit, bercak-bercak coklat mungkin muncul di bagian bawah daun tanaman tomat yang terinfeksi.
      Kerut pada Daun: Daun yang terinfeksi leaf mold dapat mengalami kerut dan mungkin terlihat tidak sehat secara keseluruhan.
      Pengurangan Produksi Buah: Penyakit ini dapat menyebabkan penurunan produksi buah pada tanaman tomat yang terinfeksi.
    `,
    },
    {
      id: '2',
      name: 'Healthy',
      class: '-',
      about:
        'Tanaman tomat yang sehat tidak menunjukkan gejala penyakit. Namun, penting untuk melakukan pemantauan teratur dan perawatan yang tepat untuk mencegah infeksi penyakit.',
      characteristic: `
      Tidak ada gejala penyakit yang terlihat pada tanaman tomat yang sehat.
    `,
    },
    {
      id: '3',
      name: 'Late Blight',
      class: 'fungi',
      about:
        'Late blight pada tanaman tomat adalah penyakit jamur yang disebabkan oleh jamur Phytophthora infestans. Ini adalah penyakit yang serius dan dapat menyebabkan kerugian besar dalam produksi tomat. Gejalanya termasuk bercak pada daun dan buah, yang dapat berkembang menjadi lesi berair berwarna coklat pada bagian bawah daun dan hancur pada buah.',
      characteristic: `
      Bercak pada Daun dan Buah: Daun dan buah tanaman tomat yang terinfeksi late blight akan memiliki bercak yang berkembang menjadi lesi berair berwarna coklat pada bagian bawah daun dan hancur pada buah.
    `,
    },
    {
      id: '4',
      name: 'Septoria',
      class: 'fungi',
      about:
        'Septoria leaf spot pada tanaman tomat adalah penyakit jamur yang disebabkan oleh jamur Septoria spp. Gejalanya meliputi bercak berwarna coklat tua dengan tepi kuning pada daun, yang kemudian berkembang menjadi lesi kecil dengan pusat putih atau abu-abu.',
      characteristic: `
      Bercak Berwarna Coklat pada Daun: Daun tanaman tomat yang terinfeksi septoria leaf spot akan memiliki bercak berwarna coklat tua dengan tepi kuning.
      Lesi Kecil dengan Pusat Putih atau Abu-abu: Bercak tersebut kemudian berkembang menjadi lesi kecil dengan pusat putih atau abu-abu.
    `,
    },
    {
      id: '5',
      name: 'Early Blight',
      class: 'fungi',
      about:
        'Early blight pada tanaman tomat adalah penyakit jamur yang disebabkan oleh jamur Alternaria solani. Gejalanya termasuk bercak coklat pada daun bagian bawah yang berkembang menjadi lesi berwarna coklat pada daun yang lebih tua.',
      characteristic: `
      Bercak Coklat pada Daun Bagian Bawah: Gejala awal penyakit ini adalah bercak coklat pada daun bagian bawah tanaman tomat.
      Lesi Berwarna Coklat pada Daun yang Lebih Tua: Bercak tersebut dapat berkembang menjadi lesi berwarna coklat pada daun yang lebih tua.
    `,
    },
    {
      id: '6',
      name: 'Mosaic Virus',
      class: 'virus',
      about:
        'Mosaic virus pada tanaman tomat disebabkan oleh virus dan bukan oleh jamur. Gejalanya meliputi daun berwarna kekuningan, berbintik-bintik, atau memiliki pola mozaik pada daun tanaman tomat.',
      characteristic: `
      Daun Berwarna Kuning atau Berbintik-bintik: Daun tanaman tomat yang terinfeksi mosaic virus dapat memiliki warna kuning atau berbintik-bintik.
      Pola Mozaik pada Daun: Beberapa daun dapat menunjukkan pola mozaik, dengan area hijau dan kuning secara bergantian.
    `,
    },
    {
      id: '7',
      name: 'Yellow Leaf Curl Virus',
      class: 'virus',
      about:
        'Yellow leaf curl virus pada tanaman tomat disebabkan oleh virus dan bukan oleh jamur. Gejalanya termasuk daun yang menguning, mengkerut, dan mungkin mengalami pembengkokan ke atas.',
      characteristic: `
      Daun Menguning dan Mengkerut: Daun tanaman tomat yang terinfeksi yellow leaf curl virus dapat menguning, mengkerut, dan mungkin mengalami pembengkokan ke atas.
    `,
    },
    {
      id: '8',
      name: 'Leaf Miner',
      class: 'insect',
      about:
        'Leaf miner adalah hama tanaman yang dapat merusak tanaman tomat dengan cara menggali jalur pada jaringan daun untuk memakan jaringan dalamnya. Ini dapat menyebabkan kerusakan pada daun dan mengurangi hasil panen.',
      characteristic: `
      Jalur Galian pada Daun: Gejala utama serangan leaf miner adalah adanya jalur galian pada daun yang disebabkan oleh larva hama tersebut.
      Daun yang Keriting atau Mengering: Tanaman tomat yang terinfeksi leaf miner dapat menunjukkan daun yang keriting atau mengering akibat kerusakan pada jaringan daun.
    `,
    },
    {
      id: '9',
      name: 'Spider Mites',
      class: 'insect',
      about:
        'Spider mites adalah hama tanaman kecil yang hidup di bagian bawah daun dan menyedot cairan tumbuhan, menyebabkan daun menguning, mengering, dan mungkin terjatuh. Infeksi berat dapat mengurangi produksi buah.',
      characteristic: `
      Daun Menguning dan Mengering: Daun tanaman tomat yang terinfeksi spider mites dapat menguning, mengering, dan mungkin terjatuh.
      Kehadiran Sarang Halus: Anda mungkin melihat sarang halus di bagian bawah daun, terutama jika infeksi sudah parah.
    `,
    },
  ];

  // Fungsi untuk memisahkan kata-kata dalam responseData
  const splitResponseData = responseData => {
    const words = responseData.split(' ');
    const filteredWords = words.filter(word => !/\d/.test(word));
    return filteredWords.join(' ');
  };

  const handleIconBack = () => {
    navigation.goBack();
  };

  /*disable button if api not found*/
  useEffect(() => {
    // Definisikan fungsi isApiEmpty di dalam useEffect
    const isApiEmpty = () => {
      const selectedItem = diagnoselist.find(
        item => item.title === selectedItemTitle,
      );
      return !selectedItem || !selectedItem.api || !selectedItem.apiKey;
    };

    // Set isButtonDisabled menggunakan isApiEmpty saat komponen dimuat
    setIsButtonDisabled(isApiEmpty());
  }, [selectedItemTitle]);
  console.log(selectedItemTitle);

  /*handle image uri from api key*/
  useEffect(() => {
    if (responseData && imageUri) {
      setResponseState({data: responseData, image: imageUri});
    }
  }, [responseData, imageUri]);

  /* handle error connection alert */
  const handleErrorConnection = errorConnection => {
    if (errorConnection) {
      setConnectionAlertVisible(true);
    }
  };

  /* function can cleanup data after fetchdata from api */
  const cleanUpImage = async imageUri => {
    try {
      console.log('cleanUpImage ' + imageUri);
      await RNFS.unlink(imageUri);
      console.log('clean up successful');
    } catch (error) {
      console.log('error cleaning up image ' + error.message);
    }
  };

  const handleCloseModal = () => {
    closeModal();
    if (scanImageUri) {
      cleanUpImage(scanImageUri);
      console.log('Clean up image' + scanImageUri);
      setScanImageUri('');
    }
  };

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalVisible(true);
    console.log('open modal');
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalVisible(false);
    console.log('close modal');
  };

  // Fungsi untuk memilih API dan kunci API berdasarkan judul yang dipilih
  const selectApiAndApiKey = selectedTitle => {
    const selectedDiagnose = diagnoselist.find(
      item => item.title === selectedTitle,
    );
    return {
      apiUrl: selectedDiagnose?.api || '',
      apiKey: selectedDiagnose?.apiKey || '',
    };
  };

  // Fungsi untuk menangani pemilihan gambar dari kamera
  const handleCamera = async () => {
    setIsLoading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission camera ok');
      } else {
        console.log('permission camera tidak diijinkan');
      }
    } catch (err) {
      console.log(err);
    }

    const {apiUrl, apiKey} = selectApiAndApiKey(selectedItemTitle);

    const option = {
      mediaType: 'photo',
      quality: 0.1,
      maxwidth: 1000,
      maxheight: 1000,
    };
    launchCamera(option, async res => {
      if (!res.didCancel && !res.errorCode) {
        const uri = res.assets[0]?.uri;
        setImageUri(uri);
        console.log('image uri = ' + uri);

        try {
          const responseData = await FetchDataTomato(
            apiUrl,
            apiKey,
            uri,
            handleErrorConnection,
          );
          console.log(
            'response data from api: ' + JSON.stringify(responseData),
          );
          const responseDataString = JSON.stringify(responseData).replace(
            /"/g,
            '',
          );
          setResponseData(responseDataString);
          setScanImageUri(uri);
        } catch (error) {
          console.error('error fetching data', error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // Fungsi untuk menangani pemilihan gambar dari galeri
  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission gallery ok');
      } else {
        console.log('permission gallery tidak diijinkan');
      }
    } catch (err) {
      console.log(err);
    }

    const {apiUrl, apiKey} = selectApiAndApiKey(selectedItemTitle);

    const option = {
      mediaType: 'image/jpeg',
      quality: 0.1,
      maxwidth: 1000,
      maxheight: 1000,
    };
    launchImageLibrary(option, async res => {
      if (!res.didCancel && !res.errorCode) {
        const uri = res.assets[0]?.uri;
        setImageUri(uri);
        console.log('image uri = ' + uri);

        try {
          const responseData = await FetchDataTomato(
            apiUrl,
            apiKey,
            uri,
            handleErrorConnection,
          );
          console.log(
            'response data from api: ' + JSON.stringify(responseData),
          );
          const responseDataString = JSON.stringify(responseData).replace(
            /"/g,
            '',
          );
          setResponseData(responseDataString);
          setScanImageUri(uri);
        } catch (error) {
          console.error('error fetching data', error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };
  // console.log(responseData);

  // console.log(selectedItemTitle);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={tw` bg-slate-50`}>
      <CustomHeader
        title="Back"
        iconName="IconChevronLeft"
        size="20"
        onPress={handleIconBack}
      />
      <View style={tw`mt-0 items-center`}>
        {diagnoselist.map(
          item =>
            selectedItemTitle === item.title && (
              <View
                key={item.id}
                style={tw`flex-1 flex-col justify-center items-center`}>
                <Image
                  source={item.url1}
                  style={tw`rounded-5 mt-5 h-50 w-90 justify-center items-center`}
                />
                <Image
                  source={item.url2}
                  style={tw`mt-3 h-13 w-26 justify-center items-center`}
                />
              </View>
            ),
        )}
        {/* Diagnose */}
        <View
          style={tw`flex-col items-center bg-white rounded-5 mt-3 p-5 h-100 w-80 shadow-xl shadow-slate-300`}>
          <Image
            source={require('../../src/assets/disease.png')}
            style={tw`rounded-3 h-35 w-70 justify-center items-center`}
          />
          <Text style={tw` font-montR text-slate-500 text-3.2 mt-2`}>
            menjaga kesehatan tanaman anda
          </Text>
          <TextInput
            style={tw`mt-3 h-10 w-65 border border-slate-300 rounded-5 text-center font-montSB text-black text-4`}
            editable={false}
            multiline={true}
            numberOfLines={2}
            value={isLoading ? 'Loading...' : responseData}
          />
          <TouchableOpacity onPress={openModal}>
            <Text style={tw`text-3.5 font-montSB mt-2 text-pgreen underline`}>
              get details
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row gap-4`}>
            <CustomButton
              title="Snap"
              iconName="IconCamera"
              onPress={handleCamera}
              disabled={isButtonDisabled}
              style={[
                tw`flex-row items-center justify-center h-12 w-31 rounded-4 mt-5`,
                isButtonDisabled ? tw`bg-gray-400` : tw`bg-pgreen`,
              ]}
            />
            <CustomButton
              title="Import"
              iconName="IconFileUpload"
              onPress={handleUpload}
              disabled={isButtonDisabled}
              style={[
                tw`flex-row items-center justify-center h-12 w-31 rounded-4 mt-5`,
                isButtonDisabled ? tw`bg-gray-400` : tw`bg-pgreen`,
              ]}
            />
          </View>
          <View style={tw`flex-row`}>
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-center text-slate-500 text-3 font-montR mx-5`}>
                ambil foto dari{' '}
                <Text style={tw`text-3 font-montSB text-black`}>kamera</Text>
              </Text>
            </View>
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-center text-slate-500 text-3 font-montR mx-5`}>
                ambil foto dari{' '}
                <Text style={tw`text-3 font-montSB text-black`}>gallery</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Tampilkan CustomModalResult untuk tampilkan isi detail result */}
      <CustomModalResult
        modalVisible={isModalVisible}
        modalTitle={splitResponseData(responseState.data) || 'no disease found'}
        modalSubtitle={selectedItemTitle}
        modalType="large"
        modalContent={
          <View style={tw`mx-5 flex-col`}>
            <View style={tw`items-center`}>
              {responseState.image ? (
                <Image
                  source={{uri: responseState.image}}
                  style={tw`rounded-5 h-87 w-87`}
                />
              ) : (
                <Image
                  source={require('../assets/imagepreview.png')}
                  style={tw`rounded-5 h-87 w-87`}
                />
              )}
            </View>
            <View style={tw`flex-col mt-4`}>
              <View style={tw`flex-row items-end`}>
                <IconPlant size={25} color="black" />
                <Text style={tw` font-montSB text-black text-5 ml-1`}>
                  ringkasan
                </Text>
              </View>
              <View style={tw`flex-row justify-start items-center mt-3`}>
                <Text
                  style={tw`  font-montR text-slate-600 text-4 ml-7.5 mr-2`}>
                  kelas :
                </Text>
                <View style={tw` px-2 py-1  bg-pgreen rounded-5 `}>
                  <Text style={tw` text-white font-montSB text-3.5`}>
                    {tomato_diseaselist.find(
                      item =>
                        item.name === splitResponseData(responseState.data),
                    )?.class || 'no class found'}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row items-end mt-3`}>
                <IconPlant2 size={25} color="black" />
                <Text style={tw` font-montSB text-black text-5 ml-1`}>
                  tentang penyakit
                </Text>
              </View>
              <Text
                style={tw` font-montR text-black text-3.5 ml-7.5 mr-4 mt-3`}>
                {tomato_diseaselist.find(
                  item => item.name === splitResponseData(responseState.data),
                )?.about || 'no about found'}
              </Text>
              <View style={tw`flex-row items-end mt-3`}>
                <IconClipboardText size={25} color="black" />
                <Text style={tw` font-montSB text-black text-5 ml-1`}>
                  karakteristik
                </Text>
              </View>
              <Text style={tw`font-montR text-black text-3.5 ml-7.5 mr-4 mt-3`}>
                {tomato_diseaselist
                  .find(
                    item => item.name === splitResponseData(responseState.data),
                  )
                  ?.characteristic.split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => {
                    if (index === 0) {
                      return `${line}\n`;
                    } else {
                      return `${line}\n`;
                    }
                  })
                  .join('\n') || 'no characteristic found'}
              </Text>
            </View>
          </View>
        }
        onCloseModal={handleCloseModal} // Panggil handleCloseModal saat modal ditutup
      />
      {/* Tampilkan CustomAlert untuk alert network error */}
      <CustomAlert
        visible={isConnectionAlertVisible}
        onClose={() => {
          setConnectionAlertVisible(false);
        }}
        title="Network Error👾"
        message={`Check your connection and try again`}
        onPressOk={() => {
          setConnectionAlertVisible(false);
          console.log('Check your internet and try again');
        }}
        onTouchOutside={() => {
          setConnectionAlertVisible(false);
        }}
      />
    </ScrollView>
  );
};

export default DiagnoseScreen;
