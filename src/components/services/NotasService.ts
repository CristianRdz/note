import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nota } from "../../models/Nota";

export async function crearNota(titulo: string, contenido: string) {
  try {
    const fecha = new Date().toLocaleDateString();
    //generamios un id random tipo mongo db para la nota
    const id: string = Math.random().toString(36).substring(2, 9);
    const idParseado: number = parseInt(id);
    const nota = new Nota(idParseado, titulo, contenido, fecha);
    //guardamos la nota en el storage
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas = JSON.parse(notas || "[]");
    notasParseadas.push(nota);
    await AsyncStorage.setItem("notas", JSON.stringify(notasParseadas));
    return nota;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function obtenerNotas() {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas = JSON.parse(notas || "[]");
    return notasParseadas;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function eliminarNota(id: number) {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas = JSON.parse(notas || "[]");
    // contemplamos que es un modelo de typescript
    const notasFiltradas = notasParseadas.filter((nota: any) => nota.id !== id);
    await AsyncStorage.setItem("notas", JSON.stringify(notasFiltradas));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function obtenerNota(id: number) {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas = JSON.parse(notas || "[]");
    const nota = notasParseadas.find((nota: any) => nota.id === id);
    return nota;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function editarNota(
  id: number,
  titulo: string,
  contenido: string
) {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas = JSON.parse(notas || "[]");
    const notasEditadas = notasParseadas.map((nota: any) => {
      if (nota.id === id) {
        nota.titulo = titulo;
        nota.contenido = contenido;
      }
      return nota;
    });
    await AsyncStorage.setItem("notas", JSON.stringify(notasEditadas));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
