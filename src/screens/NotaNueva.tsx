import { Text, View } from 'react-native'
import React, { Component } from 'react'
import NuevaNota from '../components/notas/NuevaNota'

export default class NotaNueva extends Component {
  render() {
    return (
      <View>
        <NuevaNota />
      </View>
    )
  }
}