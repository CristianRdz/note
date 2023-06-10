import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { obtenerNotas } from "../services/NotasService";
import { Nota } from "../../models/Nota";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Colors } from "../../utils/Colors";

export default function ListaNotas() {
  const navigation = useNavigation();

  const [notas, setNotas]: [Nota[], any] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function cargarNotas() {
    const notasStorage: Nota[] | null = await obtenerNotas();
    setNotas(notasStorage);
  }

  useEffect(() => {
    cargarNotas();
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    await cargarNotas();
    setRefreshing(false);
  }

  return (
    <View style={styles.viewContent}>
      <View style={styles.buttonContainer}>
        <Button
          title="Nueva Nota"
          icon={{ name: "plus", type: "font-awesome-5", color: "white" }}
          style={styles.btnSuccess}
          onPress={() =>
            navigation.navigate({
              name: "NuevaNotaS",
              params: { cargarNotas: async () => await cargarNotas() },
            } as never)
          }
        />
        <Button
          title="Borrar Notas"
          icon={{ name: "trash", type: "font-awesome-5", color: "white" }}
          onPress={async () => {
            await AsyncStorage.clear();
            await cargarNotas();
          }}
        />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={notas}
        renderItem={({ item }) => (
          <View style={styles.notaContainer}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.contenido}>{item.contenido}</Text>
            <Button
              title="Editar"
              buttonStyle={styles.btnWarning}
              titleStyle={styles.textBlack}
              containerStyle={styles.borderButton}
              icon = {{name: "edit", type: "font-awesome-5", color: "black"}}
              onPress={() =>
                navigation.navigate({
                  name: "EditarNotaS",
                  params: {
                    nota: item,
                    cargarNotas: async () => await cargarNotas(),
                  },
                } as never)
              }
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()} // Convertir el id a string
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    height: "100%",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  notaContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contenido: {
    fontSize: 16,
  },
  flatlistContent: {
    paddingHorizontal: 16,
  },
  borderButton: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnDanger: {
    backgroundColor: Colors.Danger
  },
  textBlack: {
    color: Colors.Black
  },
  btnSuccess: {
    backgroundColor: Colors.Success
  },
  btnWarning: {
    backgroundColor: Colors.Warning
  },
});

