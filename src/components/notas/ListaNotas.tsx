import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerNotas } from '../services/NotasService';

export default function ListaNotas() {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    obtenerNotas();
  }, []);

  return (
    <View>
      <Text>Lista de Notas</Text>
      <FlatList
        data={notas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  )
}
