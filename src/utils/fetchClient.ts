import { API_URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function getUserData() {
    try {
      const userInfo : string | null = await AsyncStorage.getItem("userInfo");
      const user = JSON.parse(userInfo || "{}");
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function fetchClient(ruta: string, metodo: string, datos?: any) {
    try {
        const userInfo = await getUserData();
        const url = `${API_URL}${ruta}`;
        const params = {
            method: metodo,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
            body: datos ? JSON.stringify(datos) : null
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

