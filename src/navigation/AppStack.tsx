import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from '../screens/IndexScreen';
import Header from "../components/common/Header";
import NotaNueva from "../screens/NotaNueva";
import NotaEditar from "../screens/NotaEditar";
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator>    
      <Stack.Screen
        name="IndexScreenS"
        component={IndexScreen}
        options={Header("Notas")}
      />
      <Stack.Screen
        name="NuevaNotaS"
        component={NotaNueva}
        options={Header("Nueva Nota")}
      />
      <Stack.Screen
        name="EditarNotaS"
        component={NotaEditar}
        options={Header("Editar Nota")}
      />
    </Stack.Navigator>
  );
}