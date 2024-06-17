import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import tw from '../utils/tailwind';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../components/CustomHeader';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <CustomHeader
        title="Back"
        iconName="IconChevronLeft"
        size="20"
        onPress={() => navigation.goBack()}
      />

      <View style={tw`p-4`}>
        <Text style={tw`text-black font-montBold text-3xl`}>
          Profil & Tentang Aplikasi
        </Text>
      </View>
      <View style={tw`p-4 flex-col gap-1`}>
        <Text style={tw`text-black font-montSB text-xl`}>
          Bagus Erwanto /{' '}
          <Text style={tw`text-black font-montR text-4`}>NIM 200103034</Text>
        </Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          Mahasiswa Universitas Duta Bangsa Prodi Teknik Informatika Fakultas
          Ilmu Komputer
        </Text>
      </View>
      <View style={tw`p-4`}>
        <Text style={tw`text-black font-montSB text-xl`}>Tentang</Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          Pembuatan aplikasi ini menerapkan metode YOLO dengan implementasi
          algoritma machine learning dan menggunakan dataset yang diambil dari
          Roboflow Universe dilatih menjadi model roboflow menggunakan google
          colab dengan metode YOLO versi 8, kemudian dibangun menjadi aplikasi
          android menggunakan bahasa pemrograman javascript dengan framework
          react native. Tujuan aplikasi ini dapat mendeteksi penyakit tanaman
          tomat
        </Text>
      </View>
      <View style={tw`p-4`}>
        <Text style={tw`text-black font-montSB text-xl`}>Bantuan</Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          1. Buka Aplikasi Plantify
        </Text>
        <Text style={tw`text-black font-montR text-3.5`}>2. Pilih tanaman</Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          3. Identifikasi menggunakan kamera: penggunaannya dengan cara menekan
          tombol SNAP mengambil gambar secara langsung pada obyek yang akan
          diidentifikasi
        </Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          4. Identifikasi menggunakan galeri: penggunaannya dengan cara menekan
          tombol IMPORT lalu pilih foto yang ingin diidentifikasi
        </Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          5. Hasil identifikasi akan muncul pada TEXTINPUT
        </Text>
        <Text style={tw`text-black font-montR text-3.5`}>
          6. Untuk melihat detail foto dan tentang penyakit tanaman dapat klik
          GET DETAILS
        </Text>
      </View>
      <View style={tw`p-4`}>
        <Text style={tw`text-black font-montSB text-xl`}>Versi</Text>
        <Text style={tw`text-black font-montR text-3.5`}>versi : 0.0.1</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
