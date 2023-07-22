import AsyncStorage from "@react-native-async-storage/async-storage";
import { Nota } from "../models/Nota";

export async function crearNota(titulo: string, contenido: string) {
  try {
    const fecha = new Date().toLocaleDateString();
    const id: number = Math.floor(Math.random() * 1000); // Generamos un id aleatorio para la nota

    const nota = new Nota(id, titulo, contenido, fecha);

    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas: Nota[] = JSON.parse(notas || "[]");
    notasParseadas.push(nota);
    
    await AsyncStorage.setItem("notas", JSON.stringify(notasParseadas));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function obtenerNotas() {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas: Nota[] = JSON.parse(notas || "[]");
    return notasParseadas;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function eliminarNota(id: number) {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas: Nota[] = JSON.parse(notas || "[]");
    const notasFiltradas = notasParseadas.filter((nota) => nota.id !== id);
    
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
    const notasParseadas: Nota[] = JSON.parse(notas || "[]");
    const nota = notasParseadas.find((nota) => nota.id === id);
    
    return nota;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function editarNota(id: number, titulo: string, contenido: string) {
  try {
    const notas = await AsyncStorage.getItem("notas");
    const notasParseadas: Nota[] = JSON.parse(notas || "[]");
    const notasEditadas = notasParseadas.map((nota) => {
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
