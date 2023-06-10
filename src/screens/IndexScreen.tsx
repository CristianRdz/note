import { View, Text } from 'react-native'
import React from 'react'
import ListaNotas from '../components/notas/ListaNotas'

import { useNavigation } from '@react-navigation/native';


export default function IndexScreen() {
  const navigation = useNavigation();

  return (
    <View>
      <ListaNotas />
    </View>
  )
}