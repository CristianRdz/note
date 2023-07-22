import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  TextInput,
  Button,
  useTheme,
  Card,
  IconButton,
} from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { crearNota, editarNota } from "../services/NotasService";
import Loading from "../components/common/Loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

export default function EditarNota() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { routes } = navigation.getState();
  const { params } = routes[routes.length - 1];
  const { nota } = params;
  const { id } = nota;
  const { titulo } = nota;
  const { contenido } = nota;
  const { fecha } = nota;

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      titulo: titulo,
      contenido: contenido,
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      titulo: Yup.string().required("El título es obligatorio"),
      contenido: Yup.string().required("El contenido es obligatorio"),
    }),
    onSubmit: async (formData) => {
      try {
        const tituloForm: string = formData.titulo;
        const contenidoForm: string = formData.contenido;
        await editarNota(id, tituloForm, contenidoForm);
        navigation;
        navigation.navigate({
          name: "IndexScreenS",
          params: {
            actualizar: formData,
          },
        } as never);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Nota editada",
          text2: "La nota se ha editado correctamente",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error al editar la nota",
          text2: "Ha ocurrido un error al editar la nota, intentelo más tarde",
        });
      }
    },
  });

  return (
    <KeyboardAwareScrollView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <Card style={styles.card}>
        <Text style={{ ...styles.fecha, color: colors.secondary }}>
          {fecha}
        </Text>
        <TextInput
          label="Título de la nota"
          value={formik.values.titulo}
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("titulo", text)}
          error={formik.touched.titulo && !!formik.errors.titulo}
        />
        <TextInput
          style={styles.nota}
          label="Ingrese su nota"
          value={formik.values.contenido}
          multiline
          onChangeText={(text) => formik.setFieldValue("contenido", text)}
          error={formik.touched.contenido && !!formik.errors.contenido}
        />
        <Button
          icon="content-save"
          mode="contained"
          onPress={formik.handleSubmit as any}
          loading={formik.isSubmitting}
          style={styles.btn}
          contentStyle={styles.btnContent}
        >
          Editar nota
        </Button>
      </Card>
      <Loading visible={isLoading} text="Cargando..." />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 20,
    padding: 10,
  },
  icon: {
    alignSelf: "center",
  },
  input: {
    marginTop: 15,
  },
  nota: {
    height: 200,
    marginVertical: 10,
  },
  btn: {
    borderRadius: 10,
    marginVertical: 15,
  },
  btnContent: {
    paddingVertical: 10,
  },
  fecha: {
    alignSelf: "flex-end",
  },
});
