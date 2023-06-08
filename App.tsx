import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogBox} from 'react-native';
import AppStack from './src/navigation/AppStack';
import Toast from "react-native-toast-message";
LogBox.ignoreAllLogs();
export default function App() {
  return (
    <>
      <StatusBar backgroundColor={"#007ACC"} style="light" />
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
      <Toast />
    </>
  );
}