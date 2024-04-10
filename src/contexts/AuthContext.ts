import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HandleLoginProp {
  email: string;
  password: string;
}
interface UserProp {
  name: string;
  email: string;
  password: string;
}

async function signIn({ email, password }: HandleLoginProp) {
  try {
    const response = await api.post("login/", {
      email,
      password
    });
    await AsyncStorage.setItem("@matchjobs", JSON.stringify(response.data));
  } catch (err) {
    console.error(err);
  }
}
async function signUp({ email, password, name }: UserProp) {
  try {
    const response = await api.post("signup/", {
      name,
      email,
      password
    });
    await AsyncStorage.setItem("@matchjobs", JSON.stringify(response.data));
  } catch (err) {
    console.error(err);
  }
}

export { signIn, signUp };
