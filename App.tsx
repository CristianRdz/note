import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, View } from 'react-native';
import AppStack from './src/navigation/AppStack';
import Toast from 'react-native-toast-message';
import React from 'react';
import { Provider as PaperProvider, Text, useTheme } from 'react-native-paper';
import { Card } from 'react-native-paper';
LogBox.ignoreAllLogs();

export default function App() {

  const toastConfig = {
    success: (props : any) => (
      <Card style={{...styles.toastBase, backgroundColor: useTheme().colors.background, borderColor: useTheme().colors.primary}}>
        <Text style={{ fontSize: 15, fontWeight: '400' }}>{props.text1}</Text>
        <Text style={{ fontSize: 13 }}>{props.text2}</Text>
      </Card>
    ),
    error: (props: any) => (
      <Card style={{...styles.toastBase, backgroundColor: useTheme().colors.background, borderColor: useTheme().colors.errorContainer}}>
        <Text style={{ fontSize: 15 , fontWeight: '400' }}>{props.text1}</Text>
        <Text style={{ fontSize: 13 }}>{props.text2}</Text>
      </Card>
    ),
  };

  return (
    <PaperProvider>
      <NavigationContainer theme={useTheme().dark ? DarkTheme : DefaultTheme}>
        <AppStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  toastBase: {
    height: 60, width: '95%', justifyContent: 'center', alignItems: 'center', 
    borderWidth: 2, borderRadius: 10, marginVertical: 5, padding: 5
  }
})
