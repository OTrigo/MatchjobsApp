import { api } from "../infra/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HandleLoginProp {
  email: string;
  password: string;
}
interface UserProp {
  id: Number;
  name: string;
  email: string;
  password: string;
}


async function signIn({ email, password }: HandleLoginProp) {
  try {
    const response = await api.post("auth/signIn/", {
      email,
      password
    });
    await AsyncStorage.setItem(
      "@matchjobs",
      JSON.stringify(response.data.access_token)
    );
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 401) {
      alert("Email ou senha invalido");
      return;
    }
    console.error(err);
  }
}
async function signUp({ email, password, name }: UserProp) {
  try {
    const response = await api.post("auth/signUp", {
      name,
      email,
      password
    });

    await AsyncStorage.setItem(
      "@matchjobs",
      JSON.stringify(response.data.access_token)
    );
  } catch (err: any) {
    //arrumar tipagem
    if (err.response.status === 409) {
      alert("Email já cadastrado");
      return;
    }
    console.error(err);
  }
}
async function UpdateUser({name,id}: any){
  try {
    await api.put(`user/${id}`, {
      name,
    });
    alert('Dados Atualizados')
  } catch (err: any) {

    console.error(err);
  }
}
async function DeleteUser({id}: any){
  try {
    await api.delete(`user/${id}`);
    alert('Conta Deletada')
  } catch (err: any) {

    console.error(err);
  }
}

export { signIn, signUp, UpdateUser,  DeleteUser };