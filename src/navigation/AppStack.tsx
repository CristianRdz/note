import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/common/Header";
import ListaNotas from "../screens/ListaNotas";
import NuevaNota from "../screens/NuevaNota";
import EditarNota from "../screens/EditarNota";
const Stack = createNativeStackNavigator();
export default function AppStack() {
  return (
    <Stack.Navigator>    
      <Stack.Screen
        name="IndexScreenS"
        component={ListaNotas}
        options={Header("Notas")}
      />
      <Stack.Screen
        name="NuevaNotaS"
        component={NuevaNota}
        options={Header("Nueva Nota")}
      />
      <Stack.Screen
        name="EditarNotaS"
        component={EditarNota}
        options={Header("Editar Nota")}
      />
    </Stack.Navigator>
  );
}