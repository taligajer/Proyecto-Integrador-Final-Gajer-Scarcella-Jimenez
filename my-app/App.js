import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigaton from './src/navigation/MainNavigation';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import InfoAdicionalUser from './src/screens/infoAdicionalUser';

export default function App() {
  return (
    <MainNavigaton/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
