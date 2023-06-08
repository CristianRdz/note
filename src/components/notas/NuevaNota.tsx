import { View, Text,StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Card, Icon, Input, Button} from 'react-native-elements'
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { crearNota } from '../services/NotasService';
import Loading from '../common/Loading';
import { TextInput } from 'react-native';


export default function NuevaNota() {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      titulo: "",
      contenido: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      titulo: Yup.string().required("El titulo es obligatorio"),
      contenido: Yup.string().required("El contenido es obligatorio"),
    }),
    onSubmit: async (formData) => {
      try {
        const tituloForm : string = formData.titulo;
        const contenidoForm : string = formData.contenido;
        await crearNota(tituloForm, contenidoForm);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Correo enviado",
          text2: "El correo se ha enviado correctamente",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al enviar el correo",
          text2:
            "Ha ocurrido un error al enviar el correo, intentelo mas tarde",
        });
      }
    },
  });
  return (
    <View style={styles.viewContent}>
      <Icon
        type="material-community"
        name="note-plus-outline"
        size={100}
        color="#438F68"
        style={{ alignSelf: "center" }}
      />
      <Input
        value={formik.values.titulo}
        placeholder="Titulo de la nota"
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name="message-text-outline"
            iconStyle={styles.icon}
          />
        }
        onChangeText={(text) => formik.setFieldValue("titulo", text)}
        errorMessage={formik.errors.titulo}
      />
      <View style={styles.containerNota}>
      <Input
        style={styles.nota}
        multiline={true}
        placeholder="Ingrese su nota"
        value={formik.values.contenido}
        onChangeText={(text) => formik.setFieldValue("contenido", text)}
        errorMessage={formik.errors.contenido}
      />
      </View>
    
      <Button
        icon={<Icon type="font-awesome" name="save" size={20} color="#fff" />}
        title={" Guardar nota"}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit as any}
        loading={formik.isSubmitting}
      />
      <Loading visible={isLoading} text="Cargando..." />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    //tarjeta gris de fondo
    backgroundColor: "#f5f6fa",
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  input: {
    width: "100%",
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#438F68",
    // se centra el boton
  },

  divider: {
    backgroundColor: "#179275",
    margin: 40,
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  nota: {
    height: 150,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  containerNota: {
    marginVertical: 10,
    borderRadius: 8,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  }
});

