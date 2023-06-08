import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from '../screens/IndexScreen';
import Header from "../components/common/Header";
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator>    
      <Stack.Screen
        name="IndexScreen"
        component={IndexScreen}
        options={Header("Notas")}
      />
    </Stack.Navigator>
  );
}