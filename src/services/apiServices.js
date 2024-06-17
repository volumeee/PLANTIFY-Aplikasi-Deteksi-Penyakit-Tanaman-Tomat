import axios from 'axios';
import RNFS from 'react-native-fs';

const FetchDataTomato = async (apiUrl, apiKey, imageUri, errorCallback) => {
  try {
    console.log('start scanning image...');
    if (imageUri) {
      const image = await RNFS.readFile(imageUri, 'base64');
      const response = await axios.post(apiUrl, image, {
        params: {
          api_key: apiKey,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Response data from server:', JSON.stringify(response.data));
      if (response.data.predictions.length > 0) {
        const Class = response.data.predictions[0].class;
        const Confidence = response.data.predictions[0].confidence.toFixed(2);

        const topClass = `${Class} ${Confidence}`;
        console.log('Top class:', topClass);

        return topClass;
      } else {
        console.log('No prediction, returning "tidak terdeteksi"');
        return 'tidak terdeteksi';
      }
    }
  } catch (error) {
    errorCallback(error);
  }
};

export {FetchDataTomato};
