import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native-gesture-handler"; // Import FlatList from gesture-handler
import { Button } from "react-native-paper"; // Import Button from React Native Paper
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { obtenerNotas } from "../services/NotasService";
import { Nota } from "../models/Nota";
import Loading from "../components/common/Loading";

export default function ListaNotas(props: any) {
  const navigation = useNavigation();
  const actualizar = props.route.params ? props.route.params.actualizar : null;
  const { colors } = useTheme();
  const [notas, setNotas]: [Nota[], any] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarNotas();
  }, [actualizar]);

  async function cargarNotas() {
    setLoading(true);
    const notasStorage: Nota[] | null = await obtenerNotas();
    setNotas(notasStorage);
    setLoading(false);
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
    <View style={{ ...styles.viewContent, backgroundColor: colors.background }}>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() =>
            navigation.navigate({
              name: "NuevaNotaS",
            } as never)
          }
        >
          Nueva Nota
        </Button>
        <Button
          mode="contained"
          icon="delete"
          onPress={async () => {
            await AsyncStorage.clear();
            await cargarNotas();
          }}
        >
          Borrar Notas
        </Button>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={notas}
        renderItem={({ item }) => (
          <View style={styles.notaContainer}>
            <Text style={{ ...styles.titulo, color: colors.secondary }}>
              {item.titulo}
            </Text>
            <Text style={{ ...styles.contenido, color: colors.primary }}>
              {item.contenido.substring(0, 30)}
            </Text>
            <Button
              mode="outlined"
              style={{ borderColor: colors.primary }}
              onPress={() =>
                navigation.navigate({
                  name: "EditarNotaS",
                  params: {
                    nota: item,
                  },
                } as never)
              }
            >
              Editar
            </Button>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatlistContent}
      />
      <Loading visible={loading} text="Cargando..." />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    flex: 1, // Use flex instead of setting height to "100%"
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
});
