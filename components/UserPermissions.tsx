import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

class UserPermissions {
  getCameraPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Need permissions to use photos', '', [{ text: 'Okay' }]);
    }
  };
  getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Need permissions to use location', '', [{ text: 'Okay' }]);
    }
  };
}

export default new UserPermissions();
