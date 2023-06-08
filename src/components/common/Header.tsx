import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "react-native-elements";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
export default function Header(title: string) {
const navigation = useNavigation();
const options : NativeStackNavigationOptions = {
  title: title,
    headerStyle: {
      // Azul typescript
      backgroundColor: "#007ACC",
    },
    // color iconos barra de estado
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
};

  return options;
}
