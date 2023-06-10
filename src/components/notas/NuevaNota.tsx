import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Card, Icon, Input, Button } from 'react-native-elements';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import { crearNota } from '../services/NotasService';
import Loading from '../common/Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

export default function NuevaNota() {
  const navigation = useNavigation();
  const {routes} = navigation.getState();
  const {params} = routes[routes.length - 1];
  const {cargarNotas} = params;

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      titulo: '',
      contenido: '',
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      titulo: Yup.string().required('El título es obligatorio'),
      contenido: Yup.string().required('El contenido es obligatorio'),
    }),
    onSubmit: async (formData) => {
      try {
        const tituloForm: string = formData.titulo;
        const contenidoForm: string = formData.contenido;
        console.log(formData);
        await crearNota(tituloForm, contenidoForm);
        await cargarNotas();
        navigation.goBack();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Nota creada',
          text2: 'La nota se ha creado correctamente',
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error al crear la nota',
          text2: 'Ha ocurrido un error al crear la nota, inténtelo más tarde',
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Icon
        type="material-community"
        name="note-plus-outline"
        size={100}
        color="#fff"
        style={styles.icon}
      />
      <View style={styles.card}>
        <Input
          value={formik.values.titulo}
          placeholder="Título de la nota"
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name="message-text-outline"
              iconStyle={styles.icon}
            />
          }
          onChangeText={(text) => formik.setFieldValue('titulo', text)}
          errorMessage={formik.errors.titulo}
        />
        <Input
          style={styles.nota}
          multiline={true}
          placeholder="Ingrese su nota"
          value={formik.values.contenido}
          onChangeText={(text) => formik.setFieldValue('contenido', text)}
          errorMessage={formik.errors.contenido}
        />
        <Button
          icon={<Icon type="font-awesome" name="save" size={20} color="#fff" style={styles.iconoGuardar} />}
          title="Guardar nota"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={formik.handleSubmit as any}
          loading={formik.isSubmitting}
        />
      </View>
      <Loading visible={isLoading} text="Cargando..." />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#007ACC',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  iconoGuardar: {
    marginRight: 10,
  },
  input: {
    marginTop: 15,
  },
  nota: {
    height: 200,
    marginVertical: 10,
  },
  btnContainer: {
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
    width: '50%',
  },
  btn: {
    backgroundColor: '#438F68',
  },
});

