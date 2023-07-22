import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, Image } from "react-native-elements";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
export default function Header(title: string) {
  const { colors } = useTheme();
const navigation = useNavigation();
const options : NativeStackNavigationOptions = {
  title: title,
    headerStyle: {
      // Azul typescript
      backgroundColor: colors.primary,
    },
    // color iconos barra de estado
    headerTintColor: colors.background,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
};

  return options;
}
